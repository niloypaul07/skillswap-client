"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Menu, X, BookOpen, User, LogOut, PlusCircle, Settings, Award } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    `transition-colors duration-200 ${
      isActive(path) ? "text-primary font-semibold" : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 glass-nav w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl tracking-tight">
              <Award className="h-7 w-7 text-primary" />
              <span>
                Skill<span className="text-primary">Swap</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/skills" className={linkClass("/skills")}>
              Explore
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>
            <Link href="/contact" className={linkClass("/contact")}>
              Contact
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" className={linkClass("/dashboard")}>
                  Dashboard
                </Link>
                <Link href="/skills/add" className={linkClass("/skills/add")}>
                  Add Skill
                </Link>
                <Link href="/skills/manage" className={linkClass("/skills/manage")}>
                  Manage
                </Link>
              </>
            ) : null}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-200">
                  <User className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600/20 hover:bg-red-600/35 border border-red-500/20 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md shadow-primary/20 hover:shadow-primary/30"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            onClick={handleLinkClick}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/skills"
            onClick={handleLinkClick}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/skills") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            Explore
          </Link>
          <Link
            href="/about"
            onClick={handleLinkClick}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/about") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={handleLinkClick}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/contact") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            Contact
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={handleLinkClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/dashboard") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/skills/add"
                onClick={handleLinkClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/skills/add") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Add Skill
              </Link>
              <Link
                href="/skills/manage"
                onClick={handleLinkClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/skills/manage") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Manage
              </Link>

              <div className="pt-4 pb-2 border-t border-gray-700 mt-2">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <User className="h-8 w-8 rounded-full bg-gray-700 p-1 text-secondary" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400 mt-1">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2">
                  <button
                    onClick={() => {
                      handleLinkClick();
                      logout();
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-white bg-red-600/20 hover:bg-red-600/35 border border-red-500/20 transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="pt-4 pb-2 border-t border-gray-700 mt-2 px-3 flex flex-col space-y-2">
              <Link
                href="/login"
                onClick={handleLinkClick}
                className="w-full text-center py-2 rounded-md text-base font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={handleLinkClick}
                className="w-full text-center py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
              >
                Join Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
