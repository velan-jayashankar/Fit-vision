"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function OnboardingFlow() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        height: "",
        weight: "",
        goal: "",
        experienceLevel: "",
        daysPerWeek: 3,
        equipment: "",
        dietPreference: "",
    });

    const totalSteps = 6;

    const handleNext = async () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            router.push("/dashboard");
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const updateData = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <div className="flex flex-col h-full p-6 relative bg-white min-h-screen text-slate-900">

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                <motion.div
                    className="h-full bg-[#4f46e5]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                />
            </div>

            <div className="flex-1 flex flex-col justify-center mt-10">
                <AnimatePresence mode="wait">
                    {step === 1 && <StepOne key="step1" data={formData} update={updateData} />}
                    {step === 2 && <StepTwo key="step2" data={formData} update={updateData} />}
                    {step === 3 && <StepThree key="step3" data={formData} update={updateData} />}
                    {step === 4 && <StepFour key="step4" data={formData} update={updateData} />}
                    {step === 5 && <StepFive key="step5" data={formData} update={updateData} />}
                    {step === 6 && <StepSix key="step6" data={formData} update={updateData} />}
                </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-between items-center pb-8">
                <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`p-4 rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 ${step === 1 ? "opacity-0 cursor-default" : "opacity-100"
                        }`}
                >
                    <ArrowLeft size={24} />
                </button>

                <button
                    onClick={handleNext}
                    className="px-8 py-4 rounded-full bg-[#4f46e5] text-white font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-2 hover:scale-105 transition-transform"
                >
                    {step === totalSteps ? 'Finish' : 'Next'} <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}

const StepOne = ({ data, update }: any) => (
    <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="space-y-8"
    >
        <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">About You</h1>
            <p className="text-slate-500 text-lg">Let's build your profile.</p>
        </div>

        <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Gender</label>
                <div className="flex gap-4">
                    {['Male', 'Female'].map(g => (
                        <button
                            key={g}
                            onClick={() => update('gender', g)}
                            className={`flex-1 p-5 rounded-2xl transition-all border font-bold text-lg ${data.gender === g
                                    ? 'border-[#4f46e5] bg-indigo-50 text-[#4f46e5] shadow-sm'
                                    : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-200'
                                }`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Age</label>
                    <input
                        type="number"
                        value={data.age}
                        onChange={(e) => update('age', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 p-5 rounded-2xl outline-none focus:ring-2 ring-[#4f46e5] font-bold text-xl"
                        placeholder="25"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Height (cm)</label>
                    <input
                        type="number"
                        value={data.height}
                        onChange={(e) => update('height', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 p-5 rounded-2xl outline-none focus:ring-2 ring-[#4f46e5] font-bold text-xl"
                        placeholder="175"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Weight (kg)</label>
                <input
                    type="number"
                    value={data.weight}
                    onChange={(e) => update('weight', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 p-5 rounded-2xl outline-none focus:ring-2 ring-[#4f46e5] font-bold text-xl"
                    placeholder="70"
                />
            </div>
        </div>
    </motion.div>
);

const StepTwo = ({ data, update }: any) => (
    <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="space-y-8"
    >
        <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Your Goal</h1>
            <p className="text-slate-500 text-lg">What are we aiming for?</p>
        </div>

        <div className="grid gap-4">
            {['Weight Loss', 'Muscle Gain', 'Maintain', 'Improve Stamina'].map(goal => (
                <button
                    key={goal}
                    onClick={() => update('goal', goal)}
                    className={`w-full p-6 rounded-3xl border text-left transition-all ${data.goal === goal
                            ? 'border-[#4f46e5] bg-indigo-50 shadow-md transform scale-[1.02]'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <div className={`font-bold text-xl ${data.goal === goal ? 'text-[#4f46e5]' : 'text-slate-900'}`}>{goal}</div>
                </button>
            ))}
        </div>
    </motion.div>
);

const StepThree = ({ data, update }: any) => (
    // Experience
    <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="space-y-8"
    >
        <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Experience</h1>
            <p className="text-slate-500 text-lg">How often do you train?</p>
        </div>

        <div className="grid gap-4">
            {['Beginner', 'Intermediate', 'Advanced'].map(e => (
                <button
                    key={e}
                    onClick={() => update('experienceLevel', e)}
                    className={`w-full p-6 rounded-3xl border text-left transition-all ${data.experienceLevel === e
                            ? 'border-[#4f46e5] bg-indigo-50 shadow-md transform scale-[1.02]'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <div className={`font-bold text-xl ${data.experienceLevel === e ? 'text-[#4f46e5]' : 'text-slate-900'}`}>{e}</div>
                </button>
            ))}
        </div>
    </motion.div>
);

const StepFour = ({ data, update }: any) => (
    // Days Per Week
    <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="space-y-8"
    >
        <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Frequency</h1>
            <p className="text-slate-500 text-lg">Days per week you can commit.</p>
        </div>

        <div className="flex justify-between items-center bg-white border border-slate-200 p-8 rounded-3xl shadow-soft">
            <button
                onClick={() => update('daysPerWeek', Math.max(1, data.daysPerWeek - 1))}
                className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-900 text-3xl hover:bg-slate-200 transition-colors"
            >-</button>
            <span className="text-6xl font-black text-[#4f46e5]">{data.daysPerWeek}</span>
            <button
                onClick={() => update('daysPerWeek', Math.min(7, data.daysPerWeek + 1))}
                className="w-16 h-16 rounded-2xl bg-[#4f46e5] text-white text-3xl shadow-lg shadow-indigo-500/30"
            >+</button>
        </div>
    </motion.div>
);

const StepFive = ({ data, update }: any) => (
    // Equipment
    <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="space-y-8"
    >
        <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Equipment</h1>
            <p className="text-slate-500 text-lg">What do you have access to?</p>
        </div>

        <div className="grid gap-4">
            {['Gym', 'Home', 'Bodyweight'].map(e => (
                <button
                    key={e}
                    onClick={() => update('equipment', e)}
                    className={`w-full p-6 rounded-3xl border text-left transition-all ${data.equipment === e
                            ? 'border-[#4f46e5] bg-indigo-50 shadow-md transform scale-[1.02]'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <div className={`font-bold text-xl ${data.equipment === e ? 'text-[#4f46e5]' : 'text-slate-900'}`}>{e}</div>
                </button>
            ))}
        </div>
    </motion.div>
);

const StepSix = ({ data, update }: any) => (
    // Diet
    <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="space-y-8"
    >
        <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Diet</h1>
            <p className="text-slate-500 text-lg">Your food preference.</p>
        </div>

        <div className="grid gap-4">
            {['Veg', 'Non-veg', 'Vegan'].map(e => (
                <button
                    key={e}
                    onClick={() => update('dietPreference', e)}
                    className={`w-full p-6 rounded-3xl border text-left transition-all ${data.dietPreference === e
                            ? 'border-[#4f46e5] bg-indigo-50 shadow-md transform scale-[1.02]'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <div className={`font-bold text-xl ${data.dietPreference === e ? 'text-[#4f46e5]' : 'text-slate-900'}`}>{e}</div>
                </button>
            ))}
        </div>
    </motion.div>
);
