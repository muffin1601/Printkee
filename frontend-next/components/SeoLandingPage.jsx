import Link from "next/link";
import styles from "./SeoLandingPage.module.css";
import { SITE_URL, toPublicProductSlug, toPublicSubcategorySlug } from "../lib/siteConfig";

const humanize = (value = "") => String(value).replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const allLinks = (page) => [
  ...(page.relatedCategories || []),
  ...(page.relatedPages || []),
  ...(page.relatedLocations || []),
].filter((link) => link?.url && link?.label);

const productPath = (product) => {
  const category = product.category?.slug;
  const subcategory = product.subcategory?.slug;
  if (!category || !subcategory || !product.slug) return "";
  return `/${category}/${toPublicSubcategorySlug(subcategory)}/${toPublicProductSlug(product.slug)}`;
};

export default function SeoLandingPage({ page }) {
  const links = allLinks(page);
  const segments = page.path.split("/").filter(Boolean);
  const canonical = page.canonicalUrl || `${SITE_URL}${page.path}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...segments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: index === segments.length - 1 ? page.h1 : humanize(segment),
        item: `${SITE_URL}/${segments.slice(0, index + 1).join("/")}`,
      })),
    ],
  };
  const collectionSchema = page.schemaOptions?.collectionPage !== false ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.h1,
    description: page.metaDescription || page.intro,
    url: canonical,
  } : null;
  const itemList = page.schemaOptions?.itemList !== false && page.featuredProducts?.length ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.h1,
    itemListElement: page.featuredProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${SITE_URL}${productPath(product)}`,
    })),
  } : null;
  const faqSchema = page.schemaOptions?.faq !== false && page.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  return (
    <main className={styles.page}>
      {page.schemaOptions?.breadcrumb !== false && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />}
      {collectionSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />}
      {itemList && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span>
        {segments.map((segment, index) => <span key={segment}>{index === segments.length - 1 ? page.h1 : humanize(segment)}{index < segments.length - 1 ? " /" : ""}</span>)}
      </nav>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{humanize(page.pageType)}</p>
        <h1>{page.h1}</h1>
        <p>{page.intro}</p>
      </header>
      <div className={styles.grid}>
        <article className={styles.content}>
          {page.bodyContent && <section>{page.bodyContent.split(/\n{2,}/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>}
          {(page.contentBlocks || []).map((block, index) => block?.body && <section key={`${block.heading}-${index}`}><h2>{block.heading}</h2><p>{block.body}</p></section>)}
          {page.featuredProducts?.length > 0 && <section><h2>Relevant products</h2><div className={styles.products}>{page.featuredProducts.map((product) => {
            const href = productPath(product);
            return href ? <Link href={href} className={styles.product} key={product._id}><img src={product.images?.[0]?.url || "/assets/placeholder.webp"} alt={product.images?.[0]?.altText || product.name} /><span>{product.name}</span></Link> : null;
          })}</div></section>}
          {page.faqs?.length > 0 && <section className={styles.faq}><h2>Questions to consider</h2>{page.faqs.map((faq, index) => <details key={`${faq.question}-${index}`}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>}
          <Link href="/contact" className={styles.cta}>{page.ctaText || "Request a Quote"}</Link>
        </article>
        <aside className={styles.side} aria-label="Related pages"><h2>Explore related options</h2><ul className={styles.links}>{links.map((link) => <li key={`${link.url}-${link.label}`}><Link href={link.url}>{link.label}</Link></li>)}</ul></aside>
      </div>
    </main>
  );
}
