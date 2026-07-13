"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { Award, TrendingUp, BookOpen, PlusCircle, ExternalLink, Star } from "lucide-react";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#3b82f6"];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const [skills, setSkills] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (user) {
      axiosSecure
        .get("/skills/my-skills")
        .then((res) => setSkills(res.data))
        .catch(() => {})
        .finally(() => setFetching(false));
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex-1 flex flex-col bg-[#090a0f] justify-center items-center h-screen">
        <div className="text-white animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  // Compute analytics from skills
  const categoryMap: Record<string, number> = {};
  const levelMap: Record<string, number> = {};
  skills.forEach((s) => {
    categoryMap[s.category] = (categoryMap[s.category] || 0) + 1;
    levelMap[s.level] = (levelMap[s.level] || 0) + 1;
  });

  const barData = Object.entries(categoryMap).map(([name, count]) => ({ name, count }));
  const pieData = Object.entries(levelMap).map(([name, value]) => ({ name, value }));

  const totalRevenuePotential = skills.reduce((sum, s) => sum + s.price, 0);
  const avgRating = skills.length > 0
    ? (skills.reduce((sum, s) => sum + (s.rating || 0), 0) / skills.length).toFixed(1)
    : "—";

  // Static platform chart data (categories distribution)
  const platformData = [
    { name: "Programming", count: 124 },
    { name: "Business", count: 93 },
    { name: "Design", count: 85 },
    { name: "Languages", count: 62 },
    { name: "Music", count: 48 },
    { name: "Fitness", count: 39 },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Welcome back, <span className="text-primary">{user.name}</span> 👋
            </h1>
            <p className="text-gray-400 mt-1 text-sm">{user.email}</p>
          </div>
          <Link
            href="/skills/add"
            className="self-start md:self-auto flex items-center space-x-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add New Listing</span>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Listings", value: skills.length, icon: BookOpen, color: "text-primary" },
            { label: "Avg. Rate ($/hr)", value: skills.length > 0 ? `$${Math.round(totalRevenuePotential / skills.length)}` : "—", icon: TrendingUp, color: "text-secondary" },
            { label: "Avg. Rating", value: avgRating, icon: Star, color: "text-yellow-400" },
            { label: "Total Earnings Potential", value: `$${totalRevenuePotential}/hr`, icon: Award, color: "text-primary" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-card-bg border border-white/5 rounded-2xl p-5 space-y-3">
                <div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{fetching ? "..." : stat.value}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Platform Category Distribution Bar Chart */}
          <div className="bg-card-bg border border-white/5 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="text-white font-bold text-lg">Platform — Skills by Category</h2>
              <p className="text-gray-400 text-xs mt-1">Total listings across all skill categories on SkillSwap</p>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={platformData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#131520",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#f3f4f6",
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* My Listings by Level Pie Chart */}
          <div className="bg-card-bg border border-white/5 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="text-white font-bold text-lg">My Listings — Level Distribution</h2>
              <p className="text-gray-400 text-xs mt-1">Breakdown of your skill listings by difficulty level</p>
            </div>

            {fetching || skills.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[260px] space-y-3">
                {fetching ? (
                  <div className="text-gray-400 text-sm animate-pulse">Loading your data...</div>
                ) : (
                  <>
                    <p className="text-gray-400 text-sm">No listings yet to display.</p>
                    <Link
                      href="/skills/add"
                      className="text-primary hover:underline text-sm font-semibold"
                    >
                      Create your first listing →
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={55}
                    dataKey="value"
                    label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#131520",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      color: "#f3f4f6",
                    }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: "#9ca3af", fontSize: "12px" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* My Recent Listings Table */}
        <div className="bg-card-bg border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-white font-bold text-lg">My Recent Listings</h2>
            <Link
              href="/skills/manage"
              className="text-primary hover:text-primary-hover text-sm font-semibold flex items-center space-x-1"
            >
              <span>Manage All</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {fetching ? (
            <div className="p-8 text-center text-gray-400 animate-pulse">Loading...</div>
          ) : skills.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <p className="text-gray-400">You haven't posted any listings yet.</p>
              <Link
                href="/skills/add"
                className="inline-block px-5 py-2 bg-primary text-white text-sm font-medium rounded-xl"
              >
                Create First Listing
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0e101a] text-xs text-gray-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-6">Listing</th>
                    <th className="py-3 px-6">Category</th>
                    <th className="py-3 px-6">Rate</th>
                    <th className="py-3 px-6">Level</th>
                    <th className="py-3 px-6">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {skills.slice(0, 5).map((skill) => (
                    <tr key={skill._id} className="hover:bg-white/[0.015] transition-colors">
                      <td className="py-3 px-6 flex items-center space-x-3">
                        <img
                          src={skill.imageUrl}
                          alt={skill.title}
                          className="h-8 w-12 object-cover rounded-lg bg-gray-800"
                        />
                        <Link
                          href={`/skills/${skill._id}`}
                          className="font-medium text-white hover:text-primary truncate max-w-[220px]"
                        >
                          {skill.title}
                        </Link>
                      </td>
                      <td className="py-3 px-6">
                        <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-xs rounded-full font-medium">
                          {skill.category}
                        </span>
                      </td>
                      <td className="py-3 px-6 font-semibold text-white">${skill.price}/hr</td>
                      <td className="py-3 px-6 text-gray-400">{skill.level}</td>
                      <td className="py-3 px-6 flex items-center space-x-1 text-yellow-400">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="font-semibold text-white">{skill.rating?.toFixed(1) || "—"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/skills/add"
            className="bg-card-bg hover:bg-white/5 border border-white/5 hover:border-primary/30 rounded-2xl p-5 flex items-center space-x-4 transition-all group"
          >
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <PlusCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm group-hover:text-primary transition-colors">Add New Listing</h3>
              <p className="text-gray-400 text-xs mt-0.5">Share your expertise</p>
            </div>
          </Link>

          <Link
            href="/skills/manage"
            className="bg-card-bg hover:bg-white/5 border border-white/5 hover:border-secondary/30 rounded-2xl p-5 flex items-center space-x-4 transition-all group"
          >
            <div className="h-10 w-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm group-hover:text-secondary transition-colors">Manage Listings</h3>
              <p className="text-gray-400 text-xs mt-0.5">Edit or delete your posts</p>
            </div>
          </Link>

          <Link
            href="/skills"
            className="bg-card-bg hover:bg-white/5 border border-white/5 hover:border-primary/30 rounded-2xl p-5 flex items-center space-x-4 transition-all group"
          >
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm group-hover:text-primary transition-colors">Explore Skills</h3>
              <p className="text-gray-400 text-xs mt-0.5">Browse all mentors</p>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
