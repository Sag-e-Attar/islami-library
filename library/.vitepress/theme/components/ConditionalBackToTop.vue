<template>
  <div v-if="shouldShowButton" class="back-to-top-button-wrapper">
    <!-- Back to top button will be injected here by the plugin -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useData } from 'vitepress'

const { route } = useData()
const shouldShowButton = ref(true)

// Check if current page is homepage
const isHomepage = () => {
  return route.path.value === '/' || route.path.value === '/index.html'
}

// Toggle button visibility based on route
const updateButtonVisibility = () => {
  shouldShowButton.value = !isHomepage()
}

onMounted(() => {
  updateButtonVisibility()

  // Watch for route changes
  const unwatch = watch(() => route.path.value, updateButtonVisibility)

  // Also watch for DOM changes in case the plugin dynamically adds elements
  const observer = new MutationObserver(() => {
    const buttons = document.querySelectorAll('[class*="back-to-top"], [class*="progress"]')
    buttons.forEach((button) => {
      if (button instanceof HTMLElement) {
        if (isHomepage()) {
          button.style.display = 'none'
          button.style.visibility = 'hidden'
          button.style.opacity = '0'
        } else {
          button.style.display = ''
          button.style.visibility = ''
          button.style.opacity = ''
        }
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  onUnmounted(() => {
    unwatch()
    observer.disconnect()
  })
})
</script>

<style scoped>
.back-to-top-button-wrapper {
  /* This component doesn't render anything itself */
}
</style>