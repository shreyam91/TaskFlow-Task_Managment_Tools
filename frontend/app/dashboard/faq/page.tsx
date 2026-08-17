"use client";

import { useState } from "react";
import { IconChevronDown, IconHelp, IconMessageCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    question: "How do I add a new project?",
    answer: "Use the 'New Project' card on the main dashboard or navigate to the Projects section and click the add button. You can assign teams and set initial configurations there."
  },
  {
    question: "Can I invite external team members?",
    answer: "Yes! Navigate to the Team section in the sidebar. Click 'Create Team' and simply enter the email addresses of the people you want to collaborate with. They will receive an email invitation."
  },
  {
    question: "Where do I manage task assignments?",
    answer: "Go to the Tasks section from the sidebar. You can assign tasks by editing an existing task or assigning it directly during the creation process. You can also filter tasks by assignee."
  },
  {
    question: "How do I change my notification preferences?",
    answer: "Navigate to the Settings page from the sidebar and switch to the 'Notifications' tab. There you can toggle email and push alerts for various system events."
  },
  {
    question: "Is there a global search feature?",
    answer: "Yes, press Cmd+K or Ctrl+K anywhere in the app, or click the Search button in the sidebar to open the quick navigation palette."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 relative min-h-[calc(100vh-4rem)]">
      {/* Decorative blurred blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="flex flex-col md:flex-row gap-12 relative z-10 max-w-5xl">
        
        {/* Left Side: Header & Support Info */}
        <div className="w-full md:w-1/3 space-y-6">
          <div>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <IconHelp className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Find answers to the most common questions about using our platform, managing your workflow, and configuring your workspace.
            </p>
          </div>
          
          <div className="p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm mt-8">
            <IconMessageCircle className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              If you couldn't find the answer to your question, our support team is available 24/7 to assist you.
            </p>
            <Button className="w-full rounded-xl">Contact Support</Button>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="w-full md:w-2/3">
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-slate-200 dark:border-slate-800 last:border-0">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground pr-8">{faq.question}</span>
                    <div className={`p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <IconChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
