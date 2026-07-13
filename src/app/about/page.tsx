"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Award, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Our Mission is to Make <span className="text-primary">Learning Personal</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            SkillSwap is a global network of passionate mentors and developers who believe the fastest way to master any skill is through direct, 1-on-1 collaborative practice.
          </p>
        </section>

        {/* Vision & Mission grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card-bg p-8 rounded-2xl border border-white/5 space-y-4">
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              We envision a world where learning isn't locked behind expensive university degrees or generic pre-recorded courses. By establishing a direct connection between experts and students, we unlock faster career growth, better codebase designs, and collaborative communities across the globe.
            </p>
          </div>
          <div className="bg-card-bg p-8 rounded-2xl border border-white/5 space-y-4">
            <h2 className="text-2xl font-bold text-white">Our Values</h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              Honesty, collaborative practice, and constant iteration. We believe in providing verified, high-quality instructors who are active practitioners in their respective fields rather than theoretical instructors.
            </p>
          </div>
        </section>

        {/* Features / Benefits */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Core Pillars of SkillSwap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card-bg p-6 rounded-2xl border border-white/5 flex space-x-4">
              <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-white font-bold text-lg">Rigorous Verification</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every tutor undergoes profile verification and listing reviews to check credentials and teaching quality.
                </p>
              </div>
            </div>
            <div className="bg-card-bg p-6 rounded-2xl border border-white/5 flex space-x-4">
              <Heart className="h-8 w-8 text-secondary flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-white font-bold text-lg">Empathy & Community</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Learning can be frustrating. Our mentors are trained to guide you step-by-step with constructive feedback.
                </p>
              </div>
            </div>
            <div className="bg-card-bg p-6 rounded-2xl border border-white/5 flex space-x-4">
              <Sparkles className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-white font-bold text-lg">Project-driven Learning</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We focus on real-world projects. You don't just solve quizzes; you build full production portfolios.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
