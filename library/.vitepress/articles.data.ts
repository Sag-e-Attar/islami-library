import { createContentLoader } from 'vitepress'

export interface Article {
  title: string
  url: string
  description?: string
  date?: string
}

export default createContentLoader('articles/**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: true,
  transform(rawData): Article[] {
    // Filter and map articles
    const articles = rawData
      .filter(page => page.url.startsWith('/articles/') && !page.url.endsWith('/articles'))
      .map(page => ({
        title: page.frontmatter?.title || 'بے عنوان',
        url: page.url,
        description: page.frontmatter?.description || page.excerpt || '',
        date: page.frontmatter?.date || ''
      }))

    // Sort by date (newest first) or by title
    return articles.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return a.title.localeCompare(b.title)
    })
  }
})
