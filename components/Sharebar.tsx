"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  Link2,
  Check,
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
  Share2,
} from "lucide-react";

// Single source of truth for the domain. If you already export this from
// somewhere (e.g. a site-config file), import it from there instead so it
// never drifts from your metadata.alternates.canonical values.
const SITE_URL = "https://www.lizocalc.com";

interface ShareBarProps {
  /**
   * Page title used in share text/subject lines. Optional — falls back to
   * document.title (which Next already sets from your metadata export),
   * so most pages don't need to pass this either.
   */
  title?: string;
  /**
   * Absolute URL override. Leave unset and it's built automatically from
   * SITE_URL + the current route via usePathname(), so it always matches
   * whatever page it's rendered on — including query-free canonical paths.
   */
  url?: string;
  /** Optional short description, used by WhatsApp/email/native share. */
  description?: string;
  className?: string;
}

/**
 * Drop this near the H1 on any calculator or info page — no props needed:
 *
 *   <ShareBar />
 *
 * It reads the current route and page title automatically. On mobile
 * (native share supported) it collapses to a single "Share" button that
 * opens the OS share sheet. On desktop it shows the icon row.
 */
export default function ShareBar({
  title: titleProp,
  url: urlProp,
  description,
  className = "",
}: ShareBarProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [title, setTitle] = useState(titleProp ?? "");

  const url = urlProp ?? `${SITE_URL}${pathname}`;

  useEffect(() => {
    // navigator.share exists on some desktop browsers too (Chrome/Edge on
    // Windows, Safari on macOS), so feature-detection alone isn't enough
    // to tell "mobile" apart from "desktop with the API present." Gate it
    // on a coarse pointer (touch) as well, which desktop trackpads/mice
    // don't match, so this only fires on actual phones/tablets.
    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)").matches;

    setCanNativeShare(
      typeof navigator !== "undefined" &&
        typeof navigator.share === "function" &&
        !!isTouchDevice
    );
    // Only fall back to document.title when no title prop was passed —
    // this runs client-side after Next has already set the tab title from
    // the page's metadata export, so it matches without extra plumbing.
    if (!titleProp && typeof document !== "undefined") {
      setTitle(document.title.split("|")[0].trim());
    }
  }, [titleProp]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail on non-secure origins or older browsers —
      // fail silently rather than throwing in the user's face.
    }
  }, [url]);

  const handleNativeShare = useCallback(async () => {
    try {
      await navigator.share({ title, text: description, url });
    } catch {
      // User dismissed the share sheet — not an error worth surfacing.
    }
  }, [title, description, url]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(
    description ? `${title} — ${description}` : title
  );

  const links = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
    },
    {
      label: "Share on WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: MessageCircle,
    },
   
  ];

  return (
    <div
      className={`flex items-center gap-3 flex-wrap ${className}`}
      role="group"
      aria-label="Share this page"
    >
      <span className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
        Share
      </span>

      {/* Copy link — always shown, every platform benefits from it */}
      <button
        onClick={handleCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Copied!" : "Copy link"}
        className={`p-2.5 rounded-xl border transition-all ${
          copied
            ? "bg-green-500/10 border-green-500/20 text-green-500"
            : "bg-secondary border-transparent text-gray-300 hover:text-foreground"
        }`}
      >
        {copied ? <Check size={18} /> : <Link2 size={18} />}
      </button>

      {/* Platform icons — always shown, on every device. */}
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="p-2.5 rounded-xl bg-secondary border border-transparent text-gray-300 hover:text-foreground transition-all"
        >
          <Icon size={18} />
        </a>
      ))}

      {/* Extra: on touch devices, also offer the OS share sheet (covers
          Instagram, Telegram, SMS, etc. without listing each one). */}
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          aria-label="More share options"
          title="More share options"
          className="p-2.5 rounded-xl bg-secondary border border-transparent text-gray-300 hover:text-foreground transition-all"
        >
          <Share2 size={18} />
        </button>
      )}
    </div>
  );
}