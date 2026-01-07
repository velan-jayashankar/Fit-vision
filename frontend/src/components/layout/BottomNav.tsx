"use client";

import { motion } from "framer-motion";
import { Activity, Home, User, Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/dashboard", icon: Home },
        { name: "Workout", href: "/workout", icon: Activity },
        { name: "Nutrition", href: "/nutrition", icon: Utensils },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-50">
            <div className="glass px-8 py-4 rounded-[2rem] flex gap-10 pointer-events-auto shadow-soft mx-6 bg-white/80">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link key={item.name} href={item.href} className="relative flex flex-col items-center justify-center">
                            <div
                                className={`transition-all duration-300 relative ${isActive ? "-translate-y-1" : "hover:scale-105"
                                    }`}
                            >
                                <Icon
                                    size={26}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className={isActive ? "text-[#4f46e5] drop-shadow-sm" : "text-slate-400"}
                                />
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-dot"
                                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#4f46e5] rounded-full"
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
