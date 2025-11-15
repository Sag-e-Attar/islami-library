import { createContentLoader } from 'vitepress'
import authorsData from '../authors/authors.json'

export interface Book {
  title: string
  url: string
  author: string
  category?: string
  categories?: string[]
  partialFormatted?: boolean
}

export interface Author {
  name: string
  slug: string
  books: Book[]
}

export default createContentLoader('authors/**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData): Author[] {
    // Filter out non-book pages (exclude index, books, articles, etc)
    const bookPages = rawData.filter(page => {
      const parts = page.url.split('/')
      // Must have authors/author/book structure
      return parts.length === 4 && parts[1] === 'authors' && parts[2] && parts[3]
    })

    // Group books by author
    const authorMap = new Map<string, Book[]>()

    bookPages.forEach(page => {
      const parts = page.url.split('/')
      const authorSlug = parts[2] // Now at index 2: /authors/[slug]/book
      const title = page.frontmatter?.title || 'Untitled'

      // Extract author name from frontmatter or use slug
      const authorName = getAuthorName(authorSlug)

      const book: Book = {
        title,
        url: page.url,
        author: authorName,
        category: page.frontmatter?.category,
        categories: page.frontmatter?.categories || [],
        partialFormatted: page.frontmatter?.partialFormatted || false
      }

      if (!authorMap.has(authorSlug)) {
        authorMap.set(authorSlug, [])
      }
      authorMap.get(authorSlug)!.push(book)
    })

    // Convert to Author array with recent books first
    const authors: Author[] = []
    authorMap.forEach((books, slug) => {
      // Sort books by file update time (most recent first)
      const sortedBooks = books
        .map(book => {
          const pageData = rawData.find(p => p.url === book.url)
          return {
            ...book,
            lastUpdated: pageData?.fs?.mtimeMs || 0
          }
        })
        .sort((a, b) => b.lastUpdated - a.lastUpdated) // Most recent first
        .map(({ lastUpdated, ...book }) => book)

      authors.push({
        name: sortedBooks[0].author,
        slug,
        books: sortedBooks
      })
    })

    // Sort authors by most recent book activity
    return authors.sort((a, b) => {
      const aLatest = a.books[0]?.url
      const bLatest = b.books[0]?.url

      if (!aLatest || !bLatest) return 0

      const aPage = rawData.find(p => p.url === aLatest)
      const bPage = rawData.find(p => p.url === bLatest)

      const aTime = aPage?.fs?.mtimeMs || 0
      const bTime = bPage?.fs?.mtimeMs || 0

      return bTime - aTime // Most recent first
    })
  }
})

function getAuthorName(slug: string): string {
  return authorsData[slug]?.name || slug
}
