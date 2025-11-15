<template>
  <div v-if="isVisible" class="stats-section mt-6 mb-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
      <!-- Total Books Card -->
      <a href="/books" class="stat-card-link">
        <div
          class="stat-card bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700/50"
        >
          <div class="flex items-center justify-between">
            <div>
              <div
                class="text-2xl font-title font-bold text-emerald-600 dark:text-emerald-400 mb-0.5"
              >
                {{ totalBooks }}
              </div>
              <div class="text-emerald-700 dark:text-emerald-300 text-sm">
                مجموعی کتب
              </div>
            </div>
            <div class="text-emerald-500 dark:text-emerald-400 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 20 20"
                class="w-7 h-7"
              >
                <g fill="none">
                  <path
                    d="M6 5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5zm1 0v1h6V5H7zM4 4v12a2 2 0 0 0 2 2h9.5a.5.5 0 0 0 0-1H6a1 1 0 0 1-1-1h10a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zm10-1a1 1 0 0 1 1 1v11H5V4a1 1 0 0 1 1-1h8z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </a>

      <!-- Total Articles Card -->
      <a href="/articles" class="stat-card-link">
        <div
          class="stat-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700/50"
        >
          <div class="flex items-center justify-between">
            <div>
              <div
                class="text-2xl font-title font-bold text-blue-600 dark:text-blue-400 mb-0.5"
              >
                {{ totalArticles }}
              </div>
              <div class="text-blue-700 dark:text-blue-300 text-sm">
                مجموعی مضامین
              </div>
            </div>
            <div class="text-blue-500 dark:text-blue-400 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 20 20"
                class="w-7 h-7"
              >
                <g fill="none">
                  <path
                    d="M6.5 10a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1zM6 12.5a.5.5 0 1 1 1 0a.5.5 0 0 1-1 0zm2-2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 1.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zM6 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7.414a1.5 1.5 0 0 0-.44-1.06l-3.914-3.915A1.5 1.5 0 0 0 9.586 2H6zM5 4a1 1 0 0 1 1-1h3v3.5A1.5 1.5 0 0 0 10.5 8H14v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4zm5 2.5V3.207L13.793 7H10.5a.5.5 0 0 1-.5-.5zM16 8a1 1 0 0 1 1 1v5.06A3.94 3.94 0 0 1 13.06 18H7a1 1 0 0 1-1-1h7a3 3 0 0 0 3-3V8z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </a>

      <!-- Total Authors Card -->
      <a href="/authors" class="stat-card-link">
        <div
          class="stat-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700/50"
        >
          <div class="flex items-center justify-between">
            <div>
              <div
                class="text-2xl font-title font-bold text-purple-600 dark:text-purple-400 mb-0.5"
              >
                {{ totalAuthors }}
              </div>
              <div class="text-purple-700 dark:text-purple-300 text-sm">
                مجموعی مصنفین
              </div>
            </div>
            <div class="text-purple-500 dark:text-purple-400 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
                class="w-7 h-7"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  <path d="M21 21v-2a4 4 0 0 0-3-3.85"></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </a>

      <!-- Hamara Islam Card -->
      <a href="/hamara-islam/" class="stat-card-link">
        <div
          class="stat-card bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-6 border border-amber-200 dark:border-amber-700/50"
        >
          <div class="flex items-center justify-between">
            <div>
              <div
                class="text-2xl font-title font-bold text-amber-600 dark:text-amber-400 mb-0.5"
              >
                {{ hamaraIslamAsbaqs }}
              </div>
              <div class="text-amber-700 dark:text-amber-300 text-sm">
                ہمارا اسلام اسباق
              </div>
            </div>
            <div class="text-amber-500 dark:text-amber-400 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
                class="w-7 h-7"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
                  ></path>
                  <path
                    d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0-2 2a2 2 0 0 0-2-2a2 2 0 0 0 2-2"
                  ></path>
                  <path d="M19 11h2m-1-1v2"></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue"
  // @ts-ignore - VitePress data loader type issue
  import { data as siteStats } from "../../stats-flat.data"

  const { totalBooks, totalArticles, totalAuthors, hamaraIslamAsbaqs } =
    siteStats

  const isVisible = ref(true)

  // Hide stats cards when navigating away from homepage
  onMounted(() => {
    // Add click listeners to stat card links
    const statLinks = document.querySelectorAll(".stat-card-link")
    statLinks.forEach(link => {
      link.addEventListener("click", () => {
        isVisible.value = false
      })
    })

    // Listen for route changes
    const handleRouteChange = () => {
      // Check if current page is homepage
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/index.html"
      ) {
        // Show stats cards after a short delay to ensure page is loaded
        setTimeout(() => {
          isVisible.value = true
        }, 100)
      } else {
        isVisible.value = false
      }
    }

    // Initial check
    handleRouteChange()

    // Listen for browser navigation
    window.addEventListener("popstate", handleRouteChange)

    // Hide stats cards immediately when any navigation happens
    document.addEventListener("click", e => {
      const target = e.target as Element
      const link = target.closest("a")
      if (
        link &&
        link.getAttribute("href") &&
        link.getAttribute("href")?.startsWith("/")
      ) {
        // It's an internal link, hide stats cards
        if (window.location.pathname === "/") {
          isVisible.value = false
        }
      }
    })
  })
</script>

<style scoped>
  .stat-card-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .stat-card {
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    height: 100%;
  }

  .stat-card-link:hover .stat-card {
    transform: translateY(-2px);
    box-shadow:
      0 10px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
</style>
