"use client";

import { motion } from "framer-motion";
import { Flame, Utensils, Zap, ChevronRight, TrendingUp, Bell } from "lucide-react";
import Link from "next/link";
import BottomNav from "../layout/BottomNav";

export default function Dashboard() {
    const dailyStats = {
        caloriesBurned: 120,
        caloriesTarget: 500,
        nutritionCalories: 850,
        nutritionTarget: 2200,
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 relative">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="p-6 pb-32 space-y-8"
            >
                {/* Header Section */}
                <motion.div variants={item} className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Good Morning,</p>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
                            Alex Carter
                        </h1>
                    </div>
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center border border-slate-100">
                            <span className="text-[#4f46e5] font-bold text-lg">AC</span>
                        </div>
                        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#f8fafc]" />
                    </div>
                </motion.div>

                {/* Quick Stats Grid */}
                <motion.div variants={item} className="grid grid-cols-2 gap-5">
                    {/* Calories Burned Card */}
                    <div className="bg-white p-5 rounded-[2rem] shadow-soft border border-slate-100 relative overflow-hidden group">
                        <div className="flex flex-col h-full justify-between gap-4">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full bg-[#ecfdf5] flex items-center justify-center text-[#10b981]">
                                    <Flame size={20} fill="#10b981" />
                                </div>
                                <span className="text-xs font-bold text-[#10b981] bg-[#ecfdf5] px-2 py-1 rounded-full">+12%</span>
                            </div>
                            <div>
                                <div className="text-3xl font-extrabold text-slate-900">{dailyStats.caloriesBurned}</div>
                                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Kcal Burned</div>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(dailyStats.caloriesBurned / dailyStats.caloriesTarget) * 100}%` }}
                                    className="h-full bg-[#10b981] rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Nutrition Card */}
                    <div className="bg-white p-5 rounded-[2rem] shadow-soft border border-slate-100 relative overflow-hidden group">
                        <div className="flex flex-col h-full justify-between gap-4">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#3b82f6]">
                                    <Utensils size={20} />
                                </div>
                                <span className="text-xs font-bold text-[#64748b] bg-slate-100 px-2 py-1 rounded-full">65%</span>
                            </div>
                            <div>
                                <div className="text-3xl font-extrabold text-slate-900">{dailyStats.nutritionCalories}</div>
                                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Consumed</div>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(dailyStats.nutritionCalories / dailyStats.nutritionTarget) * 100}%` }}
                                    className="h-full bg-[#3b82f6] rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Featured Workout Card */}
                <motion.div variants={item}>
                    <div className="flex justify-between items-end mb-5 px-1">
                        <h2 className="text-xl font-bold text-slate-900">Today's Session</h2>
                        <Link href="/workout" className="text-xs text-[#4f46e5] font-bold flex items-center gap-1 bg-[#4f46e5]/5 px-3 py-1 rounded-full">
                            View Plan <ChevronRight size={14} />
                        </Link>
                    </div>

                    <Link href="/workout">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative w-full aspect-[2/1] bg-white rounded-[2rem] overflow-hidden shadow-soft border border-slate-100"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4f46e5]/10 rounded-full blur-3xl -translate-y-10 translate-x-10" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#06b6d4]/10 rounded-full blur-3xl translate-y-10 -translate-x-10" />

                            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-lg shadow-slate-900/20">
                                        <Zap size={12} fill="white" /> HIIT CARDIO
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                                        <span className="text-slate-900 font-bold text-xs">45m</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">Full Body<br />Meltdown</h3>
                                    <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                                        <span className="flex items-center gap-1"><Flame size={14} className="text-orange-500" /> 450 Kcal</span>
                                        <span className="flex items-center gap-1">Advanced Level</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Weekly Consistency */}
                <motion.div variants={item}>
                    <div className="bg-white p-6 rounded-[2rem] shadow-soft border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                                <TrendingUp size={18} className="text-[#4f46e5]" />
                                Activity
                            </h2>
                            <span className="text-xs text-slate-400 font-medium">Last 7 Days</span>
                        </div>

                        <div className="flex justify-between px-2 items-end h-24">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                                const height = [40, 70, 30, 85, 50, 20, 40][i];
                                const active = i === 3; // Thursday Mock
                                return (
                                    <div key={i} className="flex flex-col items-center gap-3 w-8">
                                        <div
                                            className={`w-full rounded-t-lg transition-all duration-500 ${active ? 'bg-[#4f46e5]' : 'bg-slate-100'}`}
                                            style={{ height: `${height}%` }}
                                        />
                                        <span className={`text-xs font-bold ${active ? 'text-[#4f46e5]' : 'text-slate-300'}`}>{day}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <BottomNav />
        </div>
    );
}
