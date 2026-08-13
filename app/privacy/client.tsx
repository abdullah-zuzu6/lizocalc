'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Privacy() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: August 2026</p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We wrote this page the same way we wrote our{" "}
            <Link
              href="/terms"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Terms of Use
            </Link>{" "}
            — plainly, and without legal filler nobody actually reads. The
            short version is this: LizoCalc doesn&apos;t collect your data,
            doesn&apos;t know who you are, and doesn&apos;t want your inputs
            to leave your device. Everything below explains exactly why
            that&apos;s true and how it works under the hood.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10">

          {/* Intro / Core Principle */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. The Short Version</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every calculator on LizoCalc runs entirely inside your browser.
              When you type a GPA into the GPA calculator, or a loan amount
              into the loan calculator, that number is processed on your
              device, by your device, and the result is shown to you — full
              stop. It never travels to a server, we never see it, and we
              have no database sitting somewhere with your inputs in it.
              There&apos;s no sign-up, no account, no email required to use
              any tool on this site. That&apos;s not a policy we&apos;re
              promising to follow — it&apos;s just how the site is built.
            </p>
          </section>

          {/* What we don't collect */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Do Not Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To be specific rather than vague about this, here&apos;s what
              never reaches us, under any circumstance, through normal use
              of the site:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-muted-foreground">
              <li>Your name, email address, or any identifying information</li>
              <li>Anything you type into a calculator — grades, loan figures, height, weight, dates, or any other input</li>
              <li>Your calculation results or history</li>
              <li>Account credentials of any kind, because there are no accounts</li>
              <li>Payment information, because nothing on the site is paid</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We&apos;re not choosing not to store this data as a courtesy —
              our servers have no mechanism to receive it in the first
              place. A calculator page loads once, and from that point on,
              everything you do with it happens locally.
            </p>
          </section>

          {/* Local Storage - the main mechanism */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. How Local Storage Works Here</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Some calculators let you save something so you don&apos;t have
              to re-enter it next time — a list of courses on the GPA
              calculator, or an entry you&apos;ve kept on{" "}
              Saved Calculators. When that happens, LizoCalc uses your
              browser&apos;s built-in local storage, not a server. That
              means:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-muted-foreground">
              <li>The data is written directly onto your device, inside your browser</li>
              <li>It never gets transmitted to LizoCalc, to us, or to anyone else</li>
              <li>It stays there until you clear it, and only your browser can read it back</li>
              <li>If you switch browsers or devices, that data doesn&apos;t follow you, because it was never centralized anywhere to begin with</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Think of it less like "saving to an account" and more like a
              sticky note your browser keeps for you. We benefit from you
              not having to retype your course list every visit; you benefit
              from that list never sitting on a server we&apos;d have to
              secure, and never being something we could hand over, lose, or
              leak, because we never had it.
            </p>
          </section>

          {/* What specifically gets stored locally */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. What Gets Stored Locally, Specifically</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                To be concrete about what actually lives in your
                browser&apos;s local storage when you use LizoCalc:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Saved calculator entries:</strong> course lists, saved inputs, or results you&apos;ve chosen to keep for later</li>
                <li><strong>Preferences:</strong> things like your last-used units, theme, or display settings</li>
                <li><strong>Nothing else:</strong> we don&apos;t use local storage to track you, fingerprint your device, or build a profile — it exists purely to make the tools more convenient to use</li>
              </ul>
              <p>
                You can inspect, edit, or wipe any of this at any time
                through your browser&apos;s developer tools or settings.
                Clearing your browser&apos;s site data for LizoCalc removes
                it completely, and there&apos;s no backup copy anywhere on
                our end, because there was never a copy on our end at all.
              </p>
            </div>
          </section>

          {/* No cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. We Don&apos;t Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              LizoCalc does not set tracking cookies, advertising cookies,
              or any cookie-based mechanism to identify you or follow you
              across sessions or sites. If a future version of the site
              ever changes this — for example, if we introduce advertising
              that requires cookies — this page will be updated first, with
              a clear explanation of what changed and why, before that
              change takes effect. As things stand today, the only thing
              LizoCalc stores anywhere is the local storage data described
              above, and that&apos;s a deliberate choice, not an oversight.
            </p>
          </section>

          {/* Server logs / hosting */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Basic Server Logs</h2>
            <p className="text-muted-foreground leading-relaxed">
              Like virtually every website, the infrastructure that serves
              LizoCalc&apos;s pages may generate standard technical logs —
              things like IP address, browser type, and timestamp of a
              request — purely as a byproduct of how web servers operate and
              stay secure against abuse. These logs are not tied to your
              calculator inputs in any way, are not used to build a profile
              of you, and are not something we actively mine or analyze
              beyond basic security and uptime purposes.
            </p>
          </section>

          {/* Third party analytics */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may, at some point, use a privacy-respecting analytics tool
              to understand things like which calculators are most useful
              or whether pages are loading correctly. Any such tool would be
              limited to aggregate, non-identifying usage patterns — never
              your calculator inputs, which, again, never leave your
              browser in the first place. If this ever changes in a way
              that affects your privacy, this page will reflect that update
              with a new "last updated" date at the top.
            </p>
          </section>

          {/* Advertising */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Advertising</h2>
            <p className="text-muted-foreground leading-relaxed">
              LizoCalc does not currently display advertisements. If that
              changes in the future — for example, through a network like
              Google AdSense — any such service would come with its own
              privacy practices, and we&apos;d update this page in advance
              to explain what that means for you, including whether it
              involves cookies or any data collection beyond what&apos;s
              described here.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              The site is served over HTTPS, so the connection between your
              browser and our servers is encrypted. Beyond that, the
              biggest security advantage LizoCalc has is structural: since
              your calculator inputs and saved data never leave your
              device, there&apos;s no central database of user information
              that could be breached, leaked, or exposed. The data most
              worth protecting is data we simply never receive.
            </p>
          </section>

          {/* Children's privacy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              LizoCalc doesn&apos;t collect personal information from
              anyone, regardless of age, which extends naturally to
              children. Because there&apos;s no sign-up process and no data
              transmitted to us, there&apos;s no mechanism by which a
              child&apos;s personal information could be collected through
              normal use of the site.
            </p>
          </section>

          {/* User Rights / Control */}
          <section>
            <h2 className="text-2xl font-bold mb-4">11. You&apos;re Always in Control</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Because everything of yours lives in your own browser, control
              over your data is straightforward and entirely in your hands:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-muted-foreground">
              <li>Clear your browser&apos;s local storage at any time to remove anything saved by LizoCalc</li>
              <li>Use private or incognito browsing if you&apos;d rather nothing be saved at all during a session</li>
              <li>Ask us directly if you&apos;re ever unsure what a specific calculator saves or why</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              There&apos;s no "delete my account" request to make, because
              there&apos;s no account, and no "download my data" request to
              make, because the data was always on your device, not ours.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-bold mb-4">12. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              If LizoCalc ever adds a feature that changes how data is
              handled — new analytics, advertising, or any form of
              server-side storage — this page will be updated first, with a
              new date at the top, before that change goes live. Checking
              back here is the fastest way to see whether anything about
              how your data is handled has changed since your last visit.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-4">13. Questions About This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              If anything here is unclear, or you want more detail on how a
              specific calculator handles your inputs, reach out directly —
              we&apos;d rather answer the question plainly than have you
              guess. You can also read our{" "}
              <Link
                href="/terms"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Terms of Use
              </Link>{" "}
              for more on how the site is meant to be used.
              <br />
              <br />
              <strong>itxabdullahdev@gmail.com</strong>
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  )
}