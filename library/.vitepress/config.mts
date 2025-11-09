import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import { withPwa } from "@vite-pwa/vitepress";
import { authorSidebar, hamaraIslamSidebar } from "./sidebar.data";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    title: "اسلامی لائبریری",
    description: "اسلامی کتب و مضامین کا مجموعہ",
    lang: "ur",
    dir: "rtl",

    markdown: {
      theme: {
        tip: '💡',
        warning: '⚠️',
        danger: '🚨',
        info: 'ℹ️',
        details: '📄'
      },
      container: {
        tipLabel: 'نکات',
        warningLabel: 'انتباہ',
        dangerLabel: 'خطرہ',
        infoLabel: 'معلومات',
        detailsLabel: 'تفصیلات'
      }
    },

    vite: {
      plugins: [
        UnoCSS({
          mode: 'global',
        }),
      ],
      ssr: {
        noExternal: ['@unocss/reset', 'unocss'],
      },
    },

    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
      ['link', { rel: 'apple-touch-icon', href: '/logo.svg' }],
      ['meta', { name: 'theme-color', content: '#10b981' }],
    ],

    pwa: {
      registerType: 'autoUpdate',
      includeAssets: ['fonts/**/*.woff', 'logo.svg'],
      manifest: {
        name: 'اسلامی لائبریری',
        short_name: 'اسلامی لائبریری',
        description: 'اسلامی کتب و مضامین کا مجموعہ',
        theme_color: '#10b981',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        lang: 'ur',
        dir: 'rtl',
        icons: [
          {
            src: '/logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{css,js,html,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
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
        { text: "ہوم", link: "/" },
        {
          text: "کتابیں",
          link: "/books",
        },
        {
          text: "مصنفین",
          link: "/authors",
        },
        {
          text: "مضامین",
          link: "/articles",
        },
        {
        text: "ہمارا اسلام",
          link: "/hamara-islam/",
        },
      ],

      sidebar: {
        "/authors/": authorSidebar,
        "/hamara-islam/": hamaraIslamSidebar,
      },

      socialLinks: [
        { icon: "github", link: "https://github.com/vuejs/vitepress" },
      ],

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
        quote: "لیکن اگر آپ اپنی سمت نہیں بدلتے، اور اگر آپ تلاش جاری رکھتے ہیں، تو آپ وہیں پہنچ سکتے ہیں جہاں آپ جا رہے ہیں۔",
        link: "/",
        linkText: "ہوم پیج پر جائیں",
        linkLabel: "ہوم پیج پر جائیں"
      },
    },
  })
);
