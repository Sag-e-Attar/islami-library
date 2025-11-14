<script setup lang="ts">
import { ref, computed } from 'vue'
import { data as books } from '../../books.data'
import { data as articles } from '../../articles.data'
import authorsData from '../../../authors/authors.json'

interface Props {
  authorSlug: string
}

const props = defineProps<Props>()

// Get author data from JSON
const authorData = computed(() => {
  return authorsData[props.authorSlug] || {}
})

// Filter books by author
const authorBooks = computed(() => {
  if (!books || !Array.isArray(books)) return []

  const author = books.find(a => a.slug === props.authorSlug)
  return author?.books || []
})

// Filter articles by author
const authorArticles = computed(() => {
  if (!articles || !Array.isArray(articles)) return []

  const authorName = authorData.value.name
  console.log('Author name from JSON:', authorName)
  console.log('All articles:', articles.map(a => ({title: a.title, author: a.author, url: a.url})))

  const filtered = articles.filter(article => article.author === authorName)
  console.log('Filtered articles:', filtered)
  return filtered
})

const navigateToBook = (url: string) => {
  window.location.href = url
}

const navigateToArticle = (url: string) => {
  window.location.href = url
}
</script>

<template>
  <div v-if="authorBooks.length > 0" class="author-books-section">
    <div class="mb-8">
      <h2 class="font-title text-4xl font-bold text-amber-500 dark:text-amber-400 mb-4">{{ authorData.name || 'مصنف' }}</h2>
      <p v-if="authorData.bio" class="text-[var(--vp-c-text-2)] text-lg leading-relaxed mb-4">
        {{ authorData.bio }}
      </p>
      <div class="flex flex-wrap gap-2 mb-6">
        <span class="inline-flex items-center gap-1.2 px-3.2 py-1.2 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full text-0.8rem font-semibold">
          <svg class="w-3.6 h-3.6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          {{ authorBooks.length }} {{ authorBooks.length === 1 ? "کتاب" : "کتابیں" }}
        </span>
        <span v-if="authorArticles.length > 0" class="inline-flex items-center gap-1.2 px-3.2 py-1.2 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full text-0.8rem font-semibold">
          <svg class="w-3.6 h-3.6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.707.293H19a2 2 0 012 2v11a2 2 0 01-2 2z"></path>
          </svg>
          {{ authorArticles.length }} {{ authorArticles.length === 1 ? "مضمون" : "مضامین" }}
        </span>
        <span v-for="spec in authorData.specialization" :key="spec" class="inline-flex items-center gap-1.2 px-3.2 py-1.2 bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] rounded-full text-0.8rem border border-[var(--vp-c-divider)]">
          {{ spec }}
        </span>
      </div>
    </div>

    <h3 class="text-1.5rem font-semibold text-[var(--vp-c-text-1)] mb-6">تصانیف</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="book in authorBooks"
        :key="book.url"
        class="group p-6 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)] rounded-2xl transition-all duration-300 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
        @click="navigateToBook(book.url)"
      >
        <div class="flex items-start gap-4">
          <div class="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex-shrink-0 mt-3">
            <span class="i-carbon-book text-xl text-white"></span>
          </div>
          <div class="flex-1">
            <h4 class="text-xl font-semibold text-[var(--vp-c-text-1)] mb-[6px] leading-relaxed">
              {{ book.title }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Articles Section -->
    <div v-if="authorArticles.length > 0" class="mt-12">
      <h3 class="font-title text-2rem font-bold text-center mb-8 leading-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">مضامین</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="article in authorArticles"
          :key="article.url"
          class="group block p-6 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)] rounded-xl transition-all duration-200 hover:shadow-md hover:border-emerald-400 cursor-pointer"
          @click="navigateToArticle(article.url)"
        >
          <div class="flex flex-col h-full">
            <!-- Article Title -->
            <h4 class="text-xl font-bold text-[var(--vp-c-text-1)] mb-3 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {{ article.title }}
            </h4>

            <!-- Article Description -->
            <p
              v-if="article.description"
              class="text-[var(--vp-c-text-2)] text-sm leading-relaxed line-clamp-3"
            >
              {{ article.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-8 text-[var(--vp-c-text-2)]">
    اس مصنف کی کوئی کتاب یا مضمون دستیاب نہیں ہے۔
  </div>
</template>

<style scoped>
.author-books-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0.75rem;
}
</style>