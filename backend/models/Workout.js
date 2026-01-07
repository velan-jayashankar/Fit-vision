const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema(
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
        name: { type: String, required: true }, // e.g., "Monday - Chest Day"
        exercises: [
            {
                exerciseId: { type: String, required: true }, // Refers to ID in exercises.json or database
                name: { type: String, required: true },
                sets: { type: Number, required: true },
                reps: { type: Number, required: true },
                completedSets: { type: Number, default: 0 },
                isCompleted: { type: Boolean, default: false }
            }
        ],
        duration: { type: Number, default: 0 }, // in minutes
        caloriesBurned: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ['Planned', 'In Progress', 'Completed', 'Skipped'],
            default: 'Planned'
        }
    },
    {
        timestamps: true,
    }
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
