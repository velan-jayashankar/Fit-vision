"use client";

import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NutritionDashboard() {
    const [logs] = useState([
        { name: "Oatmeal", calories: 350, protein: 10, carbs: 60, fat: 6, time: "8:00 AM" },
        { name: "Grilled Chicken", calories: 450, protein: 40, carbs: 10, fat: 15, time: "1:00 PM" }
    ]);
    const targets = { calories: 2200, protein: 150, carbs: 250, fat: 70 };
    const current = logs.reduce((acc, l) => ({
        calories: acc.calories + l.calories,
        protein: acc.protein + l.protein,
        carbs: acc.carbs + l.carbs,
        fat: acc.fat + l.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    return (
        <div className="p-6 pb-24 min-h-screen bg-[#f8fafc] text-slate-900">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="p-3 bg-white rounded-full text-slate-700 shadow-sm border border-slate-100">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">Nutrition</h1>
            </div>

            {/* Main Calorie Ring */}
            <div className="bg-white p-8 rounded-[2.5rem] mb-6 text-center shadow-soft border border-slate-100">
                <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Calories Remaining</h2>
                <div className="text-6xl font-black text-slate-900 mb-6">
                    {targets.calories - current.calories}
                </div>

                <div className="h-6 bg-slate-100 rounded-full overflow-hidden p-1">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(current.calories / targets.calories) * 100}%` }}
                        className="h-full bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] rounded-full shadow-md"
                    />
                </div>
                <div className="flex justify-between mt-3 text-sm font-medium text-slate-400">
                    <span>0</span>
                    <span>{targets.calories} kcal Target</span>
                </div>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <MacroCard label="Protein" current={current.protein} target={targets.protein} color="bg-emerald-500" />
                <MacroCard label="Carbs" current={current.carbs} target={targets.carbs} color="bg-amber-500" />
                <MacroCard label="Fat" current={current.fat} target={targets.fat} color="bg-rose-500" />
            </div>

            {/* Meals List */}
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-slate-900 font-bold text-xl">Today's Meals</h3>
                    <button className="p-3 bg-[#4f46e5] rounded-full text-white shadow-lg shadow-indigo-500/30">
                        <Plus size={20} />
                    </button>
                </div>

                {logs.map((log, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm border border-slate-50"
                    >
                        <div>
                            <h4 className="text-slate-900 font-bold text-lg">{log.name}</h4>
                            <p className="text-slate-400 text-sm font-medium">{log.time}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-[#4f46e5] font-black text-lg">{log.calories}</div>
                            <div className="text-slate-400 text-xs font-bold uppercase">kcal</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const MacroCard = ({ label, current, target, color }: any) => (
    <div className="bg-white p-4 rounded-3xl flex flex-col items-center shadow-sm border border-slate-50">
        <span className="text-slate-400 text-xs font-bold uppercase mb-2">{label}</span>
        <span className="text-slate-900 font-black text-xl mb-3">{current}g</span>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, (current / target) * 100)}%` }} />
        </div>
    </div>
);
