import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { generateHamaraIslamSidebar } from './generate-sidebar'
import authorsData from '../authors/authors.json'

export interface SidebarItem {
  text: string
  link: string
}

export interface SidebarGroup {
  text: string
  collapsed: boolean
  items: SidebarItem[]
}

// Helper function to get author name from slug using JSON data
function getAuthorName(slug: string): string {
  return authorsData[slug]?.name || slug
}

// Function to generate author profile sidebar
function generateAuthorProfileSidebar(authorSlug: string): SidebarGroup[] {
  const authorsDir = path.resolve(__dirname, '../authors')
  const authorPath = path.join(authorsDir, authorSlug)

  try {
    // Read the author's index file
    const indexPath = path.join(authorPath, 'index.md')
    if (!fs.existsSync(indexPath)) {
      return []
    }

    const content = fs.readFileSync(indexPath, 'utf-8')
    const { data } = matter(content)
    const authorName = getAuthorName(authorSlug)

    // Read all book files for this author
    const files = fs.readdirSync(authorPath)
      .filter(file => file.endsWith('.md') && file !== 'index.md')

    const bookItems: SidebarItem[] = files.map(file => {
      const bookPath = path.join(authorPath, file)
      const bookContent = fs.readFileSync(bookPath, 'utf-8')
      const bookData = matter(bookContent)
      const title = bookData.data.title || 'بے نام'
      const slug = file.replace(/\.md$/, '')

      return {
        text: title,
        link: `/authors/${authorSlug}/${slug}`
      }
    }).sort((a, b) => a.text.localeCompare(b.text, 'ur'))

    return [
      {
        text: authorName,
        collapsed: false,
        items: bookItems
      }
    ]
  } catch (error) {
    console.warn(`Could not generate sidebar for author ${authorSlug}:`, error)
    return []
  }
}

// Function to generate authors sidebar automatically
function generateAuthorsSidebar(): SidebarGroup[] {
  const authorsDir = path.resolve(__dirname, '../authors')

  // Group books by author
  const authorMap = new Map<string, SidebarItem[]>()

  // Read all author directories
  const authorDirs = fs.readdirSync(authorsDir)
    .filter(dir => {
      const fullPath = path.join(authorsDir, dir)
      return fs.statSync(fullPath).isDirectory()
    })

  authorDirs.forEach(authorSlug => {
    const authorPath = path.join(authorsDir, authorSlug)

    // Read all markdown files for this author (excluding index.md)
    const files = fs.readdirSync(authorPath)
      .filter(file => file.endsWith('.md') && file !== 'index.md')

    files.forEach(file => {
      const filePath = path.join(authorPath, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(content)
      const title = data.title || 'بے نام'
      const slug = file.replace(/\.md$/, '')

      const item: SidebarItem = {
        text: title,
        link: `/authors/${authorSlug}/${slug}`
      }

      if (!authorMap.has(authorSlug)) {
        authorMap.set(authorSlug, [])
      }
      authorMap.get(authorSlug)!.push(item)
    })
  })

  // Sort items within each author alphabetically
  authorMap.forEach((items) => {
    items.sort((a, b) => a.text.localeCompare(b.text))
  })

  // Create sidebar groups
  const sidebarGroups: SidebarGroup[] = []

  // Sort author slugs alphabetically by their Urdu names
  const sortedAuthors = Array.from(authorMap.keys()).sort((a, b) => {
    return getAuthorName(a).localeCompare(getAuthorName(b))
  })

  sortedAuthors.forEach(slug => {
    const items = authorMap.get(slug)!
    sidebarGroups.push({
      text: getAuthorName(slug),
      collapsed: true, // Collapsed by default
      items: items
    })
  })

  return sidebarGroups
}

// Dynamically generated sidebar data for authors
// This automatically scans all books in authors/ directory
export const authorSidebar = generateAuthorsSidebar()

// Function to generate author profile sidebar
// This generates sidebar for individual author profile pages
export { generateAuthorProfileSidebar }

// Function to generate articles sidebar automatically
function generateArticlesSidebar() {
  const articlesDir = path.resolve(__dirname, '../articles')
  const articles = []

  try {
    // Read all markdown files in articles directory
    const files = fs.readdirSync(articlesDir)
      .filter(file => file.endsWith('.md') && file !== 'index.md')

    files.forEach(file => {
      const filePath = path.join(articlesDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(content)

      // Get file stats for creation/modification date
      const stats = fs.statSync(filePath)
      const fileDate = stats.mtime // Use modification time

      const title = data.title || 'بے نام'
      const slug = file.replace(/\.md$/, '')

      articles.push({
        text: title,
        link: `/articles/${slug}`,
        fileDate: fileDate
      })
    })

    // Sort by file creation date (newest first)
    articles.sort((a, b) => b.fileDate.getTime() - a.fileDate.getTime())

  } catch (error) {
    console.warn('Could not read articles directory:', error)
  }

  return [
    {
      text: "حالیہ مضامین",
      collapsed: false,
      items: articles
    }
  ]
}

// Dynamically generated sidebar data for articles
// This automatically scans all articles in articles/ directory
export const articlesSidebar = generateArticlesSidebar()

// Automatically generated sidebar for Hamara Islam
// This reads all markdown files in hamara-islam/ and generates the sidebar automatically
export const hamaraIslamSidebar = generateHamaraIslamSidebar()
