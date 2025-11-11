import { createContentLoader } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

export interface Article {
  title: string
  url: string
  description?: string
  author?: string
  date?: string
  fileDate?: Date
  gitDate?: Date
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
        let gitDate: Date | undefined

        try {
          const stats = fs.statSync(filePath)
          fileDate = stats.mtime // Use modification time
        } catch (error) {
          // File might not exist or accessible
        }

        // Try to get Git commit date (more accurate for when content was added)
        try {
          const gitDateStr = execSync(`git log -1 --format=%cd -- "${filePath}"`, {
            encoding: 'utf8',
            stdio: 'pipe'
          }).trim()
          if (gitDateStr) {
            gitDate = new Date(gitDateStr)
          }
        } catch (error) {
          // Git command might fail (not in git repo, or file not tracked)
        }

        return {
          title: page.frontmatter?.title || 'بے عنوان',
          url: page.url,
          description: page.frontmatter?.description || page.excerpt || '',
          author: page.frontmatter?.author || '',
          date: page.frontmatter?.date || '',
          fileDate: fileDate,
          gitDate: gitDate
        }
      })

    // Sort with Git commit dates as primary, file dates as fallback
    return articles.sort((a, b) => {
      // Prefer Git commit dates (most accurate for when content was added)
      if (a.gitDate && b.gitDate) {
        return b.gitDate.getTime() - a.gitDate.getTime(); // Newest first
      }

      // If one has Git date, prefer it
      if (a.gitDate) return -1;
      if (b.gitDate) return 1;

      // Fallback to file system modification time
      if (a.fileDate && b.fileDate) {
        // Try to detect if file dates are all the same (build environment issue)
        const hasValidFileDates = a.fileDate && b.fileDate &&
          (a.fileDate.getTime() !== b.fileDate.getTime());

        if (hasValidFileDates) {
          return b.fileDate.getTime() - a.fileDate.getTime();
        }
      }

      // Use frontmatter date if available (reliable fallback)
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;

      if (dateA && dateB) {
        return dateB - dateA; // Newest first (descending)
      }

      if (dateA) return -1; // a has date, put it first
      if (dateB) return 1;  // b has date, put it first

      // Deterministic fallback: reverse alphabetical by filename for new files
      if (a.url && b.url) {
        const fileNameA = a.url.split('/').pop() || '';
        const fileNameB = b.url.split('/').pop() || '';
        return fileNameB.localeCompare(fileNameA);
      }

      // Final fallback to alphabetical by title
      return a.title.localeCompare(b.title);
    })
  }
})
