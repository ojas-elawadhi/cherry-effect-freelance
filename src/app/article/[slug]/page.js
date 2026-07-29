import Link from "next/link";
import { notFound } from "next/navigation";

import CustomCursor from "@/components/custom-cursor";
import {
  articles,
  getArticleBySlug,
  getNextArticle,
} from "@/content/articles";

import styles from "./page.module.css";

const SITE_URL = "https://thecherryeffect.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const canonicalPath = `/article/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: [
      article.category,
      "business strategy",
      "market analysis",
      article.shortTitle,
    ],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${canonicalPath}`,
      title: article.title,
      description: article.description,
      siteName: "The Cherry Effect",
      publishedTime: article.publishedYear,
      section: article.category,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function Paragraph({ text }) {
  const firstPeriod = text.indexOf(".");
  const hasLeadLabel = firstPeriod > 0 && firstPeriod <= 52;

  if (!hasLeadLabel) {
    return <p className={styles.paragraph}>{text}</p>;
  }

  return (
    <p className={styles.paragraph}>
      <strong className={styles.leadLabel}>
        {text.slice(0, firstPeriod + 1)}
      </strong>{" "}
      {text.slice(firstPeriod + 1).trimStart()}
    </p>
  );
}

function ArticleBlock({ block, sectionNumber }) {
  if (block.type === "paragraph") {
    return <Paragraph text={block.text} />;
  }

  if (block.type === "heading") {
    const Heading = block.level === 3 ? "h3" : "h2";

    return (
      <Heading
        id={block.id}
        className={
          block.level === 3 ? styles.subheading : styles.sectionHeading
        }
      >
        {block.level === 2 ? (
          <span className={styles.sectionNumber}>
            Section {String(sectionNumber).padStart(2, "0")}
          </span>
        ) : null}
        <a
          href={`#${block.id}`}
          className={styles.headingLink}
          aria-label={`Link to ${block.text}`}
        >
          {block.text}
        </a>
      </Heading>
    );
  }

  if (block.type === "list") {
    return (
      <section className={styles.labelList} aria-label={block.ariaLabel}>
        <ul>
          {block.items.map((item) => (
            <li key={item.label}>
              <strong className={styles.listLabel}>{item.label}</strong>
              <span className={styles.listText}>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (block.type === "table") {
    return (
      <div
        className={styles.tableRegion}
        role="region"
        aria-label={block.caption}
        tabIndex="0"
      >
        <table className={styles.table}>
          <caption>{block.caption}</caption>
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join("-")}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (block.type === "references") {
    return (
      <ol className={styles.references}>
        {block.items.map((reference) => (
          <li key={reference}>{reference}</li>
        ))}
      </ol>
    );
  }

  return null;
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const nextArticle = getNextArticle(article.slug);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${article.href}#article`,
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}${article.href}`,
    mainEntityOfPage: `${SITE_URL}${article.href}`,
    datePublished: article.publishedYear,
    articleSection: article.category,
    wordCount: article.wordCount,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "The Cherry Effect",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "The Cherry Effect",
    },
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
  };
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <CustomCursor />
      <div className={styles.atmosphere} />

      <div className={styles.shell}>
        <nav className={styles.journalNav} aria-label="Journal navigation">
          <Link href="/article" className={styles.journalMark}>
            <span className={styles.markDot} aria-hidden="true" />
            The Cherry Effect / Journal
          </Link>
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/article" className={styles.navLink}>
              All articles
            </Link>
          </div>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroMeta}>
            <span>{article.category}</span>
            <span>{article.year}</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.standfirst}>{article.standfirst}</p>
        </header>

        <dl className={styles.metadataBar}>
          <div className={styles.metadataItem}>
            <dt className={styles.metadataLabel}>Source note</dt>
            <dd className={styles.metadataValue}>{article.sourceNote}</dd>
          </div>
          <div className={styles.metadataItem}>
            <dt className={styles.metadataLabel}>Reading time</dt>
            <dd className={styles.metadataValue}>{article.readTime}</dd>
          </div>
          <div className={styles.metadataItem}>
            <dt className={styles.metadataLabel}>Research focus</dt>
            <dd className={styles.metadataValue}>{article.category}</dd>
          </div>
        </dl>

        <div className={styles.readingLayout}>
          <aside className={styles.toc} aria-label="Table of contents">
            <p className={styles.tocLabel}>In this article</p>
            <ol className={styles.tocList}>
              {article.toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`${styles.tocLink} ${
                      item.level === 3 ? styles.tocNested : ""
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className={styles.articleBody}>
            {article.blocks.map((block, index) => {
              const sectionNumber = article.blocks
                .slice(0, index + 1)
                .filter(
                  (candidate) =>
                    candidate.type === "heading" && candidate.level === 2,
                ).length;

              return (
                <ArticleBlock
                  key={`${block.type}-${block.id ?? block.text ?? index}`}
                  block={block}
                  sectionNumber={sectionNumber}
                />
              );
            })}
          </article>
        </div>
      </div>

      <footer className={styles.articleFooter}>
        <div className={styles.footerInner}>
          <Link href="/article" className={styles.footerLink}>
            <span className={styles.footerKicker}>Journal index</span>
            <span className={styles.footerTitle}>Back to all articles</span>
          </Link>
          <Link href={nextArticle.href} className={styles.footerLink}>
            <span className={styles.footerKicker}>Read next</span>
            <span className={styles.footerTitle}>{nextArticle.shortTitle}</span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
