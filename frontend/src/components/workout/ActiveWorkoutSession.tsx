"use client";

import { useState, useEffect } from "react";
import { Check, Clock, Pause, Play, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ActiveWorkoutSession({ workout }: any) {
    const router = useRouter();
    const [exercises, setExercises] = useState(workout.exercises.map((e: any) => ({
        ...e,
        setsCompleted: 0
    })));
    const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval: any;
        if (isRunning) {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSetComplete = () => {
        // Increment sets completed for active exercise
        const newEx = [...exercises];
        newEx[activeExerciseIndex].setsCompleted += 1;
        setExercises(newEx);

        // If all sets done, move to next exercise (if available)
        if (newEx[activeExerciseIndex].setsCompleted >= newEx[activeExerciseIndex].sets) {
            if (activeExerciseIndex < exercises.length - 1) {
                setActiveExerciseIndex(activeExerciseIndex + 1);
            }
        }
    };

    const handleFinish = () => {
        router.push('/dashboard');
    };

    const currentExercise = exercises[activeExerciseIndex];
    const isLastExercise = activeExerciseIndex === exercises.length - 1;
    const isFinished = isLastExercise && currentExercise.setsCompleted >= currentExercise.sets;

    return (
        <div className="flex flex-col h-full relative">
            {/* Timer Header */}
            <div className="flex justify-between items-center mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 text-slate-900 font-mono text-xl font-bold">
                    <div className="p-2 bg-indigo-50 rounded-lg text-[#4f46e5]">
                        <Clock size={20} />
                    </div>
                    {formatTime(timer)}
                </div>
                <button onClick={() => setIsRunning(!isRunning)} className="p-3 bg-slate-100 rounded-xl text-slate-700 hover:bg-slate-200">
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                </button>
            </div>

            {/* Active Exercise Card */}
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                <motion.div
                    key={currentExercise.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
                        {currentExercise.name}
                    </h2>
                    <div className="text-[#4f46e5] text-7xl font-black">
                        {currentExercise.setsCompleted} <span className="text-3xl text-slate-300 font-normal">/ {currentExercise.sets}</span>
                    </div>
                    <div className="inline-block bg-slate-100 text-slate-500 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                        Sets Completed
                    </div>
                </motion.div>

                <div className="bg-indigo-50 text-[#4f46e5] px-6 py-3 rounded-2xl font-bold text-xl">
                    Target: {currentExercise.reps} Reps
                </div>
            </div>

            {/* Controls */}
            <div className="mt-10 space-y-6">
                <AnimatePresence mode="wait">
                    {!isFinished ? (
                        <motion.button
                            key="mark-done"
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSetComplete}
                            className="w-full py-6 rounded-3xl bg-[#4f46e5] text-white font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/30"
                        >
                            <Check size={28} /> MARK SET DONE
                        </motion.button>
                    ) : (
                        <motion.button
                            key="finish"
                            whileTap={{ scale: 0.95 }}
                            onClick={handleFinish}
                            className="w-full py-6 rounded-3xl bg-slate-900 text-white font-bold text-xl flex items-center justify-center gap-3 shadow-xl"
                        >
                            FINISH WORKOUT
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Exercise List Preview (Mini) */}
                <div className="flex gap-2 justify-center py-4">
                    {exercises.map((ex: any, i: number) => (
                        <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i < activeExerciseIndex ? 'w-2 bg-[#4f46e5]' : (i === activeExerciseIndex ? 'w-8 bg-[#4f46e5]' : 'w-2 bg-slate-200')
                            }`} />
                    ))}
                </div>
            </div>
        </div>
    );
}
