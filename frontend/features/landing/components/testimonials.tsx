"use client";

import { motion } from "motion/react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "TaskManager completely changed how our engineering team operates. We went from chaotic weekly sprints to shipping features daily. It's the cleanest tool we've ever used.",
      name: "Sarah Jenkins",
      role: "VP of Engineering at Acme",
      avatar: "SJ",
      color: "bg-purple-100 text-purple-700",
    },
    {
      quote: "The interface is so incredibly intuitive. We didn't even need to onboard our team; they just logged in and immediately understood how to use it. A massive time saver.",
      name: "David Chen",
      role: "Product Manager at Smileio",
      avatar: "DC",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      quote: "Finally, a task manager that doesn't feel like a spreadsheet. The visual feedback and the speed of the application makes updating tickets actually enjoyable.",
      name: "Elena Rodriguez",
      role: "Design Lead at Stackr",
      avatar: "ER",
      color: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <section className="w-full py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            Loved by builders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-950 p-8 shadow-sm border border-slate-200 dark:border-slate-800"
            >
              <div className="flex gap-1 mb-6 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed text-lg flex-1">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold ${testimonial.color}`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
