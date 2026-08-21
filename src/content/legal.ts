import type { LegalDocument } from './types'

/**
 * Legal pages.
 *
 * TEMPLATES. These describe what the site actually does — the Snapshot form's
 * fields, the processors it hands them to, and the analytics that run — so the
 * facts in them are correct as of writing. The structure and the language are
 * not a lawyer's work and have not been reviewed by one. Anything here is
 * subject to a legal read before launch.
 *
 * Keep them true: if the form gains a field, or a processor is swapped, the
 * "What we collect" and "Who we share it with" sections have to change with
 * it, or the page becomes a false statement rather than an out-of-date one.
 */

/** One address for every legal and privacy request. */
export const legalContact = {
  entity: 'Bianomics LLC',
  email: 'support@bianomics.com',
  emailHref: 'mailto:support@bianomics.com',
  locality: 'El Paso, Texas',
  state: 'Texas',
  venue: 'El Paso County, Texas',
} as const

const EFFECTIVE = '21 August 2026'

export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  description:
    'What Bianomics collects when you use this site or request a Snapshot, why we collect it, who processes it, and the rights you have over it.',
  effective: EFFECTIVE,
  sections: [
    {
      id: 'who-we-are',
      heading: 'Who we are',
      body: [
        `${legalContact.entity} ("Bianomics", "we", "us") is a communications and workforce company based in ${legalContact.locality}. This policy covers bianomics.com and the forms on it.`,
        `For anything in this policy, write to ${legalContact.email}.`,
      ],
    },
    {
      id: 'what-we-collect',
      heading: 'What we collect',
      body: [
        'Information you give us. The Snapshot form asks for your name, your organization, your email address, what your organization does, your biggest communications or brand challenge, what a win would look like in ninety days, and whether you have worked with an agency before. If you email or call us instead, we hold whatever you choose to put in that message.',
        'Information collected automatically. If analytics are enabled, we record which pages you view, which calls to action you click, how far down a page you scroll, and whether a form submission succeeded, along with your approximate location derived from your IP address, your device type, and your browser. Our host keeps standard server logs.',
        'What we do not collect on this site:',
        {
          list: [
            'Payment details. Nothing on this site takes a payment.',
            'Account credentials. There is nothing to sign in to.',
            'Special category data. We do not ask for it, and the form fields are not designed to invite it.',
          ],
        },
      ],
    },
    {
      id: 'how-we-use-it',
      heading: 'How we use it',
      body: [
        'To read your Snapshot and send you the result. To reply to you. To decide whether we are the right fit for the work you describe. To understand which parts of the site are useful and which are not, so we can improve them. To keep the site secure and working.',
        'We do not sell your information, and we do not share it for cross-context behavioural advertising.',
      ],
    },
    {
      id: 'legal-bases',
      heading: 'Our legal bases',
      body: [
        'Where the GDPR applies, we rely on the following:',
        {
          list: [
            'Your consent, when you submit a form or agree to analytics.',
            'Our legitimate interests in running and improving the site, and in responding to enquiries about our work.',
            'Steps taken at your request before entering into a contract, when your Snapshot leads to a proposal.',
            'Compliance with a legal obligation, where one applies.',
          ],
        },
      ],
    },
    {
      id: 'processors',
      heading: 'Who processes it',
      body: [
        'We use a small number of service providers, each handling data only on our instructions:',
        {
          list: [
            'Vercel, for hosting and server logs.',
            'Make, which routes Snapshot submissions from the form to our systems.',
            'monday.com, where Snapshot submissions are held so we can work through them.',
            'Resend, which delivers the email copy of a submission to us.',
            'PostHog, for the site analytics described above, where enabled.',
            'Google Analytics, for the site analytics described above, where enabled.',
          ],
        },
        'We do not give your information to anyone else unless you ask us to, or unless the law requires it.',
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies and similar technologies',
      body: [
        'Where analytics are enabled, our analytics providers set cookies to recognise a returning browser and to join a sequence of page views into one visit. Nothing on this site requires cookies to function.',
        'You can block or delete cookies in your browser settings. We honour Global Privacy Control signals where your browser sends one.',
      ],
    },
    {
      id: 'international',
      heading: 'Where your information goes',
      body: [
        'We are based in the United States and our providers process data there. If you are in the European Economic Area or the United Kingdom, submitting a form means your information is transferred to the United States. Where those transfers require a safeguard, we rely on the European Commission’s Standard Contractual Clauses through our agreements with the providers listed above.',
      ],
    },
    {
      id: 'retention',
      heading: 'How long we keep it',
      body: [
        'Snapshot submissions are kept for as long as we are in conversation with you and for up to three years afterwards, so that we can pick up where we left off if you come back. Analytics data is kept for up to two years. Server logs are kept for a short period, set by our host.',
        `Ask us to delete your information sooner and we will, unless we are required to keep it. Write to ${legalContact.email}.`,
      ],
    },
    {
      id: 'security',
      heading: 'How we protect it',
      body: [
        'Submissions travel over an encrypted connection and are held in access-controlled systems. Only the people who need to see a submission can see it. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your rights',
      body: [
        `Wherever you are, you can ask us for a copy of what we hold about you, ask us to correct it, or ask us to delete it. Write to ${legalContact.email} and we will respond within the time the law allows.`,
      ],
    },
    {
      id: 'california',
      heading: 'California residents',
      body: [
        'Under the California Consumer Privacy Act as amended, California residents have the right to know what personal information we collect and why, to request a copy of it, to request its correction or deletion, and to limit the use of sensitive personal information. We do not collect sensitive personal information through this site.',
        'In the last twelve months we have collected identifiers (name, email address), commercial information (what you tell us about your organization and its needs), and internet activity (how you used this site). We collected it from you directly and from your use of the site, for the purposes described above.',
        'We have not sold personal information and have not shared it for cross-context behavioural advertising, in the last twelve months or at any time.',
        `To exercise any of these rights, write to ${legalContact.email}. We will not treat you differently for asking.`,
      ],
    },
    {
      id: 'eea-uk',
      heading: 'EEA and UK residents',
      body: [
        'In addition to the rights above, you have the right to object to processing based on our legitimate interests, the right to ask us to restrict processing, the right to receive your information in a portable format, and the right to withdraw consent at any time without affecting what we did before you withdrew it.',
        'You also have the right to complain to your local supervisory authority. We would rather you came to us first so we can put it right.',
      ],
    },
    {
      id: 'children',
      heading: 'Children',
      body: [
        'This site is meant for people acting on behalf of an organization. It is not directed at children, and we do not knowingly collect information from anyone under sixteen. If you believe a child has sent us information, write to us and we will delete it.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      body: [
        'If we change how we handle your information, we will update this page and change the date at the top. If the change is significant, we will say so clearly rather than quietly amending the text.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      body: [
        `Questions, requests, or complaints about this policy go to ${legalContact.email}, or to ${legalContact.entity}, ${legalContact.locality}.`,
      ],
    },
  ],
}

export const termsOfService: LegalDocument = {
  title: 'Terms & Conditions',
  description:
    'The terms you agree to by using the Bianomics website and by submitting a Snapshot request.',
  effective: EFFECTIVE,
  sections: [
    {
      id: 'agreement',
      heading: 'Agreement to these terms',
      body: [
        `These terms are between you and ${legalContact.entity} ("Bianomics", "we", "us"). By using bianomics.com or submitting anything through it, you agree to them. If you do not, please do not use the site.`,
      ],
    },
    {
      id: 'what-this-is',
      heading: 'What this site is',
      body: [
        'This site describes what we do and invites you to start a conversation. Nothing on it is an offer capable of acceptance, and nothing on it creates a client relationship.',
        'If we go on to work together, that work is governed by a separate signed agreement. Where these terms and that agreement disagree, the signed agreement wins.',
      ],
    },
    {
      id: 'snapshot',
      heading: 'Snapshot requests',
      body: [
        'The Snapshot is a free read of where your communications or brand position stands. It is our opinion, given in good faith on the information you provide. It is not a guarantee of any outcome, and it is not legal, financial, or regulatory advice.',
        'By submitting a Snapshot request you confirm that:',
        {
          list: [
            'You are authorised to share the information you send us.',
            'The information is accurate as far as you know.',
            'You are not sending us anything confidential, privileged, or subject to a third party’s rights, unless we have separately agreed in writing to receive it.',
          ],
        },
        'We may decline any request, and we are not obliged to explain why.',
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      body: [
        'Do not use this site to break the law, to send anything harmful or deliberately false, to impersonate anyone, to scrape or harvest it at scale, to interfere with how it runs, or to try to reach parts of it you have not been given access to.',
      ],
    },
    {
      id: 'intellectual-property',
      heading: 'Intellectual property',
      body: [
        'The text, design, photography, and code on this site belong to us or to the people who licensed them to us. The Bianomics name and marks, including Groundwork™, are ours. You may read, print, and share pages for your own reference. You may not republish, sell, or build a competing offering from them.',
        'Client work shown on this site remains the property of the clients it belongs to, and appears here with their permission.',
      ],
    },
    {
      id: 'third-parties',
      heading: 'Links to other sites',
      body: [
        'Some links lead off this site, including the application forms for our programmes. We do not control those destinations and are not responsible for them. Their terms and privacy policies apply once you arrive.',
      ],
    },
    {
      id: 'no-warranty',
      heading: 'No warranties',
      body: [
        'This site is provided as it is and as it is available. We do not promise it will be uninterrupted, error free, or fit for any particular purpose, and to the fullest extent the law allows we exclude all implied warranties.',
        'We work to keep what is written here accurate, but figures, availability, and programme dates change.',
      ],
    },
    {
      id: 'liability',
      heading: 'Limitation of liability',
      body: [
        'To the fullest extent the law allows, we are not liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, revenue, data, or goodwill, arising out of your use of this site.',
        'Nothing in these terms limits liability that cannot lawfully be limited, including for fraud or for death or personal injury caused by negligence.',
      ],
    },
    {
      id: 'indemnity',
      heading: 'Indemnity',
      body: [
        'You agree to cover us against claims and costs arising from your misuse of this site or your breach of these terms.',
      ],
    },
    {
      id: 'privacy',
      heading: 'Privacy',
      body: [
        'What we do with the information you send us is set out in our Privacy Policy, which forms part of these terms.',
      ],
    },
    {
      id: 'governing-law',
      heading: 'Governing law',
      body: [
        `These terms are governed by the laws of the State of ${legalContact.state}, without regard to its conflict of laws rules. Any dispute goes to the state or federal courts sitting in ${legalContact.venue}, and you and we both agree to that venue.`,
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to these terms',
      body: [
        'We may update these terms. The date at the top says when they last changed, and using the site after that date means you accept the update.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      body: [
        `Questions about these terms go to ${legalContact.email}, or to ${legalContact.entity}, ${legalContact.locality}.`,
      ],
    },
  ],
}
