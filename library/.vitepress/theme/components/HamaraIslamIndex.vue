<script setup lang="ts">
import { data as chapters } from '../data/hamara-islam-chapters.data'
</script>

<template>
  <div class="hamara-islam-index">
    <div class="book-header">
      <h1>ہمارا اسلام</h1>
      <p class="author">خلیل ملت مفتی خلیل احمد قادری برکاتی</p>
    </div>

    <div class="book-intro">
      <h2>کتاب کا تعارف</h2>
      <p>
        <strong>ہمارا اسلام</strong> ایک جامع اسلامی کتاب ہے جو اسلام کے بنیادی عقائد، ارکان اور احکامات کو سوال و جواب کی آسان انداز میں بیان کرتی ہے۔
        یہ کتاب خاص طور پر عام مسلمانوں کے لیے لکھی گئی ہے تاکہ وہ اپنے دین کے بنیادی مسائل کو آسانی سے سمجھ سکیں۔
      </p>
    </div>

    <div class="chapters-section">
      <h2>ابواب</h2>
      <p class="chapters-intro">
        یہ کتاب دو حصوں پر مشتمل ہے۔ ہر باب میں ایک خاص موضوع پر تفصیل سے بحث کی گئی ہے۔
      </p>

      <div v-for="part in chapters" :key="part.title" class="part-section">
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

    <div class="book-features">
      <h2>کتاب کی خصوصیات</h2>
      <div class="features-grid">
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">سوال و جواب کی آسان انداز</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">قرآن و حدیث سے دلائل</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">عام فہم زبان</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">بنیادی اسلامی عقائد کی تفصیل</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">ہر مسلمان کے لیے ضروری معلومات</span>
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
  font-family: 'Lalezar', 'Mehr Nastaliq Web', system-ui, sans-serif;
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
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin: 0;
  background-color: rgba(16, 185, 129, 0.1);
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
}

.book-intro {
  margin-bottom: 3rem;
}

.book-intro h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
}

.book-intro p {
  font-size: 1.1rem;
  line-height: 2.2;
  color: var(--vp-c-text-1);
}

.chapters-section {
  margin-bottom: 3rem;
}

.chapters-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
}

.chapters-intro {
  font-size: 1.1rem;
  line-height: 2;
  margin-bottom: 2rem;
  color: var(--vp-c-text-2);
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
  font-family: 'Lalezar', 'Mehr Nastaliq Web', system-ui, sans-serif;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.chapter-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
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
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  color: white;
  border-radius: 50%;
  font-family: 'Lalezar', sans-serif;
  font-size: 1.2rem;
}

.dark .chapter-number {
  background: linear-gradient(135deg, #34d399 0%, #2dd4bf 100%);
  color: var(--vp-c-bg);
}

.chapter-content {
  flex: 1;
}

.chapter-title {
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 0;
  color: var(--vp-c-text-1);
  font-weight: normal;
}

.chapter-arrow {
  flex-shrink: 0;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  transition: transform 0.3s ease;
}

.chapter-card:hover .chapter-arrow {
  transform: translateX(-4px);
  color: var(--vp-c-brand-1);
}

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

@media (max-width: 768px) {
  .book-header h1 {
    font-size: 2rem;
  }

  .part-title {
    font-size: 1.3rem;
  }

  .chapters-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
