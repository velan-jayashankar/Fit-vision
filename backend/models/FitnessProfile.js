const mongoose = require('mongoose');

const fitnessProfileSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            unique: true
        },
        age: { type: Number, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        height: { type: Number, required: true }, // in cm
        weight: { type: Number, required: true }, // in kg
        goal: {
            type: String,
            enum: ['Weight Loss', 'Muscle Gain', 'Maintain', 'Improve Stamina'],
            required: true
        },
        experienceLevel: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            required: true
        },
        daysPerWeek: { type: Number, required: true, min: 1, max: 7 },
        equipment: {
            type: String,
            enum: ['Gym', 'Home', 'Bodyweight'],
            required: true
        },
        dietPreference: {
            type: String,
            enum: ['Veg', 'Non-veg', 'Vegan'],
            required: true
        },
        bmr: { type: Number }, // Calculated
        tdee: { type: Number } // Calculated
    },
    {
        timestamps: true,
    }
);

const FitnessProfile = mongoose.model('FitnessProfile', fitnessProfileSchema);

module.exports = FitnessProfile;
