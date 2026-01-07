const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { protect } = require('../middleware/authMiddleware');
const { generateWorkoutPlan } = require('../ai/workoutEngine');

// Helper to map Supabase snake_case to AI engine's expected camelCase
const mapProfile = (p) => ({
    ...p,
    experienceLevel: p.experience_level,
    daysPerWeek: p.days_per_week,
    dietPreference: p.diet_preference
});

// @desc    Generate/Regenerate Workout Plan
// @route   POST /api/workout/generate
// @access  Private
router.post('/generate', protect, async (req, res) => {
    try {
        const { data: profileData, error } = await supabase
            .from('fitness_profiles')
            .select('*')
            .eq('user_id', req.user.id)
            .single();

        if (error || !profileData) {
            return res.status(404).json({ message: 'Profile not found. Please complete onboarding.' });
        }

        const profile = mapProfile(profileData);
        const plan = generateWorkoutPlan(profile);

        // Save plans to DB ? Or just return JSON? 
        // Implementation Plan says "Auto-generate Weekly workout plan". 
        // We should save them as "Planned" workouts for the week.

        // Clear existing planned workouts for future if regenerate? 
        // For MVP, just return the plan structure or save first day as "Today's workout"

        // Let's safe the simplified plan structure in a response for now, 
        // but typically we'd create Workout documents for the week.

        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get Today's Workout (or create one from plan if missing)
// @route   GET /api/workout/today
// @access  Private
router.get('/today', protect, async (req, res) => {
    // Logic: Check if there is a workout for today. 
    // If not, use the generative logic to pick "Day X" from the plan.
    // For MVP transparency: We'll just generate the plan and pick the day based on simple modular arithmetic of date or just random day from plan.

    // ... Simplified implementation ...
    try {
        const profile = await FitnessProfile.findOne({ user: req.user._id });
        if (!profile) return res.status(404).json({ message: 'No profile' });

        const weeklyPlan = generateWorkoutPlan(profile);
        const dayOfWeek = (new Date().getDay() + 6) % 7; // Mon=0, Sun=6... actually getDay 0=Sun. 
        // Let's just mapping 0=Sun -> Day 1 (or Rest), 1=Mon -> Day 1.

        // Simple Logic: Pick Day (dayOfWeek % daysPerWeek)
        const workoutIndex = dayOfWeek % profile.daysPerWeek;
        const todaysPlan = weeklyPlan[workoutIndex];

        res.json(todaysPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Log a completed workout
// @route   POST /api/workout/log
// @access  Private
router.post('/log', protect, async (req, res) => {
    const { name, exercises, duration, caloriesBurned } = req.body;
    try {
        const workout = await Workout.create({
            user: req.user._id,
            name,
            exercises, // Expects array with isCompleted: true
            duration,
            caloriesBurned,
            status: 'Completed'
        });
        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get Workout History
// @route   GET /api/workout/history
// @access  Private
router.get('/history', protect, async (req, res) => {
    try {
        const history = await Workout.find({ user: req.user._id, status: 'Completed' }).sort({ date: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
