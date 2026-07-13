"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! Your message has been received.");
      setName("");
      setEmail("");
      setMessage("");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">Get in Touch</h1>
          <p className="text-gray-400">Have questions about listings, corporate training, or partner integrations? Message us below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Details Col */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              We respond to all inquiries within 24 hours. Connect with our client relations or support team directly.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Headquarters</h4>
                  <p className="text-gray-400 text-sm mt-0.5">123 Knowledge Way, San Francisco, CA 94107</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Direct Phone</h4>
                  <p className="text-gray-400 text-sm mt-0.5">+1 (555) 234-5678</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Email Support</h4>
                  <p className="text-gray-400 text-sm mt-0.5">support@skillswap.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form Col */}
          <div className="bg-card-bg p-6 md:p-8 border border-white/5 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase">Your Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we help you..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-[#090a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="h-4.5 w-4.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
