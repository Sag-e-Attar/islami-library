import { createContentLoader } from 'vitepress'
import fs from 'fs'
import path from 'path'

export interface SiteStats {
  totalBooks: number
  totalArticles: number
  totalAuthors: number
  hamaraIslamAsbaqs: number
}

export default createContentLoader('**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData): SiteStats {
    // Count books (files in authors/ subdirectories, excluding index.md)
    const bookPages = rawData.filter(page => {
      const parts = page.url.split('/')
      return parts.length === 4 && parts[1] === 'authors' && parts[2] && parts[3]
    })
    const totalBooks = bookPages.length

    // Count articles (files in articles/ directory)
    const articlePages = rawData.filter(page => {
      return page.url.startsWith('/articles/') &&
             !page.url.endsWith('/articles/') &&
             !page.url.includes('/articles/index')
    })
    const totalArticles = articlePages.length

    // Count authors (unique author slugs from book URLs)
    const authorSlugs = new Set<string>()
    bookPages.forEach(page => {
      const parts = page.url.split('/')
      if (parts.length === 4 && parts[1] === 'authors' && parts[2]) {
        authorSlugs.add(parts[2])
      }
    })
    const totalAuthors = authorSlugs.size

    // Count Hamara Islam asbaqs (hardcoded for now since these are not .md files)
    const hamaraIslamAsbaqs = 129

    return {
      totalBooks,
      totalArticles,
      totalAuthors,
      hamaraIslamAsbaqs
    }
  }
})