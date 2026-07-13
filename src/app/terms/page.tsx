"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        <p className="text-gray-400 text-sm">Last updated: July 13, 2026</p>
        <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
          <p>
            Welcome to SkillSwap! These terms and conditions outline the rules and regulations for the use of SkillSwap's Website.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use SkillSwap if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <h2 className="text-xl font-semibold text-white pt-4">User Accounts</h2>
          <p>
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
