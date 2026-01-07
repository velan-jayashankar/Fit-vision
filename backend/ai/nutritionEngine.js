// Nutrition Formulas (Mifflin-St Jeor Equation)

const calculateBMR = (gender, weight, height, age) => {
    // Weight in kg, Height in cm, Age in years
    if (gender === 'Male') {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
};

const calculateTDEE = (bmr, activityLevel) => {
    // Activity Level Heuristics based on daysPerWeek inputs usually, 
    // but here we might map "experienceLevel" to activity or ask for it explicitly.
    // For now, assume based on workout frequency
    // 1-2 days -> 1.2
    // 3-4 days -> 1.375
    // 5+ days -> 1.55
    return Math.round(bmr * activityLevel);
};

const calculateMacros = (tdee, goal) => {
    let proteinRatio, fatRatio, carbsRatio;

    switch (goal) {
        case 'Weight Loss':
            proteinRatio = 0.40;
            fatRatio = 0.30;
            carbsRatio = 0.30;
            break;
        case 'Muscle Gain':
            proteinRatio = 0.35;
            fatRatio = 0.25;
            carbsRatio = 0.40;
            break;
        default: // Maintain
            proteinRatio = 0.30;
            fatRatio = 0.30;
            carbsRatio = 0.40;
            break;
    }

    return {
        calories: tdee,
        protein: Math.round((tdee * proteinRatio) / 4), // 4 cal/g
        fat: Math.round((tdee * fatRatio) / 9),     // 9 cal/g
        carbs: Math.round((tdee * carbsRatio) / 4)  // 4 cal/g
    };
};

module.exports = { calculateBMR, calculateTDEE, calculateMacros };
