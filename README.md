# AURA Estates — Private Client Luxury Real Estate Marketplace

**India’s Premier Ultra-High-Net-Worth (UHNWI) Architectural & Waterfront Living Marketplace**

---

## 🏛️ Executive Overview

**AURA Estates** is a bespoke, state-of-the-art digital marketplace designed specifically for Family Offices, UHNWI private investors, and institutional luxury buyers seeking iconic residential acquisitions across India's most coveted micro-markets.

From sea-facing sky villas along the **Worli Sea Face (Mumbai)** and golf sanctuaries on **DLF Golf Course Road (Gurugram)** to restored Indo-Portuguese villas in **Assagao (Goa)**, penthouse duplexes in **UB City / Kingfisher Towers (Bengaluru)**, and palatial bungalows in **Lutyens' Delhi** and **Jubilee Hills (Hyderabad)**.

---

## ✨ Key Features & Capabilities

### 1. 🔍 Curated Residential Portfolios
- **Dual Currency Architecture**: Instant, real-time conversion between **Indian Rupee (₹ INR formatted in Crores & Lakhs)** and **US Dollar ($ USD)**.
- **RERA Compliance & Vastu Verified**: Clear regulatory indicators with official authority tracking (MahaRERA, HRERA, Goa RERA, RERA Karnataka, TG RERA) and Vastu Shastra orientation flags.
- **Micro-Market Filtering**: Dynamic filters by Destination, Property Classification (Sky Palace, Waterfront Villa, Duplex Penthouse, Heritage Haveli), Price Range (up to ₹100 Cr+), and Minimum Bedrooms/Bathrooms.
- **Signature Amenity Filtering**: Multi-select tags including Private Infinity Pool, Helipad Access, Sea Views, Private High-Speed Elevator, Temperature-Controlled Wine Cellar, and 24/7 Concierge.

### 2. 🏙️ Prime Enclaves Intelligence
- Dedicated micro-market dossiers on India's top residential enclaves:
  - **Worli Sea Face**, Mumbai
  - **The Camellias / Golf Course Road**, Gurugram
  - **Assagao & Anjuna Valley**, North Goa
  - **Kingfisher Towers / UB City**, Central Bengaluru
  - **Jubilee Hills & Financial District**, Hyderabad
  - **Amrita Shergill Marg / Lutyens' Bungalow Zone**, New Delhi
- Historical capital appreciation rates, average price-per-square-foot benchmarks, and active listing counts.

### 3. 📊 Interactive Mortgage & EMI Calculator
- Built into property detail pages for capital allocation analysis.
- Computes monthly EMI, total interest, and total capital commitment based on custom loan tenor, interest rates, and down payment.

### 4. ⚖️ Property Comparison Matrix
- Side-by-side comparison modal evaluating square footage, price per sq.ft, configuration, RERA status, vastu compliance, and comprehensive amenity breakdown.
- Access directly from the top navigation bar with live saved count badges.

### 5. 🤝 Accredited Private Wealth Advisors
- Profiles of senior luxury real estate advisors with track records in Crores transacted, active managed assets, and verified client testimonials.
- Integrated direct confidential tour scheduling modal.

### 6. 💼 Private Client Desk & Off-Market Mandates
- Discrete acquisition service for off-market trophy assets, diplomatic estates, and confidential family office transactions.

### 7. 📝 Listing Submission Portal
- Intuitive, multi-step submission portal for verified property owners and developers to list trophy properties with high-resolution image URLs, RERA credentials, and architectural highlights.

### 8. 📱 Responsive Architecture & Device Viewport Simulator
- **Desktop (100% Fluid)**: Unobstructed edge-to-edge luxury presentation.
- **Tablet (768px iPad Air Frame)**: Isolated responsive container with balanced 2-column layouts.
- **Mobile (393px iPhone 15 Pro Frame)**: True mobile viewport running isolated breakpoints, native mobile drawer, and sticky bottom navigation bar ([MobileBottomNav](file:///d:/Real%20Estate%20Marketplace/src/components/common/MobileBottomNav.jsx)).
- Non-intrusive viewport switcher dropdown located cleanly in the header, keeping page content 100% visible and unblocked.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend Framework** | **React 19.2** | Concurrent rendering, functional components, hooks |
| **Build Tool & Server** | **Vite 8.3** | Lightning-fast HMR and optimized asset bundling |
| **Styling & Design System** | **Tailwind CSS 3.4** | Custom luxury color tokens (Navy & Gold), fluid typography |
| **Animation Engine** | **Framer Motion 14.1** | Page transitions, spring interactions, sheen sweeps |
| **Iconography** | **Lucide React** | Consistent, modern vector iconography |
| **State Management** | **React Context API** | Centralized `RealEstateContext` with `localStorage` persistence |
| **Code Quality** | **Oxlint** | High-performance Rust-based linter |

---

## 📁 Repository Structure

```
Real Estate Marketplace/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── neighborhoods/        # Authentic Indian enclaves & landmarks
│       │   ├── assagao_valley.jpg
│       │   ├── camellias_exterior.jpg
│       │   ├── jubilee_hills_env.jpg
│       │   ├── kingfisher_towers.jpg
│       │   ├── lutyens_delhi.jpg
│       │   └── worli_sea_face.jpg
│       └── properties/           # Authentic Indian luxury architectural estates
│           ├── assagao_villa.jpg
│           ├── camellias_interior.jpg
│           ├── camellias_penthouse.jpg
│           ├── casa_do_sol_goa.jpg
│           ├── jubilee_hills_mansion.jpg
│           ├── kingfisher_towers_bangalore.jpg
│           ├── lutyens_delhi_estate.jpg
│           ├── mandwa_villa.jpg
│           ├── pali_hill_penthouse.jpg
│           ├── sadashivnagar_courtyard.jpg
│           ├── udaipur_haveli.jpg
│           └── worli_skyvilla.jpg
├── src/
│   ├── assets/                   # Static icons and assets
│   ├── components/
│   │   ├── agents/               # Private advisors list & detail dossiers
│   │   │   ├── AgentDetailPage.jsx
│   │   │   └── AgentsPage.jsx
│   │   ├── auth/                 # VIP persona login/signup modal
│   │   │   └── AuthModal.jsx
│   │   ├── common/               # Shared luxury UI elements
│   │   │   ├── DeviceViewportSwitcher.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MobileBottomNav.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PropertyCard.jsx
│   │   │   └── ToastContainer.jsx
│   │   ├── compare/              # Fullscreen property comparison matrix
│   │   │   └── CompareModal.jsx
│   │   ├── enclaves/             # Indian micro-market intelligence hub
│   │   │   └── EnclavesPage.jsx
│   │   ├── insights/             # Market analytics & regulatory guides
│   │   │   └── MarketInsightsPage.jsx
│   │   ├── landing/              # Hero, featured residences, enclaves & value props
│   │   │   └── LandingPage.jsx
│   │   ├── listings/             # Property directory, filters & pagination
│   │   │   └── ListingsPage.jsx
│   │   ├── privatedesk/          # Off-market confidential acquisitions desk
│   │   │   └── PrivateDeskPage.jsx
│   │   ├── property/             # Property detail view, mortgage calculator & tour modal
│   │   │   ├── PropertyDetailPage.jsx
│   │   │   └── TourModal.jsx
│   │   ├── submit/               # New property listing submission wizard
│   │   │   └── SubmitPropertyPage.jsx
│   │   └── wishlist/             # Saved property portfolio
│   │       └── WishlistPage.jsx
│   ├── context/
│   │   └── RealEstateContext.jsx # Global state (portfolio, filters, theme, currency, viewports)
│   ├── data/
│   │   └── mockData.js           # Curated Indian luxury property & advisor datasets
│   ├── App.css
│   ├── App.jsx                   # Root router & device simulator container
│   ├── index.css                 # Design tokens, custom scrollbars & glassmorphism
│   └── main.jsx                  # Application entry point
├── index.html                    # HTML5 shell with Google Fonts preconnect
├── package.json
├── postcss.config.js
├── tailwind.config.js            # Custom color palette, shadows & keyframes
└── vite.config.js                # Vite configuration with React plugin
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version `18.x` or higher
- **npm**: Version `9.x` or higher

### Installation

1. **Clone or navigate to the workspace directory**:
   ```bash
   cd "d:/Real Estate Marketplace"
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```
   The application will boot at: **`http://localhost:5173/`**

4. **Production Build**:
   ```bash
   npm run build
   ```
   Generates optimized static assets in the `dist/` directory.

5. **Run Linter**:
   ```bash
   npm run lint
   ```

---

## 🎨 Design System & Aesthetics

- **Color Palette**:
  - `navy-950` (`#060a17`): Midnight obsidian base.
  - `navy-900` (`#0b132b`): Deep blue container glass.
  - `gold-400` / `gold-500` (`#d5b560` / `#c59d37`): Royal Indian gold accents.
  - `gold-champagne` (`#e9d7b4`): Subtle warm highlight.
- **Typography**:
  - **Headings & Serif**: *Playfair Display* (Editorial luxury elegance).
  - **Body & Sans**: *Plus Jakarta Sans* / *Inter* (Geometric precision & readability).
- **Surface Accents**:
  - Custom glassmorphic cards (`backdrop-blur-xl`, `border-white/10`).
  - Subtle diagonal button sheen reflections (`btn-luxury-shine`).
  - Pulsing ambient light glows behind hero sections.

---

## 🌐 Responsive Device Testing

AURA Estates includes an integrated **Device Viewport Switcher** directly in the top navigation bar:
- 🖥️ **Desktop Mode**: 100% fluid layout, expansive grid views, hover interactions.
- 📱 **Tablet Mode (768 × 1024 px)**: Simulates iPad Air with balanced 2-column card configurations.
- 📱 **Mobile Mode (393 × 852 px)**: Simulates iPhone 15 Pro with true native mobile media queries, 1-column cards, hamburger drawer, and dedicated bottom navigation bar.

---

## 📄 License

Private & Confidential — Built for **AURA Estates Private Client Real Estate**. All rights reserved.
