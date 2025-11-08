<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { data as books } from '../../books-flat.data'
import type { FlatBook } from '../../books-flat.data'

const navigateToBook = (url: string) => {
  window.location.href = url
}

// Reactive state
const searchQuery = ref('')
const selectedAuthor = ref<string>('all')
const selectedCategory = ref<string>('all')
const viewMode = ref<'grid' | 'list'>('grid')

// Extract unique authors and categories for filters
const authors = computed(() => {
  const uniqueAuthors = Array.from(new Set(books.map(book => book.author)))
  return uniqueAuthors.sort((a, b) => a.localeCompare(b, 'ur'))
})

// Extract unique authors from filtered results
const filteredAuthors = computed(() => {
  const uniqueAuthors = Array.from(new Set(filteredBooks.value.map(book => book.author)))
  return uniqueAuthors.sort((a, b) => a.localeCompare(b, 'ur'))
})

const categories = computed(() => {
  const allCategories = books.flatMap(book => book.categories || [])
  const uniqueCategories = Array.from(new Set(allCategories))
  return uniqueCategories.sort((a, b) => a.localeCompare(b, 'ur'))
})

// Filter books based on search and filters
const filteredBooks = computed(() => {
  return books.filter(book => {
    const matchesSearch = !searchQuery.value ||
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesAuthor = selectedAuthor.value === 'all' || book.author === selectedAuthor.value

    const matchesCategory = selectedCategory.value === 'all' ||
      (book.categories && book.categories.includes(selectedCategory.value))

    return matchesSearch && matchesAuthor && matchesCategory
  })
})

// Format date
const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ur-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="max-w-1100px mx-auto px-8 mt-10 mb-16">
    <h1
      class="font-title text-3rem font-bold text-center mb-12 leading-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
    >
      کتابیں
    </h1>

    <!-- Stats and View Toggle -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div class="text-lg font-normal text-[var(--vp-c-text-1)] rtl-text" style="font-family: 'Mehr Nastaliq Web', serif;">
        کل {{ filteredBooks.length }} کتابیں — {{ filteredAuthors.length }} {{ filteredAuthors.length === 1 ? 'مصنف' : 'مصنفین' }}
      </div>
      <div class="flex gap-2">
        <button
          @click="viewMode = 'grid'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2',
            viewMode === 'grid'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25'
              : 'bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] border-[var(--vp-c-divider)] hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'
          ]"
        >
          <div class="flex items-center gap-2">
          <span class="i-carbon-grid text-lg w-4 h-4"></span>
          <span>گرڈ</span>
        </div>
        </button>
        <button
          @click="viewMode = 'list'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2',
            viewMode === 'list'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25'
              : 'bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] border-[var(--vp-c-divider)] hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'
          ]"
        >
          <div class="flex items-center gap-2">
          <span class="i-carbon-list text-lg w-4 h-4"></span>
          <span>فہرست</span>
        </div>
        </button>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="mb-8 space-y-6">
      <!-- Search -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="کتاب یا مصنف تلاش کریں..."
          class="w-full px-6 py-4 pl-14 text-lg border-2 border-[var(--vp-c-divider)] rounded-xl focus:outline-none focus:border-emerald-500 bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] placeholder-[var(--vp-c-text-2)] transition-all duration-200 rtl-text"
          style="font-family: 'Mehr Nastaliq Web', serif; font-size: 1.25rem; text-align: right;"
        />
        <span class="absolute left-4 top-4.5 text-[var(--vp-c-text-2)] text-xl i-carbon-search"></span>
      </div>

      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <select
            v-model="selectedAuthor"
            class="w-full px-6 py-4 text-lg border-2 border-[var(--vp-c-divider)] rounded-xl focus:outline-none focus:border-emerald-500 bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] cursor-pointer transition-all duration-200 rtl-text appearance-none"
            style="font-family: 'Mehr Nastaliq Web', serif; font-size: 1.25rem; text-align: right; background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; fill=&quot;none&quot; viewBox=&quot;0 0 20 20&quot;%3e%3cpath stroke=&quot;%236b7280&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; stroke-width=&quot;1.5&quot; d=&quot;m6 8 4 4 4-4&quot;/%3e%3c/svg%3e'); background-position: right 1rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 3rem;"
          >
            <option value="all">تمام مصنفین</option>
            <option v-for="author in authors" :key="author" :value="author">
              {{ author }}
            </option>
          </select>
        </div>
        <div class="flex-1">
          <select
            v-model="selectedCategory"
            class="w-full px-6 py-4 text-lg border-2 border-[var(--vp-c-divider)] rounded-xl focus:outline-none focus:border-emerald-500 bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] cursor-pointer transition-all duration-200 rtl-text appearance-none"
            style="font-family: 'Mehr Nastaliq Web', serif; font-size: 1.25rem; text-align: right; background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; fill=&quot;none&quot; viewBox=&quot;0 0 20 20&quot;%3e%3cpath stroke=&quot;%236b7280&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; stroke-width=&quot;1.5&quot; d=&quot;m6 8 4 4 4-4&quot;/%3e%3c/svg%3e'); background-position: right 1rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 3rem;"
          >
            <option value="all">تمام زمرے</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a
        v-for="book in filteredBooks"
        :key="book.url"
        :href="book.url"
        class="group p-6 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)] rounded-2xl transition-all duration-300 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 block"
      >
        <div class="flex items-start gap-4">
          <div class="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex-shrink-0 mt-3">
            <span class="i-carbon-book text-xl text-white"></span>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-[var(--vp-c-text-1)] mb-[6px] leading-relaxed">
              {{ book.title }}
            </h3>
            <div class="flex items-center gap-2 text-[var(--vp-c-text-2)]">
              <span class="i-carbon-user text-base"></span>
              <span>{{ book.author }}</span>
            </div>
          </div>
        </div>

        <div v-if="book.categories && book.categories.length > 0" class="flex flex-wrap gap-2 mb-3 mt-4">
          <span
            v-for="category in book.categories"
            :key="category"
            class="px-3 py-1 text-sm bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full"
          >
            {{ category }}
          </span>
        </div>

        <div v-if="book.tags && book.tags.length > 0" class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tag in book.tags"
            :key="tag"
            class="px-3 py-1 text-sm bg-[var(--vp-c-bg)] text-[var(--vp-c-text-2)] rounded-lg border border-[var(--vp-c-divider)]"
          >
            #{{ tag }}
          </span>
        </div>

        <div v-if="book.date" class="mt-3 text-sm text-[var(--vp-c-text-2)]">
          {{ formatDate(book.date) }}
        </div>
      </a>
    </div>

    <!-- List View -->
    <div v-else class="overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[var(--vp-c-bg-soft)] border-b border-[var(--vp-c-divider)]">
            <tr>
              <th class="px-6 py-4 text-left text-[var(--vp-c-text-1)] font-semibold rtl-text">کتاب کا نام</th>
              <th class="px-6 py-4 text-right text-[var(--vp-c-text-1)] font-semibold rtl-text">مصنف</th>
              <th class="px-6 py-4 text-right text-[var(--vp-c-text-1)] font-semibold rtl-text">زمرہ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(book, index) in filteredBooks"
              :key="book.url"
              :class="[
                'border-b border-[var(--vp-c-divider)] transition-all duration-200 hover:shadow-md hover:border-emerald-400 cursor-pointer',
                index % 2 === 0 ? 'bg-[var(--vp-c-bg)] hover:bg-emerald-950/30 dark:hover:bg-emerald-900/40' : 'bg-[var(--vp-c-bg-soft)] hover:bg-emerald-950/20 dark:hover:bg-emerald-900/30'
              ]"
              @click="navigateToBook(book.url)"
            >
              <td class="px-6 py-4">
                <div class="text-[var(--vp-c-text-1)] font-medium rtl-text text-left">
                  {{ book.title }}
                </div>
                <div v-if="book.tags && book.tags.length > 0" class="mt-2 flex flex-wrap gap-1">
                  <span
                    v-for="tag in book.tags"
                    :key="tag"
                    class="px-2 py-1 text-xs bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-2)] rounded-lg border border-[var(--vp-c-divider)]"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-[var(--vp-c-text-2)] rtl-text">
                {{ book.author }}
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="category in book.categories"
                    :key="category"
                    class="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full"
                  >
                    {{ category }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- No Results -->
    <div v-if="filteredBooks.length === 0" class="text-center py-16">
      <span class="i-carbon-search text-5xl text-[var(--vp-c-text-2)]"></span>
      <p class="mt-6 text-xl text-[var(--vp-c-text-1)] font-medium rtl-text">
        کوئی کتاب نہیں ملی
      </p>
      <p class="mt-2 text-[var(--vp-c-text-2)] rtl-text">
        فلٹرز تبدیل کرنے کی کوشش کریں
      </p>
    </div>
  </div>
</template>

<style scoped>
.rtl-text {
  direction: rtl;
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: var(--vp-c-brand);
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-brand-dark);
}

/* Select dropdown styling */
select::-ms-expand {
  display: none;
}

select option {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
</style>

