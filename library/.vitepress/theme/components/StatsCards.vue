<template>
  <div class="stats-section mt-6 mb-12">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      <!-- Total Books Card -->
      <a href="/books" class="stat-card-link">
        <div class="stat-card bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700/50">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-title font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">
                {{ totalBooks }}
              </div>
              <div class="text-emerald-700 dark:text-emerald-300 text-sm">
                مجموعی کتب
              </div>
            </div>
            <div class="text-emerald-500 dark:text-emerald-400 text-xl">
              📚
            </div>
          </div>
        </div>
      </a>

      <!-- Total Articles Card -->
      <a href="/articles" class="stat-card-link">
        <div class="stat-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700/50">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-title font-bold text-blue-600 dark:text-blue-400 mb-0.5">
                {{ totalArticles }}
              </div>
              <div class="text-blue-700 dark:text-blue-300 text-sm">
                مجموعی مضامین
              </div>
            </div>
            <div class="text-blue-500 dark:text-blue-400 text-xl">
              📝
            </div>
          </div>
        </div>
      </a>

      <!-- Total Authors Card -->
      <a href="/authors" class="stat-card-link">
        <div class="stat-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700/50">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-title font-bold text-purple-600 dark:text-purple-400 mb-0.5">
                {{ totalAuthors }}
              </div>
              <div class="text-purple-700 dark:text-purple-300 text-sm">
                مجموعی مصنفین
              </div>
            </div>
            <div class="text-purple-500 dark:text-purple-400 text-xl">
              👨‍🏫
            </div>
          </div>
        </div>
      </a>

      <!-- Hamara Islam Card -->
      <a href="/hamara-islam/" class="stat-card-link">
        <div class="stat-card bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-6 border border-amber-200 dark:border-amber-700/50">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-title font-bold text-amber-600 dark:text-amber-400 mb-0.5">
                {{ hamaraIslamAsbaqs }}
              </div>
              <div class="text-amber-700 dark:text-amber-300 text-sm">
                ہمارا اسلام اسباق
              </div>
            </div>
            <div class="text-amber-500 dark:text-amber-400 text-xl">
              🕌
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore - VitePress data loader type issue
import { data as siteStats } from "../../stats-flat.data"

const { totalBooks, totalArticles, totalAuthors, hamaraIslamAsbaqs } = siteStats
</script>

<style scoped>
.stat-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
}

.stat-card-link:hover .stat-card {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>