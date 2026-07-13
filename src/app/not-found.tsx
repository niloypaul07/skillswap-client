"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col bg-[#090a0f] min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center space-y-8 max-w-lg">
          {/* 404 Visual */}
          <div className="relative inline-block">
            <h1 className="text-[9rem] font-black text-white/5 select-none leading-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                404
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Try exploring our skill listings instead.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20"
            >
              <Home className="h-4 w-4" />
              <span>Go Home</span>
            </Link>
            <Link
              href="/skills"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-xl transition-all"
            >
              <Search className="h-4 w-4" />
              <span>Browse Skills</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
