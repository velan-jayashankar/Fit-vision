const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { protect } = require('../middleware/authMiddleware');
const { calculateBMR, calculateTDEE } = require('../ai/nutritionEngine');

// @desc    Create or Update Fitness Profile (Onboarding)
// @route   POST /api/user/profile
// @access  Private
router.post('/profile', protect, async (req, res) => {
    const {
        age,
        gender,
        height,
        weight,
        goal,
        experienceLevel,
        daysPerWeek,
        equipment,
        dietPreference
    } = req.body;

    try {
        // Calculate BMR & TDEE
        const bmr = calculateBMR(gender, weight, height, age);
        // Rough activity multiplier based on daysPerWeek: 1-2->1.2, 3-4->1.375, 5+->1.55
        const activityMap = daysPerWeek >= 5 ? 1.55 : (daysPerWeek >= 3 ? 1.375 : 1.2);
        const tdee = calculateTDEE(bmr, activityMap);

        // Upsert profile
        const { data: profile, error } = await supabase
            .from('fitness_profiles')
            .upsert({
                user_id: req.user.id,
                age,
                gender,
                height,
                weight,
                goal,
                experience_level: experienceLevel,
                days_per_week: daysPerWeek,
                equipment,
                diet_preference: dietPreference,
                bmr,
                tdee
            }, { onConflict: 'user_id' })
            .select()
            .single();

        if (error) throw error;

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get current user profile
// @route   GET /api/user/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    try {
        const { data: profile, error } = await supabase
            .from('fitness_profiles')
            .select('*')
            .eq('user_id', req.user.id)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
