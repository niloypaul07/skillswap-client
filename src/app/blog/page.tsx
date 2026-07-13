"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      title: "5 Tips to Get the Most Out of Your 1-on-1 Coding Session",
      excerpt: "Tutoring sessions are fast-paced. Learn how prep work, project setup, and specific blocker outlines can double your speed.",
      date: "July 12, 2026",
      author: "Sarah Jenkins",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop"
    },
    {
      title: "Why Figma Auto-Layout is Crucial for Modern Frontends",
      excerpt: "A deep dive into aligning constraints, layout flexboxes in design systems, and converting Figma designs straight to Tailwind classes.",
      date: "July 8, 2026",
      author: "Jessica Lin",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&auto=format&fit=crop"
    },
    {
      title: "The Ultimate Personal Finance Guide for Developers in 2026",
      excerpt: "From index fund allocations to tax-advantaged account strategies, learn how to budget effectively and build compounding wealth.",
      date: "July 1, 2026",
      author: "Marcus Vance",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">SkillSwap Insights & Blog</h1>
          <p className="text-gray-400">Tips, tutorials, and success secrets written by our expert mentors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <div key={idx} className="flex flex-col bg-card-bg border border-white/5 rounded-2xl overflow-hidden hover:border-primary/25 transition-all group">
              <div className="h-48 w-full overflow-hidden bg-gray-800">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-103 transition-all duration-300" />
              </div>
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{art.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{art.author}</span>
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">{art.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{art.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="text-primary group-hover:text-primary-hover text-sm font-semibold flex items-center space-x-1 cursor-pointer">
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
