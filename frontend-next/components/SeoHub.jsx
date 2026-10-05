import Link from "next/link";
import styles from "./SeoLandingPage.module.css";
import { SITE_URL } from "../lib/siteConfig";

const BACKEND = process.env.BACKEND_URL || "http://localhost:5031";

export default async function SeoHub({ title, intro, path, pageType, children = [] }) {
  let pages = [];
  try {
    const response = await fetch(`${BACKEND}/api/seo-pages/indexable?pageType=${encodeURIComponent(pageType)}`, {
      next: { revalidate: 3600, tags: ["seo-pages", `seo-hub:${pageType}`] },
    });
    if (response.ok) pages = await response.json();
  } catch {}

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: title, item: `${SITE_URL}${path}` },
    ],
  };
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{title}</span></nav>
    <header className={styles.hero}><p className={styles.eyebrow}>Planning hub</p><h1>{title}</h1><p>{intro}</p></header>
    <div className={styles.grid}><article className={styles.content}>{children}
      {pages.length > 0 && <section><h2>Explore approved guides and collections</h2><ul className={styles.links}>{pages.map((page) => <li key={page.path}><Link href={page.path}>{page.h1 || page.name}</Link>{page.intro && <p>{page.intro}</p>}</li>)}</ul></section>}
      {pages.length === 0 && <section><h2>Guides are added after editorial review</h2><p>New pages are only published when their product fit, information and internal links have been reviewed. Browse the product categories or contact the team to discuss a brief.</p></section>}
      <Link href="/contact" className={styles.cta}>Discuss a requirement</Link>
    </article><aside className={styles.side}><h2>Start here</h2><ul className={styles.links}>{children ? <><li><Link href="/collection">Browse product collections</Link></li><li><Link href="/locations">Browse service areas</Link></li><li><Link href="/contact">Request a quote</Link></li></> : null}</ul></aside></div>
  </main>;
}
