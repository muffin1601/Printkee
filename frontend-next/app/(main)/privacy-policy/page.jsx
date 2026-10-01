import Link from "next/link";
import styles from "../../../styles/PrivacyPolicy.module.css";

const BASE = "https://printkee.com";

export const metadata = {
  title: { absolute: "Privacy Policy | Printkee" },
  description:
    "Read how Printkee collects, uses, shares and protects personal information submitted through its website, enquiry forms, newsletter and analytics tools.",
  alternates: { canonical: `${BASE}/privacy-policy` },
  openGraph: {
    title: "Privacy Policy | Printkee",
    description:
      "How Printkee handles personal information submitted through its website and services.",
    url: `${BASE}/privacy-policy`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Printkee",
    description: "How Printkee handles personal information submitted through its website.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Privacy Policy",
      item: `${BASE}/privacy-policy`,
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Legal &amp; Privacy</p>
            <h1>Privacy Policy</h1>
            <p>
              This policy explains how Printkee collects and handles personal information
              when you use our website or contact us about our products and services.
            </p>
            <p className={styles.updated}>Last updated: 1 October 2026</p>
          </div>
        </header>

        <div className={styles.layout}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Privacy Policy</span>
          </nav>

          <aside className={styles.summary} aria-labelledby="policy-summary">
            <h2 id="policy-summary">At a glance</h2>
            <p>
              We use information to respond to enquiries, prepare quotations, provide
              requested services, operate the website, send subscribed updates and
              understand website performance. We do not sell personal information.
            </p>
          </aside>

          <article className={styles.content}>
            <section>
              <h2>1. Who this policy applies to</h2>
              <p>
                This policy applies to visitors and business contacts who use
                <strong> printkee.com</strong>, submit an enquiry, request a quote, use the
                product customizer or chatbot, or subscribe to the Printkee newsletter.
              </p>
            </section>

            <section>
              <h2>2. Information we collect</h2>
              <p>Depending on how you interact with us, we may collect:</p>
              <ul>
                <li>
                  <strong>Contact and business details:</strong> name, company name, email
                  address, phone number and location.
                </li>
                <li>
                  <strong>Enquiry information:</strong> products, quantity, budget range,
                  sizes, artwork or customization requirements, and other details you choose
                  to provide.
                </li>
                <li>
                  <strong>Newsletter information:</strong> the email address used to subscribe.
                </li>
                <li>
                  <strong>Website and device information:</strong> page views, browser or
                  device information, approximate location, referring pages and interactions
                  measured through analytics and advertising technologies.
                </li>
                <li>
                  <strong>Browser-storage information:</strong> limited information used for
                  recently viewed products, chat display preferences and temporary product
                  customization state.
                </li>
              </ul>
              <p>
                Please do not submit confidential information that is not needed for your
                enquiry. If you provide information about another person, you should have
                authority to do so.
              </p>
            </section>

            <section>
              <h2>3. How we use information</h2>
              <p>We may use personal information to:</p>
              <ul>
                <li>respond to enquiries and prepare quotations;</li>
                <li>contact you about products, customization and order requirements;</li>
                <li>send newsletter updates when you subscribe;</li>
                <li>operate, secure, troubleshoot and improve the website;</li>
                <li>measure website usage and marketing performance;</li>
                <li>prevent misuse and comply with applicable legal obligations; and</li>
                <li>establish, exercise or defend legal claims where necessary.</li>
              </ul>
            </section>

            <section>
              <h2>4. Cookies, analytics and local storage</h2>
              <p>
                The website uses Google Analytics and Meta Pixel to measure visits,
                interactions and successful lead submissions. These providers may use
                cookies or similar technologies and process information under their own
                privacy terms. Your browser and device settings may allow you to block or
                remove cookies, although some website features may then work differently.
              </p>
              <p>
                We also use browser local or session storage for functional purposes such as
                recently viewed products, chatbot preferences and temporary customization
                details. This information remains on your device until it expires or is
                cleared by you or the website.
              </p>
            </section>

            <section>
              <h2>5. How information may be shared</h2>
              <p>
                We may share relevant information with service providers that help us run
                the website and respond to requests, including hosting, CRM, email delivery,
                analytics, advertising and technical-support providers. We may also share
                information when required by law, to protect legal rights, or as part of a
                business reorganisation subject to appropriate safeguards.
              </p>
              <p>
                Some providers may process information outside your state or country. Where
                applicable, we take reasonable steps to use providers and arrangements
                appropriate to the information and processing involved.
              </p>
            </section>

            <section>
              <h2>6. Data retention</h2>
              <p>
                We retain personal information only for as long as reasonably necessary for
                the purposes described in this policy, including responding to enquiries,
                maintaining business and legal records, resolving disputes, enforcing
                agreements and meeting applicable legal obligations. Retention periods may
                vary according to the type of information and the reason it is held.
              </p>
            </section>

            <section>
              <h2>7. Security</h2>
              <p>
                We use reasonable administrative and technical measures intended to protect
                personal information against unauthorized access, alteration, disclosure or
                loss. No internet transmission or storage system is completely secure, so we
                cannot promise absolute security.
              </p>
            </section>

            <section>
              <h2>8. Your choices and rights</h2>
              <p>
                Subject to applicable law, you may ask for information about the personal
                data we process about you, request correction or deletion, withdraw consent
                where processing is based on consent, or raise a concern about our handling
                of your information. You may unsubscribe from marketing emails using an
                available unsubscribe method or by contacting us.
              </p>
              <p>
                To make a request, email us using the contact details below. We may need to
                verify your identity before completing a request.
              </p>
            </section>

            <section>
              <h2>9. Children&apos;s privacy</h2>
              <p>
                Printkee&apos;s website and business services are not directed to children. We
                do not knowingly request personal information from children through our
                business enquiry forms. If you believe a child has provided personal
                information, please contact us so that we can review the matter.
              </p>
            </section>

            <section>
              <h2>10. External links</h2>
              <p>
                The website may link to third-party websites or social platforms. Their
                privacy practices are governed by their own notices, and we encourage you to
                review them before providing information.
              </p>
            </section>

            <section>
              <h2>11. Changes to this policy</h2>
              <p>
                We may update this policy when our practices, services or legal obligations
                change. The revised policy will be posted on this page with an updated date.
              </p>
            </section>

            <section className={styles.contact}>
              <h2>12. Contact us</h2>
              <p>For privacy questions or requests, contact:</p>
              <address>
                <strong>Printkee</strong>
                <br />
                F90/1, Beside ESIC Hospital, Okhla Industrial Area Phase 1,
                <br />
                New Delhi – 110020, India
                <br />
                Email: <a href="mailto:sales@printkee.com">sales@printkee.com</a>
                <br />
                Phone: <a href="tel:+918800904543">+91 88009 04543</a>
              </address>
            </section>
          </article>

          <p className={styles.reviewNote}>
            This page should be reviewed whenever Printkee changes its forms, analytics,
            service providers or data-handling practices.
          </p>
        </div>
      </div>
    </>
  );
}
