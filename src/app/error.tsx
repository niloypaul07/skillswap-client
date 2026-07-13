"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col bg-[#090a0f] min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center space-y-8 max-w-lg">
          <div className="h-20 w-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <span className="text-3xl">⚠️</span>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              An unexpected error occurred. You can try refreshing the page or navigate back home.
            </p>
            {error?.message && (
              <p className="text-xs text-red-400 font-mono bg-red-500/5 border border-red-500/10 rounded-lg px-4 py-2">
                {error.message}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-xl transition-all"
            >
              <Home className="h-4 w-4" />
              <span>Go Home</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
