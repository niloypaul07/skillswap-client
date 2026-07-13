"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import toast from "react-hot-toast";
import { Image, DollarSign } from "lucide-react";
import axios from "axios";

export default function EditSkillPage() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const params = useParams();
  const skillId = params?.id as string;

  // Form states
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Programming");
  const [price, setPrice] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [location, setLocation] = useState("Online");
  const [imageUrl, setImageUrl] = useState("");

  // Spec states
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [prerequisites, setPrerequisites] = useState("");

  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to edit a skill listing.");
      router.push("/login");
      return;
    }

    if (user && skillId) {
      const fetchSkill = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/skills/${skillId}`);
          const skill = res.data;
          
          if (skill.ownerId !== user.id) {
            toast.error("You are not authorized to edit this listing.");
            router.push("/skills/manage");
            return;
          }

          setTitle(skill.title || "");
          setShortDescription(skill.shortDescription || "");
          setDescription(skill.description || "");
          setCategory(skill.category || "Programming");
          setPrice(skill.price?.toString() || "");
          setLevel(skill.level || "Beginner");
          setLocation(skill.location || "Online");
          setImageUrl(skill.imageUrl || "");
          
          if (skill.specs) {
            setDuration(skill.specs.duration || "");
            setLanguage(skill.specs.language || "");
            setPrerequisites(skill.specs.prerequisites || "");
          }
        } catch (err) {
          console.error("Error fetching skill:", err);
          toast.error("Failed to load skill data.");
          router.push("/skills/manage");
        } finally {
          setFetching(false);
        }
      };
      fetchSkill();
    }
  }, [user, loading, router, skillId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !shortDescription || !description || !price) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title,
        shortDescription,
        description,
        category,
        price: parseFloat(price),
        level,
        location,
        imageUrl: imageUrl || undefined,
        specs: {
          duration: duration || "10 Hours",
          language: language || "English",
          format: location === "Online" ? "Online Video Call" : "In-Person Class",
          prerequisites: prerequisites || "None"
        }
      };

      await axiosSecure.put(`/skills/${skillId}`, payload);
      toast.success("Skill listing updated successfully!");
      router.push("/skills/manage");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to update skill listing.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user || fetching) {
    return (
      <div className="flex-1 flex flex-col bg-[#090a0f] justify-center items-center h-screen">
        <div className="text-white text-lg font-medium animate-pulse">Loading listing data...</div>
      </div>
    );
  }

  const categories = ["Programming", "Design", "Languages", "Music", "Business", "Fitness", "Cooking"];

  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-2 mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-white tracking-tight">Edit Skill Listing</h1>
          <p className="text-gray-400">Update the details of your tutoring service.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card-bg border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300">Listing Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Master Full Stack Next.js & Node"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300">Short Description * (Displayed on Card)</label>
            <input
              type="text"
              required
              maxLength={150}
              placeholder="e.g. Learn React, Next.js, and Express from a Senior Developer with 1-on-1 calls."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300">Full Description * (Detailed Overview)</label>
            <textarea
              required
              rows={6}
              placeholder="Provide a comprehensive breakdown of what you will teach, what subjects are covered, and your credentials..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Flex inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">Skill Level *</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">Location Type *</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hourly Rate */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">Hourly Rate * (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 h-4.5 w-4.5" />
                <input
                  type="number"
                  required
                  min={1}
                  placeholder="e.g. 35"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">Cover Image URL</label>
              <div className="relative">
                <Image className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 h-4.5 w-4.5" />
                <input
                  type="url"
                  placeholder="e.g. https://images.unsplash.com/... (optional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 space-y-4">
            <h3 className="text-white font-bold text-lg">Additional Specifications</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Duration */}
              <div className="space-y-2">
                <label className="block text-xs text-gray-400 font-semibold uppercase">Total Program Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 12 Hours"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              {/* Language */}
              <div className="space-y-2">
                <label className="block text-xs text-gray-400 font-semibold uppercase">Teaching Language</label>
                <input
                  type="text"
                  placeholder="e.g. English / Spanish"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              {/* Prerequisites */}
              <div className="space-y-2">
                <label className="block text-xs text-gray-400 font-semibold uppercase">Prerequisites</label>
                <input
                  type="text"
                  placeholder="e.g. Basic Javascript"
                  value={prerequisites}
                  onChange={(e) => setPrerequisites(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center space-x-2"
          >
            {submitting ? <span>Updating Listing...</span> : <span>Update Skill Listing</span>}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
