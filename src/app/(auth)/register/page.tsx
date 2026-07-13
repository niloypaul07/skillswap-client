"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { Award, Mail, Lock, User, UserPlus, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    await register(name, email, password);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <Link href="/" className="inline-flex items-center space-x-2 text-white font-bold text-2xl tracking-tight">
          <Award className="h-8 w-8 text-primary" />
          <span>
            Skill<span className="text-primary">Swap</span>
          </span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-white">Create your account</h2>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card-bg py-8 px-4 border border-white/5 shadow-2xl rounded-2xl sm:px-10 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4.5 w-4.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4.5 w-4.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Password (Min 6 chars)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4.5 w-4.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm transition-colors"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4.5 w-4.5" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Registering...</span>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
