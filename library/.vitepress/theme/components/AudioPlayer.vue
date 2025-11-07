<script setup lang="ts">
import { useMediaControls } from '@vueuse/core'
import { useTemplateRef, computed } from 'vue'

interface Props {
  src: string
}

const props = defineProps<Props>()

const audio = useTemplateRef('audio')
const { playing, currentTime, duration, volume, muted } = useMediaControls(audio, {
  src: props.src,
})

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const progress = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const handleProgressClick = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width
  currentTime.value = percentage * duration.value
}
</script>

<template>
  <div class="audio-player" style="direction: ltr !important;">

    <audio ref="audio" preload="metadata" />

    <div class="audio-controls" style="direction: ltr !important;">
      <button @click="playing = !playing" class="play-button">
        <i v-if="playing" class="i-carbon-pause-filled" />
        <i v-else class="i-carbon-play-filled-alt" />
      </button>

      <div class="progress-container" @click="handleProgressClick" style="direction: ltr !important;">
        <div class="progress-bar" style="direction: ltr !important;">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>

      <div class="time-display">
        {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
      </div>

      <div class="volume-control">
        <button @click="muted = !muted" class="volume-button">
          <i v-if="muted" class="i-carbon-volume-mute" />
          <i v-else-if="volume < 0.3" class="i-carbon-volume-down" />
          <i v-else-if="volume < 0.7" class="i-carbon-volume-down" />
          <i v-else class="i-carbon-volume-up" />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          v-model="volume"
          class="volume-slider"
          style="direction: ltr !important;"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.audio-player {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
}

.audio-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.audio-player * {
  direction: ltr !important;
}

.play-button {
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: background-color 0.2s;
}

.play-button:hover {
  background: #7c3aed;
}

.progress-container {
  flex: 1;
  cursor: pointer;
  padding: 0 0.5rem;
}

.progress-bar {
  height: 6px;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  border-radius: 3px;
  transition: width 0.1s;
}

.time-display {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  min-width: 80px;
  text-align: center;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.volume-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: var(--vp-c-text-2);
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s;
}

.volume-button:hover {
  color: var(--vp-c-text-1);
}

.volume-slider {
  width: 60px;
  height: 4px;
  background: var(--vp-c-bg-alt);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

@media (max-width: 768px) {
  .audio-player {
    padding: 0.75rem;
  }

  .audio-controls {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }

  .play-button {
    align-self: center;
    width: 48px;
    height: 48px;
    font-size: 24px;
  }

  .progress-container {
    order: 1;
    padding: 0;
  }

  .progress-bar {
    height: 8px;
    border-radius: 4px;
  }

  .progress-fill {
    border-radius: 4px;
  }

  .time-display {
    order: 2;
    text-align: center;
    font-size: 0.9rem;
    margin: 0.25rem 0;
  }

  .volume-control {
    order: 3;
    align-self: center;
    justify-content: center;
  }

  .volume-slider {
    width: 80px;
  }
}
</style>