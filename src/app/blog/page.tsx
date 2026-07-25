"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { BLOG_POSTS } from "@/lib/blogData";
import { BookOpen, Search, Clock, ArrowRight, User } from "lucide-react";

export default function BlogListingPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Mortgages", "Credit", "Savings", "Debt", "Budgeting", "Retirement"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" /> Financial Wisdom & Articles
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          ValuePilot Financial Insights
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
          Expert guides on mortgage optimization, credit building, debt payoff strategies, and retirement planning.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto pt-4">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-7" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search financial guides & articles..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 shadow-sm focus:ring-2 focus:ring-[#6D5DF6] outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? "bg-[#6D5DF6] text-white shadow-purple"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <GlassCard key={post.slug} className="flex flex-col justify-between group hover:border-[#6D5DF6] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6]">
                  {post.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#6D5DF6] transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="w-7 h-7 rounded-full bg-[#6D5DF6] text-white flex items-center justify-center font-bold text-[10px]">
                  {post.author.avatar}
                </div>
                <span>{post.author.name}</span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-bold text-[#6D5DF6] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
