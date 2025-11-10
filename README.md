# اسلامی لائبریری | Islami Library

[![Built with VitePress](https://img.shields.io/badge/Built%20with-VitePress-646cff.svg)](https://vitepress.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A comprehensive digital library of Islamic books and articles in Urdu | اسلامی کتب و مضامین کا جامع ڈیجیٹل ذخیرہ

🌐 **Live Site:** [library.islamieducation.com](https://library.islamieducation.com) *(coming soon)*

## 📚 About | تعارف

Islami Library is an open-source digital library dedicated to preserving and sharing Islamic knowledge in Urdu. The platform hosts books from renowned Islamic scholars and educational articles on various Islamic topics.

**Key Features:**
- 📖 Curated collection of Islamic books from authentic scholars
- ✍️ Educational articles on Islamic teachings and ethics
- 🔍 Powerful search functionality in Urdu
- 🌙 Dark mode for comfortable reading
- 📱 Responsive design - works on all devices
- ⚡ Fast and lightweight - built with modern web technologies

## 🚀 Tech Stack

- **[VitePress](https://vitepress.dev/)** - Static site generator
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[UnoCSS](https://unocss.dev/)** - Atomic CSS engine
- **TypeScript** - Type-safe development
- **Mehr Nastaliq Web** - Beautiful Urdu typography

## 🏗️ Project Structure

```
library/
├── index.md              # Homepage
├── books.md              # Books listing page
├── articles.md           # Articles listing page
├── authors/              # Books organized by author
│   ├── allama-ahmed-saeed-kazmi/
│   └── khalil-ahmed-rana/
├── articles/             # Islamic articles and essays
└── .vitepress/           # VitePress configuration
    ├── config.mts        # Main configuration
    ├── books.data.ts     # Books data loader
    ├── articles.data.ts  # Articles data loader
    └── theme/            # Custom theme
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Sag-e-Attar/islami-library.git
cd islami-library

# Install dependencies
pnpm install

# Start development server
pnpm docs:dev

# Build for production
pnpm docs:build

# Preview production build
pnpm docs:preview
```

The site will be available at `http://localhost:5173`

## ✏️ Recommended Editor for Urdu Content

For writing and editing Urdu books and articles, we recommend **[MarkText](https://github.com/marktext/marktext)** - a free, open-source Markdown editor available for Windows, Linux, and macOS.

### Why MarkText?

- ✅ Beautiful RTL (Right-to-Left) support for Urdu
- ✅ Live preview while editing
- ✅ Custom font support (Mehr Nastaliq)
- ✅ Free and open source
- ✅ Cross-platform (Windows, Linux, macOS)

### Setup Instructions for Urdu:

1. **Download & Install**: Get MarkText from [GitHub Releases](https://github.com/marktext/marktext/releases)

2. **Enable RTL Text Direction**:
   - Go to `File` → `Preferences` → `Editor` → `Misc`
   - Find `Text Direction` and select **Right-to-Left (RTL)**

3. **Change Font to Mehr Nastaliq**:
   - Go to `Edit` → `Font Family`
   - Select or type: **Mehr Nastaliq Web** (if installed on your system)
   - Alternatively, use: **Jameel Noori Nastaleeq** or **Alvi Nastaleeq**

4. **Start Writing**: Create a new `.md` file and start writing in Urdu!

**Alternative Editors:**
- **VS Code** with Markdown Preview and RTL extensions
- **Typora** (paid, but excellent for RTL)
- **Obsidian** with RTL plugin

## 🤝 Contributing | تعاون کی دعوت

We welcome contributions from everyone! Whether you're fixing a typo, adding a new book, or improving the website, your help is appreciated.

### Ways to Contribute

#### 1. 📚 Add a New Book

**Steps:**
1. Fork this repository
2. Add your book file: `library/authors/[author-slug]/[book-name].md`
3. Include frontmatter with title and author:
   ```yaml
   ---
   title: کتاب کا عنوان
   author: مصنف کا نام
   ---
   ```
4. If adding a new author, update the author mapping in:
   - `library/.vitepress/books.data.ts`
   - `library/.vitepress/config.mts` (in `generateSidebar()` function)
5. Create a pull request with a clear description

**Markdown Formatting Conventions:**

When writing book or article content, please follow these formatting guidelines:

- **Arabic/Quranic Verses**: Use blockquote format with `>`
  ```markdown
  > إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ
  ```

- **Inline Arabic Words**: Use backticks for individual Arabic terms in Urdu text
  ```markdown
  اسلام میں `صلوٰۃ` کی بہت اہمیت ہے اور یہ دین کا اہم رکن ہے۔
  ```

- **Main Headlines**: Use `##` (H2) for main chapter/section titles
  ```markdown
  ## پہلا باب: نماز کی اہمیت
  ```

- **Sub-headlines**: Use `###` (H3) for subsections
  ```markdown
  ### نماز کے فوائد
  ```

- **Lists**: Use `-` for unordered lists, numbers for ordered lists
  ```markdown
  - پہلا نکتہ
  - دوسرا نکتہ

  1. پہلا مرحلہ
  2. دوسرا مرحلہ
  ```

**Example Book Structure:**
```markdown
---
title: اخلاق اور انسانیت
author: علامہ احمد سعید کاظمی
---

## پہلا باب: اخلاق کی تعریف

اخلاق کا مطلب ہے انسانی کردار اور `حُسنِ اَخلاق` کی اہمیت...

### قرآن میں اخلاق

قرآن مجید میں ارشاد ہے:

> وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ

اس آیت میں نبی کریم ﷺ کے `اَخلاقِ عالیہ` کا ذکر ہے۔

## دوسرا باب: اچھے اخلاق کی اقسام

یہاں مزید تفصیل...
```

#### 2. ✍️ Add an Article

**Steps:**
1. Create a new file: `library/articles/[article-name].md`
2. Add frontmatter:
   ```yaml
   ---
   title: مضمون کا عنوان
   description: مختصر تعارف (اختیاری)
   date: 2024-01-15
   ---
   ```
3. Write your content in Urdu
4. Submit a pull request

#### 3. 🐛 Report Issues

Found a typo or incorrect content? Please [open an issue](https://github.com/Sag-e-Attar/islami-library/issues) with:
- Clear description of the problem
- Location (file path and line number if possible)
- Suggested correction

#### 4. 💡 Suggest Features

Have ideas to improve the library? Open an issue with the `enhancement` label and describe:
- What feature you'd like to see
- Why it would be beneficial
- How it might work

### Contribution Guidelines

- **Content Quality:** Ensure all Islamic content is authentic and from reliable sources
- **Urdu Language:** Use proper Urdu grammar and the Mehr Nastaliq font renders correctly
- **Formatting:** Follow the existing markdown structure
- **Commit Messages:** Write clear, descriptive commit messages in English
- **Testing:** Test your changes locally before submitting
- **Respect:** Be respectful and constructive in all interactions

### Pull Request Process

1. **Fork & Clone:** Fork the repository and create a new branch
   ```bash
   git checkout -b feature/add-new-book
   ```

2. **Make Changes:** Add your content following the guidelines above

3. **Test Locally:** Run `pnpm docs:dev` and verify your changes

4. **Commit:** Write a clear commit message
   ```bash
   git commit -m "Add: [Book Name] by [Author Name]"
   ```

5. **Push:** Push to your fork
   ```bash
   git push origin feature/add-new-book
   ```

6. **Create PR:** Open a pull request with:
   - Clear title describing the change
   - Description of what was added/changed
   - Any relevant screenshots (if applicable)

### For Pakistani & Indian Contributors | پاکستانی اور بھارتی معاونین کے لیے

ہم پاکستان اور بھارت کے اردو بولنے والے معاونین کا خصوصی طور پر خیرمقدم کرتے ہیں۔ اگر آپ کے پاس اسلامی کتب یا مضامین ہیں جو آپ اس لائبریری میں شامل کرنا چاہتے ہیں، تو براہ کرم پل ریکویسٹ بھیجیں۔

**اہم نوٹ:**
- تمام مواد معتبر ذرائع سے ہونا چاہیے
- کاپی رائٹ کا خیال رکھیں - صرف وہی مواد شامل کریں جس کی اجازت ہو
- اگر گِٹ ہب استعمال کرنے میں مشکل ہو تو ایشو کھول کر مدد مانگیں

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Note:** Individual books and articles may have their own copyrights. Please respect the intellectual property rights of the original authors.

## 🙏 Acknowledgments

- All the Islamic scholars whose works are featured in this library
- The VitePress team for the excellent static site generator
- All contributors who help maintain and improve this project

## 📧 Contact

- **Website:** [islamieducation.com](https://islamieducation.com)
- **Forum:** [islamimehfil.com](https://islamimehfil.com)
- **Issues:** [GitHub Issues](https://github.com/Sag-e-Attar/islami-library/issues)

---

<div align="center">

**Built with ❤️ for the Muslim Ummah**

اللہ تعالیٰ اس کوشش کو قبول فرمائے | May Allah accept this effort

</div>
