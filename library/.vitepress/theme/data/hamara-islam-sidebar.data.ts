import { createContentLoader } from 'vitepress'

interface SidebarItem {
  text: string
  link: string
}

interface SidebarGroup {
  text: string
  collapsed: boolean
  items: SidebarItem[]
}

export default createContentLoader('hamara-islam/part-*/*.md', {
  includeSrc: false,
  transform(rawData): SidebarGroup[] {
    const chapters = rawData
      .filter(page => !page.url.endsWith('/hamara-islam/')) // Exclude index.md
      .map(page => {
        // Extract part and chapter number from filename
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
    const partMap = new Map<string, SidebarItem[]>()

    chapters.forEach(chapter => {
      if (!partMap.has(chapter.part)) {
        partMap.set(chapter.part, [])
      }
      partMap.get(chapter.part)!.push({
        text: `سبق ${chapter.number} — ${chapter.title}`,
        link: chapter.url
      })
    })

    // Create sidebar groups
    const sidebarGroups: SidebarGroup[] = []

    partMap.forEach((items, partNumber) => {
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
      } else if (partNumber === '06') {
        partTitle = 'ہمارا اسلام ۔ حصہ ششم'
      } else if (partNumber === '07') {
        partTitle = 'ہمارا اسلام ۔ حصہ ہفتم'
      } else if (partNumber === '08') {
        partTitle = 'ہمارا اسلام ۔ حصہ ہشتم'
      } else if (partNumber === '09') {
        partTitle = 'ہمارا اسلام ۔ حصہ نہم'
      }

      sidebarGroups.push({
        text: partTitle,
        collapsed: false,
        items: items
      })
    })

    return sidebarGroups
  }
})
