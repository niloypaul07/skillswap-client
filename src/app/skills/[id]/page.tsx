"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import SkillCard from "../../../components/SkillCard";
import SkillSkeleton from "../../../components/SkillSkeleton";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { Star, MapPin, DollarSign, Clock, BookOpen, Layers, MessageSquare, Award, ArrowLeft, Send } from "lucide-react";

export default function SkillDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const skillId = params?.id as string;

  const [skill, setSkill] = useState<any>(null);
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);

  useEffect(() => {
    if (!skillId) return;

    async function fetchSkillDetails() {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/skills/${skillId}`);
        setSkill(res.data);

        // Fetch related skills in same category
        const relRes = await axios.get(`${API_BASE}/skills?category=${res.data.category}&limit=3`);
        // Filter out current skill
        const filtered = relRes.data.skills.filter((s: any) => s._id !== skillId);
        setRelatedSkills(filtered);
      } catch (err) {
        console.error("Error fetching skill details:", err);
        toast.error("Failed to load skill details.");
      } finally {
        setLoading(false);
      }
    }

    fetchSkillDetails();
  }, [skillId]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to request a booking!");
      router.push(`/login?redirect=/skills/${skillId}`);
      return;
    }

    setSubmittingBooking(true);
    setTimeout(() => {
      toast.success("Booking request sent! The mentor will email you soon.");
      setBookingModalOpen(false);
      setMessage("");
      setSubmittingBooking(false);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-[#090a0f]">
        <Navbar />
        <div className="max-w-7xl mx-auto w-full px-4 py-16 space-y-8">
          <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-[400px] bg-gray-800 rounded-2xl animate-pulse"></div>
            <div className="h-[400px] bg-gray-800 rounded-2xl animate-pulse"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="flex-1 flex flex-col bg-[#090a0f]">
        <Navbar />
        <div className="max-w-md mx-auto my-24 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Skill Not Found</h2>
          <p className="text-gray-400">The listing you are looking for does not exist or has been deleted.</p>
          <button onClick={() => router.push("/skills")} className="px-5 py-2.5 bg-primary text-white rounded-xl">
            Go to Explore
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate some realistic reviews since we don't have db collection for reviews
  const mockReviews = [
    { name: "Johnathan Doe", rating: 5, date: "July 2, 2026", text: "Amazing teacher! Explained extremely complex layout components in Figma. Highly recommended." },
    { name: "Emily Watson", rating: 4, date: "June 24, 2026", text: "Very friendly and knowledgeable. The structure of the class was perfect for my speed." },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm font-semibold focus:outline-none"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Browse</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Col */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/10 border border-primary/20 text-primary text-xs px-3 py-1 rounded-full font-semibold">
                  {skill.category}
                </span>
                <span className="bg-secondary/10 border border-secondary/20 text-secondary text-xs px-3 py-1 rounded-full font-semibold">
                  {skill.level}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {skill.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <span>By <span className="text-white font-medium">{skill.ownerName}</span></span>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold text-gray-200">{skill.rating.toFixed(1)}</span>
                  <span>({skill.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{skill.location}</span>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="h-96 w-full rounded-2xl overflow-hidden bg-gray-800 border border-white/5">
              <img src={skill.imageUrl} alt={skill.title} className="w-full h-full object-cover" />
            </div>

            {/* Description */}
            <div className="bg-card-bg p-8 rounded-2xl border border-white/5 space-y-4">
              <h2 className="text-xl font-bold text-white">Overview & Description</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {skill.description}
              </p>
            </div>

            {/* Key Specs */}
            <div className="bg-card-bg p-8 rounded-2xl border border-white/5 space-y-4">
              <h2 className="text-xl font-bold text-white">Specifications & Formats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-[#090a0f]/50 rounded-xl border border-white/5">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <span className="block text-xs text-gray-500">Duration</span>
                    <span className="text-sm font-semibold text-white">{skill.specs?.duration || "10 Hours"}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-[#090a0f]/50 rounded-xl border border-white/5">
                  <BookOpen className="h-5 w-5 text-secondary flex-shrink-0" />
                  <div>
                    <span className="block text-xs text-gray-500">Language</span>
                    <span className="text-sm font-semibold text-white">{skill.specs?.language || "English"}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-[#090a0f]/50 rounded-xl border border-white/5">
                  <Layers className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <span className="block text-xs text-gray-500">Format</span>
                    <span className="text-sm font-semibold text-white">{skill.specs?.format || "1-on-1 Interactive"}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-[#090a0f]/50 rounded-xl border border-white/5">
                  <Award className="h-5 w-5 text-secondary flex-shrink-0" />
                  <div>
                    <span className="block text-xs text-gray-500">Prerequisites</span>
                    <span className="text-sm font-semibold text-white truncate max-w-[200px] block">{skill.specs?.prerequisites || "None"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-card-bg p-8 rounded-2xl border border-white/5 space-y-6">
              <h2 className="text-xl font-bold text-white">Student Reviews</h2>
              <div className="space-y-4">
                {mockReviews.map((rev, idx) => (
                  <div key={idx} className="p-5 bg-[#090a0f]/40 border border-white/5 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                      <span className="text-xs text-gray-500">{rev.date}</span>
                    </div>
                    <div className="flex text-yellow-500 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Booking Sidebar */}
          <div>
            <div className="sticky top-24 bg-card-bg p-8 rounded-2xl border border-white/5 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Hourly Rate</span>
                <div className="flex items-center text-2xl font-bold text-white">
                  <DollarSign className="h-6 w-6 text-secondary" />
                  <span>{skill.price.toFixed(0)}</span>
                  <span className="text-xs text-gray-400 font-normal ml-1">/ hour</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Availability</span>
                  <span className="text-white font-medium">Weekday Evenings</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Response Time</span>
                  <span className="text-secondary font-medium">Under 2 hours</span>
                </div>
              </div>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20"
              >
                Book 1-on-1 Session
              </button>

              <div className="p-4 bg-[#090a0f]/50 border border-white/5 rounded-xl text-xs text-gray-400 text-center leading-relaxed">
                Security Gaurantee: Mentors only receive payment after the scheduled session is successfully conducted.
              </div>
            </div>
          </div>
        </div>

        {/* Related Skills Section */}
        {relatedSkills.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/5 space-y-8">
            <h2 className="text-2xl font-bold text-white">Related Mentors & Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedSkills.map((rel: any) => (
                <SkillCard key={rel._id} skill={rel} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-card-bg border border-white/8 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-lg font-bold text-white">Book Mentorship Session</h3>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="text-gray-400 hover:text-white font-semibold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-sm text-gray-300">
              You are requesting a session for <strong className="text-white">{skill.title}</strong> with <strong className="text-white">{skill.ownerName}</strong>.
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs text-gray-400 uppercase font-semibold">Introduce yourself & goals</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the mentor about your project, current skill level, and what goals you want to achieve during the session..."
                  className="w-full p-3.5 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingBooking}
                  className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center space-x-1.5"
                >
                  {submittingBooking ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
