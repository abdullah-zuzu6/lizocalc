"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthorBioProps {
  name?: string;
  avatarSrc?: string;
  bio?: string;
  fullBioHref?: string;
}

// Small placeholder "profile" icon, shown before the byline —
// swap for a real headshot any time by passing avatarSrc + using
// the <Image> version instead, this is just the neutral badge icon.
function ProfileIcon() {
  return (
    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-700 text-gray-300 shrink-0">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-4 h-4"
      >
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function AuthorBio({
  name = "RMA",
  avatarSrc = "/about/authorpic-rma.webp",
  bio = "Rana Muhammad Abdullah Is the creator of LizoCalc and  has 3+ years of experience in web development and building research and free calculator tool sites. He studies Mechatronics and Control Engineering at UET.",
  fullBioHref = "https://www.linkedin.com/in/abdullahsajjad06/",
}: AuthorBioProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = () => {
    cancelClose();
    setOpen(true);
  };

  // Small delay before closing so moving the cursor across the gap
  // between the trigger and the card (to click "Full bio") doesn't
  // close it first.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

  // Close on outside click / tap (covers touch devices)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => () => cancelClose(), []);

  return (
    <div
      ref={wrapRef}
      className="relative inline-flex items-center gap-2 text-sm"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <ProfileIcon />
      <span className="text-gray-400">By</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-blue-300 underline underline-offset-2 hover:text-blue-200 font-medium transition-colors"
        aria-expanded={open}
      >
        {name}
      </button>

      <div
        className={`absolute left-0 top-full mt-3 w-[280px] sm:w-[320px] bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-5 z-50 origin-top-left transition-all duration-150 ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        onMouseEnter={openNow}
        onMouseLeave={scheduleClose}
      >
        <div className="flex gap-4">
          <Image
            src={avatarSrc}
            alt={name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover border border-gray-700 shrink-0"
          />
          <p className="text-gray-200 text-sm leading-relaxed">{bio}</p>
        </div>

        <Link
          href={fullBioHref}
          target="black"
          className="mt-4 inline-flex items-center gap-1 text-blue-300 hover:text-blue-200 hover:gap-1.5 text-sm font-medium transition-all"
        >
          Full bio
          <span aria-hidden="true">›</span>
        </Link>
      </div>
    </div>
  );
}