"use client";

import { useState, useEffect } from "react";
import WorkoutList from "@/components/workout/WorkoutList";
import ActiveWorkoutSession from "@/components/workout/ActiveWorkoutSession";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";

export default function WorkoutPage() {
    const [mode, setMode] = useState<"plan" | "active">("plan");
    const [todaysPlan, setTodaysPlan] = useState<any>(null);

    useEffect(() => {
        // Mock Fetch
        const mockPlan = {
            name: "Full Body Blast",
            exercises: [
                { name: "Push Ups", sets: 3, reps: 15 },
                { name: "Squats", sets: 3, reps: 20 },
                { name: "Burpees", sets: 3, reps: 10 },
                { name: "Plank", sets: 3, reps: 60 }
            ]
        };
        setTodaysPlan(mockPlan);
    }, []);

    if (!todaysPlan) return <div className="p-6 text-slate-500">Loading Plan...</div>;

    return (
        <div className="min-h-screen p-6 pb-24 bg-[#f8fafc] text-slate-900">
            {/* Header is only for plan mode */}
            {mode === 'plan' && (
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="p-3 bg-white rounded-full text-slate-700 shadow-sm border border-slate-100">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Today's Session</h1>
                        <p className="text-slate-500 text-sm font-medium">{todaysPlan.name}</p>
                    </div>
                </div>
            )}

            {mode === 'plan' ? (
                <>
                    <WorkoutList plan={todaysPlan} onStart={() => setMode('active')} />
                    <BottomNav />
                </>
            ) : (
                <ActiveWorkoutSession workout={todaysPlan} />
            )}
        </div>
    );
}
