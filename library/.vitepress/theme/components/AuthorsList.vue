<template>
  <div class="max-w-1100px mx-auto px-8 mt-10">
    <h1
      class="font-title text-3rem font-bold text-center mb-12 leading-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
    >
      مصنفین اور کتابیں
    </h1>

    <div class="flex gap-6 flex-start">
      <!-- Create columns using v-for -->
      <div
        v-for="(column, columnIndex) in authorColumns"
        :key="columnIndex"
        class="flex flex-col gap-6"
        style="width: 520px;"
      >
        <div
          v-for="item in column"
          :key="item.author.slug"
          class="p-6 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)] rounded-2xl transition-all hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 flex-shrink-0"
          style="width: 520px;"
        >
          <div
            class="flex items-center gap-4 mb-6 pb-4 border-b-2 border-[var(--vp-c-divider)]"
          >
            <div
              class="w-18 h-18 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-8.8 h-8.8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <div class="flex-1 flex flex-col gap-2">
              <h2 class="text-1.5rem font-bold mb-3 text-[var(--vp-c-text-1)]">
                {{ item.author.name }}
              </h2>
              <span
                class="inline-flex items-center gap-1.2 px-3.2 py-1.2 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full text-0.8rem font-semibold self-start"
              >
                <svg
                  class="w-3.6 h-3.6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
                <span class="inline-block">{{ item.author.books.length }}</span>
                {{ item.author.books.length === 1 ? "کتاب" : "کتابیں" }}
              </span>
            </div>
          </div>

          <div class="grid gap-3.2">
            <div v-for="book in item.author.books" :key="book.url" class="block">
              <a
                :href="book.url"
                class="flex items-center gap-3.2 p-4 bg-[var(--vp-c-bg)] border border-[var(--vp-c-divider)] rounded-xl no-underline text-[var(--vp-c-text-1)] transition-all text-1.05rem hover:bg-[var(--vp-c-bg-soft)] hover:border-emerald-500 hover:-translate-x-5px hover:shadow-md hover:shadow-emerald-500/15"
              >
                <svg
                  class="w-4.8 h-4.8 text-emerald-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                    transform="rotate(180 12 12)"
                  ></path>
                </svg>
                <span class="flex-1">{{ book.title }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-24"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'
  import { data } from "../../books.data"

  const windowWidth = ref(0)
  const cardWidth = ref(520) // ~50% of 1100px content area minus gap
  const gap = ref(24) // 24px gap

  // Calculate number of columns based on window width
  const columnCount = computed(() => {
    return Math.max(1, Math.floor((windowWidth.value * 0.9 - 100) / (cardWidth.value + gap.value)))
  })

  // Group authors by column
  const authorColumns = computed(() => {
    const columns: Array<Array<{author: any, index: number}>> = Array(columnCount.value).fill(null).map(() => [])

    if (data && Array.isArray(data)) {
      data.forEach((author, index) => {
        const columnIndex = index % columnCount.value
        columns[columnIndex].push({ author, index })
      })
    }

    return columns
  })

  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>
