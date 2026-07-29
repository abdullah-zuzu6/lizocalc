'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Terms() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-6">Terms of Use</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            This page explains what you can expect from LizoCalc and what we
            expect from anyone using it. We&apos;ve tried to write it the way
            we&apos;d actually explain it to someone, rather than filling it
            with legal phrasing nobody reads past the first paragraph. If
            anything here is unclear, our{" "}
            <Link
              href="/contact"
              className="text-blue-400 underline hover:text-blue-300"
            >
              contact page
            </Link>{" "}
            is the fastest way to ask.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10">

          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Using LizoCalc Means Accepting These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every time you open a calculator on this site, run a number
              through it, or read one of our guides, you&apos;re using
              LizoCalc under the terms laid out on this page. You don&apos;t
              have to sign anything or click "I agree" — using the site is
              the agreement. If something here doesn&apos;t sit right with
              you, the simplest option is to not use the site, and we&apos;d
              rather be upfront about that than bury it in fine print.
            </p>
          </section>

          {/* Use */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. What This Site Is For</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              LizoCalc exists to give people a fast, accurate answer to a
              specific calculation — a GPA, a loan payment, a BMI reading, a
              date difference — without wading through ads or creating an
              account first. That&apos;s the entire purpose of the site, and
              it&apos;s meant for personal, everyday use: a student checking
              a grade, someone comparing loan offers, a person curious about
              their BMI.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What we ask in return is pretty basic — don&apos;t try to break
              the tools, don&apos;t hammer the site with automated traffic
              that slows it down for everyone else, and don&apos;t use it in
              a way that causes harm to us or to other people visiting the
              site. Beyond that, use it however it&apos;s useful to you.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. The Work Behind This Site Is Ours</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Every calculator, every guide, the layout, the design
                decisions, the actual code running underneath it — all of
                that took real time to build, and it belongs to LizoCalc. We
                built this to be free and open for anyone to use, not free
                for someone else to copy and relaunch under their own name.
              </p>

              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Don&apos;t copy or republish the content, layout, or structure of this site elsewhere</li>
                <li>Don&apos;t rebuild our calculators, formulas write-ups, or interface and present them as your own</li>
                <li>Don&apos;t use our code, tools, or written guides for a commercial product without asking first</li>
                <li>Don&apos;t scrape, reverse-engineer, or attempt to clone the site</li>
              </ul>

              <p>
                Using the calculators to get an answer for your own grades,
                loan, or health tracking is exactly what they&apos;re here
                for — that&apos;s not a gray area, that&apos;s the whole
                point. What we&apos;re talking about above is someone taking
                the work itself and repackaging it. If you&apos;re not sure
                whether something you want to do falls into that category,
                just ask through the{" "}
                <Link
                  href="/contact"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  contact page
                </Link>{" "}
                — it&apos;s a quicker path than guessing.
              </p>
            </div>
          </section>

          {/* Calculators are informational */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Every Calculator Is a Starting Point, Not a Final Word</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We build every tool on this site around the standard, widely
              accepted version of its formula — GPA as quality points over
              credit hours, loans as standard amortization, BMI as weight
              over height squared. That math is solid. What varies is how
              your specific school, lender, or doctor applies rules on top
              of that math: rounding conventions, compounding schedules,
              regional grading systems, and health guidelines all differ
              from one institution to the next.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That means a number from LizoCalc is meant to help you
              understand and estimate — not to override what your university
              registrar, your bank, or your doctor tells you. If a figure
              here doesn&apos;t match an official one, that&apos;s worth
              looking into rather than assuming either side made a mistake.
              For anything that involves real money, your academic standing,
              or your health, treat our number as a well-informed estimate
              and confirm the specifics with the actual institution or
              professional involved.
            </p>
          </section>

          {/* No professional advice */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. This Isn&apos;t Financial, Medical, or Academic Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nothing on LizoCalc — not a calculator result, not a blog post,
              not an FAQ answer — is a substitute for advice from a licensed
              financial advisor, a doctor, or an academic advisor who
              actually knows your specific situation. We explain the math
              openly so you understand what a number means and where it
              comes from, but decisions about borrowing money, managing your
              health, or planning your academic path deserve input from
              someone qualified to look at your full picture, not just the
              inputs you typed into a form.
            </p>
          </section>

          {/* Limitation */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. What We&apos;re Responsible For, and What We&apos;re Not</h2>
            <p className="text-muted-foreground leading-relaxed">
              We put real effort into keeping every formula on this site
              accurate, and we correct mistakes when we find them or when
              someone points one out. That said, LizoCalc is provided as-is,
              and we can&apos;t take responsibility for decisions made
              based on a number from this site, or for any loss, cost, or
              consequence that follows from using it. Using the calculators
              and reading the guides here is your choice, made at your own
              discretion.
            </p>
          </section>

          {/* Accuracy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. We Keep Things Updated, But Errors Happen</h2>
            <p className="text-muted-foreground leading-relaxed">
              Grading policies change, lending regulations shift, and health
              guidelines get revised. We update calculators and guides when
              we become aware of a change, but we can&apos;t guarantee
              every tool reflects the very latest version of every
              institution&apos;s rules at every moment. We also reserve the
              right to add, remove, or adjust any calculator or piece of
              content on the site without advance notice, usually because
              we&apos;re fixing something or making it more useful.
            </p>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Links to Other Sites</h2>
            <p className="text-muted-foreground leading-relaxed">
              Occasionally a guide on this site links out to an external
              source — a research paper, a government resource, a reference
              site — where it genuinely adds useful context. Once you leave
              LizoCalc for one of those links, you&apos;re on someone
              else&apos;s site, governed by their own rules and privacy
              practices, and we&apos;re not responsible for what happens
              there.
            </p>
          </section>

          {/* Cookies and Local Storage */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. How Local Storage Works Here</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most of what you type into a calculator on this site never
              leaves your browser — it&apos;s used to produce your result
              and then it&apos;s gone. Where we do save something, like your
              course list on the{" "}
              <Link
                href="/calculators/education/gpa-calculator"
                className="text-blue-400 underline hover:text-blue-300"
              >
                GPA Calculator
              </Link>{" "}
              or anything you keep on{" "}
              <Link
                href="/calculators/saved-calculators"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Saved Calculators
              </Link>
              , that data lives locally in your browser&apos;s storage, not
              on a server with your name attached to it. It&apos;s there so
              you can come back later without re-entering everything, and
              it&apos;s under your control — clearing your browser data
              clears it too.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using the site, you&apos;re agreeing to this kind of local
              storage and to any functional cookies that help pages load
              correctly and remember basic preferences. Full detail on what
              gets stored and why lives on our{" "}
              <Link
                href="/privacy"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Privacy Policy
              </Link>{" "}
              page, which is worth a read if you want the specifics rather
              than the summary.
            </p>
          </section>

          {/* Prohibited uses */}
          <section>
            <h2 className="text-2xl font-bold mb-4">10. What Not to Do Here</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most of this is common sense, but it&apos;s worth spelling out
              plainly rather than leaving it implied:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-muted-foreground">
              <li>Don&apos;t attempt to hack, disrupt, or overload the site or its calculators</li>
              <li>Don&apos;t use automated bots or scrapers to pull content or run mass queries against the tools</li>
              <li>Don&apos;t use the site to distribute anything illegal, harmful, or deceptive</li>
              <li>Don&apos;t misrepresent your identity or impersonate LizoCalc anywhere else online</li>
              <li>Don&apos;t attempt to bypass any security or access controls on the site</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              If we notice activity that clearly falls into one of these
              categories, we reserve the right to restrict or block access
              to protect the site and the people using it normally.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold mb-4">11. These Terms Can Change</h2>
            <p className="text-muted-foreground leading-relaxed">
              As the site grows and adds new calculators or features, these
              terms may need updating to reflect that. When we make a
              meaningful change, we&apos;ll update the date at the top of
              this page. Continuing to use LizoCalc after a change means
              you&apos;re accepting the updated version — if you want to
              check whether anything&apos;s changed since your last visit,
              this page is always the place to look.
            </p>
          </section>

          {/* Law */}
          <section>
            <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by applicable law, and any dispute
              arising from the use of this site would be handled under the
              relevant jurisdiction. We mention this mostly for completeness
              — in practice, the overwhelming majority of interactions with
              this site involve someone getting a GPA or a loan payment and
              moving on with their day.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-4">13. Questions About These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              If any part of this page raises a question we haven&apos;t
              answered clearly, or if something about how a calculator
              works doesn&apos;t match what&apos;s written here, reach out
              through our{" "}
              <Link
                href="/contact"
                className="text-blue-400 underline hover:text-blue-300"
              >
                contact page
              </Link>
              . We&apos;d rather clear up a misunderstanding directly than
              have someone walk away with the wrong idea about how this site
              works. You can also read more about how we handle data
              specifically on our{" "}
              <Link
                href="/privacy"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Privacy Policy
              </Link>{" "}
              or learn more about the project on our{" "}
              <Link
                href="/about"
                className="text-blue-400 underline hover:text-blue-300"
              >
                About page
              </Link>
              .
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  )
}