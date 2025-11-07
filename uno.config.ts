import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";

export default defineConfig({
  // Scan these files for UnoCSS classes
  content: {
    filesystem: [
      "library/**/*.md",
      "library/**/*.vue",
      "library/.vitepress/**/*.ts",
      "library/.vitepress/**/*.vue",
      "library/.vitepress/theme/**/*.css",
    ],
  },
  presets: [
    presetUno(), // Essential preset with Tailwind-like utilities
    presetAttributify(), // Attributify mode for easier usage
    presetIcons({
      scale: 1.2,
      cdn: "https://esm.sh/",
    }),
    presetWebFonts({
      provider: "google",
      fonts: {
        title: "Lalezar:400",
        arabic: ["Lateef:400,700"],
        urdu: ["Mirza:400,700"],
      },
    }),
  ],
  transformers: [
    transformerDirectives(), // Enable @apply, @screen, etc.
    transformerVariantGroup(), // Enable variant groups like hover:(bg-gray-400 font-medium)
  ],
  shortcuts: {
    // Custom shortcuts for common patterns
    "rtl-text": "text-right dir-rtl",
    // Add book title colors as shortcut
    "book-title": "text-emerald-500 dark:text-emerald-400",
  },
  theme: {
    // Extend theme if needed
    colors: {
      // Add custom colors
    },
  },
  // Force generate these utilities
  safelist: [
    "text-emerald-500",
    "text-emerald-400",
    "dark:text-emerald-400",
    // Homepage feature icons - force generate for SSR
    "i-carbon-user-multiple",
    "i-carbon-document",
    "i-carbon-search",
    "i-carbon-asleep",
    "i-carbon-logo-github",
    "i-carbon-request-quote",
    "i-carbon-launch",
    "i-carbon-chat",
  ],
});
