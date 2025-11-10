import { createContentLoader } from 'vitepress'

export interface Category {
  name: string
  slug: string
  count: number
}

export default createContentLoader('**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData): Category[] {
    // Filter only book pages (authors/author/book structure)
    const bookPages = rawData.filter(page => {
      const parts = page.url.split('/')
      return parts.length === 4 && parts[1] === 'authors' && parts[2] && parts[3]
    })

    // Collect all categories
    const categoryMap = new Map<string, number>()

    bookPages.forEach(page => {
      const categories = page.frontmatter?.categories || []
      const primaryCategory = page.frontmatter?.category

      // Add primary category
      if (primaryCategory) {
        categoryMap.set(primaryCategory, (categoryMap.get(primaryCategory) || 0) + 1)
      }

      // Add all categories from array
      categories.forEach((cat: string) => {
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1)
      })
    })

    // Convert to Category array
    const categories: Category[] = []
    categoryMap.forEach((count, name) => {
      categories.push({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        count
      })
    })

    // Sort by count (most used first) then by name
    return categories.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count
      }
      return a.name.localeCompare(b.name)
    })
  }
})