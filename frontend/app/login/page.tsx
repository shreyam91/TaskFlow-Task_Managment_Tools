"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Development bypass
    localStorage.setItem("token", "dev-bypass-token");
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="text-muted-foreground">Redirecting to dashboard...</div>
    </div>
  );
}
