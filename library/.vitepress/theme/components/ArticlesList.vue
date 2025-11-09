<script setup lang="ts">
  import { ref, computed, onMounted, watch } from "vue"
  import { data as articles } from "../../articles.data"
  import type { Article } from "../../articles.data"

  const navigateToArticle = (url: string) => {
    window.location.href = url
  }

  // Get saved view mode from localStorage, default to 'grid'
  const getInitialViewMode = (): "grid" | "list" => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("articles-view-mode")
      return saved === "list" ? "list" : "grid"
    }
    return "grid"
  }

  // Reactive state
  const searchQuery = ref("")
  const viewMode = ref<"grid" | "list">(getInitialViewMode())

  // Filter articles based on search
  const filteredArticles = computed(() => {
    return articles.filter(article => {
      const matchesSearch =
        !searchQuery.value ||
        article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (article.author && article.author.toLowerCase().includes(searchQuery.value.toLowerCase()))

      return matchesSearch
    })
  })

  // Watch view mode changes and save to localStorage
  watch(viewMode, newMode => {
    if (typeof window !== "undefined") {
      localStorage.setItem("articles-view-mode", newMode)
    }
  })

  </script>

<template>
  <div class="max-w-1100px mx-auto px-8 mt-10 mb-16">
    <h1
      class="font-title text-3rem font-bold text-center mb-12 leading-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
    >
      مضامین
    </h1>

    <!-- Stats and View Toggle -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
    >
      <div
        class="text-lg font-normal text-[var(--vp-c-text-1)] rtl-text"
        style="font-family: &quot;Mehr Nastaliq Web&quot;, serif"
      >
        کل {{ filteredArticles.length }} {{ filteredArticles.length === 1 ? "مضمون" : "مضامین" }}
      </div>
      <div class="flex gap-2">
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

    <!-- Search -->
    <div class="mb-8 space-y-6">
      <!-- Search -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="مضمون یا مصنف تلاش کریں"
          class="w-full px-6 py-4 pl-14 text-lg border-2 border-[var(--vp-c-divider)] rounded-xl focus:outline-none focus:border-emerald-500 bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] placeholder-[var(--vp-c-text-2)] transition-all duration-200 rtl-text"
          style="
            font-family: &quot;Mehr Nastaliq Web&quot;, serif;
            font-size: 1.25rem;
            text-align: right;
            padding-right: 3.5rem;
          "
        />
        <span
          class="absolute left-4 top-4.5 text-[var(--vp-c-text-2)] text-xl i-carbon-search"
        ></span>
      </div>
    </div>

    <!-- Grid View -->
    <div
      v-if="viewMode === 'grid'"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <a
        v-for="article in filteredArticles"
        :key="article.url"
        :href="article.url"
        class="group p-6 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)] rounded-2xl transition-all duration-300 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 block"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex-shrink-0 mt-3"
          >
            <span class="i-carbon-document text-xl text-white"></span>
          </div>
          <div class="flex-1">
            <h3
              class="text-xl font-semibold text-[var(--vp-c-text-1)] mb-[6px] leading-relaxed"
            >
              {{ article.title }}
            </h3>
            <div v-if="article.author" class="text-sm text-[var(--vp-c-text-2)] flex items-center gap-2 mb-3">
              <span class="i-carbon-user text-base"></span>
              <span>{{ article.author }}</span>
            </div>
            <p v-if="article.description" class="text-[var(--vp-c-text-2)] text-xs leading-relaxed mb-3">
              {{ article.description }}
            </p>
          </div>
        </div>
      </a>
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
                  مضمون کا نام
                </th>
                <th
                  class="px-6 py-4 text-left text-[var(--vp-c-text-1)] font-semibold rtl-text border-r border-[var(--vp-c-divider)]"
                >
                  تفصیل
                </th>
                <th
                  class="px-6 py-4 text-right text-[var(--vp-c-text-1)] font-semibold rtl-text border-r border-[var(--vp-c-divider)]"
                >
                  مصنف
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="article in filteredArticles"
                :key="article.url"
                class="border-b border-[var(--vp-c-divider)] transition-all duration-200 hover:shadow-md hover:border-emerald-400 cursor-pointer bg-[var(--vp-c-bg)] hover:bg-[var(--vp-c-bg-soft)]"
                @click="navigateToArticle(article.url)"
              >
                <td class="px-6 py-4 border-r border-[var(--vp-c-divider)]">
                  <div
                    class="font-semibold rtl-text text-left text-lg text-[var(--vp-c-text-1)]"
                    style="font-size: 1rem;"
                  >
                    {{ article.title }}
                  </div>
                </td>
                <td
                  class="px-6 py-4 text-[var(--vp-c-text-2)] text-left border-r border-[var(--vp-c-divider)]"
                  style="font-size: 0.9rem;"
                >
                  <div v-if="article.description" class="leading-relaxed text-xs">
                    {{ article.description }}
                  </div>
                  <div v-else class="text-[var(--vp-c-text-3)] text-xs">
                    تفصیل نہیں موجود
                  </div>
                </td>
                <td
                  class="px-6 py-4 text-[var(--vp-c-text-2)] text-left border-r border-[var(--vp-c-divider)] text-sm"
                >
                  <div v-if="article.author" class="flex items-center gap-2">
                    <span class="i-carbon-user text-base"></span>
                    <span>{{ article.author }}</span>
                  </div>
                  <div v-else class="text-[var(--vp-c-text-3)] flex items-center gap-2">
                    <span class="i-carbon-user text-base"></span>
                    <span>مصنف نہیں موجود</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-if="filteredArticles.length === 0" class="text-center py-16">
      <span class="i-carbon-search text-5xl text-[var(--vp-c-text-2)]"></span>
      <p class="mt-6 text-xl text-[var(--vp-c-text-1)] font-medium rtl-text">
        کوئی مضمون نہیں ملا
      </p>
      <p class="mt-2 text-[var(--vp-c-text-2)] rtl-text">
        تلاش کی condition تبدیل کرنے کی کوشش کریں
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

  /* Table borders styling - using wrapper div for rounded corners */
  table {
    border: none !important;
  }

  th,
  td {
    border: 1px solid var(--vp-c-divider) !important;
  }
</style>