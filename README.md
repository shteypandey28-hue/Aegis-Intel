<div align="center">

# 🛡️ AEGIS INTEL

### AI-Powered Wildlife Trafficking Intelligence Platform

*"We watch over those who cannot speak for themselves."*

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-000?style=flat-square&logo=three.js)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 🎯 What is Aegis Intel?

**Aegis Intel** is a real-time wildlife trafficking detection and intelligence platform that monitors online marketplaces for illegal wildlife trade listings. Using **NLP-based keyword matching**, **coded language detection**, and **confidence scoring**, it automatically intercepts suspicious listings and presents them through a premium investigative dashboard.

The system targets trade in **CITES-protected species** including elephants (ivory), pangolins (scales), rhinos (horn), tigers (bone), and endangered wild cattle species like **Gaur**, **Banteng**, and **Wild Water Buffalo**.

---

## ✨ Key Features

### 🔍 Threat Detection Engine
- **Multi-layer keyword matching** — Scientific names, trade names, and coded slang phrases
- **Confidence scoring** (0-100%) with weighted risk classification
- **Automated risk levels** — `HIGH_RISK`, `SUSPICIOUS`, `LIKELY_LEGAL`
- Real-time detection explanations for every flagged listing

### 📊 Intelligence Dashboard
- **Live metrics** — Total scanned, high risk, suspicious counts with real-time updates
- **7-day alert trend** — Area chart showing weekly intercept volumes
- **Live activity feed** — Real-time event stream of system actions
- **Quick-access grid** — One-click navigation to all modules

### 🌍 Analytics Suite
- **Weekly alert volume chart** with Critical vs. Suspicious breakdown
- **3D Interactive Threat Globe** — Real-time threat origin visualization using React Three Fiber
- **Platform breakdown pie chart** — eBay, Instagram, Facebook, Taobao distribution
- **Top species bar chart** — Ranked by interception count
- **Regional intercept bars** — East Asia, West Africa, South Asia, etc.

### 📁 Case File Management
- **Evidence Capture panel** — Archived listing title, description, seller handle, URL, timestamp
- **Detection Breakdown** — Categorized matched keywords (Scientific / Trade / Coded) with confidence
- **Action Buttons** — *Flag for Enforcement*, *Archive*, *Mark Resolved* with database persistence
- **Analyst Notes** — Persistent investigation text area with auto-save
- **Evidence Export** — One-click PDF/text generation of full case file
- **AI Similar Cases** — Auto-suggested related intercepts by seller/platform overlap

### 🐘 Species Encyclopedia
- **9 protected species** with full intelligence cards
- CITES classification, population estimates, geographic regions
- Known trafficking methods and coded detection keywords
- Searchable by name, scientific name, or slang keyword
- Interactive detail modal with full intelligence breakdown

### 🔐 Authentication
- **Email/Password login** (mock mode for demos)
- **Google OAuth 2.0** — Real Google Sign-In integration
- **Session management** — httpOnly cookies, 7-day persistence
- **Route protection** — Middleware-gated dashboard access
- **Profile display** — Google name, email, and profile picture shown across UI

### 🔔 Notification System
- **Interactive notification dropdown** with unread count badge
- Categorized alerts: Critical, Warning, Info, Success
- Mark all read, dismiss individual, click-to-navigate
- **Profile dropdown** with agent identity, session status, quick links

### 🎨 3D Visualizations
- **Holographic Geometric Elephant** — Crystal prism body, glowing emerald core, animated trunk
- **Interactive Threat Globe** — Rotating Earth with 15+ geo-located threat nodes
- Built with **React Three Fiber** + **Drei** (MeshTransmissionMaterial, Sparkles, Float)

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Server Actions, Turbopack) |
| **Language** | TypeScript 5 |
| **Database** | SQLite (dev) / PostgreSQL (prod) via Prisma 6 |
| **3D Engine** | React Three Fiber + Drei |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Auth** | Google OAuth 2.0 + Cookie-based sessions |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/shteypandey28-hue/Aegis-Intel.git
cd Aegis-Intel

# Install dependencies
npm install

# Set up the database
npx prisma generate
npx prisma migrate dev --name init

# Seed with mock data
npx tsx prisma/seed.ts
npx tsx prisma/seed_cattle.ts

# Start development server
npm run dev
```

The app runs at **http://localhost:4000**

### Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Create an OAuth 2.0 Client ID (Web Application)
3. Add `http://localhost:4000/api/auth/google/callback` as an authorized redirect URI
4. Create `.env.local`:

```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:4000/api/auth/google/callback
```

> Without `.env.local`, the app runs in **mock mode** — email/password login works without real auth.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── (dashboard)/           # Protected routes
│   │   ├── dashboard/         # Intelligence overview
│   │   ├── alerts/            # Threat alerts feed + case files
│   │   │   └── [id]/          # Individual case investigation
│   │   ├── analytics/         # Charts, globe, metrics
│   │   ├── species/           # Species encyclopedia
│   │   ├── profile/           # Agent profile management
│   │   └── settings/          # Platform & keyword configuration
│   ├── api/auth/google/       # OAuth routes
│   ├── login/                 # Authentication page
│   └── page.tsx               # Landing page
├── components/
│   ├── 3d/                    # Three.js components (Elephant, Globe)
│   ├── ui/                    # shadcn/ui primitives
│   ├── Navbar.tsx             # Top bar (notifications, profile)
│   └── Sidebar.tsx            # Navigation sidebar
├── utils/supabase/            # Auth middleware
└── lib/                       # Detection engine, utilities
prisma/
├── schema.prisma              # Database schema
├── seed.ts                    # Core trafficking data
└── seed_cattle.ts             # Wild cattle species data
```

---

## 🐾 Monitored Species

| Species | Scientific Name | CITES | Detections |
|---|---|---|---|
| 🐘 African Elephant | *Loxodonta africana* | Appendix I | 147 |
| 🦔 Sunda Pangolin | *Manis javanica* | Appendix I | 98 |
| 🦏 White Rhinoceros | *Ceratotherium simum* | Appendix II | 73 |
| 🐯 Bengal Tiger | *Panthera tigris* | Appendix I | 61 |
| 🐢 Green Sea Turtle | *Chelonia mydas* | Appendix I | 44 |
| 🐆 Leopard | *Panthera pardus* | Appendix I | 38 |
| 🦬 Wild Water Buffalo | *Bubalus arnee* | Appendix III | 29 |
| 🐂 Gaur (Indian Bison) | *Bos gaurus* | Appendix I | 21 |
| 🐃 Banteng | *Bos javanicus* | Appendix I | 17 |

---

## 📸 Screenshots

> *Screenshots of the platform in action can be added here.*

---

## 🔮 Future Enhancements

- [ ] **Real-time marketplace scraping** — Live monitoring via Supabase Realtime
- [ ] **ML classification model** — Replace keyword matching with trained NLP classifier
- [ ] **Seller network graph** — Visualize connections between repeat offenders
- [ ] **INTERPOL integration** — Direct case referral pipeline
- [ ] **Mobile responsive** — Full mobile optimization
- [ ] **Multi-language detection** — Chinese, Thai, Vietnamese marketplace support
- [ ] **Deployment** — Vercel + Supabase PostgreSQL production setup

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file.

---

<div align="center">

**Built for wildlife protection 🌿**

*Aegis Intel — Protecting endangered species through technology.*

</div>
