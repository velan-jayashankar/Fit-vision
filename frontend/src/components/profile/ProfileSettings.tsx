"use client";

import { User, Bell, Moon, LogOut, ChevronRight, Settings } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";

export default function ProfileSettings() {
    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-6 pb-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 mt-2">
                <h1 className="text-2xl font-bold">Profile</h1>
                <button className="p-2 bg-white rounded-full text-slate-400 shadow-sm border border-slate-100">
                    <Settings size={20} />
                </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-500 border-4 border-white shadow-soft">
                    AC
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Alex Carter</h2>
                    <p className="text-slate-400 text-sm font-medium">Free Member</p>
                </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
                <Section title="Account">
                    <SettingsItem icon={User} label="Personal Details" />
                    <SettingsItem icon={Bell} label="Notifications" />
                </Section>

                <Section title="App Settings">
                    <SettingsItem icon={Moon} label="Dark Mode" toggle />
                    {/* Language, Units etc */}
                </Section>

                <button className="w-full py-4 mt-8 rounded-2xl bg-slate-100 text-rose-500 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                    <LogOut size={20} /> Log Out
                </button>
            </div>

            <BottomNav />
        </div>
    );
}

const Section = ({ title, children }: any) => (
    <div>
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 ml-2">{title}</h3>
        <div className="bg-white rounded-3xl shadow-soft border border-slate-50 overflow-hidden divide-y divide-slate-50">
            {children}
        </div>
    </div>
);

const SettingsItem = ({ icon: Icon, label, toggle }: any) => (
    <div className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-[#4f46e5] transition-colors">
                <Icon size={20} />
            </div>
            <span className="font-bold text-slate-700">{label}</span>
        </div>

        {toggle ? (
            <div className="w-12 h-7 bg-slate-200 rounded-full relative p-1 transition-colors hover:bg-slate-300 cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
            </div>
        ) : (
            <ChevronRight size={20} className="text-slate-300" />
        )}
    </div>
);
