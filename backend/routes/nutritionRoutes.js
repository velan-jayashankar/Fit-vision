const express = require('express');
const router = express.Router();
const NutritionLog = require('../models/NutritionLog');
const FitnessProfile = require('../models/FitnessProfile');
const { protect } = require('../middleware/authMiddleware');
const { calculateMacros } = require('../ai/nutritionEngine');

// @desc    Get Daily Nutrition Targets
// @route   GET /api/nutrition/targets
// @access  Private
router.get('/targets', protect, async (req, res) => {
    try {
        const profile = await FitnessProfile.findOne({ user: req.user._id });
        if (!profile) return res.status(404).json({ message: 'No profile' });

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

    // Find log for today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    try {
        let log = await NutritionLog.findOne({
            user: req.user._id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (!log) {
            log = new NutritionLog({ user: req.user._id, meals: [] });
        }

        log.meals.push({ name, type, calories, protein, carbs, fat });

        // Recalculate totals
        log.totalCalories += calories;
        log.totalProtein += (protein || 0);
        log.totalCarbs += (carbs || 0);
        log.totalFat += (fat || 0);

        await log.save();
        res.json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get Today's Log
// @route   GET /api/nutrition/today
// @access  Private
router.get('/today', protect, async (req, res) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    try {
        const log = await NutritionLog.findOne({
            user: req.user._id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });
        res.json(log || { meals: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
