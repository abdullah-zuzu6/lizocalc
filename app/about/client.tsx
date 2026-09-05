'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            About LizoCalc
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            LizoCalc is a free, browser-based platform of fast, accurate
            calculators for finance, health, education, math, and everyday
            life — built to be quick to use, honest about how it works, and
            free of the clutter that slows most calculator sites down.
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">Why We Built LizoCalc</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              LizoCalc started from a frustration almost everyone has run
              into: needing a quick answer — what&apos;s my BMI, what will
              this loan actually cost me, what GPA do I need next semester —
              and instead landing on a page buried under pop-ups,
              auto-playing videos, and a wall of text before the actual
              calculator ever shows up. Some sites take five clicks just to
              reach a single input box.
            </p>
            <p>
              We wanted the opposite experience: land on the page, see the
              calculator immediately, get your answer, and leave if that&apos;s
              all you needed. No account walls, no forced newsletter
              sign-ups, and no interface tricks standing between you and the
              tool.
            </p>
            <p>
              At the same time, we didn&apos;t want to cut corners on
              accuracy to get there. A calculator that loads fast but gives
              the wrong answer is worse than useless — it&apos;s actively
              misleading, especially for things like loan amortization,
              body-fat estimates, or GPA conversions that people use to make
              real decisions. So every formula on this site is checked
              against known reference values and standard formulas before
              it ships, not just eyeballed once and left alone.
            </p>
            <p>
              That combination — instant, uncluttered, and correct — is the
              whole reason LizoCalc exists, and it&apos;s the standard we
              hold every new calculator to before it goes live.
            </p>
          </div>
        </div>

        {/* Mission & Why */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our goal is to make everyday calculations simple, fast, and
              accessible to everyone, regardless of technical background.
              Whether you&apos;re planning finances, tracking health,
              studying for exams, or solving a one-off math problem,
              LizoCalc provides reliable tools that work instantly in your
              browser — on a laptop at a desk or a phone in the middle of a
              conversation where you just need a number, now.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose LizoCalc</h2>
            <ul className="text-muted-foreground space-y-2">
              <li>✓ Fast, accurate calculations, verified against standard formulas</li>
              <li>✓ Clean, distraction-free design with no forced pop-ups</li>
              <li>✓ Works equally well on mobile and desktop</li>
              <li>✓ No sign-up, no account, no email required</li>
              <li>✓ Privacy-focused — your inputs stay on your device (see our{" "}
                <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>)
              </li>
              <li>✓ Completely free to use, with no paywalled features</li>
              <li>✓ Regular updates, new calculators, and formula reviews</li>
            </ul>
          </div>
        </div>

        {/* What You Can Do Here — full breakdown */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold mb-4 text-white text-center">What You Can Do on LizoCalc</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            LizoCalc is organized into a handful of focused categories, each
            covering a real, everyday need. Here&apos;s the full picture of
            what&apos;s available today and what each category is meant for.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Financial Calculators</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Tools for the numbers that affect real money decisions —
                mortgages, loans, interest, and returns — so you can compare
                options before committing to anything.
              </p>
              <ul className="text-muted-foreground text-sm space-y-1 list-disc list-inside">
                <li>Mortgage and home-loan calculators</li>
                <li>Personal and auto loan calculators</li>
                <li>Simple and compound interest calculators</li>
                <li>Return on investment (ROI) calculators</li>
                <li>Salary, take-home pay, and tax-style calculators</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-accent">Health &amp; Fitness</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Tools for tracking the numbers behind your health goals,
                built on established formulas used in fitness and clinical
                reference material — not guesswork.
              </p>
              <ul className="text-muted-foreground text-sm space-y-1 list-disc list-inside">
                <li>BMI (Body Mass Index) calculator</li>
                <li>Calorie and daily-intake calculators</li>
                <li>Body-fat percentage calculators</li>
                <li>BMR (Basal Metabolic Rate) calculator</li>
                <li>TDEE (Total Daily Energy Expenditure) calculator</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Math &amp; Science</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                General-purpose tools for schoolwork, quick estimates, or
                any moment you need a scientific or numeric answer without
                opening a full spreadsheet.
              </p>
              <ul className="text-muted-foreground text-sm space-y-1 list-disc list-inside">
                <li>Scientific calculator for everyday equations</li>
                <li>Fraction and ratio calculators</li>
                <li>Percentage calculators (increase, decrease, of a total)</li>
                <li>Unit conversion calculators</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Education &amp; Academic</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Built specifically around the calculations students actually
                need during the semester, not just after it.
              </p>
              <ul className="text-muted-foreground text-sm space-y-1 list-disc list-inside">
                <li>
                  <Link href="/calculators/education/cgpa-calculator" className="text-blue-400 hover:underline">
                    CGPA calculator
                  </Link>
                </li>
                <li>GPA calculator with saved course lists</li>
                <li>Grade and weighted-average calculators</li>
              </ul>
            </div>
          </div>

          <p className="text-muted-foreground text-sm text-center mt-10">
            This list grows regularly — see the roadmap below for what
            we&apos;re working on next, or use the Contact link at the
            bottom of this page to request a calculator that doesn&apos;t
            exist yet.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">How LizoCalc Actually Works</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Every calculator on this site runs as client-side code — the
              math happens directly in your browser, using JavaScript, the
              moment you enter a number. There&apos;s no round trip to a
              server to compute your BMI or your loan payment, which is why
              results appear instantly rather than after a loading spinner.
            </p>
            <p>
              When a calculator lets you save something — like a saved
              course list on the GPA calculator — that data is written to
              your browser&apos;s local storage, not to a database we
              control. It stays on your device, persists across visits, and
              disappears only if you clear it yourself. We go into full
              detail on exactly what this means for your data in our{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </Link>
              , including the small amount of aggregate analytics we do
              collect to understand overall site traffic.
            </p>
            <p>
              This architecture is a deliberate choice, not just a
              performance trick: it means there&apos;s no central store of
              user inputs that could ever be exposed, misused, or sold, and
              it means the tools keep working even if our servers are slow
              or briefly unavailable, because the calculation itself never
              depended on them.
            </p>
          </div>
        </div>

        {/* Meet the Creator Section (E-E-A-T Booster) */}
        <div className="bg-card rounded-3xl border border-blue-500/20 p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex-shrink-0 flex items-center justify-center text-4xl font-bold text-white shadow-xl shadow-blue-500/20">
              RA
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">Meet the Developer</h2>
              <h3 className="text-blue-400 font-semibold mb-4 uppercase tracking-wider text-sm">
                Rana Muhammad Abdullah — Founder &amp; Lead Engineer
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m a <strong>Mechatronics Engineering student</strong>{" "}
                and a <strong>Full-Stack Web Developer</strong> with over 2
                years of hands-on experience building and shipping web
                products. I built LizoCalc to solve a problem I kept running
                into myself: too many calculator sites are slow, cluttered,
                and hard to actually use when all you need is a quick,
                correct answer.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed border-t border-border pt-8">
            <p>
              My background is in engineering first, web development
              second — and that ordering matters here. Mechatronics trains
              you to distrust a formula until you&apos;ve verified it
              against a known result, and that habit carries directly into
              how LizoCalc is built. Before any calculator ships, I test it
              against textbook examples, official formula references, or
              known edge cases, so the numbers you get back aren&apos;t
              just "probably right" — they&apos;re checked.
            </p>
            <p>
              On the development side, I focus on keeping the site fast and
              simple to use: modern frontend tooling, no unnecessary
              third-party scripts, and a design that gets out of the way of
              the calculator itself. I handle everything on this site
              personally — from the formulas, to the interface, to fixing
              bugs reported by users — which is also why feedback (once the
              in-site reviews feature described in our{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </Link>{" "}
              goes live) will go straight to me, not a support queue.
            </p>
            <p>
              At LizoCalc, I combine that engineering discipline around
              accuracy with a genuine focus on web performance and
              usability, because a calculator only does its job if people
              trust the answer and don&apos;t have to fight the page to get
              it.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">What We Care About</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-primary">Accuracy First</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every formula is checked against reference values before it
                ships. If we ever find an error, we fix it and note the
                correction rather than quietly changing it.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-accent">Privacy by Design</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your calculator inputs are processed locally, in your
                browser. We don&apos;t build profiles, and we&apos;re
                specific — not vague — about the limited analytics we do
                use.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">No Unnecessary Friction</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No sign-up walls, no forced newsletters, no dark patterns to
                keep you on the page longer than you need to be.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-primary">Free, and Staying Free</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every calculator on LizoCalc is free to use, with no
                paywalled "premium" version of a basic tool.
              </p>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">What&apos;s Next</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            LizoCalc is actively maintained and growing. Here&apos;s what
            we&apos;re currently working on:
          </p>
          <ul className="text-muted-foreground space-y-3 max-w-xl mx-auto">
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">→</span>
              <span>More calculators across finance, health, and education, based on what visitors ask for</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">→</span>
              <span>An in-site reviews and feedback form, so you can rate a calculator or suggest improvements directly (details in our{" "}
                <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">→</span>
              <span>Continued accuracy reviews of existing formulas as standards or reference values are updated</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">→</span>
              <span>Performance improvements so every calculator keeps loading instantly, even as the site grows</span>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">A Few Common Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-1">Is LizoCalc really free?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Yes. Every calculator is free to use, with no hidden
                paywall, subscription, or premium tier for basic
                functionality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Do I need to create an account?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No. There&apos;s no sign-up on any calculator. Anything you
                choose to save is stored locally in your own browser.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Is my data safe?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your calculator inputs are processed on your device and
                never sent to our servers. Full detail on exactly what is
                and isn&apos;t collected is in our{" "}
                <Link href="/privacy" className="text-blue-400 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Can I request a new calculator?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Yes — use the Contact link below. Requests directly shape
                what gets built next.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Get in Touch</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Have questions about a formula, or a suggestion for a new tool?
            I&apos;m always working to improve the platform based on
            feedback from people who actually use it.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 transition-all active:scale-95"
          >
            Contact Us
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  )
}