import { createContentLoader } from 'vitepress'

export interface Book {
  title: string
  url: string
  author: string
}

export interface Author {
  name: string
  slug: string
  books: Book[]
}

export default createContentLoader('**/*.md', {
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
        author: authorName
      }

      if (!authorMap.has(authorSlug)) {
        authorMap.set(authorSlug, [])
      }
      authorMap.get(authorSlug)!.push(book)
    })

    // Convert to Author array
    const authors: Author[] = []
    authorMap.forEach((books, slug) => {
      authors.push({
        name: books[0].author,
        slug,
        books: books.sort((a, b) => a.title.localeCompare(b.title))
      })
    })

    // Sort authors by name
    return authors.sort((a, b) => a.name.localeCompare(b.name))
  }
})

function getAuthorName(slug: string): string {
  const authorNames: Record<string, string> = {
    'allama-ahmed-saeed-kazmi': 'علامہ احمد سعید کاظمی',
    'khalil-ahmed-rana': 'خلیل احمد رانا'
  }

  return authorNames[slug] || slug
}
