"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SkillCard from "../../components/SkillCard";
import SkillSkeleton from "../../components/SkillSkeleton";
import axios from "axios";
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State — initialized from URL params
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [level, setLevel] = useState(searchParams.get("level") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const categories = ["Programming", "Design", "Languages", "Music", "Business", "Fitness", "Cooking"];
  const levels = ["Beginner", "Intermediate", "Expert"];
  const locations = ["Online", "In-Person"];

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (level) params.append("level", level);
      if (location) params.append("location", location);
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);
      params.append("page", page.toString());
      params.append("limit", "8");

      const res = await axios.get(`http://localhost:5000/api/skills?${params.toString()}`);
      setSkills(res.data.skills);
      setTotalPages(res.data.pagination.pages);
      setTotalCount(res.data.pagination.total);
    } catch (err) {
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [search, category, level, location, sortBy, order, page]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "price_asc") { setSortBy("price"); setOrder("asc"); }
    else if (val === "price_desc") { setSortBy("price"); setOrder("desc"); }
    else if (val === "rating_desc") { setSortBy("rating"); setOrder("desc"); }
    else { setSortBy("createdAt"); setOrder("desc"); }
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch(""); setCategory(""); setLevel(""); setLocation("");
    setSortBy("createdAt"); setOrder("desc"); setPage(1);
  };

  const activeFiltersCount = [category, level, location, search].filter(Boolean).length;

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Explore Mentors & Skills</h1>
        <p className="text-gray-400">Discover and book 1-on-1 personalized tutoring from top-rated professionals.</p>
      </div>

      {/* Search & Sort Panel */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-[#131520] p-4 rounded-2xl border border-white/5">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Search skills, topics, or keywords..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-11 pr-4 py-3 bg-[#090a0f] border border-white/10 hover:border-white/20 focus:border-primary rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none transition-colors"
          />
        </div>
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="text-gray-400 h-5 w-5 flex-shrink-0" />
          <select
            onChange={handleSortChange}
            className="bg-[#090a0f] border border-white/10 hover:border-white/20 focus:border-primary rounded-xl text-white text-sm py-3 px-4 focus:outline-none transition-colors"
          >
            <option value="latest">Latest Listings</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <h2 className="text-white font-bold flex items-center space-x-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </h2>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-gray-400 hover:text-white text-xs font-semibold flex items-center space-x-1"
              >
                <X className="h-3 w-3" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-300">Category</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(category === cat ? "" : cat); setPage(1); }}
                  className={`px-4 py-2 lg:py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                    category === cat
                      ? "bg-primary border-primary text-white"
                      : "bg-card-bg border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <h3 className="text-sm font-semibold text-gray-300">Skill Level</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => { setLevel(level === lvl ? "" : lvl); setPage(1); }}
                  className={`px-4 py-2 lg:py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                    level === lvl
                      ? "bg-secondary border-secondary text-white"
                      : "bg-card-bg border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <h3 className="text-sm font-semibold text-gray-300">Location Type</h3>
            <div className="flex lg:flex-col gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { setLocation(location === loc ? "" : loc); setPage(1); }}
                  className={`flex-1 lg:flex-initial px-4 py-2 lg:py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                    location === loc
                      ? "bg-primary border-primary text-white"
                      : "bg-card-bg border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Found <span className="text-white font-semibold">{totalCount}</span> mentor{totalCount !== 1 ? "s" : ""} available
            </p>
            {activeFiltersCount > 0 && (
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                {category && <span className="px-2 py-1 bg-primary/10 border border-primary/20 text-primary rounded-lg">{category}</span>}
                {level && <span className="px-2 py-1 bg-secondary/10 border border-secondary/20 text-secondary rounded-lg">{level}</span>}
                {location && <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-lg">{location}</span>}
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkillSkeleton key={i} />
              ))}
            </div>
          ) : skills.length === 0 ? (
            <div className="bg-[#131520] border border-white/5 rounded-2xl py-16 px-4 text-center">
              <p className="text-gray-400 font-medium">No mentors match your selected filters.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill: any) => (
                  <SkillCard key={skill._id} skill={skill} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 pt-8 border-t border-white/5">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="p-2.5 rounded-xl bg-card-bg border border-white/5 text-gray-400 hover:text-white hover:border-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pNum = idx + 1;
                    return (
                      <button
                        key={pNum}
                        onClick={() => setPage(pNum)}
                        className={`h-10 w-10 rounded-xl text-sm font-semibold border transition-all ${
                          page === pNum
                            ? "bg-primary border-primary text-white"
                            : "bg-card-bg border-white/5 text-gray-400 hover:text-white hover:border-white/15"
                        }`}
                      >
                        {pNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="p-2.5 rounded-xl bg-card-bg border border-white/5 text-gray-400 hover:text-white hover:border-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ExplorePage() {
  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />
      <Suspense fallback={
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkillSkeleton key={i} />)}
          </div>
        </main>
      }>
        <ExploreContent />
      </Suspense>
      <Footer />
    </div>
  );
}
