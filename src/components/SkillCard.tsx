"use client";

import React from "react";
import Link from "next/link";
import { Star, MapPin, DollarSign, ArrowRight } from "lucide-react";

interface SkillCardProps {
  skill: {
    _id: string;
    title: string;
    shortDescription: string;
    category: string;
    price: number;
    level: string;
    location: string;
    imageUrl: string;
    rating: number;
    reviewsCount: number;
    ownerName: string;
    createdAt?: string;
  };
}

export default function SkillCard({ skill }: SkillCardProps) {
  const formattedDate = skill.createdAt
    ? new Date(skill.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "Jul 12";

  return (
    <div className="flex flex-col h-[460px] bg-card-bg rounded-2xl border border-white/5 overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group">
      {/* Skill Image */}
      <div className="relative w-full overflow-hidden bg-gray-800" style={{ height: "192px" }}>
        <img
          src={skill.imageUrl}
          alt={skill.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
        <div className="absolute top-3 left-3 bg-[#090a0f]/80 backdrop-blur-md text-primary text-xs px-2.5 py-1 rounded-full font-semibold border border-primary/20">
          {skill.category}
        </div>
        <div className="absolute top-3 right-3 bg-[#090a0f]/80 backdrop-blur-md text-secondary text-xs px-2.5 py-1 rounded-full font-semibold border border-secondary/20">
          {skill.level}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 justify-between">
        <div className="space-y-2">
          {/* Rating and Instructor */}
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>By <strong className="text-gray-300 font-semibold">{skill.ownerName}</strong> &bull; {formattedDate}</span>
            <div className="flex items-center space-x-1 text-yellow-500">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="font-semibold text-gray-200">{skill.rating.toFixed(1)}</span>
              <span>({skill.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <div className="h-14 flex items-center">
            <h3 className="text-white font-semibold text-base md:text-lg line-clamp-2 group-hover:text-primary transition-colors leading-snug w-full">
              {skill.title}
            </h3>
          </div>

          {/* Short Description */}
          <div className="h-[60px] overflow-hidden">
            <p className="text-gray-400 text-xs md:text-sm line-clamp-3 leading-relaxed">
              {skill.shortDescription}
            </p>
          </div>
        </div>

        {/* Footer info and Button */}
        <div className="pt-4 border-t border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-300 text-sm">
              <MapPin className="h-4 w-4 text-primary mr-1" />
              <span>{skill.location}</span>
            </div>
            <div className="flex items-center text-white font-bold text-lg">
              <DollarSign className="h-4.5 w-4.5 text-secondary" />
              <span>{skill.price.toFixed(0)}</span>
              <span className="text-xs text-gray-400 font-normal ml-0.5">/hr</span>
            </div>
          </div>

          <Link
            href={`/skills/${skill._id}`}
            className="w-full flex items-center justify-center space-x-2 py-2.5 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white text-sm font-medium rounded-xl transition-all duration-300"
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
