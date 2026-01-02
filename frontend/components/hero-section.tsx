"use client";

import { motion } from "motion/react";
import { useState } from "react";
import AuthPage from "../app/auth/AuthPage"; // New import

export default function HeroSectionOne() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const onLoginClick = () => {
    setShowAuthModal(true);
  };

  return (
    <>
    
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-black">
      <Navbar onLoginClick={onLoginClick} />

      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Manage your team and task in one place"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          A simple and efficient task management system for small teams to create, assign, track, and manage tasks with ease.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explore Now
          </button>
          <button className="w-60 rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div>

        {showAuthModal && <AuthPage onClose={() => setShowAuthModal(false)} />}
      </div>
    </div>

    

    
    </>
  );
}

const Navbar = ({ onLoginClick }: { onLoginClick: () => void }) => {
  return (
    <nav className="z-20 w-full flex items-center justify-between border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Task Manager</h1>
      </div>
      <button
        onClick={onLoginClick}
        className="w-24 rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Login
      </button>
    </nav>
  );
};
