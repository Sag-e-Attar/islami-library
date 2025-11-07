import { createContentLoader } from 'vitepress'

interface Chapter {
  title: string
  url: string
  number: string
}

interface Part {
  title: string
  chapters: Chapter[]
}

export default createContentLoader('hamara-islam/part-*/*.md', {
  includeSrc: false,
  transform(rawData): Part[] {
    const chapters = rawData
      .filter(page => !page.url.endsWith('/hamara-islam/')) // Exclude index.md
      .map(page => {
        // Extract part from folder and chapter number from filename (e.g., "/hamara-islam/part-01/02-..." -> part: "01", number: "02")
        const match = page.url.match(/\/hamara-islam\/part-(\d+)\/(\d+)-/)
        const part = match ? match[1] : '—'
        const number = match ? match[2] : '—'

        return {
          title: page.frontmatter.title || 'بے نام',
          url: page.url,
          number: number,
          part: part
        }
      })
      .sort((a, b) => {
        // Sort by part first, then by number
        if (a.part !== b.part) {
          return a.part.localeCompare(b.part)
        }
        return a.number.localeCompare(b.number)
      })

    // Group chapters by part
    const parts: Part[] = []
    const partMap = new Map<string, Chapter[]>()

    chapters.forEach(chapter => {
      if (!partMap.has(chapter.part)) {
        partMap.set(chapter.part, [])
      }
      partMap.get(chapter.part)!.push(chapter)
    })

    // Create parts array
    partMap.forEach((chapters, partNumber) => {
      let partTitle = 'ہمارا اسلام'
      if (partNumber === '01') {
        partTitle = 'ہمارا اسلام ۔ حصہ اول'
      } else if (partNumber === '02') {
        partTitle = 'ہمارا اسلام ۔ حصہ دوم'
      } else if (partNumber === '03') {
        partTitle = 'ہمارا اسلام ۔ حصہ سوم'
      } else if (partNumber === '04') {
        partTitle = 'ہمارا اسلام ۔ حصہ چہارم'
      } else if (partNumber === '05') {
        partTitle = 'ہمارا اسلام ۔ حصہ پنجم'
      }
      parts.push({
        title: partTitle,
        chapters: chapters
      })
    })

    return parts
  }
})
