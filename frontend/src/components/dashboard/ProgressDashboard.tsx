"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";

export default function ProgressDashboard() {
    const weights = [70, 69.5, 69.8, 69.2, 68.9, 68.5, 68.2];
    const maxWeight = Math.max(...weights) + 1;
    const minWeight = Math.min(...weights) - 1;

    return (
        <div className="p-6 pb-28 min-h-screen bg-[#f8fafc] text-slate-900">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="p-3 bg-white rounded-full text-slate-700 shadow-sm border border-slate-100">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">Your Progress</h1>
            </div>

            {/* Main Weight Chart */}
            <div className="bg-white p-6 rounded-[2rem] shadow-soft border border-slate-100 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Weight</h2>
                        <div className="text-4xl font-black text-slate-900">68.2 <span className="text-xl text-slate-400">kg</span></div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-600 font-bold rounded-full text-sm">
                        -1.8 kg
                    </div>
                </div>

                <div className="h-48 flex items-end justify-between px-2 gap-2">
                    {weights.map((w, i) => {
                        const height = ((w - minWeight) / (maxWeight - minWeight)) * 100;
                        return (
                            <div key={i} className="flex flex-col items-center gap-2 w-full">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-full bg-slate-100 rounded-t-lg relative group"
                                >
                                    <div className="absolute top-0 w-full h-full bg-[#4f46e5] opacity-20 rounded-t-lg" />
                                    <div className="absolute top-0 w-full bg-[#4f46e5] rounded-t-lg" style={{ height: '4px' }} />

                                    {/* Tooltip */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {w}
                                    </div>
                                </motion.div>
                                <span className="text-xs text-slate-300 font-bold">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-[2rem] shadow-soft border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-[#4f46e5] flex items-center justify-center mb-3">
                        <Calendar size={20} />
                    </div>
                    <div className="text-2xl font-black text-slate-900">12</div>
                    <div className="text-xs text-slate-400 font-bold uppercase">Workouts Done</div>
                </div>
                <div className="bg-white p-5 rounded-[2rem] shadow-soft border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-3">
                        <TrendingUp size={20} />
                    </div>
                    <div className="text-2xl font-black text-slate-900">3250</div>
                    <div className="text-xs text-slate-400 font-bold uppercase">Total Kcal</div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Transformation</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    <div className="flex-shrink-0 w-40 h-56 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-bold">JAN</div>
                    <div className="flex-shrink-0 w-40 h-56 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-bold">FEB</div>
                    <div className="flex-shrink-0 w-40 h-56 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm">Add Photo</div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
