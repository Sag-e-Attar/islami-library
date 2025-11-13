<script setup lang="ts">
  import { ref, computed, onMounted, watch } from "vue"
  // @ts-ignore - VitePress data loader type issue
  import { data as books } from "../../books-flat.data"
  import type { FlatBook } from "../../books-flat.data"

  // Props to control what to show
  interface Props {
    showFilters?: boolean
    showTitle?: boolean
    showStats?: boolean
    showViewToggle?: boolean
    showCategories?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    showFilters: true,
    showTitle: true,
    showStats: true,
    showViewToggle: true,
    showCategories: true
  })

  const navigateToBook = (url: string) => {
    window.location.href = url
  }

  // Get saved view mode from localStorage, default to 'grid'
  const getInitialViewMode = (): "grid" | "list" => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("books-view-mode")
      return saved === "list" ? "list" : "grid"
    }
    return "grid"
  }

  // Reactive state
  const searchQuery = ref("")
  const selectedAuthor = ref<string>("all")
  const selectedCategory = ref<string>("all")
  const viewMode = ref<"grid" | "list">(getInitialViewMode())

  // Extract unique authors and categories for filters
  const authors = computed(() => {
    const uniqueAuthors = Array.from(
      new Set(books.map((book: FlatBook) => book.author))
    ) as string[]
    return uniqueAuthors.sort((a: string, b: string) =>
      a.localeCompare(b, "ur")
    )
  })

  // Extract unique authors from filtered results
  const filteredAuthors = computed(() => {
    const uniqueAuthors = Array.from(
      new Set(filteredBooks.value.map((book: FlatBook) => book.author))
    ) as string[]
    return uniqueAuthors.sort((a: string, b: string) =>
      a.localeCompare(b, "ur")
    )
  })

  // Check if any filters are active
  const hasActiveFilters = computed(() => {
    return searchQuery.value !== '' || selectedAuthor.value !== 'all' || selectedCategory.value !== 'all'
  })

  // Reset all filters
  const resetFilters = () => {
    searchQuery.value = ''
    selectedAuthor.value = 'all'
    selectedCategory.value = 'all'
  }

  
  const categories = computed(() => {
    const allCategories = books.flatMap(
      (book: FlatBook) => book.categories || []
    ) as string[]
    const uniqueCategories = Array.from(new Set(allCategories)) as string[]
    return uniqueCategories.sort((a: string, b: string) =>
      a.localeCompare(b, "ur")
    )
  })

  // Filter books based on search and filters
  const filteredBooks = computed(() => {
    return books.filter((book: FlatBook) => {
      const matchesSearch =
        !searchQuery.value ||
        book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesAuthor =
        selectedAuthor.value === "all" || book.author === selectedAuthor.value

      const matchesCategory =
        selectedCategory.value === "all" ||
        (book.categories && book.categories.includes(selectedCategory.value))

      return matchesSearch && matchesAuthor && matchesCategory
    })
  })

  // Watch view mode changes and save to localStorage
  watch(viewMode, newMode => {
    if (typeof window !== "undefined") {
      localStorage.setItem("books-view-mode", newMode)
    }
  })

  // Format date
  const formatDate = (date: string) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("ur-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
</script>

<template>
  <div class="max-w-1100px mx-auto px-5 mt-10 mb-16">
    <h1
      v-if="showTitle"
      class="font-title text-3rem font-bold text-center mb-12 leading-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
    >
      کُتب
    </h1>

    <!-- Stats and View Toggle -->
    <div
      v-if="showStats || showViewToggle"
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
    >
      <div
        v-if="showStats"
        class="urdu-stats text-lg font-normal text-[var(--vp-c-text-1)] rtl-text"
      >
        کل {{ filteredBooks.length }} کُتب — {{ filteredAuthors.length }}
        {{ filteredAuthors.length === 1 ? "مصنف" : "مصنفین" }}
      </div>
      <div v-if="showViewToggle" class="flex gap-2">
        <button
          @click="viewMode = 'grid'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2',
            viewMode === 'grid'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25'
              : 'bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] border-[var(--vp-c-divider)] hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400',
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
              : 'bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] border-[var(--vp-c-divider)] hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400',
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
    <div v-if="showFilters" class="mb-8 space-y-6">
      <!-- Search -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="کتاب یا مصنف تلاش کریں.."
          class="urdu-input w-full px-4 py-3 pl-12 text-lg border-2 border-[var(--vp-c-divider)] rounded-xl focus:outline-none focus:border-emerald-500 bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] placeholder-[var(--vp-c-text-2)] transition-all duration-200 rtl-text"
        />
        <span
          class="absolute left-3 top-3.5 text-[var(--vp-c-text-2)] text-xl i-carbon-search"
        ></span>
      </div>

      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <select
            v-model="selectedAuthor"
            class="urdu-select w-full px-4 py-3 text-lg border-2 border-[var(--vp-c-divider)] rounded-xl focus:outline-none focus:border-emerald-500 bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] cursor-pointer transition-all duration-200 rtl-text appearance-none"
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
            class="urdu-select w-full px-4 py-3 text-lg border-2 border-[var(--vp-c-divider)] rounded-xl focus:outline-none focus:border-emerald-500 bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] cursor-pointer transition-all duration-200 rtl-text appearance-none"
          >
            <option value="all">تمام زمرے</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="resetFilters"
            :disabled="searchQuery === '' && selectedAuthor === 'all' && selectedCategory === 'all'"
            class="px-4 py-3 text-lg border-2 border-[var(--vp-c-divider)] rounded-xl focus:outline-none focus:border-red-500 bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] cursor-pointer transition-all duration-200 rtl-text disabled:opacity-50 disabled:cursor-not-allowed hover:border-red-500 hover:text-red-600 dark:hover:text-red-400"
          >
            فلٹر صاف کریں
          </button>
        </div>
      </div>

      <!-- Active Filters Display -->
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 items-center">
        <span class="text-sm text-[var(--vp-c-text-2)]">فعال فلٹرز:</span>

        <!-- Search filter badge -->
        <span v-if="searchQuery" class="active-filter-badge search-filter">
          تلاش: "{{ searchQuery }}"
          <button @click="searchQuery = ''" class="ml-2">×</button>
        </span>

        <!-- Author filter badge -->
        <span v-if="selectedAuthor !== 'all'" class="active-filter-badge author-filter">
          مصنف: {{ selectedAuthor }}
          <button @click="selectedAuthor = 'all'" class="ml-2">×</button>
        </span>

        <!-- Category filter badge -->
        <span v-if="selectedCategory !== 'all'" class="active-filter-badge category-filter">
          زمرہ: {{ selectedCategory }}
          <button @click="selectedCategory = 'all'" class="ml-2">×</button>
        </span>
      </div>
    </div>

    <!-- Grid View -->
    <div
      v-if="viewMode === 'grid'"
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
    >
      <div
        v-for="book in filteredBooks"
        :key="book.url"
        class="p-3 sm:p-4 md:p-6 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)] rounded-2xl transition-all duration-300 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10"
      >
        <a
          :href="book.url"
          class="block"
        >
          <div class="flex items-start gap-3 sm:gap-4">
            <div
              class="p-1.5 sm:p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex-shrink-0 mt-2 sm:mt-3"
            >
              <span class="i-carbon-book text-lg sm:text-xl text-white"></span>
            </div>
            <div class="flex-1">
              <h3
                class="text-lg sm:text-xl font-semibold text-[var(--vp-c-text-1)] mb-[8px] sm:mb-[10px] leading-relaxed"
              >
                {{ book.title }}
              </h3>
              <div class="flex items-center gap-2 text-[var(--vp-c-text-2)] text-sm sm:text-base">
                <span class="i-carbon-user text-sm sm:text-base"></span>
                <span class="text-sm sm:text-base">{{ book.author }}</span>
              </div>
            </div>
          </div>

          <div
            v-if="book.tags && book.tags.length > 0"
            class="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4"
          >
            <span
              v-for="tag in book.tags"
              :key="tag"
              class="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-[var(--vp-c-bg)] text-[var(--vp-c-text-2)] rounded-lg border border-[var(--vp-c-divider)]"
            >
              #{{ tag }}
            </span>
          </div>

          <div v-if="book.date" class="mt-2 sm:mt-3 text-xs sm:text-sm text-[var(--vp-c-text-2)]">
            {{ formatDate(book.date) }}
          </div>
        </a>

        <!-- Categories outside the link -->
        <div
          v-if="showCategories && book.categories && book.categories.length > 0"
          class="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4"
        >
          <button
            v-for="category in book.categories"
            :key="category"
            @click="showFilters && (selectedCategory = category)"
            :class="[
              'book-category-badge',
              showFilters && selectedCategory === category ? 'active' : '',
              showFilters ? 'clickable' : 'static'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="overflow-hidden">
      <div class="overflow-x-auto">
        <div
          class="border border-[var(--vp-c-divider)] rounded-xl overflow-hidden"
        >
          <table class="w-full border-separate border-spacing-0">
            <thead
              class="bg-[var(--vp-c-bg-soft)] border-b border-[var(--vp-c-divider)]"
            >
              <tr>
                <th
                  class="px-6 py-4 text-left text-[var(--vp-c-text-1)] font-semibold rtl-text border-r border-[var(--vp-c-divider)]"
                >
                  کتاب کا نام
                </th>
                <th
                  class="px-6 py-4 text-right text-[var(--vp-c-text-1)] font-semibold rtl-text"
                >
                  مصنف
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="book in filteredBooks"
                :key="book.url"
                class="border-b border-[var(--vp-c-divider)] transition-all duration-200 hover:shadow-md hover:border-emerald-400 cursor-pointer bg-[var(--vp-c-bg)] hover:bg-[var(--vp-c-bg-soft)]"
                @click="navigateToBook(book.url)"
              >
                <td class="px-6 py-4 border-r border-[var(--vp-c-divider)]">
                  <div
                    class="font-semibold rtl-text text-left text-lg text-[var(--vp-c-text-1)]"
                  >
                    {{ book.title }}
                  </div>
                  <div
                    v-if="book.tags && book.tags.length > 0"
                    class="mt-2 flex flex-wrap gap-1"
                  >
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
              </tr>
            </tbody>
          </table>
        </div>
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

  /* Table borders styling - using wrapper div for rounded corners */
  table {
    border: none !important;
  }

  th,
  td {
    border: 1px solid var(--vp-c-divider) !important;
  }

  /* Keep right border from last column for RTL layout */
  /* th:last-child,
td:last-child {
  border-right: none !important;
} */

  /* Keep bottom border from last row for complete table border */
  /* tr:last-child td {
  border-bottom: none !important;
} */

  /* Urdu font styling */
  .urdu-stats {
    font-family: "Mehr Nastaliq Web", serif;
    text-align: left;
    direction: rtl;
  }

  .urdu-input {
    font-family: "Mehr Nastaliq Web", serif;
    font-size: 1.1rem;
    text-align: left;
    direction: rtl;
  }

  /* Mobile-specific font size adjustments */
  @media (max-width: 640px) {
    .urdu-input {
      font-size: 1rem;
    }

    .urdu-select {
      font-size: 1rem;
    }

    /* Ensure search placeholder fits on mobile */
    .urdu-input::placeholder {
      font-size: 0.9rem;
    }
  }

  .urdu-select {
    font-family: "Mehr Nastaliq Web", serif;
    font-size: 1.1rem;
    text-align: left;
    direction: rtl;
    background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"%3e%3cpath stroke="%236b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8 4 4 4-4"/%3e%3c/svg%3e');
    background-position: right 1rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 3rem;
  }

  /* Active filter badge styling */
  .active-filter-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 9999px;
    border: 1px solid;
    transition: all 0.2s ease-in-out;
  }

  .active-filter-badge button {
    background: none;
    border: none;
    padding: 0;
    margin-left: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  /* Search filter badge */
  .search-filter {
    background-color: rgba(59, 130, 246, 0.1);
    color: rgb(37, 99, 235);
    border-color: rgba(59, 130, 246, 0.2);
  }

  .search-filter button {
    color: rgb(37, 99, 235);
  }

  .search-filter button:hover {
    background-color: rgba(239, 68, 68, 0.1);
    color: rgb(239, 68, 68);
  }

  /* Author filter badge */
  .author-filter {
    background-color: rgba(34, 197, 94, 0.1);
    color: rgb(22, 163, 74);
    border-color: rgba(34, 197, 94, 0.2);
  }

  .author-filter button {
    color: rgb(22, 163, 74);
  }

  .author-filter button:hover {
    background-color: rgba(239, 68, 68, 0.1);
    color: rgb(239, 68, 68);
  }

  /* Category filter badge */
  .category-filter {
    background-color: rgba(168, 85, 247, 0.1);
    color: rgb(147, 51, 234);
    border-color: rgba(168, 85, 247, 0.2);
  }

  .category-filter button {
    color: rgb(147, 51, 234);
  }

  .category-filter button:hover {
    background-color: rgba(239, 68, 68, 0.1);
    color: rgb(239, 68, 68);
  }

  /* Dark mode overrides for active filter badges */
  html.dark .search-filter {
    background-color: rgba(59, 130, 246, 0.15);
    color: rgb(147, 197, 253);
    border-color: rgba(59, 130, 246, 0.3);
  }

  html.dark .search-filter button {
    color: rgb(147, 197, 253);
  }

  html.dark .author-filter {
    background-color: rgba(34, 197, 94, 0.15);
    color: rgb(134, 239, 172);
    border-color: rgba(34, 197, 94, 0.3);
  }

  html.dark .author-filter button {
    color: rgb(134, 239, 172);
  }

  html.dark .category-filter {
    background-color: rgba(168, 85, 247, 0.15);
    color: rgb(196, 181, 253);
    border-color: rgba(168, 85, 247, 0.3);
  }

  html.dark .category-filter button {
    color: rgb(196, 181, 253);
  }

  /* Hover effects for active filter badges */
  .active-filter-badge:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  html.dark .active-filter-badge:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  /* Book category badges styling */
  .book-category-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 400;
    border-radius: 9999px;
    border: 1px solid;
    background-color: rgba(107, 114, 128, 0.08);
    color: rgb(75, 85, 99);
    border-color: rgba(107, 114, 128, 0.15);
    transition: all 0.2s ease-in-out;
    cursor: default;
  }

  /* Dark mode for book category badges */
  html.dark .book-category-badge {
    background-color: rgba(156, 163, 175, 0.08);
    color: rgb(156, 163, 175);
    border-color: rgba(156, 163, 175, 0.15);
  }

  /* Clickable state for book category badges */
  .book-category-badge.clickable {
    cursor: pointer;
  }

  .book-category-badge.clickable:hover {
    background-color: rgba(107, 114, 128, 0.12);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }

  html.dark .book-category-badge.clickable:hover {
    background-color: rgba(156, 163, 175, 0.12);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* Active state for book category badges */
  .book-category-badge.active {
    background-color: rgba(16, 185, 129, 0.15);
    color: rgb(5, 150, 105);
    border-color: rgba(16, 185, 129, 0.25);
    box-shadow: 0 1px 3px rgba(16, 185, 129, 0.15);
  }

  .book-category-badge.active:hover {
    background-color: rgba(16, 185, 129, 0.2);
    border-color: rgba(16, 185, 129, 0.3);
  }

  /* Static state (non-clickable) */
  .book-category-badge.static {
    cursor: default;
  }
</style>
