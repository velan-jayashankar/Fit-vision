"use client";

import { CheckCircle, Circle, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkoutList({ plan, onStart }: any) {
    return (
        <div className="space-y-4">
            {plan.exercises.map((ex: any, i: number) => (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className="bg-white p-5 rounded-2xl flex justify-between items-center shadow-sm border border-slate-100"
                >
                    <div>
                        <h4 className="text-slate-900 font-bold text-lg">{ex.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{ex.sets} Sets</span>
                            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{ex.reps} Reps</span>
                        </div>
                    </div>
                    {/* Status Indicator */}
                    <div className="text-slate-200">
                        <Circle size={24} />
                    </div>
                </motion.div>
            ))}

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStart}
                className="w-full py-5 mt-8 rounded-2xl bg-[#4f46e5] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 text-lg"
            >
                <Play size={24} fill="white" /> START WORKOUT
            </motion.button>
        </div>
    );
}
