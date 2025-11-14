# Book and Article Formatting Guide

This guide outlines the formatting standards for books and articles in the Islamic Library project.

## Frontmatter

Every book or article must begin with YAML frontmatter:

```yaml
---
title: Title in Urdu
author: Author Name in Urdu
categories:
  - Category 1
  - Category 2
description: Short description of the content in 2 or 3 lines. (article only)
---
```

### Notes for Articles

* `author` is **optional** for articles.
* `description` is **required** for articles and must be short (2 or 3 lines maximum).
* Use the same `categories` rules as books.

### Categories Frontmatter

Use the `categories` array instead of a single `category` field.

* ✅ Correct: `categories: [عقائد, شخصیات]`
* ❌ Incorrect: `category: عقائد`

The `categories` array allows entries to appear in multiple categories for better filtering and organization.

### Standard Category Names

**Response Categories (ردِ):**

* ردِّ قادیانیت (radd-e-qadiyaniyat)
* ردِّ دیوبندیت (radd-e-deobandiyat)
* ردِّ بدمذہب (radd-e-badmazhab)

**Core Islamic Categories:**

* عقائد (aqaid)
* شخصیات (shakhsiyaat)
* نماز (namaz)
* حج (hajj)
* زکات (zakat)
* روزہ (roza)
* فقہ (fiqh)
* حدیث (hadith)
* تفسیر (tafsir)

### Urdu Orthography Rules

**Response Categories (ردِ):**

* Always write "ردِّ" with proper zair and shadda.
* Do not write "رد" or "ردِ" alone.
* Example: ردِّ قادیانیت
* Transliteration example: "radd-e-qadiyaniyat"

**Diacritical Marks:**

* Use correct Urdu diacritics where needed.
* Zair (ِ) for the "i" sound, as in ردِّ.
* Use shadda (ّ) only where required.

### Category Selection Guidelines

Choose categories based on:

1. **Primary Topic**
2. **Target Audience**
3. **Content Type** (refutation, biography, education, jurisprudence)

**Examples:**

* Refutation of Qadiyani beliefs: `ردِّ قادیانیت`, `عقائد`
* Biography: `شخصیات`, `عقائد`
* Prayer manual: `نماز`, `عقائد`
* Refutation of modernist ideologies: `ردِّ بدمذہب`, `عقائد`

### Automatic Features

* Categories appear automatically in the filter dropdown.
* No manual configuration is required for new categories.
* Items listed under multiple categories appear in each one.
* Categories sort alphabetically in Urdu.

---

## Headings

* Use `##` for main headings (h2).
* Use `###` for sub-headings (h3).

**Example:**

## شیخ عبدالحق محدّث دہلوی علیہ الرحمہ

### غیر مقلدین کی نظر میں

### علماء دیوبند کی نظر میں

---

## Arabic and Farsi Text Formatting

### Blockquotes for Arabic and Farsi Lines

Use `>` for complete Arabic or Farsi lines:

```
> بسم اﷲ الرحمن الرحیم
> نحمد ہ ونصلی علی رسولہ الصادق الامین الکریم
```

### Backticks for Embedded Arabic or Farsi Words

Use backticks when Arabic or Farsi words appear inside Urdu text:

```
اﷲ کے بندے علماء ہی کو خشیت الٰہی حاصل ہوتی ہے، `انما یخشی اﷲ من عبادہ العلموا` سے ثابت ہوا
```

Do not use backticks for اﷲ or ﷺ.

---

## Poetry Formatting

**Urdu Poetry:**
End each line with two spaces to keep lines separate.

**Arabic Poetry:**
Use blockquotes with each line on its own:

```
> یحدثنی نفسی بانک واصل
>
> الی نقطتہ قصواء وسط المرکز
>
> وانک فی تیک البلاد مفخم
>
> یکفیک یوماً کل شیخ وناھز
```

---

## Section Structure

Common headings used in books and some articles:

1. دیباچہ
2. قرآن کریم حفظ
3. تعلیم
4. بیعت حضرت سیدنا علی کرم اﷲ وجہہ الکریم
5. کشفِ باطن
6. علمی خدمات اور اثر
7. تلامذہ
8. تصانیف
9. تصانیف میں تحریفات
10. اولاد
11. وفات
12. مسلک [Scholar Name]
13. تاثرات

---

## References and Citations

Use parentheses for all references and avoid curly braces.

**Example:**

```
(نواب مبارک علی خاں، کمالات عزیزی، مرتبہ مولوی سید ظہیر الدین احمد ولی اللّٰہی دہلوی، سن تالیف 1289ھ/1872ء، مطبوعہ ایچ ایم سعید کمپنی کراچی 1982ء، ص 8)
```

### Important: Avoid Curly Braces

Curly braces `{}` break VitePress rendering.

**Wrong:**

```markdown
> {تفسیر نبوی، جلد 1، صفحہ 377}
```

**Correct:**

```markdown
> (تفسیر نبوی، جلد 1، صفحہ 377)
```

---

## Tables

Use markdown tables for structured data.

| Component | Details |
| --------- | ------- |
| Takbeer   | ...     |
| Qiyam     | ...     |

---

## Images (Books and Articles)

If the book or article has scanned pages, reference shots, or supplementary images:

* Store images inside the `images` folder within the same author or article directory.
* Use the **same slug as the book/article** with numbered suffixes.
* Use hyphens only, all lowercase.
* Use 01, 02, 03 numbering.

**Example:**

```
images/maulana-abdul-sattar-niazi-per-aik-ilzam-ki-haqeeqat-01.jpg
images/maulana-abdul-sattar-niazi-per-aik-ilzam-ki-haqeeqat-02.jpg
```

This ensures consistency and prevents naming collisions.