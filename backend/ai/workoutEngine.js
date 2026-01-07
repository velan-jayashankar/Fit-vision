const fs = require('fs');
const path = require('path');

// Load exercises from JSON
const exercisesPath = path.join(__dirname, '../data/exercises.json');
let exercises = [];

try {
    const data = fs.readFileSync(exercisesPath, 'utf8');
    exercises = JSON.parse(data);
} catch (err) {
    console.error('Error reading exercises.json:', err);
    exercises = []; // Fallback empty array
}

// Workout Templates (Hardcoded for "Free Stack" logic)
const templates = {
    'Weight Loss': {
        days: 3,
        focus: ['Cardio', 'Full Body', 'Cardio'],
        reps: 15,
        sets: 3,
        rest: 30 // seconds
    },
    'Muscle Gain': {
        days: 4,
        focus: ['Chest', 'Back', 'Legs', 'Shoulders'],
        reps: 8,
        sets: 4,
        rest: 60
    },
    'Maintain': {
        days: 3,
        focus: ['Full Body', 'Full Body', 'Full Body'],
        reps: 12,
        sets: 3,
        rest: 45
    },
    'Improve Stamina': {
        days: 4,
        focus: ['Cardio', 'Legs', 'Cardio', 'Full Body'],
        reps: 20,
        sets: 3,
        rest: 15
    }
};

const generateWorkoutPlan = (profile) => {
    const { goal, experienceLevel, equipment, daysPerWeek } = profile;

    const template = templates[goal] || templates['Maintain'];
    const difficultyModifier = experienceLevel === 'Advanced' ? 1.2 : (experienceLevel === 'Beginner' ? 0.8 : 1.0);

    const plan = [];

    // Logic: Create a daily workout structure
    // For MVP: Repeat the template pattern based on daysPerWeek available
    const focusList = template.focus;

    for (let i = 0; i < daysPerWeek; i++) {
        const focusInd = i % focusList.length;
        const focusGroup = focusList[focusInd];

        // Filter exercises suitable for this focus, equipment, and difficulty
        // Note: difficulty filtering is heuristic here
        let suitableExercises = exercises.filter(ex => {
            // Match Bodyweight to "Bodyweight" and "Home" (assuming home has space)
            // Match Gym to "Gym"
            if (equipment === 'Bodyweight' && ex.equipment !== 'Bodyweight') return false;
            if (equipment === 'Home' && ex.equipment === 'Gym') return false; // Basic home assumption

            // Muscle Group Match
            // Mappings: "Chest" -> ex.muscleGroup "Chest"
            // "Full Body" -> ex.muscleGroup "Full Body" OR any compound movement
            // "Cardio" -> ex.type "Cardio"

            if (focusGroup === 'Full Body') return true; // Pick any
            if (focusGroup === 'Cardio' && ex.type === 'Cardio') return true;
            if (ex.muscleGroup.includes(focusGroup)) return true;

            return false;
        });

        // Shuffle and pick 4-6 exercises
        suitableExercises = suitableExercises.sort(() => 0.5 - Math.random()).slice(0, 5);

        plan.push({
            day: i + 1,
            name: `${goal} Workout - Day ${i + 1} (${focusGroup})`,
            exercises: suitableExercises.map(ex => ({
                exerciseId: ex.id,
                name: ex.name,
                sets: Math.round(template.sets * difficultyModifier),
                reps: Math.round(template.reps * difficultyModifier),
                rest: template.rest
            }))
        });
    }

    return plan;
};

module.exports = { generateWorkoutPlan };
