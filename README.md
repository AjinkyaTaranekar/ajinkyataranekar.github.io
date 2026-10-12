# Ajinkya Taranekar - Personal Portfolio

Source for [ajinkyataranekar.github.io](https://ajinkyataranekar.github.io), the portfolio of a software & site reliability engineer based in Dublin, Ireland.

## 👨‍💻 About Me

Software & site reliability engineer with 3+ years across backend, SRE and GenAI. Most recently a **Site Reliability Engineer Intern at Apple** in Dublin (June 2026 - Sept 2026), alongside an **MSc in Computer Science (Future Networked Systems) from Trinity College Dublin**, completed with a 1:1 Distinction.

Before that, three years at Nuclei (CDNA Technologies) in Bengaluru, building digital banking platforms for some of India's largest banks:

- 1,400+ P0 alerts handled at a 91.7% resolution rate (avg. 2.8 min to acknowledge)
- Search retrieval latency cut from 1s to 150ms with hybrid vector + fuzzy search
- Checkout system handling 100,000+ daily transactions
- Bank onboarding cut from weeks to minutes with a Go + gRPC agent management system

B.Tech in Computer Science from SGSITS: ranked 1st in the department and awarded the Seksaria Gold Medal (CGPA 9.04).

Open to SRE, backend, platform or GenAI roles. Email: ajinkyataranekar26@gmail.com

## 🛠️ Core Technologies

- **Languages**: Python, Java, Go, TypeScript, C++, SQL
- **Backend**: Spring Boot, FastAPI, gRPC & Protobuf, Kafka, Microservices
- **SRE & Cloud**: Kubernetes, Docker, Terraform, Helm, Azure, GCP, Grafana, Prometheus, SLA / SLO
- **Security & Identity**: OIDC / OAuth 2.0, IAM, HashiCorp Vault, CIS Benchmark Hardening
- **Data**: ClickHouse, PostgreSQL, Elasticsearch, Milvus, Apache Airflow
- **GenAI**: RAG, MCP, Multi-Agent Orchestration, PyTorch Fine-Tuning (LoRA / Unsloth)
- **Frontend**: Svelte, React, Next.js, Flutter, Micro-Frontends

## 🏆 Featured Projects

- **[Constitutional Distillation for Trustworthy, Personalised AI](https://ajinkyataranekar.github.io/projects/constitutional-distillation/)**: MSc dissertation. Teaching a 0.6B on-device model (Qwen3) a 25-principle constitution, and measuring the "alignment tax" it pays at phone scale
- **[Atlas - ML Training Observatory](https://ajinkyataranekar.github.io/projects/atlas/)**: winner, Best Use of Crusoe API at HackEurope 2026. Real-time PyTorch training diagnostics with an AI agent on Crusoe Cloud
- **[Beacon](https://ajinkyataranekar.github.io/projects/beacon/)**: city-scale emergency response platform: Go microservices on GKE, Pub/Sub, Airflow and ClickHouse
- **[Lumino](https://ajinkyataranekar.github.io/projects/lumino/)**: explainable job matching where every score traces back to a path in a Neo4j knowledge graph
- **[AI Toolkit](https://ajinkyataranekar.github.io/projects/pg-ai-toolkit/)**: PostgreSQL extension in C++ for natural-language querying and SQL error explanation

## 🚀 Quick Start

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Rebuild static/resume.pdf after editing resume/resume.tex (needs MiKTeX or TeX Live)
npm run resume
```

All site content (experience, projects, skills, awards) comes from `src/lib/data/portfolio.json`. The same data is published as [`/llms.txt`](https://ajinkyataranekar.github.io/llms.txt) for AI assistants, so it is always the most current summary.

The résumé is compiled with LuaLaTeX, which embeds its fonts as compact OpenType. pdfLaTeX produces the same page but embeds Type 1 fonts, about 250 KB instead of about 45 KB. On Overleaf, set the compiler to LuaLaTeX.

## 📈 Analytics

Google Analytics 4 (`G-H4R14CS9JE`) loads only on the live site, never on `localhost` or LAN dev servers. Enhanced Measurement covers page views, scrolls, outbound links, file downloads (the résumé is `static/resume.pdf`) and YouTube embeds. Custom events are added with `data-track` attributes (see `src/lib/utils/analytics.ts`):

| Event | Parameters | Fires when |
|---|---|---|
| `contact_click` | `method` (email, copy_email, phone), `placement` | Email / copy-email / phone buttons |
| `resume_open` | `placement` (hero, nav, menu, …) | Résumé links |
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
- Résumé: [ajinkyataranekar.github.io/resume.pdf](https://ajinkyataranekar.github.io/resume.pdf)
