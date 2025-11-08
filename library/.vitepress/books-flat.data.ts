import { createContentLoader } from "vitepress";

export interface FlatBook {
  title: string;
  url: string;
  author: string;
  authorSlug: string;
  date?: string;
  categories?: string[];
  tags?: string[];
}

// Function to get author name from slug (same as in books.data.ts)
function getAuthorName(slug: string): string {
  const authorNames: Record<string, string> = {
    "allama-ahmed-saeed-kazmi": "علامہ احمد سعید کاظمی",
    "dr.altaf-hussain-saeedi": "ڈاکٹر الطاف حسین سعیدی",
    "khalil-ahmed-rana": "خلیل احمد رانا",
    "allama-arshad-ul-qadri": "علامہ ارشدالقادری",
  };
  return authorNames[slug] || slug;
}

export default createContentLoader("**/*.md", {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData): FlatBook[] {
    // Filter out non-book pages (exclude index, books, articles, etc)
    const bookPages = rawData.filter(page => {
      const parts = page.url.split("/");
      // Must have authors/author/book structure
      return (
        parts.length === 4 && parts[1] === "authors" && parts[2] && parts[3]
      );
    });

    // Process book files
    const books = bookPages
      .filter(page => !page.url.endsWith("/index.md"))
      .map(page => {
        const parts = page.url.split("/");
        const authorSlug = parts[2]; // Extract author slug from URL path

        const title = page.frontmatter?.title;
        const authorName = getAuthorName(authorSlug);

        if (!title || !authorName) {
          return null;
        }

        return {
          title,
          url: page.url,
          author: authorName,
          authorSlug,
          date: page.frontmatter?.date,
          categories: page.frontmatter?.categories || [],
          tags: page.frontmatter?.tags || [],
        };
      })
      .filter((book): book is FlatBook => book !== null)
      .sort((a, b) => a.title.localeCompare(b.title, "ur")); // Sort by title alphabetically

    return books;
  },
});
