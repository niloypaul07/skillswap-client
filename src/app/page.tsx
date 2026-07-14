"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SkillCard from "../components/SkillCard";
import SkillSkeleton from "../components/SkillSkeleton";
import axios from "axios";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Code,
  Music,
  Book,
  Heart,
  TrendingUp,
  Compass,
  CheckCircle,
  Users,
  Search,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";

export default function Home() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const heroSlides = [
    {
      title: "Mastering Next.js & TypeScript",
      category: "Programming",
      mentor: "Sarah Jenkins",
      rate: "$45/hr",
      rating: "4.9",
      reviews: 24,
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "Figma Advanced Design Systems",
      category: "Design",
      mentor: "Jessica Miller",
      rate: "$40/hr",
      rating: "4.8",
      reviews: 19,
      img: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "Conversational Spanish Level-Up",
      category: "Languages",
      mentor: "Carlos Ruiz",
      rate: "$25/hr",
      rating: "5.0",
      reviews: 31,
      img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=60",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchFeaturedSkills() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/skills?limit=4`);
        setSkills(res.data.skills);
      } catch (err) {
        console.error("Error fetching featured skills:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedSkills();
  }, []);

  const categories = [
    { name: "Programming", icon: Code, count: 124, color: "text-blue-500 bg-blue-500/10" },
    { name: "Design", icon: Compass, count: 85, color: "text-purple-500 bg-purple-500/10" },
    { name: "Languages", icon: Globe, count: 62, color: "text-emerald-500 bg-emerald-500/10" },
    { name: "Music", icon: Music, count: 48, color: "text-pink-500 bg-pink-500/10" },
    { name: "Business", icon: TrendingUp, count: 93, color: "text-amber-500 bg-amber-500/10" },
    { name: "Fitness", icon: Heart, count: 39, color: "text-red-500 bg-red-500/10" },
  ];

  const steps = [
    { title: "Find a Mentor", desc: "Browse verified mentors based on skill level, category, and price range.", icon: Search },
    { title: "Book a Session", desc: "Select a timing that fits your schedule and connect via video conferencing.", icon: MessageSquare },
    { title: "Level Up", desc: "Collaborate 1-on-1, receive personalized homework, and boost your skills.", icon: Sparkles },
  ];

  const testimonials = [
    { name: "Alex Johnson", role: "Junior Developer", comment: "The Next.js mentorship with Sarah Jenkins helped me land my first React developer job! The 1-on-1 coding sessions were invaluable.", rating: 5 },
    { name: "Nadia Petrov", role: "Marketing Lead", comment: "Carlos' Spanish classes are fantastic. Highly structured, conversational, and fun. I went from nervous to fluent in 3 months.", rating: 5 },
    { name: "Marcus Thorne", role: "Self-taught Artist", comment: "Jessica's Figma design system course saved me weeks of struggle. She explained component architectures so clearly.", rating: 5 },
  ];

  const faqs = [
    { q: "How do 1-on-1 sessions work on SkillSwap?", a: "Once you browse and choose a mentor, you can send a booking request. The mentor will coordinate with you via email to schedule a video call (Zoom/Google Meet) where the tutoring session will happen." },
    { q: "Are all mentors on the platform verified?", a: "Yes! Every tutor must complete a registration and submit credentials before posting any skill listings. We review listings to maintain high-quality mentorship." },
    { q: "What is the cancellation policy?", a: "You can cancel or reschedule any session up to 24 hours before it starts directly by communicating with your mentor." },
    { q: "Can I also list a skill and become a mentor?", a: "Absolutely! Create a free account, go to 'Add Skill', list your expertise, set your price, and you can start accepting students immediately." },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />

      {/* Hero Section — capped at 60–70vh, scales across breakpoints */}
      <section className="relative h-[clamp(20rem,65vh,70vh)] flex items-center justify-center overflow-hidden px-4 sm:px-6 border-b border-white/5 bg-radial from-[#1e1a38] via-[#090a0f] to-[#090a0f]">
        <div className="max-w-7xl mx-auto w-full h-full max-h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center z-10 py-6 md:py-8">
          
          {/* Left Column: CTAs and content */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-3 sm:gap-4 md:gap-5 text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
              <Sparkles className="h-3 w-3 shrink-0" />
              <span>Empowering Collaborative Learning</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem] font-bold tracking-tight text-white leading-[1.15]">
              Learn Anything, 1-on-1, from{" "}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Expert Mentors
              </span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
              SkillSwap matches you with passionate tutors and developers for structured live sessions, customized learning plans, and direct code reviews.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/skills"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <span>Explore Skills</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-center text-sm sm:text-base"
              >
                Learn How it Works
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Slider — desktop only so mobile stays within 60–70vh */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center min-h-0">
            <div className="w-full max-w-sm bg-card-bg border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative transition-all duration-500 hover:border-primary/20">
              {/* Slide image */}
              <div className="h-40 xl:h-44 w-full relative">
                <img
                  src={heroSlides[activeSlide].img}
                  alt={heroSlides[activeSlide].title}
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                />
                <span className="absolute top-3 left-3 bg-primary/95 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                  {heroSlides[activeSlide].category}
                </span>
                <span className="absolute bottom-3 right-3 bg-[#090a0f]/80 backdrop-blur-md text-secondary text-xs px-2.5 py-1 rounded-full font-semibold border border-white/5">
                  {heroSlides[activeSlide].rate}
                </span>
              </div>

              {/* Slide Content */}
              <div className="p-4 lg:p-5 space-y-2 lg:space-y-3">
                <span className="text-xs text-gray-500 font-medium">Top Tutor: {heroSlides[activeSlide].mentor}</span>
                <h3 className="text-white font-bold text-sm lg:text-lg line-clamp-1">
                  {heroSlides[activeSlide].title}
                </h3>
                <div className="flex justify-between items-center text-xs text-gray-400 gap-2">
                  <span className="flex items-center text-yellow-500 shrink-0">★ {heroSlides[activeSlide].rating} ({heroSlides[activeSlide].reviews} reviews)</span>
                  <Link href="/skills" className="text-primary hover:underline font-medium inline-flex items-center">
                    <span>View details</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Slider Dots Indicator */}
            <div className="flex space-x-2 mt-3 lg:mt-4">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "w-6 bg-primary" : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Floating circles/effects for premium aesthetic */}
        <div className="absolute top-1/4 left-[10%] w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-[10%] w-56 sm:w-80 h-56 sm:h-80 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </section>

      {/* Section 1: Features */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">Why Choose SkillSwap?</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A premium network designed to give you direct access to expert developers and instructors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card-bg p-8 rounded-2xl border border-white/5 space-y-4 hover:border-primary/25 transition-all">
            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-white font-bold text-xl">Verified Tutors</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We carefully check the background and skills of every mentor to guarantee top-tier learning experiences.
            </p>
          </div>

          <div className="bg-card-bg p-8 rounded-2xl border border-white/5 space-y-4 hover:border-primary/25 transition-all">
            <div className="h-12 w-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-white font-bold text-xl">1-on-1 Attention</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              No generic courses. Every minute is customized to your current project, coding blocker, or learning goal.
            </p>
          </div>

          <div className="bg-card-bg p-8 rounded-2xl border border-white/5 space-y-4 hover:border-primary/25 transition-all">
            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-white font-bold text-xl">Flexible Scheduling</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Book sessions hourly that fit your schedule. Learn at your own pace without long-term contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Categories */}
      <section className="py-20 px-4 bg-[#0b0c14] border-y border-white/5">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Popular Categories</h2>
              <p className="text-gray-400 mt-2">Discover lessons and code reviewers in popular skills.</p>
            </div>
            <Link href="/skills" className="text-primary hover:underline text-sm font-semibold flex items-center space-x-1">
              <span>View all categories</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  href={`/skills?category=${cat.name}`}
                  className="bg-card-bg p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all text-center flex flex-col items-center justify-center space-y-4 group"
                >
                  <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 transition-transform`}>
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">{cat.count} listings</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: How it Works */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">How It Works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Get connected and learn in three simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 -z-10"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-card-bg border-2 border-primary flex items-center justify-center text-white relative shadow-lg shadow-primary/10">
                  <Icon className="h-7 w-7 text-secondary" />
                  <span className="absolute -top-1 -right-1 h-6 w-6 bg-primary rounded-full text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl">{step.title}</h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 4: Statistics & Charts */}
      <section className="py-20 px-4 bg-[#0b0c14] border-y border-white/5">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">Platform Growth & Impact</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Real numbers behind our growing community of mentors and learners.</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Completed Sessions", value: "10K+", color: "text-white" },
              { label: "Verified Mentors", value: "500+", color: "text-primary" },
              { label: "Positive Rating", value: "98.4%", color: "text-secondary" },
              { label: "Skill Categories", value: "45+", color: "text-white" },
            ].map((stat, i) => (
              <div key={i} className="bg-card-bg border border-white/5 rounded-2xl p-6 text-center space-y-1">
                <h3 className={`text-4xl font-black ${stat.color}`}>{stat.value}</h3>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Monthly Sessions Area Chart */}
            <div className="bg-card-bg border border-white/5 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-white font-bold text-base">Monthly Sessions Completed</h3>
                <p className="text-gray-400 text-xs mt-0.5">Growth over the last 6 months</p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  data={[
                    { month: "Feb", sessions: 420 },
                    { month: "Mar", sessions: 680 },
                    { month: "Apr", sessions: 950 },
                    { month: "May", sessions: 1120 },
                    { month: "Jun", sessions: 1540 },
                    { month: "Jul", sessions: 1890 },
                  ]}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#131520",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      color: "#f3f4f6",
                    }}
                    cursor={{ stroke: "rgba(99,102,241,0.3)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#sessionsGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution Bar Chart */}
            <div className="bg-card-bg border border-white/5 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-white font-bold text-base">Top Skill Categories</h3>
                <p className="text-gray-400 text-xs mt-0.5">Number of active listings per category</p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={[
                    { name: "Programming", count: 124 },
                    { name: "Business", count: 93 },
                    { name: "Design", count: 85 },
                    { name: "Languages", count: 62 },
                    { name: "Music", count: 48 },
                    { name: "Fitness", count: 39 },
                  ]}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#131520",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      color: "#f3f4f6",
                    }}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Core Listing Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Featured Tutoring Services</h2>
            <p className="text-gray-400 mt-2">Work with premium specialists in high-demand technical and creative fields.</p>
          </div>
          <Link href="/skills" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold text-white transition-all flex items-center space-x-1">
            <span>Explore All Listings</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkillSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill: any) => (
              <SkillCard key={skill._id} skill={skill} />
            ))}
          </div>
        )}
      </section>

      {/* Section 6: Testimonials */}
      <section className="py-20 px-4 bg-[#0b0c14] border-y border-white/5">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight">Student Success Stories</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Read how people upgraded their career skills and projects using SkillSwap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-card-bg p-8 rounded-2xl border border-white/5 flex flex-col justify-between h-64">
                <p className="text-gray-300 italic text-sm leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-sm">{t.name}</h4>
                    <p className="text-primary text-xs mt-0.5">{t.role}</p>
                  </div>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="py-20 px-4 max-w-3xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-400">Got questions about scheduling, pricing, or tutoring? We have answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-card-bg rounded-xl border border-white/5 overflow-hidden transition-colors">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-white font-semibold hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-gray-400 text-sm leading-relaxed border-t border-white/5 bg-[#0e101a]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 8: Newsletter / Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#090a0f] to-[#0b0c14] border-t border-white/5 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">Ready to Level Up Your Skills?</h2>
          <p className="text-gray-400 text-sm">
            Join our weekly newsletter to receive curated programming tutorials, design tips, and 10% off your first session.
          </p>

          {subscribed ? (
            <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-xl text-secondary text-sm font-semibold">
              Thank you for subscribing! Check your inbox for your 10% discount code.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (emailInput.trim()) setSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#131520] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
