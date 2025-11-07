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

  // Parse and organize by part
  const partMap = new Map<string, SidebarItem[]>()

  // Read part directories (part-01, part-02, etc.)
  const partDirs = fs.readdirSync(hamaraIslamDir)
    .filter(dir => {
      const fullPath = path.join(hamaraIslamDir, dir)
      return fs.statSync(fullPath).isDirectory() && dir.startsWith('part-')
    })

  partDirs.forEach(partDir => {
    // Extract part number from directory name (e.g., "part-01" -> "01")
    const partMatch = partDir.match(/^part-(\d+)$/)
    if (!partMatch) return

    const part = partMatch[1]
    const partPath = path.join(hamaraIslamDir, partDir)

    // Read all markdown files in this part
    const files = fs.readdirSync(partPath)
      .filter(file => file.endsWith('.md'))

    files.forEach(file => {
      // Extract chapter number from filename (e.g., "01-islam-ki-taarif.md")
      const match = file.match(/^(\d+)-(.+)\.md$/)
      if (!match) return

      const [, chapterNum] = match
      const slug = file.replace(/\.md$/, '')

      // Read frontmatter to get title
      const filePath = path.join(partPath, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(content)
      const title = data.title || 'بے نام'

      // Create sidebar item
      const item: SidebarItem = {
        text: title,
        link: `/hamara-islam/${partDir}/${slug}`
      }

      if (!partMap.has(part)) {
        partMap.set(part, [])
      }
      partMap.get(part)!.push(item)
    })
  })

  // Sort items within each part by chapter number
  partMap.forEach((items) => {
    items.sort((a, b) => {
      // Extract chapter number from link
      const numA = parseInt(a.link.match(/\/(\d+)-/)?.[1] || '0')
      const numB = parseInt(b.link.match(/\/(\d+)-/)?.[1] || '0')
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
    } else if (part === '06') {
      partTitle = 'ہمارا اسلام ۔ حصہ ششم'
    } else if (part === '07') {
      partTitle = 'ہمارا اسلام ۔ حصہ ہفتم'
    } else if (part === '08') {
      partTitle = 'ہمارا اسلام ۔ حصہ ہشتم'
    } else if (part === '09') {
      partTitle = 'ہمارا اسلام ۔ حصہ نہم'
    }

    sidebarGroups.push({
      text: partTitle,
      collapsed: true,
      items: partMap.get(part)!
    })
  })

  return sidebarGroups
}
