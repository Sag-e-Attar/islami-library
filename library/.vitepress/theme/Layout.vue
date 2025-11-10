<script setup>
  import DefaultTheme from "vitepress/theme"
  import { useData } from "vitepress"
  import { onMounted, onBeforeUnmount, computed } from "vue"

  const { Layout } = DefaultTheme
  const { frontmatter } = useData()
  const { page } = useData()

  // Check if current page is an article page
  const isArticlePage = computed(() => {
    const url = page.value?.relativePath || ''
    return url.startsWith('articles/')
  })

  // Function to get author slug from current URL
  const getAuthorSlugFromUrl = () => {
    const url = page.value?.relativePath || ''
    const pathParts = url.split('/')

    // Handle /authors/[author]/[book].md or /authors/[author]/index.md
    if (pathParts.length >= 2 && pathParts[0] === 'authors') {
      return pathParts[1]
    }

    return ''
  }

  // Auto-scroll active TOC item into view
  let observer = null
  let scrollTimeout = null

  // Function to scroll active TOC item into view
  const scrollActiveTocItemIntoView = () => {
    const activeLink = document.querySelector('.VPDocAsideOutline .outline-link.active')
    if (activeLink) {
      activeLink.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      })
    }
  }

  // Debounced scroll handler
  const handleScroll = () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(scrollActiveTocItemIntoView, 150)
  }

  onMounted(() => {
    // Initial scroll on mount
    setTimeout(scrollActiveTocItemIntoView, 100)

    // Watch for changes to active TOC item using MutationObserver
    observer = new MutationObserver(() => {
      scrollActiveTocItemIntoView()
    })

    // Observe the TOC container for changes to the active class
    const tocContainer = document.querySelector('.VPDocAsideOutline')
    if (tocContainer) {
      observer.observe(tocContainer, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true
      })
    }

    // Also trigger on scroll events (debounced)
    window.addEventListener('scroll', handleScroll)
  })

  // Proper cleanup in onBeforeUnmount
  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<template>
  <Layout>
    <!-- Check if the author frontmatter exists and render the custom div -->
    <template #doc-before>
      <h1
        :id="frontmatter.title"
        class="text-2xl md:text-3xl lg:text-4xl font-title text-amber-500 dark:text-amber-400 mb-3"
      >
        {{ frontmatter.title }}
      </h1>
      <div
        v-if="frontmatter.author"
        class="font-bold bg-emerald-600 dark:bg-emerald-500 text-white inline-block px-2 py-2 rounded-md"
      >
        <span v-if="!isArticlePage">
          <a
            :href="`/authors/${getAuthorSlugFromUrl()}/`"
            class="text-white hover:text-emerald-200 dark:hover:text-emerald-300 transition-colors no-underline"
          >
            مصنف: {{ frontmatter.author }}
          </a>
        </span>
        <span v-else>
          مصنف: {{ frontmatter.author }}
        </span>
      </div>

      <!-- Categories for book pages -->
      <div
        v-if="frontmatter.categories && frontmatter.categories.length > 0"
        class="flex flex-wrap gap-2 mt-3"
      >
        <span
          v-for="category in frontmatter.categories"
          :key="category"
          class="category-badge"
        >
          {{ category }}
        </span>
      </div>

      <!-- Primary category if exists -->
      <div
        v-if="frontmatter.category && !frontmatter.categories?.includes(frontmatter.category)"
        class="mt-3"
      >
        <span class="category-badge">
          {{ frontmatter.category }}
        </span>
      </div>
    </template>

    <!-- Custom Footer -->
    <template #layout-bottom>
      <footer class="custom-footer">
        <div class="footer-content">
          <p class="footer-text">
            تمام تحریری مواد متعلقہ مصنفین کی ملکیت ہے
          </p>
          <p class="footer-copyright">
            کاپی رائٹ © 2025 اسلامی نیٹ ورک
          </p>
        </div>
      </footer>
    </template>
  </Layout>
</template>

<style>
  /* Add some styling for your new class */
  .author {
    font-weight: bold;
    color: #555;
    margin-bottom: 1em;
    padding-top: 1em;
  }

  /* Category badge styling with better dark mode support */
  .category-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 400;
    border-radius: 0.375rem;
    border: 1px solid;
    background-color: rgba(107, 114, 128, 0.08);
    color: rgb(75, 85, 99);
    border-color: rgba(107, 114, 128, 0.15);
    transition: all 0.2s ease-in-out;
  }

  /* Dark mode overrides */
  html.dark .category-badge {
    background-color: rgba(156, 163, 175, 0.08);
    color: rgb(156, 163, 175);
    border-color: rgba(156, 163, 175, 0.15);
  }

  /* Hover effects */
  .category-badge:hover {
    background-color: rgba(107, 114, 128, 0.12);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }

  html.dark .category-badge:hover {
    background-color: rgba(156, 163, 175, 0.12);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
