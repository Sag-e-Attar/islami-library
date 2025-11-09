import { createContentLoader } from "vitepress";
import authorsData from '../authors/authors.json'
import fs from 'fs'
import path from 'path'

export interface FlatBook {
  title: string;
  url: string;
  author: string;
  authorSlug: string;
  date?: string;
  fileDate?: Date;
  categories?: string[];
  tags?: string[];
}

// Function to get author name from slug using JSON data
function getAuthorName(slug: string): string {
  return authorsData[slug]?.name || slug;
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

        // Get file system stats to get creation/modification date
        const filePath = path.resolve(__dirname, `../authors/${authorSlug}/${parts[3].replace('.html', '.md')}`);
        let fileDate: Date | undefined;

        try {
          const stats = fs.statSync(filePath);
          fileDate = stats.mtime; // Use modification time as creation date
        } catch (error) {
          // File might not exist or accessible, use frontmatter date as fallback
        }

        return {
          title,
          url: page.url,
          author: authorName,
          authorSlug,
          date: page.frontmatter?.date,
          fileDate,
          categories: page.frontmatter?.categories || [],
          tags: page.frontmatter?.tags || [],
        };
      })
      .filter((book): book is FlatBook => book !== null)
      .sort((a, b) => {
        // Try to sort by file system date first, then frontmatter date, then title
        if (a.fileDate && b.fileDate) {
          return b.fileDate.getTime() - a.fileDate.getTime(); // Newest first (descending)
        }

        if (a.fileDate) return -1; // a has file date, put it first
        if (b.fileDate) return 1;  // b has file date, put it first

        // Fallback to frontmatter date if no file dates
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;

        if (dateA && dateB) {
          return dateB - dateA; // Newest first (descending)
        }

        // Final fallback to alphabetical by title
        return a.title.localeCompare(b.title, "ur");
      });

    return books;
  },
});
