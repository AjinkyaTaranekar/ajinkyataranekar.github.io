# Ajinkya Taranekar - Personal Portfolio

A fully responsive modern portfolio website showcasing my experience as a Software Development Engineer and GenAI Specialist.

## 👨‍💻 About Me

Results-driven Software Engineer with 3+ years of experience in full-stack development, specializing in microservices architecture, GenAI integration, and cloud platforms. MSc Computer Science graduate (1:1 Distinction) from Trinity College Dublin.

## 🛠️ Core Technologies

- **Languages**: Java, Python, Go, TypeScript, JavaScript
- **Frontend**: Svelte, Flutter, Angular
- **Backend**: Spring Boot, FastAPI, gRPC, Microservices
- **Data & AI**: Elasticsearch, ClickHouse, Milvus, Vector Search, OpenAI

## 🏆 Featured Projects

- **Convo AI**: VoiceBot Agent Management System using Go, gRPC and GenAI frameworks
- **In-House Search Engine**: Combined semantic vector and fuzzy search, reducing retrieval latency from 1s to 150ms

## 🚀 Quick Start

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Rebuild static/resume.pdf after editing resume/resume.tex (needs MiKTeX or TeX Live)
npm run resume
```

The résumé is compiled with LuaLaTeX, which embeds its fonts as compact OpenType. pdfLaTeX produces the same page but embeds Type 1 fonts, about 250 KB instead of about 45 KB. On Overleaf, set the compiler to LuaLaTeX.

## 📈 Analytics

Google Analytics 4 (`G-H4R14CS9JE`) loads only on the live site, never on `localhost` or LAN dev servers. Enhanced Measurement covers page views, scrolls, outbound links, file downloads (the résumé is `static/resume.pdf`) and YouTube embeds. Custom events are added with `data-track` attributes (see `src/lib/utils/analytics.ts`):

| Event | Parameters | Fires when |
|---|---|---|
| `contact_click` | `method` (email, copy_email, phone), `placement` | Email / copy-email / phone buttons |
| `resume_open` | `placement` | Résumé links |
| `social_click` | `network`, `placement` | GitHub, LinkedIn, X links |
| `project_open` | `project`, `placement` | A project dialog opens |
| `project_link_click` | `project`, `link_type`, `placement` | Source, demo, report links on projects |
| `section_view` | `section`, `section_index` (1 = About … 8 = Contact) | A home-page section first stays in view for 1s |
| `share` | `method` (qr, copy_link), `placement` | QR dialog or copy link |

Mark `contact_click` and `resume_open` as key events in GA4, and register the parameters as event-scoped custom dimensions so they appear in reports.

Project pages (`/projects/<slug>`) are prerendered from `portfolio.json`; their social cards are built by `python scripts/og-images.py`.

## 📫 Contact

- Email: ajinkyataranekar26@gmail.com
- LinkedIn: [linkedin.com/in/ajinkya-taranekar](https://www.linkedin.com/in/ajinkya-taranekar)
- GitHub: [github.com/AjinkyaTaranekar](https://github.com/AjinkyaTaranekar)
