import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import { withPwa } from "@vite-pwa/vitepress";
import {
  authorSidebar,
  articlesSidebar,
  hamaraIslamSidebar,
  generateAuthorProfileSidebar,
} from "./sidebar.data";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    base: "/",
    title: "اسلامی لائبریری",
    description: "اسلامی کتب و مضامین کا مجموعہ",
    lang: "ur",
    dir: "rtl",

    markdown: {
      container: {
        tipLabel: "نکات",
        warningLabel: "انتباہ",
        dangerLabel: "خطرہ",
        infoLabel: "معلومات",
        detailsLabel: "تفصیلات",
      },
    },

    vite: {
      plugins: [
        UnoCSS({
          mode: "global",
        }),
      ],
      ssr: {
        noExternal: ["@unocss/reset", "unocss"],
      },
    },

    head: [
      ["link", { rel: "icon", type: "image/svg+xml", href: "/islami-library/logo.svg" }],
      ["link", { rel: "apple-touch-icon", href: "/islami-library/logo.svg" }],
      ["meta", { name: "theme-color", content: "#10b981" }],
    ],

    pwa: {
      registerType: "autoUpdate",
      includeAssets: ["fonts/**/*.woff", "logo.svg"],
      manifest: {
        name: "Islami Library",
        short_name: "Islami Library",
        description: "اسلامی کتب و مضامین کا مجموعہ",
        theme_color: "#10b981",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        lang: "ur",
        dir: "rtl",
        icons: [
          {
            src: "/logo.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
        globPatterns: [
          "**/*.{css,js,html,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot}",
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    },

    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      siteTitle: "اسلامی لائبریری",
      search: {
        provider: "local",
        options: {
          async _render(src, env, md) {
            const html = await md.renderAsync(src, env)
            if (env.frontmatter?.title) {
              // Check if the title already exists as a heading in the content
              const titleAsHeading = (env.frontmatter.title || '').replace(/[^\w\s-]/g, '').toLowerCase().replace(/\s+/g, '-')
              const hasTitleHeading = html.includes(`id="${titleAsHeading}"`) ||
                                     html.includes(`<h1>${env.frontmatter.title}</h1>`) ||
                                     src.includes(`# ${env.frontmatter.title}`)

              if (!hasTitleHeading) {
                return await md.renderAsync(`# ${env.frontmatter.title}`) + html
              }
            }
            return html
          },
          locales: {
            root: {
              translations: {
                button: {
                  buttonText: "تلاش کریں",
                  buttonAriaLabel: "تلاش کریں",
                },
                modal: {
                  displayDetails: "تفصیلی فہرست دکھائیں",
                  resetButtonTitle: "تلاش صاف کریں",
                  backButtonTitle: "تلاش بند کریں",
                  noResultsText: "کوئی نتیجہ نہیں ملا",
                  footer: {
                    selectText: "منتخب کریں",
                    selectKeyAriaLabel: "داخل کریں",
                    navigateText: "نیویگیٹ کریں",
                    navigateUpKeyAriaLabel: "اوپر کی طرف تیر",
                    navigateDownKeyAriaLabel: "نیچے کی طرف تیر",
                    closeText: "بند کریں",
                    closeKeyAriaLabel: "esc",
                  },
                },
              },
            },
          },
        },
      },
      nav: [
        {
          text: "کُتب",
          link: "/books",
        },
        {
          text: "مضامین",
          link: "/articles",
        },
        {
          text: "مصنفین",
          link: "/authors",
        },
        {
          text: "ہمارا اسلام",
          link: "/hamara-islam/",
        },
      ],

      sidebar: {
        "/authors/": authorSidebar,
        "/articles/": articlesSidebar,
        "/hamara-islam/": hamaraIslamSidebar,
      },

      socialLinks: [
        { icon: "github", link: "https://github.com/Sag-e-Attar/islami-library" },
      ],

      editLink: {
        pattern: "https://github.com/Sag-e-Attar/islami-library/edit/master/library/:path",
        text: "اس صفحہ میں ترمیم کریں"
      },

      // RTL specific configs
      outline: {
        label: "فہرست",
        level: [2, 3],
      },

      darkModeSwitchLabel: "تھیم",
      sidebarMenuLabel: "مینو",
      returnToTopLabel: "واپس اوپر",

      docFooter: {
        prev: "پچھلا صفحہ",
        next: "اگلا صفحہ",
      },

      lastUpdated: {
        text: "آخری اپ ڈیٹ",
      },

      // 404 page configuration
      notFound: {
        code: "404",
        title: "صفحہ نہیں ملا",
        quote:
          "لیکن اگر آپ اپنی سمت نہیں بدلتے، اور اگر آپ تلاش جاری رکھتے ہیں، تو آپ وہیں پہنچ سکتے ہیں جہاں آپ جا رہے ہیں۔",
        link: "/",
        linkText: "ہوم پیج پر جائیں",
        linkLabel: "ہوم پیج پر جائیں",
      },
    },
  })
);
