"use client";

import React from "react";

export default function SkillSkeleton() {
  return (
    <div className="flex flex-col h-[460px] bg-card-bg rounded-2xl border border-white/5 overflow-hidden">
      {/* Skeleton Image */}
      <div className="h-48 w-full animate-shimmer"></div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 justify-between space-y-4">
        <div className="space-y-3">
          {/* Header row */}
          <div className="flex justify-between items-center">
            <div className="h-3 w-20 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-3 w-12 bg-gray-800 rounded animate-pulse"></div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-5 w-full bg-gray-800 rounded animate-pulse"></div>
            <div className="h-5 w-2/3 bg-gray-800 rounded animate-pulse"></div>
          </div>

          {/* Desc */}
          <div className="space-y-1.5 pt-2">
            <div className="h-3 w-full bg-gray-800 rounded animate-pulse"></div>
            <div className="h-3 w-full bg-gray-800 rounded animate-pulse"></div>
            <div className="h-3 w-4/5 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Footer info & button */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center">
            <div className="h-4 w-16 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-5 w-14 bg-gray-800 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-full bg-gray-800 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
