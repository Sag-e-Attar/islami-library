# اسلامی لائبریری | Islami Library

[![Built with VitePress](https://img.shields.io/badge/Built%20with-VitePress-646cff.svg)](https://vitepress.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A comprehensive digital library of Islamic books and articles in Urdu | اسلامی کتب و مضامین کا جامع ڈیجیٹل ذخیرہ

🌐 **Live Site:** [library.islamieducation.com](https://library.islamieducation.com)

## 📚 About | تعارف

Islami Library is an open-source digital library dedicated to preserving and sharing Islamic knowledge in Urdu. The platform hosts books from renowned Islamic scholars and educational articles on various Islamic topics.

**Key Features:**
- 📖 **Islamic books** from renowned Sunni scholars
- ✍️ **Educational articles** on Islamic topics
- 👥 **Renowned authors** including Allama Ahmed Saeed Kazmi, Allama Arshad-ul-Qadri, and many more
- 🔍 **Advanced search** with frontmatter title indexing
- 🏷️ **Category filtering** and author-wise organization
- 🌙 **Dark mode** with beautiful Urdu typography
- 📱 **Fully responsive** design for all devices
- 🔄 **PWA support** - install as a mobile app
- ⚡ **Ultra-fast** with optimized build system
- 📜 **Back-to-top** navigation for long books
- 🎨 **Custom theme** with RTL support

## 🚀 Tech Stack

- **[VitePress 2.0](https://vitepress.dev/)** - Modern static site generator
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[UnoCSS](https://unocss.dev/)** - Instant atomic CSS engine
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[PWA](https://vite-pwa-org.netlify.app/)** - Progressive Web App support
- **[PostCSS RTL](https://github.com/MohammadYounes/rtlcss)** - RTL CSS transformation
- **Jameel Noori Nastaleeq** & **Mehr Nastaliq Web** - Premium Urdu typography
- **[Carbon Icons](https://carbon.designsystem.design/)** & **[Phosphor Icons](https://phosphoricons.com/)** - Icon libraries

## 📂 Content Structure | مواد کی ڈھانچہ

```
library/
├── index.md                    # Homepage | ہوم پیج
├── books.md                    # Books listing | کتب کی فہرست
├── articles.md                 # Articles listing | مضامین کی فہرست
├── authors/                    # Books by author | مصنفین کے مطابق کتب
│   ├── allama-ahmed-saeed-kazmi/
│   │   ├── book-name.md        # Individual books | الگ الگ کتب
│   │   └── index.md            # Author profile | مصنف کا پروفائل
│   ├── allama-arshad-ul-qadri/
│   └── [other-authors]/        # More authors | دوسرے مصنفین
├── articles/                   # Islamic articles | اسلامی مضامین
│   ├── article-name.md         # Individual articles | الگ الگ مضامین
│   └── [more-articles].md      # More articles | مزید مضامین
└── fonts/                      # Urdu fonts | اردو فونٹس
```

## 🛠️ Development

### Prerequisites

- **Node.js 18+**
- **pnpm** (recommended) or npm/yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Sag-e-Attar/islami-library.git
cd islami-library

# Install dependencies
pnpm install

# Start development server
pnpm docs:dev
```

Visit `http://localhost:5173` to see the site in action.

### Development Commands

```bash
pnpm docs:dev          # Start development server with hot reload
pnpm docs:build        # Build for production (optimized)
pnpm docs:preview      # Preview production build locally
pnpm store prune        # Clean pnpm cache (if needed)
```

### Build Features

- **⚡ Ultra-fast builds** - Development in ~2s, Production in ~30s
- **🔄 Auto-reloading** - Changes reflect immediately
- **📱 PWA ready** - Service worker and manifest generated
- **🔍 SEO optimized** - Meta tags and structured data
- **📦 Optimized assets** - Automatic minification and compression

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

### 📝 Formatting Guidelines

For detailed markdown formatting instructions and examples, please see our **[FORMATTING_GUIDE.md](FORMATTING_GUIDE.md)**. This guide covers:

- Proper Urdu text formatting
- Arabic/Quranic verse formatting
- Heading and list conventions
- Book structure examples
- Code block and quote usage
- Best practices for Islamic content

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
   categories:
     - اعمال
     - اورادووظائف
   ---
   ```
4. **If adding a new author**, add author details to `library/authors/authors.json` and the system will automatically:
   - ✅ Detect the new author from the file path
   - ✅ Generate author profile page
   - ✅ Add to books listing

5. Create a pull request with a clear description

**🎉 Automated Features:**
- **No manual configuration needed** - the system automatically handles new authors and books
- **Instant search integration** - new books appear in search immediately
- **Automatic sidebar generation** - navigation updates automatically from authors.json
- **Category system** - optional tags for better organization

#### 2. ✍️ Add an Article

**Steps:**
1. Create a new file: `library/articles/[article-name].md`
2. Add frontmatter:
   ```yaml
   ---
   title: مضمون کا عنوان
   author: مصنف کا نام
   description: مختصر تعارف (اختیاری)
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
- **Urdu Language:** Use proper Urdu grammar.
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

ہم پاکستان اور بھارت کے اردو بولنے والے معاونین کا خصوصی طور پر خیرمقدم کرتے ہیں۔ اگر آپ کے پاس اہلسنت کی اسلامی کتب یا مضامین ہیں جو آپ اس لائبریری میں شامل کرنا چاہتے ہیں، تو براہ کرم پل ریکویسٹ بھیجیں۔

**اہم نوٹ:**
- تمام مواد معتبر ذرائع سے ہونا چاہیے
- کاپی رائٹ کا خیال رکھیں - صرف وہی مواد شامل کریں جس کی اجازت ہو
- اگر گِٹ ہب استعمال کرنے میں مشکل ہو تو ایشو کھول کر مدد مانگیں

**فائل فارمیٹ کے بارے میں:**
اگر آپ کے پاس ان پیج فارمیٹ یا ڈاکومنٹ فارمیٹ میں اردو کتب یا مضامین ہیں، تو آپ ہمیں یہ فائلیں بھیج سکتے ہیں، ہم ان کتب/مضامین کو لائبریری میں شامل کر سکتے ہیں۔ براہ کرم گِٹ ہَب ایشو کے ذریعے رابطہ کریں۔

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
