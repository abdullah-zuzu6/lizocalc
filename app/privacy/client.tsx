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
          <p className="text-muted-foreground">Last updated: September 2026</p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We wrote this page the same way we wrote our{" "}
            <Link
              href="/terms"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Terms of Use
            </Link>{" "}
            — plainly, and without legal filler nobody actually reads. The
            short version is this: LizoCalc doesn&apos;t collect your name,
            doesn&apos;t require an account, and doesn&apos;t send your
            calculator inputs anywhere. The only thing that has changed
            recently is that we now use a small, well-known analytics
            service (Google Analytics) to understand overall site traffic —
            not to identify you personally. Everything below explains
            exactly what that means, what it does and doesn&apos;t involve,
            and how the rest of the site continues to work entirely inside
            your browser.
          </p>
        </div>

        {/* Table of contents */}
        <nav className="mb-12 border border-border rounded-lg p-6 bg-muted/20">
          <p className="font-semibold mb-3">On this page</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li><a href="#short-version" className="hover:text-blue-300 underline">The Short Version</a></li>
            <li><a href="#not-collect" className="hover:text-blue-300 underline">Information We Do Not Collect</a></li>
            <li><a href="#local-storage" className="hover:text-blue-300 underline">How Local Storage Works Here</a></li>
            <li><a href="#local-storage-detail" className="hover:text-blue-300 underline">What Gets Stored Locally, Specifically</a></li>
            <li><a href="#cookies" className="hover:text-blue-300 underline">Cookies We Use</a></li>
            <li><a href="#analytics" className="hover:text-blue-300 underline">Google Analytics, In Detail</a></li>
            <li><a href="#server-logs" className="hover:text-blue-300 underline">Basic Server Logs</a></li>
            <li><a href="#third-party" className="hover:text-blue-300 underline">Third-Party Services</a></li>
            <li><a href="#advertising" className="hover:text-blue-300 underline">Advertising</a></li>
            <li><a href="#security" className="hover:text-blue-300 underline">Data Security</a></li>
            <li><a href="#children" className="hover:text-blue-300 underline">Children&apos;s Privacy</a></li>
            <li><a href="#rights" className="hover:text-blue-300 underline">Your Privacy Rights &amp; Opt-Outs</a></li>
            <li><a href="#future" className="hover:text-blue-300 underline">Upcoming Features: Reviews &amp; Feedback</a></li>
            <li><a href="#control" className="hover:text-blue-300 underline">You&apos;re Always in Control</a></li>
            <li><a href="#changes" className="hover:text-blue-300 underline">Changes to This Policy</a></li>
            <li><a href="#contact" className="hover:text-blue-300 underline">Questions About This Policy</a></li>
          </ol>
        </nav>

        <div className="prose prose-invert max-w-none space-y-10">

          {/* Intro / Core Principle */}
          <section id="short-version">
            <h2 className="text-2xl font-bold mb-4">1. The Short Version</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every calculator on LizoCalc runs entirely inside your browser.
              When you type a GPA into the GPA calculator, or a loan amount
              into the loan calculator, that number is processed on your
              device, by your device, and the result is shown to you — full
              stop. It never travels to a server, we never see it, and we
              have no database sitting somewhere with your inputs in it.
              There&apos;s no sign-up, no account, and no email required to
              use any tool on this site. Separately from your calculator
              inputs, we do use a standard analytics cookie (Google
              Analytics) to see how many people visit the site and which
              pages are useful, in the same way most websites do. That
              distinction — your inputs stay local, your visit is counted
              anonymously in aggregate — runs through this whole page.
            </p>
          </section>

          {/* What we don't collect */}
          <section id="not-collect">
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
              everything you do with it happens locally. This is unaffected
              by the analytics described in Section 5 below: Google
              Analytics does not have access to what you type into a
              calculator, and neither do we.
            </p>
          </section>

          {/* Local Storage - the main mechanism */}
          <section id="local-storage">
            <h2 className="text-2xl font-bold mb-4">3. How Local Storage Works Here</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Some calculators let you save something so you don&apos;t have
              to re-enter it next time — a list of courses on the GPA
              calculator, or an entry you&apos;ve kept on Saved Calculators.
              When that happens, LizoCalc uses your browser&apos;s built-in
              local storage, not a server. That means:
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
          <section id="local-storage-detail">
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

          {/* Cookies we actually use now */}
          <section id="cookies">
            <h2 className="text-2xl font-bold mb-4">5. Cookies We Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Unlike your calculator inputs and saved entries, which stay in
              local storage and never leave your device, LizoCalc does use
              a small number of cookies for basic, site-wide analytics. We
              believe in naming these plainly rather than hiding them
              behind a generic "we may use cookies" line, so here is the
              complete list of cookies currently set on this site:
            </p>

            <div className="overflow-x-auto my-6 border border-border rounded-lg">
              <table className="min-w-full text-sm text-left text-muted-foreground">
                <thead className="bg-muted/30 text-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Cookie</th>
                    <th className="px-4 py-3 font-semibold">Domain</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="px-4 py-3 font-semibold">Duration</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border align-top">
                    <td className="px-4 py-3 font-mono">_ga</td>
                    <td className="px-4 py-3 font-mono">.lizocalc.com</td>
                    <td className="px-4 py-3">
                      Installed by Google Analytics. Calculates visitor,
                      session, and campaign data, and helps track site
                      usage for our analytics reports. Stores information
                      anonymously and assigns a randomly generated ID to
                      recognize unique visitors.
                    </td>
                    <td className="px-4 py-3">1 year 1 month 4 days</td>
                    <td className="px-4 py-3">Analytics</td>
                  </tr>
                  <tr className="border-t border-border align-top">
                    <td className="px-4 py-3 font-mono">_ga_*</td>
                    <td className="px-4 py-3 font-mono">.lizocalc.com</td>
                    <td className="px-4 py-3">
                      Also set by Google Analytics to store and count page
                      views for the current property. Works alongside{" "}
                      <code>_ga</code> to distinguish sessions and users.
                    </td>
                    <td className="px-4 py-3">1 year 1 month 4 days</td>
                    <td className="px-4 py-3">Analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              That&apos;s the complete list as of the "last updated" date at
              the top of this page. We don&apos;t set advertising cookies,
              tracking pixels, or cross-site identifiers, and we don&apos;t
              use cookies to associate your visit with your calculator
              inputs — those two systems are entirely separate. If we ever
              add a new cookie (for example, if we introduce advertising),
              this table will be updated to reflect it before the change
              takes effect, as described in Section 15.
            </p>
          </section>

          {/* Google Analytics detail */}
          <section id="analytics">
            <h2 className="text-2xl font-bold mb-4">6. Google Analytics, In Detail</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We use Google Analytics to understand aggregate patterns —
                things like how many people visited the site this month,
                which calculators are most popular, and whether a page is
                loading slowly. Google Analytics assigns your browser a
                randomly generated identifier through the cookies listed in
                Section 5, and uses that identifier to distinguish one
                visit from another. It does not know your name, and it
                never receives anything you type into a calculator.
              </p>
              <p>
                Google, as the provider of this service, processes this
                data under its own privacy policy and may use it according
                to its own terms. You can read more about how Google
                collects and processes data at{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Google&apos;s Privacy Policy
                </a>{" "}
                and, specifically for Analytics, at{" "}
                <a
                  href="https://support.google.com/analytics/answer/6004245"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Google&apos;s Safeguarding Your Data page
                </a>
                .
              </p>
              <p>
                If you&apos;d rather not be counted at all, you can install
                the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                , block cookies from third-party domains in your browser
                settings, or use private/incognito browsing. None of these
                choices affect your ability to use any calculator on the
                site — analytics is purely observational and never gates
                access to a tool.
              </p>
            </div>
          </section>

          {/* Server logs / hosting */}
          <section id="server-logs">
            <h2 className="text-2xl font-bold mb-4">7. Basic Server Logs</h2>
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
          <section id="third-party">
            <h2 className="text-2xl font-bold mb-4">8. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Currently, Google Analytics (described in Sections 5 and 6) is
              the only third-party service that processes any data on our
              behalf, and it is limited to aggregate, non-identifying usage
              patterns — never your calculator inputs, which never leave
              your browser in the first place. If we add another
              third-party tool in the future — for example, a different
              analytics provider, or a service to handle the reviews
              feature described in Section 13 — this section will be
              updated to name it specifically, describe what it collects,
              and link to its own privacy policy, before it goes live.
            </p>
          </section>

          {/* Advertising */}
          <section id="advertising">
            <h2 className="text-2xl font-bold mb-4">9. Advertising</h2>
            <p className="text-muted-foreground leading-relaxed">
              LizoCalc does not currently display advertisements. If that
              changes in the future — for example, through a network like
              Google AdSense — any such service would come with its own
              privacy practices, would likely set its own cookies to
              personalize or measure ads, and we&apos;d update this page in
              advance to disclose exactly what that means for you,
              including a link to opt out of personalized advertising at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </section>

          {/* Security */}
          <section id="security">
            <h2 className="text-2xl font-bold mb-4">10. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              The site is served over HTTPS, so the connection between your
              browser and our servers is encrypted. Beyond that, the
              biggest security advantage LizoCalc has is structural: since
              your calculator inputs and saved data never leave your
              device, there&apos;s no central database of user information
              that could be breached, leaked, or exposed. The data most
              worth protecting is data we simply never receive. The
              analytics data described above is limited to what Google
              Analytics collects on its own infrastructure, under
              Google&apos;s security practices, and is never merged with
              any calculator content.
            </p>
          </section>

          {/* Children's privacy */}
          <section id="children">
            <h2 className="text-2xl font-bold mb-4">11. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              LizoCalc doesn&apos;t knowingly collect personal information
              from anyone, regardless of age, which extends naturally to
              children. Because there&apos;s no sign-up process and no
              personal data transmitted to us, there&apos;s no mechanism by
              which a child&apos;s personal information could be collected
              through normal use of the site. The analytics cookies
              described in Section 5 do not collect names, emails, or any
              other personal identifiers, from users of any age. If we
              introduce the reviews feature described in Section 13, it
              will include appropriate safeguards and disclosures for any
              user, including minors, before it launches.
            </p>
          </section>

          {/* Rights / opt-outs */}
          <section id="rights">
            <h2 className="text-2xl font-bold mb-4">12. Your Privacy Rights &amp; Opt-Outs</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Depending on where you live, you may have specific legal
                rights over data collected about you — for example, under
                the GDPR in the EU/UK, or the CCPA/CPRA in California.
                Because LizoCalc does not collect personal information tied
                to your identity, most of these rights (such as requesting
                a copy of "your data" or asking us to delete an account)
                don&apos;t apply in the traditional sense — there&apos;s no
                account or profile to hand over or delete. Where analytics
                cookies are used, you still have meaningful control:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Decline or clear cookies at any time through your browser&apos;s settings</li>
                <li>Use the Google Analytics Opt-out Browser Add-on linked in Section 6</li>
                <li>Use private or incognito browsing so no cookies persist after your session ends</li>
                <li>Enable "Do Not Track" or similar signals in your browser, which we respect where technically supported by our analytics provider</li>
              </ul>
              <p>
                If you believe any of these rights apply to you and want to
                raise a specific request, contact us using the details in
                Section 16 and we&apos;ll do our best to help, even in cases
                this policy doesn&apos;t explicitly cover.
              </p>
            </div>
          </section>

          {/* Future features: reviews / feedback */}
          <section id="future">
            <h2 className="text-2xl font-bold mb-4">13. Upcoming Features: Reviews &amp; Feedback</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We&apos;re planning to add a feature that lets visitors
                leave a review, rating, or suggestion about a calculator —
                for example, pointing out a bug, requesting a new tool, or
                sharing feedback on how useful a page was. This feature
                isn&apos;t live yet, but because it will represent the
                first time LizoCalc collects any content you choose to
                submit, we want to be upfront about how it will work well
                before it launches.
              </p>
              <p>
                When this feature goes live, we expect it to work roughly
                as follows, and this section will be updated with the
                final details at that time:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Submitting a review or suggestion will be entirely optional and will never be required to use a calculator</li>
                <li>Any name or contact field, if included, will be clearly marked optional, and you&apos;ll be able to submit feedback anonymously</li>
                <li>Submitted content (like a written review) may be stored on our servers, since — unlike calculator inputs — a review needs to be shared to be useful to other visitors</li>
                <li>We will not use review submissions to build advertising profiles or sell data to third parties</li>
                <li>Basic moderation may apply to prevent spam or abusive content before a review is published</li>
              </ul>
              <p>
                Before this feature launches, we&apos;ll revise this
                Privacy Policy with concrete detail — what fields exist,
                how long submissions are kept, and how you can request
                removal of something you&apos;ve posted — and update the
                "last updated" date so returning visitors can see that
                something changed.
              </p>
            </div>
          </section>

          {/* User Rights / Control */}
          <section id="control">
            <h2 className="text-2xl font-bold mb-4">14. You&apos;re Always in Control</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Because everything of yours lives in your own browser, control
              over your data is straightforward and largely in your hands:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-muted-foreground">
              <li>Clear your browser&apos;s local storage at any time to remove anything saved by LizoCalc</li>
              <li>Clear or block cookies to stop analytics tracking, using the steps in Section 12</li>
              <li>Use private or incognito browsing if you&apos;d rather nothing be saved at all during a session</li>
              <li>Ask us directly if you&apos;re ever unsure what a specific calculator or cookie does, or why it exists</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              There&apos;s no "delete my account" request to make, because
              there&apos;s no account, and no "download my data" request to
              make, because your calculator data was always on your device,
              not ours. The one exception, going forward, is anything you
              voluntarily submit through the reviews feature described
              above, once it launches — that will come with its own,
              specific controls.
            </p>
          </section>

          {/* Changes */}
          <section id="changes">
            <h2 className="text-2xl font-bold mb-4">15. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We update this policy whenever something material changes
              about how LizoCalc handles data — a new cookie, a new
              analytics or advertising provider, or a new feature like the
              reviews system described in Section 13. Whenever that
              happens, we&apos;ll revise the relevant section, add a plain-
              language explanation of what&apos;s new, and move the "Last
              updated" date at the top of this page forward, so a returning
              visitor can tell at a glance whether anything has changed
              since their last visit. We don&apos;t make silent edits to
              this page. Checking back here periodically is the fastest way
              to stay current on how your data is handled.
            </p>
          </section>

          {/* Contact */}
          <section id="contact">
            <h2 className="text-2xl font-bold mb-4">16. Questions About This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              If anything here is unclear, or you want more detail on how a
              specific calculator, cookie, or upcoming feature handles your
              data, reach out directly — we&apos;d rather answer the
              question plainly than have you guess. You can also read our{" "}
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