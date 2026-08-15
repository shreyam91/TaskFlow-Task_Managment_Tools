export default function TrustedBy() {
  return (
    <section className="w-full py-12 md:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500 mb-8">
          Trusted by innovative teams worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale">
          {/* Dummy Logos */}
          <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
            Acme Corp
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            Smileio
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            Stackr
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
            Newzly
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            FintechCo
          </div>
        </div>
      </div>
    </section>
  );
}
