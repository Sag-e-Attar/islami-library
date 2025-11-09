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

    // Read all markdown files for this author
    const files = fs.readdirSync(authorPath)
      .filter(file => file.endsWith('.md'))

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

// Automatically generated sidebar for Hamara Islam
// This reads all markdown files in hamara-islam/ and generates the sidebar automatically
export const hamaraIslamSidebar = generateHamaraIslamSidebar()
