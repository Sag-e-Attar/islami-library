<template>
  <div class="max-w-900px mx-auto px-8 mt-10">
    <h1
      class="font-title text-3rem font-bold text-center mb-12 leading-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
    >
      مصنفین اور کتابیں
    </h1>

    <div
      v-for="author in data"
      :key="author.slug"
      class="mb-12 p-8 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)] rounded-2xl transition-all hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10"
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
            {{ author.name }}
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
            <span class="inline-block">{{ author.books.length }}</span>
            {{ author.books.length === 1 ? "کتاب" : "کتابیں" }}
          </span>
        </div>
      </div>

      <div class="grid gap-3.2">
        <div v-for="book in author.books" :key="book.url" class="block">
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
</template>

<script setup lang="ts">
  import { data } from "../../books.data"
</script>
