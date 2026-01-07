"use client";

import { motion } from "framer-motion";

export default function MobileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-[#f1f5f9] flex justify-center overflow-x-hidden font-sans">
            {/* Mobile Container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-[480px] min-h-screen bg-[#f8fafc] relative shadow-2xl overflow-x-hidden border-x border-white/50"
            >
                {children}
            </motion.div>
        </div>
    );
}
