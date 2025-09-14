# FinTrack 💰

> Modern personal finance tracking application built with SvelteKit 5 and UnoCSS

FinTrack is a comprehensive financial management platform designed for multi-user environments, featuring a clean design system based on modern UI principles and optimized for free-tier hosting.

## ✨ Features

- 🏦 **Account Management** - Multiple account types (Checking, Savings, Credit Cards, etc.)
- 📊 **Transaction Tracking** - Income/expense tracking with categories
- 🔄 **Recurring Transactions** - Monthly/yearly recurring entries
- 📈 **Financial Projections** - 6-month forward projections
- 🎨 **Modern UI** - Clean design system with light/dark themes
- 📱 **Responsive Design** - Mobile-friendly interface
- 🚀 **Free Hosting** - Optimized for Vercel + Turso free tiers

## 🛠️ Tech Stack

- **Framework:** SvelteKit 2.37 + Svelte 5.38 (Runes)
- **Styling:** UnoCSS + Custom Design System  
- **Database:** Turso (LibSQL) - SQLite distributed
- **Auth:** lucia-auth *(coming soon)*
- **Icons:** Lucide via UnoCSS preset
- **Package Manager:** pnpm
- **Deploy:** Vercel (free tier)

## 🎨 Design System

Built with a professional color palette extracted from Figma:

- **Primary:** `#4F83FF` (Brand Blue)
- **Success:** `#10B981` (Completed Green)
- **Processing:** `#8B5CF6` (Status Purple)  
- **Info:** `#06B6D4` (Accent Cyan)

### Component Library

- ✅ **Button** - 5 variants, 3 sizes, icons, loading states
- 🚧 **Forms** *(coming soon)*
- 🚧 **Navigation** *(coming soon)*
- 🚧 **Cards** *(coming soon)*

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 24+ (use `nvm use 24`)
- pnpm (recommended package manager)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fintrack

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit:

- **App:** <http://localhost:5173/>
- **Component Demo:** <http://localhost:5173/demo>
- **UnoCSS Inspector:** <http://localhost:5173/__unocss/>

### Build & Deploy

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview

# Deploy to Vercel
vercel --prod
```

## 📋 Project Status

### ✅ Completed (MVP Foundation)
- SvelteKit 5 setup with TypeScript
- UnoCSS design system implementation  
- Button component with full functionality
- Design tokens and color palette
- Development environment setup
- Comprehensive documentation

### 🚧 In Progress

- Database schema and Turso integration
- Authentication system (lucia-auth)
- Core financial features migration
- Multi-user architecture

### 📍 Roadmap

See [MVP_SCOPE.md](./MVP_SCOPE.md) for detailed feature roadmap and [FINTRACK_DOCUMENTATION.md](./FINTRACK_DOCUMENTATION.md) for technical architecture.

## 📁 Project Structure

```text
fintrack/
├── src/
│   ├── lib/
│   │   ├── components/ui/     # Reusable UI components
│   │   ├── styles/           # Design tokens & themes
│   │   └── utils/            # Utility functions
│   ├── routes/
│   │   ├── demo/             # Component showcase
│   │   └── (app)/            # Protected app routes
│   └── app.css               # Global styles
├── docs/                     # Project documentation  
├── uno.config.ts             # UnoCSS configuration
└── CLAUDE.md                 # Development instructions
```

## 🤝 Contributing

This project uses:

- **Conventional Commits** for commit messages
- **Exported States** (Svelte 5 runes) instead of stores
- **UnoCSS** for styling with design tokens
- **TypeScript** throughout the codebase

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines.

## 📄 License

This project is licensed under the MIT License.

---

**Next Steps:** Setup Turso database → Implement auth → Migrate core features

🤖 *Generated with [Claude Code](https://claude.ai/code)*
