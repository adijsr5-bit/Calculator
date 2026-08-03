import React from "react";
import { BLOG_POSTS } from "@/lib/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { generateArticleSchema } from "@/lib/utils";
import { Metadata } from "next";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Article Not Found | ValuePilot",
    };
  }

  return {
    title: `${post.title} | ValuePilot`,
    description: post.description,
    keywords: [post.category, post.title.toLowerCase(), "financial guide", "ValuePilot blog"],
    alternates: {
      canonical: `https://valuepilot.vercel.app/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://valuepilot.vercel.app/blog/${post.slug}`,
      siteName: "ValuePilot",
      type: "article",
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(
    post.title,
    post.description,
    `https://valuepilot.vercel.app/blog/${post.slug}`,
    "2026-07-25",
    post.author.name
  );

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#6D5DF6] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Articles
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D5DF6]">
            {post.category}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
          <span className="text-slate-400">• Published {post.publishedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          {post.description}
        </p>

        {/* Author Header */}
        <div className="flex items-center gap-3 py-4 border-y border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-full bg-[#6D5DF6] text-white flex items-center justify-center font-bold text-sm">
            {post.author.avatar}
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">{post.author.name}</div>
            <div className="text-xs text-slate-400">{post.author.role}</div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article
        className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Recommended Calculators */}
      <GlassCard className="p-6 space-y-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-slate-900 dark:to-indigo-950/20">
        <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#6D5DF6]" /> Put This Guide Into Action
        </h3>
        <p className="text-xs text-slate-500">Calculate your personal numbers instantly using ValuePilot tools:</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/calculators/mortgage" className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-[#6D5DF6] shadow-sm hover:underline">
            Mortgage Calculator
          </Link>
          <Link href="/calculators/debt-payoff" className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-[#6D5DF6] shadow-sm hover:underline">
            Debt Payoff Planner
          </Link>
          <Link href="/calculators/budget" className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-[#6D5DF6] shadow-sm hover:underline">
            50/30/20 Budget Planner
          </Link>
          <Link href="/calculators/retirement" className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-[#6D5DF6] shadow-sm hover:underline">
            Retirement Growth
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
