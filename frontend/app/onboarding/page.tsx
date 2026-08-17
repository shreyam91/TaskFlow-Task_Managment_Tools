"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconCode,
  IconRocket,
  IconCheck,
  IconArrowRight,
  IconSparkles,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type IntentType = "developer" | "owner" | null;

const options = [
  {
    id: "developer" as const,
    icon: IconCode,
    title: "I'm a Developer",
    description:
      "Build, collaborate, and contribute to software projects with a workflow designed for developers.",
    features: [
      "Discover active projects",
      "Join development teams",
      "Work on assigned tasks",
      "Connect your GitHub workflow",
    ],
  },
  {
    id: "owner" as const,
    icon: IconRocket,
    title: "I Create & Manage Projects",
    description:
      "Turn ideas into products, build development teams, and keep your projects moving forward.",
    features: [
      "Create new projects",
      "Build development teams",
      "Manage & assign tasks",
      "Track project progress",
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedIntent, setSelectedIntent] = useState<IntentType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = () => {
    if (!selectedIntent || isSubmitting) return;

    setIsSubmitting(true);

    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fafbff] font-sans text-slate-950 dark:bg-slate-950 dark:text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-900/20" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-900/20" />

        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-5 py-10 sm:px-8 sm:py-14">
        {/* Brand */}
        <div className="mb-12 flex flex-col items-center text-center sm:mb-14">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-sm backdrop-blur transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-slate-700"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm">
              <span className="text-sm font-bold">D</span>
            </span>

            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              DevDesk
            </span>
          </Link>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
            <IconSparkles className="size-3.5" />
            Personalize your workspace
          </div>

          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
            Welcome to DevDesk
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-500 sm:text-lg dark:text-slate-400">
            Tell us how you plan to use DevDesk so we can tailor your
            experience.
          </p>
        </div>

        {/* Selection */}
        <div className="grid w-full max-w-4xl gap-5 md:grid-cols-2">
          {options.map((option) => {
            const isSelected = selectedIntent === option.id;
            const Icon = option.icon;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedIntent(option.id)}
                aria-pressed={isSelected}
                className={cn(
                  "group relative flex h-full flex-col rounded-2xl border bg-white p-6 text-left shadow-sm outline-none transition-all duration-200 sm:p-7 dark:bg-slate-900",
                  "hover:-translate-y-0.5 hover:shadow-lg",
                  "focus-visible:ring-4 focus-visible:ring-indigo-500/20",
                  isSelected
                    ? "border-indigo-500 shadow-xl shadow-indigo-500/10 ring-4 ring-indigo-500/10 dark:border-indigo-400 dark:ring-indigo-400/10"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                )}
              >
                {/* Selected indicator */}
                <div
                  className={cn(
                    "absolute right-5 top-5 flex size-7 items-center justify-center rounded-full border transition-all",
                    isSelected
                      ? "scale-100 border-indigo-600 bg-indigo-600 text-white"
                      : "scale-90 border-slate-200 bg-slate-50 text-transparent dark:border-slate-700 dark:bg-slate-800"
                  )}
                >
                  <IconCheck className="size-4" strokeWidth={2.5} />
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "mb-6 flex size-12 items-center justify-center rounded-xl transition-all duration-200",
                    isSelected
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                      : "bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-indigo-950/50 dark:group-hover:text-indigo-400"
                  )}
                >
                  <Icon className="size-6" strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="pr-8">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {option.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {option.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mt-7 border-t border-slate-100 pt-6 dark:border-slate-800">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    You'll be able to
                  </p>

                  <ul className="space-y-3">
                    {option.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <span
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full transition-colors",
                            isSelected
                              ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/70 dark:text-indigo-400"
                              : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                          )}
                        >
                          <IconCheck className="size-3" strokeWidth={2.5} />
                        </span>

                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card footer */}
                <div
                  className={cn(
                    "mt-7 flex items-center gap-1.5 text-sm font-semibold transition-all",
                    isSelected
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-400 group-hover:text-indigo-600 dark:text-slate-500 dark:group-hover:text-indigo-400"
                  )}
                >
                  {isSelected ? "Selected" : "Choose this option"}
                  <IconArrowRight
                    className={cn(
                      "size-4 transition-transform",
                      isSelected && "translate-x-0.5"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom action */}
        <div className="mt-10 flex w-full max-w-md flex-col items-center text-center sm:mt-12">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedIntent || isSubmitting}
            className={cn(
              "h-14 w-full rounded-xl text-base font-semibold shadow-lg transition-all duration-200",
              selectedIntent
                ? "bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/30"
                : "cursor-not-allowed bg-slate-100 text-slate-400 shadow-none dark:bg-slate-800 dark:text-slate-500"
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Preparing your workspace...
              </span>
            ) : selectedIntent === "developer" ? (
              <span className="flex items-center gap-2">
                Continue as Developer
                <IconArrowRight className="size-4" />
              </span>
            ) : selectedIntent === "owner" ? (
              <span className="flex items-center gap-2">
                Continue as Project Owner
                <IconArrowRight className="size-4" />
              </span>
            ) : (
              "Select an option to continue"
            )}
          </Button>

          <p className="mt-5 max-w-sm text-xs leading-5 text-slate-400 dark:text-slate-500">
            You can use DevDesk for both. This choice simply helps us
            personalize your starting experience.
          </p>

          <Link
            href="/dashboard"
            className="mt-4 text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-white"
          >
            Skip for now
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-xs text-slate-400 dark:text-slate-600">
          Your workspace can always be customized later.
        </div>
      </div>
    </main>
  );
}