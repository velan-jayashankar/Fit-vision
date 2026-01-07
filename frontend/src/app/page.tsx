"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Simulating Splash Screen Timer
    console.log("Splash Screen Mounted");
    const timer = setTimeout(() => {
      // Here we would check auth, for now go to Onboarding
      console.log("Redirecting to /onboarding");
      router.push("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#4f46e5]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <h1 className="text-6xl font-black tracking-tighter">FIT<span className="text-slate-900">VISION</span></h1>
        <p className="text-slate-400 text-sm tracking-[0.3em] uppercase font-bold">AI Powered Fitness</p>
      </motion.div>
    </div>
  );
}
