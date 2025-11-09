<script setup lang="ts">
  import { ref, computed, watch } from "vue"
  // @ts-ignore - VitePress data loader type issue
  import { data as chaptersData } from "../data/hamara-islam-chapters.data"

  // Use the real chapters data
  const chapters = ref(chaptersData || [])

  // Get saved view mode from localStorage, default to 'grid'
  const getInitialViewMode = (): "grid" | "table" => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hamara-islam-view-mode")
      return saved === "table" ? "table" : "grid"
    }
    return "grid"
  }

  // Reactive state
  const searchQuery = ref("")
  const viewMode = ref<"grid" | "table">(getInitialViewMode())

  // Flatten all chapters for table view and search
  const allChapters = computed(() => {
    const flattened: Array<{
      title: string
      url: string
      number: string
      part: string
      partTitle: string
    }> = []

    let continuousNumber = 1

    chapters.value.forEach((part: any) => {
      part.chapters.forEach((chapter: any) => {
        // Better matching logic for part numbers
        let partNumber = "01"
        if (part.title.includes("پہلا") || part.title.includes("اول"))
          partNumber = "01"
        else if (part.title.includes("دوسرا") || part.title.includes("دوم"))
          partNumber = "02"
        else if (part.title.includes("تیسرا") || part.title.includes("سوم"))
          partNumber = "03"
        else if (part.title.includes("چوتھا") || part.title.includes("چہارم"))
          partNumber = "04"
        else if (part.title.includes("پانچواں") || part.title.includes("پنجم"))
          partNumber = "05"
        else if (part.title.includes("چھٹا") || part.title.includes("ششم"))
          partNumber = "06"
        else if (part.title.includes("ساتواں") || part.title.includes("ہفتم"))
          partNumber = "07"
        else if (part.title.includes("آٹھواں") || part.title.includes("ہشتم"))
          partNumber = "08"
        else if (part.title.includes("نواں") || part.title.includes("نہم"))
          partNumber = "09"

        flattened.push({
          title: chapter.title,
          url: chapter.url,
          number: continuousNumber.toString(),
          part: partNumber,
          partTitle: part.title,
        })
        continuousNumber++
      })
    })

    return flattened
  })

  // Filter chapters based on search
  const filteredChapters = computed(() => {
    if (!searchQuery.value) return allChapters.value

    return allChapters.value.filter(chapter => {
      const query = searchQuery.value.toLowerCase()
      return (
        chapter.title.toLowerCase().includes(query) ||
        chapter.number.includes(query) ||
        chapter.part.toLowerCase().includes(query) ||
        chapter.partTitle.toLowerCase().includes(query)
      )
    })
  })

  // Filter parts for grid view based on search
  const filteredParts = computed(() => {
    if (!searchQuery.value) return chapters.value

    return chapters.value
      .map((part: any) => ({
        ...part,
        chapters: part.chapters.filter((chapter: any) => {
          const query = searchQuery.value.toLowerCase()
          return (
            chapter.title.toLowerCase().includes(query) ||
            chapter.number.includes(query)
          )
        }),
      }))
      .filter((part: any) => part.chapters.length > 0)
  })

  // Watch view mode changes and save to localStorage
  watch(viewMode, newMode => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hamara-islam-view-mode", newMode)
    }
  })

  // Navigate to chapter
  const navigateToChapter = (url: string) => {
    window.location.href = url
  }

  // Get part name in Urdu
  const getPartName = (partNumber: string) => {
    const partNames: { [key: string]: string } = {
      "01": "پہلا",
      "02": "دوسرا",
      "03": "تیسرا",
      "04": "چوتھا",
      "05": "پانچواں",
      "06": "چھٹا",
      "07": "ساتواں",
      "08": "آٹھواں",
      "09": "نواں",
    }
    return partNames[partNumber] || partNumber
  }
</script>

<template>
  <div class="hamara-islam-index">
    <div class="book-header">
      <h1>ہمارا اسلام</h1>
      <p
        class="text-white bg-emerald-500 text-lg inline-block rounded-md px-3 py-2"
      >
        خلیل ملت مفتی خلیل احمد قادری برکاتی رحمۃ اللہ علیہ
      </p>
    </div>

    <div class="book-intro">
      <h2>کتاب کا تعارف</h2>
      <p class="text-zinc-400">
        <strong>ہمارا اسلام</strong> خلیل ملت مفتی خلیل احمد قادری برکاتی رحمۃ
        اللہ علیہ کی تصنیف ہے جو اسلامی عقائد، عبادات اور احکامات کا ایک جامع و
        مکمل دائرۃ المعارف ہے۔ یہ کتاب نو (۹) حصوں پر مشتمل ہے جن میں اسلامی
        عقائد، عبادات اور احکامات کو ترتیب وار بیان کیا گیا ہے اور سوال و جواب
        کے سہل و آسان انداز میں لکھی گئی ہے۔ اس کتاب میں توحید، رسالت، آخرت،
        فرشتے، آسمانی کتب، انبیاء و اولیاء کرام، ارکانِ اسلام (نماز، روزہ،
        زکوٰۃ، حج)، طہارت و پاکیزگی، احکامِ شریعت، اور دیگر ضروری مسائل کو تفصیل
        سے بیان کیا گیا ہے۔ ہر موضوع کو قرآن و حدیث کی روشنی میں واضح کیا گیا
        ہے۔ یہ کتاب خاص طور پر عام مسلمانوں، طلباء و طالبات، اور دین کے بنیادی
        احکام سیکھنے کے خواہشمند افراد کے لیے نہایت مفید ہے۔
      </p>
    </div>

    <!-- Search and View Toggle -->
    <div class="search-controls">
      <div class="search-container">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="سبق یا حصہ تلاش کریں"
            class="search-input"
          />
          <span
            class="search-icon text-[var(--vp-c-text-2)] text-xl i-carbon-search"
          ></span>
        </div>
      </div>

      <div class="view-toggle">
        <button
          @click="viewMode = 'grid'"
          :class="['view-btn', viewMode === 'grid' ? 'active' : '']"
        >
          <span class="view-icon">⊞</span>
          گرڈ
        </button>
        <button
          @click="viewMode = 'table'"
          :class="['view-btn', viewMode === 'table' ? 'active' : '']"
        >
          <span class="view-icon">☰</span>
          فہرست
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats">
      <span v-if="viewMode === 'grid'">
        {{ filteredParts.length }} حصے،
        {{
          filteredParts.reduce(
            (sum: number, part: any) => sum + part.chapters.length,
            0
          )
        }}
        اسباق
      </span>
      <span v-else> کل {{ filteredChapters.length }} اسباق </span>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid-view">
      <div class="chapters-section">
        <div v-if="filteredParts.length === 0" class="no-results">
          <span class="no-results-icon i-carbon-search"></span>
          <p>کوئی سبق نہیں ملا</p>
          <p class="no-results-hint">
            تلاش کی condition تبدیل کرنے کی کوشش کریں
          </p>
        </div>

        <div
          v-for="part in filteredParts"
          :key="part.title"
          class="part-section"
        >
          <h3 class="part-title">{{ part.title }}</h3>
          <div class="chapters-grid">
            <a
              v-for="chapter in part.chapters"
              :key="chapter.url"
              :href="chapter.url"
              class="chapter-card"
            >
              <div class="chapter-number">{{ chapter.number }}</div>
              <div class="chapter-content">
                <h3 class="chapter-title">{{ chapter.title }}</h3>
              </div>
              <div class="chapter-arrow">←</div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Table View -->
    <div v-else class="table-view">
      <div class="table-container">
        <div class="table-wrapper">
          <table class="lessons-table">
            <thead>
              <tr>
                <th>سبق نمبر</th>
                <th class="text-left">سبق کا عنوان</th>
                <th>حصہ</th>
                <th>لنک</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="chapter in filteredChapters"
                :key="chapter.url"
                class="lesson-row"
                @click="navigateToChapter(chapter.url)"
              >
                <td class="lesson-number">{{ chapter.number }}</td>
                <td class="lesson-title">{{ chapter.title }}</td>
                <td class="lesson-part">{{ getPartName(chapter.part) }}</td>
                <td class="lesson-link">
                  <span class="link-button">
                    <span class="link-icon">←</span>
                    کھولیں
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredChapters.length === 0" class="no-results">
          <span class="no-results-icon i-carbon-search"></span>
          <p>کوئی سبق نہیں ملا</p>
          <p class="no-results-hint">
            تلاش کی condition تبدیل کرنے کی کوشش کریں
          </p>
        </div>
      </div>
    </div>

    <div class="book-features">
      <h2>کتاب کی خصوصیات</h2>
      <div class="features-grid">
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">سوال و جواب کے سہل و آسان انداز میں</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">قرآن کریم اور احادیث مبارکہ سے دلائل</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">عام فہم اور سادہ اردو زبان</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text"
            >عقائد، عبادات اور معاملات کی مکمل تفصیل</span
          >
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text"
            >نماز، روزہ، زکوٰۃ اور حج کے تفصیلی احکام</span
          >
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">طہارت و پاکیزگی کے جامع مسائل</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text"
            >انبیاء، صحابہ اور اولیاء کرام کا تذکرہ</span
          >
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">حج اور عمرہ کی تفصیلی راہنمائی</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">حرمین شریفین کی زیارت کے آداب</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">اہلسنت و جماعت کے عقائد کی وضاحت</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">فقہ حنفی کے مطابق احکام و مسائل</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">ہر مسلمان کے لیے ضروری دینی معلومات</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .hamara-islam-index {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .book-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--vp-c-divider);
  }

  .book-header h1 {
    font-family: "Lalezar", "Mehr Nastaliq Web", system-ui, sans-serif;
    font-size: 3rem;
    margin: 1.5rem 0 1rem 0;
    line-height: 1.2;
    background: linear-gradient(135deg, #059669 0%, #14b8a6 50%, #06b6d4 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dark .book-header h1 {
    background: linear-gradient(135deg, #10b981 0%, #2dd4bf 50%, #22d3ee 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .author {
    @apply text-white bg-emerald-500 dark:bg-emerald-400 text-xl inline-block rounded-md px-5 py-10;
  }

  .book-intro {
    margin-bottom: 2rem;
  }

  .book-intro h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: var(--vp-c-brand-1);
  }

  .book-intro p {
    font-size: 1rem;
    line-height: 2;
  }

  /* Search and Controls */
  .search-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .search-container {
    flex: 1;
    min-width: 250px;
  }

  .search-input {
    width: 100%;
    padding: 0.6rem 1rem 0.6rem 3rem;
    border: 2px solid var(--vp-c-divider);
    border-radius: 12px;
    font-size: 0.85rem;
    line-height: 1.5;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    transition: all 0.3s ease;
    text-align: left;
    font-family: "Mehr Nastaliq Web", serif;
    direction: rtl;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-bg);
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--vp-c-text-2);
    font-size: 1.1rem;
  }

  .view-toggle {
    display: flex;
    gap: 0.5rem;
    background: var(--vp-c-bg-soft);
    padding: 0.25rem;
    border-radius: 12px;
    border: 1px solid var(--vp-c-divider);
  }

  .view-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--vp-c-text-2);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .view-btn:hover {
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
  }

  .view-btn.active {
    background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  .view-icon {
    font-size: 1rem;
  }

  .stats {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--vp-c-text-2);
    font-size: 1rem;
    font-family: "Mehr Nastaliq Web", serif;
  }

  /* Grid View Styles */
  .chapters-section {
    margin-bottom: 3rem;
  }

  .part-section {
    margin-bottom: 3rem;
  }

  .part-section:last-child {
    margin-bottom: 0;
  }

  .part-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--vp-c-brand-1);
    font-family: "Lalezar", "Mehr Nastaliq Web", system-ui, sans-serif;
    background: linear-gradient(135deg, #059669 0%, #14b8a6 50%, #06b6d4 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--vp-c-divider);
    margin-bottom: 2rem;
  }

  .dark .part-title {
    background: linear-gradient(135deg, #10b981 0%, #2dd4bf 50%, #22d3ee 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .chapters-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
  }

  .chapter-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .chapter-card:hover {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-bg-alt);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(16, 185, 129, 0.15);
  }

  .chapter-number {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
    color: white;
    border-radius: 50%;
    font-family: "Lalezar", sans-serif;
    font-size: 0.9rem;
    line-height: 1;
    padding-top: 3px;
  }

  .dark .chapter-number {
    background: linear-gradient(135deg, #34d399 0%, #2dd4bf 100%);
    color: var(--vp-c-bg);
  }

  .chapter-content {
    flex: 1;
  }

  .chapter-title {
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    color: var(--vp-c-text-1);
    font-weight: normal;
  }

  .chapter-arrow {
    flex-shrink: 0;
    font-size: 1.2rem;
    color: var(--vp-c-text-3);
    transition: transform 0.3s ease;
  }

  .chapter-card:hover .chapter-arrow {
    transform: translateX(-4px);
    color: var(--vp-c-brand-1);
  }

  /* Table View Styles */
  .table-container {
    background: var(--vp-c-bg-soft);
    border-radius: 12px;
    padding: 1rem;
    border: 1px solid var(--vp-c-divider);
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .lessons-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  .lessons-table th {
    background: var(--vp-c-bg);
    padding: 1rem;
    text-align: center;
    font-weight: 600;
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-divider);
    font-family: "Mehr Nastaliq Web", serif;
    font-size: 1.1rem;
  }

  .lessons-table th:nth-child(2) {
    text-align: left !important;
  }

  .lessons-table th:first-child {
    border-radius: 8px 0 0 8px;
  }

  .lessons-table th:last-child {
    border-radius: 0 8px 8px 0;
  }

  .lesson-row {
    background: var(--vp-c-bg);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .lesson-row:hover {
    background: var(--vp-c-bg-soft);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
  }

  .lesson-row td {
    padding: 0.75rem 1rem;
    text-align: center;
    border: 1px solid var(--vp-c-divider);
    font-family: "Mehr Nastaliq Web", serif;
  }

  .lesson-number {
    font-weight: 600;
    color: var(--vp-c-brand-1);
    font-size: 1rem;
    width: 120px;
    text-align: center;
  }

  .lesson-row td.lesson-title {
    text-align: left !important;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--vp-c-text-1);
    direction: rtl;
  }

  .lesson-part {
    color: var(--vp-c-text-2);
    font-size: 0.9rem;
    width: 100px;
  }

  .lesson-link {
    text-align: center;
    border: 1px solid var(--vp-c-divider);
  }

  .link-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--vp-c-brand-1);
    font-size: 0.9rem;
    font-weight: 500;
    flex-direction: row-reverse;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .link-icon {
    font-size: 1rem;
    transition: transform 0.3s ease;
  }

  .lesson-row:hover .link-icon {
    transform: translateX(-4px);
  }

  .lesson-row:hover .link-button {
    color: var(--vp-c-brand-1);
    opacity: 0.8;
  }

  /* No Results */
  .no-results {
    text-align: center;
    padding: 3rem;
    color: var(--vp-c-text-2);
  }

  .no-results-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  .no-results p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .no-results-hint {
    font-size: 1rem !important;
    color: var(--vp-c-text-3) !important;
  }

  /* Book Features */
  .book-features {
    margin-top: 3rem;
    padding: 2rem;
    background: var(--vp-c-bg-soft);
    border-radius: 12px;
  }

  .book-features h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--vp-c-brand-1);
    text-align: center;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--vp-c-bg);
    border-radius: 8px;
  }

  .feature-icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(16, 185, 129, 0.15);
    color: var(--vp-c-brand-1);
    border-radius: 50%;
    font-weight: bold;
  }

  .feature-text {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--vp-c-text-1);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .book-header h1 {
      font-size: 2rem;
    }

    .part-title {
      font-size: 1.3rem;
    }

    .chapters-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .search-controls {
      flex-direction: column;
    }

    .search-container {
      width: 100%;
    }

    .view-toggle {
      width: 100%;
      justify-content: center;
    }

    .lessons-table {
      font-size: 0.9rem;
    }

    .lessons-table th,
    .lesson-row td {
      padding: 0.75rem 0.5rem;
    }

    .lesson-number {
      width: 60px;
      font-size: 0.9rem;
    }

    .lesson-title {
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .lesson-part {
      font-size: 0.8rem;
      width: 70px;
    }

    .link-button {
      font-size: 0.8rem;
      padding: 0.25rem 0.5rem;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .chapters-grid {
      grid-template-columns: 1fr;
    }

    .lessons-table {
      font-size: 0.85rem;
    }

    .lessons-table th,
    .lesson-row td {
      padding: 0.6rem 0.4rem;
    }

    /* Hide the link column header and cells on mobile */
    .lessons-table th:nth-child(4),
    .lesson-row td:nth-child(4) {
      display: none;
    }

    .lesson-number {
      width: 50px;
      font-size: 0.85rem;
    }

    .lesson-title {
      font-size: 0.85rem;
      line-height: 1.3;
    }

    .lesson-part {
      font-size: 0.75rem;
      width: 60px;
    }

    /* Make entire row clickable on mobile */
    .lesson-row {
      cursor: pointer;
    }
  }
</style>
