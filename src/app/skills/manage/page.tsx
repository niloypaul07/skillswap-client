"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";
import toast from "react-hot-toast";
import { Trash2, ExternalLink, RefreshCw, Eye, PlusCircle, Edit } from "lucide-react";

export default function ManageSkillsPage() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const [skills, setSkills] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMySkills = async () => {
    setFetching(true);
    try {
      const res = await axiosSecure.get("/skills/my-skills");
      setSkills(res.data);
    } catch (err: any) {
      console.error("Error fetching my skills:", err);
      toast.error("Failed to load your listings.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to manage your listings.");
      router.push("/login");
      return;
    }

    if (user) {
      fetchMySkills();
    }
  }, [user, loading, router]);

  const confirmDelete = (id: string) => {
    setSkillToDelete(id);
  };

  const handleDelete = async () => {
    if (!skillToDelete) return;

    setIsDeleting(true);
    try {
      await axiosSecure.delete(`/skills/${skillToDelete}`);
      toast.success("Listing deleted successfully!");
      setSkills(skills.filter((s) => s._id !== skillToDelete));
      setSkillToDelete(null);
    } catch (err: any) {
      toast.error("Failed to delete listing.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex-1 flex flex-col bg-[#090a0f] justify-center items-center h-screen">
        <div className="text-white text-lg font-medium animate-pulse">Verifying authentication...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#090a0f]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Manage Your Skill Listings</h1>
            <p className="text-gray-400">View, monitor, or delete your published tutoring services.</p>
          </div>
          <Link
            href="/skills/add"
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all flex items-center space-x-2 shadow-md shadow-primary/20"
          >
            <PlusCircle className="h-4.5 w-4.5" />
            <span>Create New Listing</span>
          </Link>
        </div>

        {fetching ? (
          <div className="bg-card-bg border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="h-8 w-8 text-primary animate-spin" />
            <p className="text-gray-400">Loading your listings...</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="bg-card-bg border border-white/5 rounded-2xl p-16 text-center space-y-4">
            <p className="text-gray-400 font-medium">You haven't posted any skill listings yet.</p>
            <Link
              href="/skills/add"
              className="inline-block px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-all"
            >
              Post Your First Listing
            </Link>
          </div>
        ) : (
          <div className="bg-card-bg border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-[#0e101a] text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Listing</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Level</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                  {skills.map((skill) => (
                    <tr key={skill._id} className="hover:bg-white/1.5 transition-colors">
                      <td className="py-4 px-6 flex items-center space-x-3">
                        <img
                          src={skill.imageUrl}
                          alt={skill.title}
                          className="h-10 w-16 object-cover rounded-lg bg-gray-800"
                        />
                        <span className="font-semibold text-white truncate max-w-[280px]">{skill.title}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-xs rounded-full font-medium">
                          {skill.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-white">${skill.price}/hr</td>
                      <td className="py-4 px-6 text-gray-400">{skill.level}</td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Link
                          href={`/skills/${skill._id}`}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/5 transition-all"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View</span>
                        </Link>
                        <Link
                          href={`/skills/edit/${skill._id}`}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold border border-primary/10 transition-all"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={() => confirmDelete(skill._id)}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-500 text-xs font-semibold border border-red-500/10 transition-all"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden divide-y divide-white/5">
              {skills.map((skill) => (
                <div key={skill._id} className="p-5 space-y-4">
                  <div className="flex items-start space-x-3.5">
                    <img
                      src={skill.imageUrl}
                      alt={skill.title}
                      className="h-12 w-20 object-cover rounded-xl bg-gray-800 border border-white/5"
                    />
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-sm line-clamp-1">{skill.title}</h4>
                      <p className="text-gray-400 text-xs">{skill.category} &bull; {skill.level}</p>
                      <span className="inline-block text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">${skill.price}/hr</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
                    <Link
                      href={`/skills/${skill._id}`}
                      className="inline-flex items-center justify-center space-x-1 py-2 px-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/5 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View</span>
                    </Link>
                    <Link
                      href={`/skills/edit/${skill._id}`}
                      className="inline-flex items-center justify-center space-x-1 py-2 px-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold border border-primary/10 transition-colors"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => confirmDelete(skill._id)}
                      className="inline-flex items-center justify-center space-x-1 py-2 px-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold border border-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Custom Delete Confirmation Modal */}
      {skillToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-card-bg border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Delete Listing?</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  Are you sure you want to delete this listing? This action cannot be undone and it will be permanently removed from the platform.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSkillToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all border border-white/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-red-500/20 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isDeleting ? (
                  <span>Deleting...</span>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    <span>Yes, Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
