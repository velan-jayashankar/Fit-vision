const mongoose = require('mongoose');

const nutritionLogSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        date: {
            type: Date,
            default: Date.now,
        },
        meals: [
            {
                name: { type: String, required: true },
                type: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
                calories: { type: Number, required: true },
                protein: { type: Number },
                carbs: { type: Number },
                fat: { type: Number }
            }
        ],
        totalCalories: { type: Number, default: 0 },
        totalProtein: { type: Number, default: 0 },
        totalCarbs: { type: Number, default: 0 },
        totalFat: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

const NutritionLog = mongoose.model('NutritionLog', nutritionLogSchema);

module.exports = NutritionLog;
