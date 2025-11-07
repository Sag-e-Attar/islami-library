<template>
  <div class="max-w-900px mx-auto px-8 mt-10">
    <h1 class="font-title text-3rem font-bold text-center mb-12 leading-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
      اسلامی مضامین
    </h1>

    <div v-if="data.length === 0" class="text-center py-16">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--vp-c-bg-soft)] mb-6">
        <svg class="w-10 h-10 text-[var(--vp-c-text-2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-[var(--vp-c-text-1)] mb-2">ابھی کوئی مضمون موجود نہیں</h2>
      <p class="text-[var(--vp-c-text-2)]">جلد ہی نئے مضامین شامل کیے جائیں گے</p>
    </div>

    <div v-else class="grid gap-6">
      <article v-for="article in data" :key="article.url" class="block p-6 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)] rounded-2xl transition-all hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1">
        <a :href="article.url" class="no-underline">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h2 class="text-1.5rem font-bold mb-2 text-[var(--vp-c-text-1)] hover:text-emerald-500 transition-colors">
                {{ article.title }}
              </h2>
              <p v-if="article.description" class="text-[var(--vp-c-text-2)] mb-3 leading-relaxed">
                {{ article.description }}
              </p>
              <div class="flex items-center gap-2 text-sm text-emerald-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" transform="rotate(180 12 12)"></path>
                </svg>
                <span>مکمل پڑھیں</span>
              </div>
            </div>
          </div>
        </a>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data } from '../../articles.data'
</script>
