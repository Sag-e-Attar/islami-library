import { generateHamaraIslamSidebar } from './generate-sidebar'

export interface SidebarItem {
  text: string
  link: string
}

export interface SidebarGroup {
  text: string
  collapsed: boolean
  items: SidebarItem[]
}

// Static sidebar data for authors
export const authorSidebar: SidebarGroup[] = [
  {
    text: "علامہ احمد سعید کاظمی",
    collapsed: false,
    items: [
      {
        text: "ان النبی کا صحیح معنی و مفہوم",
        link: "/authors/allama-ahmed-saeed-kazmi/an-nabi-ka-sahi-maani-o-mafhoom"
      }
    ]
  },
  {
    text: "خلیل احمد رانا",
    collapsed: false,
    items: [
      {
        text: "گیارہویں کیا ہے؟",
        link: "/authors/khalil-ahmed-rana/giyarhveen-kya-hy"
      }
    ]
  }
]

// Automatically generated sidebar for Hamara Islam
// This reads all markdown files in hamara-islam/ and generates the sidebar automatically
export const hamaraIslamSidebar = generateHamaraIslamSidebar()
