import fs from 'fs'
import path from 'path'
import authorsData from '../authors/authors.json'

export interface SiteStats {
  totalBooks: number
  totalArticles: number
  totalAuthors: number
}

// Function to count total books
function countTotalBooks(): number {
  const authorsDir = path.resolve(__dirname, '../authors')
  let totalBooks = 0

  try {
    const authorDirs = fs.readdirSync(authorsDir)
      .filter(dir => {
        const fullPath = path.join(authorsDir, dir)
        return fs.statSync(fullPath).isDirectory()
      })

    authorDirs.forEach(authorSlug => {
      const authorPath = path.join(authorsDir, authorSlug)
      const files = fs.readdirSync(authorPath)
        .filter(file => file.endsWith('.md') && file !== 'index.md')

      totalBooks += files.length
    })
  } catch (error) {
    console.warn('Could not count books:', error)
  }

  return totalBooks
}

// Function to count total articles
function countTotalArticles(): number {
  const articlesDir = path.resolve(__dirname, '../articles')

  try {
    const files = fs.readdirSync(articlesDir)
      .filter(file => file.endsWith('.md') && file !== 'index.md')

    return files.length
  } catch (error) {
    console.warn('Could not count articles:', error)
    return 0
  }
}

// Function to count total authors
function countTotalAuthors(): number {
  // Count actual directories that have index.md files
  const authorsDir = path.resolve(__dirname, '../authors')

  try {
    const authorDirs = fs.readdirSync(authorsDir)
      .filter(dir => {
        const fullPath = path.join(authorsDir, dir)
        return fs.statSync(fullPath).isDirectory()
      })
      .filter(dir => {
        const indexPath = path.join(authorsDir, dir, 'index.md')
        return fs.existsSync(indexPath)
      })

    return authorDirs.length
  } catch (error) {
    console.warn('Could not count authors:', error)
    return 0
  }
}

// Generate site statistics
export const siteStats: SiteStats = {
  totalBooks: countTotalBooks(),
  totalArticles: countTotalArticles(),
  totalAuthors: countTotalAuthors()
}