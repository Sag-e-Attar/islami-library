import { createContentLoader } from 'vitepress'
import fs from 'fs'
import path from 'path'

export interface Article {
  title: string
  url: string
  description?: string
  author?: string
  date?: string
  fileDate?: Date
}

export default createContentLoader('articles/**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: true,
  transform(rawData): Article[] {
    // Filter and map articles
    const articles = rawData
      .filter(page => page.url.startsWith('/articles/') && !page.url.endsWith('/articles'))
      .map(page => {
        // Get file system stats for creation/modification date
        const articlesDir = path.resolve(__dirname, '../articles')
        const fileName = page.url.split('/').pop() + '.md'
        const filePath = path.join(articlesDir, fileName)
        let fileDate: Date | undefined

        try {
          const stats = fs.statSync(filePath)
          fileDate = stats.mtime // Use modification time
        } catch (error) {
          // File might not exist or accessible
        }

        return {
          title: page.frontmatter?.title || 'بے عنوان',
          url: page.url,
          description: page.frontmatter?.description || page.excerpt || '',
          author: page.frontmatter?.author || '',
          date: page.frontmatter?.date || '',
          fileDate: fileDate
        }
      })

    // Sort by file creation date first, then frontmatter date, then title
    return articles.sort((a, b) => {
      // Try to sort by file system date first
      if (a.fileDate && b.fileDate) {
        return b.fileDate.getTime() - a.fileDate.getTime() // Newest first (descending)
      }

      if (a.fileDate) return -1; // a has file date, put it first
      if (b.fileDate) return 1;  // b has file date, put it first

      // Fallback to frontmatter date if no file dates
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }

      // Final fallback to alphabetical by title
      return a.title.localeCompare(b.title)
    })
  }
})
