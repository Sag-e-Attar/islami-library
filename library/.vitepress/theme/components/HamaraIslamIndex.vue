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
        <strong>ہمارا اسلام</strong> خلیل ملت مفتی خلیل احمد قادری برکاتی رحمۃ اللہ علیہ کی تصنیف ہے جو اسلامی عقائد، عبادات اور احکامات کا ایک جامع و مکمل دائرۃ المعارف ہے۔ یہ کتاب نو (۹) حصوں پر مشتمل ہے اور سوال و جواب کے سہل و آسان انداز میں لکھی گئی ہے۔
      </p>
      <p>
        اس کتاب میں توحید، رسالت، آخرت، فرشتے، آسمانی کتب، انبیاء و اولیاء کرام، ارکانِ اسلام (نماز، روزہ، زکوٰۃ، حج)، طہارت و پاکیزگی، احکامِ شریعت، اور دیگر ضروری مسائل کو تفصیل سے بیان کیا گیا ہے۔ ہر موضوع کو قرآن و حدیث کی روشنی میں واضح کیا گیا ہے۔
      </p>
      <p>
        یہ کتاب خاص طور پر عام مسلمانوں، طلباء و طالبات، اور دین کے بنیادی احکام سیکھنے کے خواہشمند افراد کے لیے نہایت مفید ہے۔
      </p>
    </div>

    <div class="chapters-section">
      <h2>ابواب</h2>
      <p class="chapters-intro">
        یہ کتاب نو (۹) حصوں پر مشتمل ہے جن میں اسلامی عقائد، عبادات اور احکامات کو ترتیب وار بیان کیا گیا ہے۔ ہر حصے میں متعدد اسباق ہیں جن میں ایک خاص موضوع پر سوال و جواب کے انداز میں تفصیل سے بحث کی گئی ہے۔
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
          <span class="feature-text">عقائد، عبادات اور معاملات کی مکمل تفصیل</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">نماز، روزہ، زکوٰۃ اور حج کے تفصیلی احکام</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">طہارت و پاکیزگی کے جامع مسائل</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✓</span>
          <span class="feature-text">انبیاء، صحابہ اور اولیاء کرام کا تذکرہ</span>
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
  font-family: 'Lalezar', sans-serif;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .chapters-grid {
    grid-template-columns: 1fr;
  }
}
</style>
