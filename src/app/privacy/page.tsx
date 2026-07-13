"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="text-gray-400 text-sm">Last updated: July 13, 2026</p>
        <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
          <p>
            At SkillSwap, accessible from skillswap.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SkillSwap and how we use it.
          </p>
          <h2 className="text-xl font-semibold text-white pt-4">Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>
          <h2 className="text-xl font-semibold text-white pt-4">How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-4 text-gray-400">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
