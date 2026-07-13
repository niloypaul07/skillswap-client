"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { Award, Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

function LoginForm() {
  const { login, loading } = useAuth();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    await login(email, password, redirectTo);
  };

  const handleDemoFill = () => {
    setEmail("demo@skillswap.com");
    setPassword("demo1234");
    toast.success("Credentials loaded. Ready to login!");
  };

  return (
    <div className="bg-card-bg py-8 px-4 border border-white/5 shadow-2xl rounded-2xl sm:px-10 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
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
          <label className="block text-sm font-medium text-gray-300">Password</label>
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span>Signing In...</span>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-white/5"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase font-bold">Or Demo Access</span>
        <div className="flex-grow border-t border-white/5"></div>
      </div>

      {/* Demo Button */}
      <button
        onClick={handleDemoFill}
        type="button"
        className="w-full py-2.5 px-4 bg-secondary/15 hover:bg-secondary/25 border border-secondary/35 text-secondary text-sm font-semibold rounded-xl transition-all"
      >
        Autofill Demo Credentials
      </button>
    </div>
  );
}

export default function LoginPage() {
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
        <h2 className="text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
        <p className="text-center text-sm text-gray-400">
          Or{" "}
          <Link href="/register" className="font-semibold text-primary hover:text-primary-hover transition-colors">
            create a new account for free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={
          <div className="bg-card-bg py-8 px-4 border border-white/5 shadow-2xl rounded-2xl sm:px-10 text-center text-gray-400 animate-pulse">
            Loading login form...
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
