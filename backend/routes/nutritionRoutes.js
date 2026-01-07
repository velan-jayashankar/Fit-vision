const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { protect } = require('../middleware/authMiddleware');
const { calculateMacros } = require('../ai/nutritionEngine');

// Helper to map Supabase snake_case to AI engine's expected camelCase
const mapProfile = (p) => ({
    ...p,
    experienceLevel: p.experience_level,
    daysPerWeek: p.days_per_week,
    dietPreference: p.diet_preference
});

// @desc    Get Daily Nutrition Targets
// @route   GET /api/nutrition/targets
// @access  Private
router.get('/targets', protect, async (req, res) => {
    try {
        const { data: profileData, error } = await supabase
            .from('fitness_profiles')
            .select('*')
            .eq('user_id', req.user.id)
            .single();

        if (!profileData) return res.status(404).json({ message: 'No profile' });

        const profile = mapProfile(profileData);
        const targets = calculateMacros(profile.tdee, profile.goal);
        res.json(targets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Log a Meal
// @route   POST /api/nutrition/log
// @access  Private
router.post('/log', protect, async (req, res) => {
    const { name, type, calories, protein, carbs, fat } = req.body;
    const today = new Date().toISOString().split('T')[0];

    try {
        // Find log for today
        const { data: existingLog, error: fetchError } = await supabase
            .from('nutrition_logs')
            .select('*')
            .eq('user_id', req.user.id)
            .eq('date', today)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        let log = existingLog;

        if (!log) {
            // Create new log
            const { data: newLog, error: insertError } = await supabase
                .from('nutrition_logs')
                .insert([
                    {
                        user_id: req.user.id,
                        meals: [{ name, type, calories, protein, carbs, fat }],
                        total_calories: calories,
                        total_protein: protein || 0,
                        total_carbs: carbs || 0,
                        total_fat: fat || 0,
                        date: today
                    }
                ])
                .select()
                .single();

            if (insertError) throw insertError;
            log = newLog;
        } else {
            // Update existing log
            const updatedMeals = [...log.meals, { name, type, calories, protein, carbs, fat }];
            const updatedCalories = log.total_calories + calories;
            const updatedProtein = log.total_protein + (protein || 0);
            const updatedCarbs = log.total_carbs + (carbs || 0);
            const updatedFat = log.total_fat + (fat || 0);

            const { data: updatedLog, error: updateError } = await supabase
                .from('nutrition_logs')
                .update({
                    meals: updatedMeals,
                    total_calories: updatedCalories,
                    total_protein: updatedProtein,
                    total_carbs: updatedCarbs,
                    total_fat: updatedFat
                })
                .eq('id', log.id)
                .select()
                .single();

            if (updateError) throw updateError;
            log = updatedLog;
        }

        res.json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get Today's Log
// @route   GET /api/nutrition/today
// @access  Private
router.get('/today', protect, async (req, res) => {
    const today = new Date().toISOString().split('T')[0];

    try {
        const { data: log, error } = await supabase
            .from('nutrition_logs')
            .select('*')
            .eq('user_id', req.user.id)
            .eq('date', today)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        // Return empty structure if no log found, matching frontend expectation (but snake_case vs camelCase?)
        // The Mongoose model returned camelCase properties effectively (or snake_case if we used .toJSON()?)
        // The original code: res.json(log || { meals: [], totalCalories: 0 ... })
        // Supabase returns snake_case columns.
        // Frontend might expect camelCase if it was built for Mongoose.
        // Let's assume for now we return what DB gives, but handle the default case.
        // Actually, let's map it to camelCase just in case to avoid frontend breakage.

        const responseLog = log ? {
            _id: log.id,
            user: log.user_id,
            meals: log.meals,
            totalCalories: log.total_calories,
            totalProtein: log.total_protein,
            totalCarbs: log.total_carbs,
            totalFat: log.total_fat,
            date: log.date
        } : {
            meals: [],
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0
        };

        res.json(responseLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
