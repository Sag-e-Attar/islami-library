import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface SidebarItem {
  text: string
  link: string
}

interface SidebarGroup {
  text: string
  collapsed: boolean
  items: SidebarItem[]
}

export function generateHamaraIslamSidebar(): SidebarGroup[] {
  const hamaraIslamDir = path.resolve(__dirname, '../hamara-islam')

  // Read all markdown files
  const files = fs.readdirSync(hamaraIslamDir)
    .filter(file => file.endsWith('.md') && file !== 'index.md')

  // Parse and organize by part
  const partMap = new Map<string, SidebarItem[]>()

  files.forEach(file => {
    // Extract part and chapter number from filename (e.g., "01-02-islam-ki-taarif.md")
    const match = file.match(/^(\d+)-(\d+)-(.+)\.md$/)
    if (!match) return

    const [, part, number] = match
    const slug = file.replace(/\.md$/, '')

    // Read frontmatter to get title
    const filePath = path.join(hamaraIslamDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(content)
    const title = data.title || 'بے نام'

    // Create sidebar item (title already includes lesson number)
    const item: SidebarItem = {
      text: title,
      link: `/hamara-islam/${slug}`
    }

    if (!partMap.has(part)) {
      partMap.set(part, [])
    }
    partMap.get(part)!.push(item)
  })

  // Sort items within each part
  partMap.forEach((items) => {
    items.sort((a, b) => {
      const numA = parseInt(a.text.match(/\d+/)?.[0] || '0')
      const numB = parseInt(b.text.match(/\d+/)?.[0] || '0')
      return numA - numB
    })
  })

  // Create sidebar groups
  const sidebarGroups: SidebarGroup[] = []
  const sortedParts = Array.from(partMap.keys()).sort()

  sortedParts.forEach(part => {
    let partTitle = 'ہمارا اسلام'
    if (part === '01') {
      partTitle = 'ہمارا اسلام ۔ حصہ اول'
    } else if (part === '02') {
      partTitle = 'ہمارا اسلام ۔ حصہ دوم'
    } else if (part === '03') {
      partTitle = 'ہمارا اسلام ۔ حصہ سوم'
    } else if (part === '04') {
      partTitle = 'ہمارا اسلام ۔ حصہ چہارم'
    } else if (part === '05') {
      partTitle = 'ہمارا اسلام ۔ حصہ پنجم'
    }

    sidebarGroups.push({
      text: partTitle,
      collapsed: true,
      items: partMap.get(part)!
    })
  })

  return sidebarGroups
}
