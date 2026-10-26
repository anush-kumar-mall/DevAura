
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Cookie,
  Mail,
  ExternalLink,
} from 'lucide-react';

const LAST_UPDATED = 'October 26, 2026';
const CONTACT_EMAIL = 'mallanushkumar@gmail.com';

const policies = {
  '/privacy-policy': {
    title: 'Privacy Policy',
    eyebrow: 'YOUR DATA, YOUR TRUST',
    icon: ShieldCheck,
    intro:
      'This Privacy Policy explains how DevAura collects, uses, stores, and shares information when you use our website and collaborative coding tools.',
    sections: [
      {
        title: '1. Information we may collect',
        body: [
          [
            'Account information',
            'If you create an account or sign in through a supported provider, we may process your username, email address, profile name, avatar, and authentication-related identifiers. Google or GitHub may provide information according to the permissions and settings you choose with that provider.',
          ],
          [
            'Workspace and content information',
            'We may store room identifiers, participant names, room activity, code files and their contents, whiteboard state, and AI assistant chat history when those features are used. Other people in the same room may be able to see content you share there. Do not place secrets, passwords, API keys, or confidential information in a shared workspace unless you understand the risks.',
          ],
          [
            'Usage and technical information',
            'We may process basic activity and technical information needed to operate, secure, troubleshoot, and improve the service, such as session activity, feature usage, timestamps, and information included in server or hosting logs. The exact information recorded can depend on the feature and hosting provider.',
          ],
          [
            'Messages you send us',
            'If you contact us, we receive the information and contact details you include in your message.',
          ],
        ],
      },
      {
        title: '2. How we use information',
        body: [
          [
            'Operate the service',
            'To create and manage accounts and rooms, enable real-time collaboration, save workspace content and chat history where supported, and provide requested features.',
          ],
          [
            'Improve reliability and safety',
            'To troubleshoot errors, prevent abuse, protect the service, enforce our terms, and understand feature usage.',
          ],
          [
            'Provide AI features',
            'When you use an AI assistant or code-suggestion feature, the relevant prompt, code, or surrounding context may be sent to the AI provider configured for that feature so it can generate a response. Avoid sending information you do not want processed by that provider.',
          ],
        ],
      },
      {
        title: '3. When information may be shared',
        body: [
          [
            'Other workspace participants',
            'Content and profile details you share in a room may be visible to other participants in that room. Room links and identifiers should be shared only with people you intend to invite.',
          ],
          [
            'Service providers',
            'We rely on third-party infrastructure and service providers for functions such as hosting, databases, authentication, email delivery, and AI responses. They process information as needed to provide those services under their own terms and privacy practices.',
          ],
          [
            'Legal and safety reasons',
            'We may disclose information where reasonably necessary to comply with applicable law, respond to lawful requests, protect users, or protect the rights and security of DevAura and others.',
          ],
          [
            'No sale of personal information',
            'We do not intend to sell your personal information.',
          ],
        ],
      },
      {
        title: '4. Storage and retention',
        body: [
          [
            'Retention',
            'We keep information for as long as reasonably necessary to provide the service, maintain workspace history, meet legitimate operational needs, resolve disputes, and comply with legal obligations. Retention periods may vary by data type and provider.',
          ],
          [
            'Security',
            'We use reasonable technical and organizational measures intended to protect information. No website, transmission, or storage system can be guaranteed to be completely secure.',
          ],
          [
            'Your choices',
            'You can avoid creating an account where guest access is offered, limit what you share in rooms, and stop using optional AI features. To ask about access, correction, or deletion of information, contact us using the address below. We may need to verify your request and may retain certain information where legally or operationally required.',
          ],
        ],
      },
      {
        title: '5. Third-party services and children',
        body: [
          [
            'External services',
            'Sign-in providers, AI services, and hosting providers have their own privacy policies. Their handling of information is governed by their terms and policies, not this document alone.',
          ],
          [
            'Children',
            'DevAura is not designed for children under 13, and we do not knowingly seek to collect personal information from children under 13. If you believe a child has provided personal information, contact us.',
          ],
        ],
      },
      {
        title: '6. Changes and contact',
        body: [
          [
            'Updates',
            'We may update this policy as the product changes. The revised version will be posted on this page with an updated date.',
          ],
          [
            'Contact',
            `Questions or privacy requests can be sent to ${CONTACT_EMAIL}.`,
          ],
        ],
      },
    ],
  },

  '/terms-of-service': {
    title: 'Terms of Service',
    eyebrow: 'CLEAR RULES. BETTER COLLABORATION.',
    icon: FileText,
    intro:
      'These Terms govern your access to and use of DevAura. By using the service, you agree to these Terms. If you do not agree, do not use DevAura.',
    sections: [
      {
        title: '1. Using DevAura',
        body: [
          [
            'Eligibility and accounts',
            'You must be legally able to agree to these Terms. You are responsible for keeping your sign-in credentials secure and for activity carried out through your account. Provide accurate information and tell us if you believe your account has been compromised.',
          ],
          [
            'Guest access and rooms',
            'Some features may be available without an account. Room links or identifiers can allow others to join a workspace, depending on its settings. You are responsible for sharing access only with intended participants.',
          ],
          [
            'Changes to the service',
            'Features may be added, changed, limited, suspended, or discontinued as the project develops. We do not guarantee that every feature will always be available.',
          ],
        ],
      },
      {
        title: '2. Acceptable use',
        body: [
          [
            'You agree not to',
            'Use DevAura to break the law, infringe another person’s rights, distribute malware, attempt unauthorized access, disrupt the service, abuse other users, or bypass security and usage limits.',
          ],
          [
            'Shared workspaces',
            'Treat shared rooms as collaborative spaces. Do not upload or share content unless you have the right to do so. You are responsible for maintaining your own backups of important code and other content.',
          ],
          [
            'Enforcement',
            'We may restrict or suspend access where reasonably necessary to protect the service or users, address abuse, or comply with law.',
          ],
        ],
      },
      {
        title: '3. Your content and AI tools',
        body: [
          [
            'Your content',
            'You retain whatever rights you have in code, messages, and other material you submit. You grant DevAura permission to host, process, transmit, and display that content only as reasonably needed to operate the features you use.',
          ],
          [
            'Visibility',
            'Content placed in a collaborative room may be visible to room participants. Do not treat a shared room as a private storage vault.',
          ],
          [
            'AI-generated output',
            'AI suggestions and generated content can be incomplete, inaccurate, insecure, or unsuitable for your purpose. Review and test outputs before relying on them, especially before using generated code in production. You are responsible for checking licensing, security, correctness, and suitability.',
          ],
        ],
      },
      {
        title: '4. Third-party services',
        body: [
          [
            'Integrations and providers',
            'DevAura may rely on third-party services for sign-in, hosting, email, code execution, or AI features. Your use of those services may also be subject to their terms and policies. We are not responsible for third-party services that we do not control.',
          ],
        ],
      },
      {
        title: '5. Availability, disclaimers, and liability',
        body: [
          [
            'As available',
            'To the extent permitted by applicable law, DevAura is provided on an “as is” and “as available” basis, without warranties that the service will be uninterrupted, error-free, secure, or suitable for a particular purpose.',
          ],
          [
            'No critical-use guarantee',
            'Do not rely on DevAura as the sole copy of important work or for emergency, safety-critical, or other high-risk use cases. Keep independent backups and verify code before deployment.',
          ],
          [
            'Limitation',
            'To the maximum extent permitted by applicable law, DevAura and its operator will not be liable for indirect, incidental, special, consequential, or punitive losses, or loss of data, profits, or business opportunities arising from use of the service. Nothing in these Terms excludes liability that cannot lawfully be excluded.',
          ],
        ],
      },
      {
        title: '6. Suspension, updates, and contact',
        body: [
          [
            'Ending use',
            'You may stop using DevAura at any time. We may suspend or discontinue access as described in these Terms. Some information may remain in backups or records for a limited period or where retention is required.',
          ],
          [
            'Changes to these Terms',
            'We may revise these Terms as the service evolves. Continued use after an updated version is posted means you accept the revised Terms to the extent permitted by law.',
          ],
          [
            'Contact',
            `Questions about these Terms can be sent to ${CONTACT_EMAIL}. These Terms are subject to applicable law, and any mandatory rights you have under that law remain unaffected.`,
          ],
        ],
      },
    ],
  },

  '/cookie-policy': {
    title: 'Cookie Policy',
    eyebrow: 'A LITTLE CLARITY ABOUT BROWSER STORAGE',
    icon: Cookie,
    intro:
      'This page explains cookies and similar technologies that may be used when you visit DevAura. The technologies in use can change as the product and its providers change.',
    sections: [
      {
        title: '1. What are cookies?',
        body: [
          [
            'Cookies',
            'Cookies are small text files a website can store in your browser. Similar technologies include local storage and session storage, which can retain information in your browser without being cookies.',
          ],
        ],
      },
      {
        title: '2. How DevAura may use them',
        body: [
          [
            'Essential functionality',
            'DevAura may use browser storage or essential cookies to support sign-in state, maintain session-related functionality, remember basic preferences, protect the service, or make the application work reliably.',
          ],
          [
            'Authentication and embedded providers',
            'If you use Google, GitHub, or another third-party feature, that provider may set or read its own cookies or similar technologies under its own policies. Hosting and security providers may also use technologies necessary to deliver or protect the website.',
          ],
          [
            'Analytics and advertising',
            'This policy does not claim that DevAura currently operates advertising cookies or cross-site advertising trackers. If optional analytics or advertising technologies are added later, this policy should be updated and any consent required by applicable law should be obtained.',
          ],
        ],
      },
      {
        title: '3. Managing browser storage',
        body: [
          [
            'Browser controls',
            'Most browsers let you block or delete cookies and clear site data through their settings. You can also use private browsing where available. Blocking essential storage may prevent sign-in or some features from working correctly.',
          ],
          [
            'Local storage',
            'Clearing site data can remove locally stored preferences or sign-in information and may sign you out. It does not necessarily delete information already stored on DevAura servers.',
          ],
        ],
      },
      {
        title: '4. Updates and contact',
        body: [
          [
            'Updates',
            'We may update this Cookie Policy when technologies or product features change. Please check this page for the latest version.',
          ],
          [
            'Contact',
            `Questions about cookies or browser storage can be sent to ${CONTACT_EMAIL}.`,
          ],
        ],
      },
    ],
  },
};

function PolicySection({ section }) {
  return (
    <section className="border-b border-white/10 py-8 last:border-b-0">
      <h2 className="mb-5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {section.title}
      </h2>

      <div className="space-y-5">
        {section.body.map(([heading, text]) => (
          <div key={heading}>
            <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-pink-300">
              {heading}
            </h3>

            <p className="text-sm leading-7 text-white/70 sm:text-base">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function LegalPage() {
  const { pathname } = useLocation();

  // Scroll to the top whenever the legal page changes.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname]);

  const normalizedPath = pathname.replace(/\/$/, '');
  const policy = policies[normalizedPath] || policies['/privacy-policy'];
  const Icon = policy.icon;

  return (
    <main className="min-h-screen overflow-hidden bg-[#07070b] text-white">
      {/* Background effects */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-40 -top-32 h-96 w-96 rounded-full bg-pink-600/10 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          {/* DevAura text logo */}
          <Link
            to="/"
            className="group flex items-center"
            aria-label="DevAura home"
          >
            <span className="text-2xl font-extrabold tracking-tight text-white transition duration-300 group-hover:scale-[1.02]">
              Dev<span className="text-pink-400">Aura</span>
              
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition hover:border-pink-400/50 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </header>

      {/* Policy content */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/5 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-pink-300">
          <Icon size={15} />
          {policy.eyebrow}
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          {policy.title}
          <span className="text-pink-400">.</span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
          {policy.intro}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/45 sm:text-sm">
          <span>Last updated: {LAST_UPDATED}</span>
          <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
          <span>DevAura</span>
        </div>

        <article className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] px-5 py-2 shadow-2xl shadow-black/20 sm:px-9">
          {policy.sections.map((section) => (
            <PolicySection key={section.title} section={section} />
          ))}
        </article>

        {/* Contact section */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-pink-400/15 bg-pink-400/[0.045] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-semibold text-white">
              Still have a question?
            </h2>
            <p className="mt-1 text-sm leading-6 text-white/60">
              Reach out and we’ll do our best to help.
            </p>
          </div>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400"
          >
            <Mail size={16} />
            Contact us
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} DevAura. All rights reserved.
          </span>

          <nav
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Legal pages"
          >
            <Link
              to="/privacy-policy"
              className="transition hover:text-pink-300"
            >
              Privacy
            </Link>

            <Link
              to="/terms-of-service"
              className="transition hover:text-pink-300"
            >
              Terms
            </Link>

            <Link
              to="/cookie-policy"
              className="transition hover:text-pink-300"
            >
              Cookies
            </Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
