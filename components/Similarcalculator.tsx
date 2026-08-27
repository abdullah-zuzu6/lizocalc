import Link from "next/link";
import { LucideIcon, Calculator } from "lucide-react";

export interface SimilarCalculatorLink {
  label: string;
  href: string;
}

export interface SimilarCalculatorsProps {
  /** Heading shown at the top of the card, e.g. "Similar Time Calculators" */
  title: string;
  /** List of links to show. Keep it short (5-6) — use seeAllHref for the rest */
  links: SimilarCalculatorLink[];
  /** Href for the "See All" button at the bottom. Omit to hide the button */
  seeAllHref?: string;
  /** Label for the see-all button. Defaults to "See All" */
  seeAllLabel?: string;
  /** Optional icon shown next to the title. Defaults to a calculator icon */
  icon?: LucideIcon;
  /** Optional className to override outer spacing/width from the parent page */
  className?: string;
}

/**
 * Card of related calculator links, meant to sit at the bottom of a
 * calculator page. Fully controlled by props — pass a different title
 * and links array on every page that uses it.
 *
 * Usage:
 * <SimilarCalculators
 *   title="Similar Time Calculators"
 *   links={[
 *     { label: "Hours Calculator", href: "/calculators/time/hours-calculator" },
 *     { label: "Days Between Dates Calculator", href: "/calculators/time/days-between-dates-calculator" },
 *   ]}
 *   seeAllHref="/calculators/time"
 * />
 */
export default function SimilarCalculators({
  title,
  links,
  seeAllHref,
  seeAllLabel = "See All",
  icon: Icon = Calculator,
  className = "",
}: SimilarCalculatorsProps) {
  if (!links || links.length === 0) return null;

  return (
    <section
      aria-labelledby="similar-calculators-heading"
      className={`bg-gray-800/40 border border-gray-700 rounded-2xl p-6 sm:p-7 max-w-xl w-full mx-auto ${className}`}
    >
      <div className="flex items-center gap-2 mb-5">
        <Icon className="w-5 h-5 text-blue-300 shrink-0" aria-hidden="true" />
        <h2
          id="similar-calculators-heading"
          className="text-lg sm:text-xl font-bold text-white"
        >
          {title}
        </h2>
      </div>

      <hr className="border-gray-700 mb-4" />

      <ul className="divide-y divide-gray-700">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center justify-between py-3 sm:py-3.5 text-sm sm:text-base font-medium text-blue-300 hover:text-blue-200 transition-colors"
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="text-blue-400 group-hover:translate-x-0.5 transition-transform"
              >
                &gt;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="mt-5 flex items-center justify-center w-full border border-gray-600 rounded-full py-2.5 text-sm sm:text-base font-semibold text-white hover:bg-gray-700/50 transition-colors"
        >
          {seeAllLabel}
        </Link>
      )}
    </section>
  );
}