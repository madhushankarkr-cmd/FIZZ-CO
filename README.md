<div align="center">

<br/>

```
███████╗██╗███████╗███████╗     ██╗      ██████╗ ██████╗
██╔════╝██║╚══███╔╝╚══███╔╝     ██║     ██╔════╝██╔═══██╗
█████╗  ██║  ███╔╝   ███╔╝      ██║     ██║     ██║   ██║
██╔══╝  ██║ ███╔╝   ███╔╝       ██║     ██║     ██║   ██║
██║     ██║███████╗███████╗     ███████╗╚██████╗╚██████╔╝
╚═╝     ╚═╝╚══════╝╚══════╝     ╚══════╝ ╚═════╝ ╚═════╝
```

### ⚡ Immersive 3D Product Storytelling · Powered by WebGL

<br/>

[![Live Demo](https://img.shields.io/badge/🔗%20Live%20Demo-fizz--co.vercel.app-6366f1?style=for-the-badge&labelColor=0f0f0f)](https://fizz-co.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-049ef4?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<br/>

> **Fizz & Co** is a headless 3D product-storytelling web application that challenges the static, predictable nature of standard e-commerce grids — replacing them with fluid physics simulations, real-time 360° inspection, and dynamic flavor-driven UX state morphing.

<br/>

</div>

---

## 🎬 Live Preview

<div align="center">

| Electric Lime ⚡ | Tropical Mango 🥭 | Zesty Berry 🍇 |
|:-:|:-:|:-:|
| Dynamic background shift | Fluid sine-wave physics | 360° orbital inspection |

**➡️ [Try the live deployment →](https://fizz-co.vercel.app/)**

</div>

---

## 🧠 Engineering Highlights

### 1 · Overcoming Next.js SSR / WebGL Blockers

Running client-side canvas render engines like Three.js inside an SSR environment natively triggers `ReferenceError: window is not defined` during production compilation. The solution: **async code-splitting via `next/dynamic`** with `ssr: false`, cleanly deferring all WebGL instantiation to the browser thread.

```ts
// Decouple canvas from SSR pipeline entirely
const ProductScene = dynamic(() => import('@/components/ProductScene'), {
  ssr: false,
  loading: () => <SceneLoader />,
})
```

---

### 2 · 60 FPS Fluid Physics Simulation

Product elements drift weightlessly on an uncoupled vertical sine-wave loop. Calculations are written directly into a `useFrame` RAF ticker — no external keyframe sheets, no script overhead, zero main-thread blocking.

```ts
useFrame(({ clock }) => {
  const t = clock.getElapsedTime()
  meshRef.current.position.y = Math.sin(t * 0.8) * 0.12
  meshRef.current.rotation.y += 0.003
})
```

---

### 3 · Dynamic UX State Morphing

The app monitors user flavor preference indexes. Switching between flavors triggers smooth background color token matrix shifts and asset color transitions — **zero layout reflow, zero jank**.

```ts
const flavorConfig = {
  'electric-lime':  { bg: '#0d2818', accent: '#a3e635' },
  'tropical-mango': { bg: '#2d1a00', accent: '#fb923c' },
  'zesty-berry':    { bg: '#1e0a2e', accent: '#c084fc' },
}
```

---

### 4 · Controlled 360° Horizontal Inspection

Custom constraints on `@react-three/drei` `OrbitControls` enable full grab-drag-rotate on a single axis — preventing vertical clipping from breaking layout alignment while users inspect nutrition profiles.

```tsx
<OrbitControls
  enableZoom={false}
  enablePan={false}
  minPolarAngle={Math.PI / 2}
  maxPolarAngle={Math.PI / 2}
/>
```

---

## 🛠️ Architecture Stack

```
┌─────────────────────────────────────────────────────────┐
│                     FIZZ & CO STACK                     │
├──────────────────┬──────────────────────────────────────┤
│  Framework       │  Next.js (App Router) + React 18     │
│  Type Safety     │  TypeScript (strict mode)             │
│  3D Engine       │  Three.js + @react-three/fiber        │
│  Scene Helpers   │  @react-three/drei                    │
│  Styling         │  Tailwind CSS                         │
│  Icons           │  Lucide React                         │
│  Hosting         │  Vercel Global Edge Network           │
│  CI/CD           │  Vercel Git Integration               │
└──────────────────┴──────────────────────────────────────┘
```

---

## 📁 Project Structure

```
fizz-co/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Landing page entry
│   └── globals.css         # Global tokens + resets
├── components/
│   ├── ProductScene.tsx    # Three.js canvas (SSR-deferred)
│   ├── FlavorSelector.tsx  # State morphing UI
│   ├── ProductMesh.tsx     # 3D can + useFrame physics
│   └── NutritionPanel.tsx  # Overlay HUD
├── lib/
│   ├── flavors.ts          # Color token matrices
│   └── animations.ts       # Sine-wave constants
├── public/
│   └── models/             # GLTF / GLB assets
└── next.config.ts
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/fizz-co.git
cd fizz-co

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

> **Node.js 18+** required. No `.env` file needed — all config is static.

---

## ⚙️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build with type checking |
| `npm run start` | Serve production build locally |
| `npm run lint` | ESLint + TypeScript checks |

---

## 🎨 Flavor System

The flavor switching system uses a token-based color matrix approach. Each flavor maps to a full set of design tokens applied at runtime:

| Flavor | Background | Accent | Can Color |
|---|---|---|---|
| ⚡ Electric Lime | `#0d2818` | `#a3e635` | Neon green |
| 🥭 Tropical Mango | `#2d1a00` | `#fb923c` | Warm orange |
| 🍇 Zesty Berry | `#1e0a2e` | `#c084fc` | Deep violet |

---

## 📐 Performance Benchmarks

| Metric | Score |
|---|---|
| Animation | 60 FPS on modern hardware |
| Physics loop | `useFrame` RAF — non-blocking |
| SSR safety | Zero `window` reference errors |
| Bundle strategy | Dynamic import code-splitting |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Built with passion at the intersection of immersive frontend design, WebGL physics, and cloud infrastructure.**

<br/>

[![LinkedIn](https://img.shields.io/badge/Connect%20on-LinkedIn-0077b5?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![Portfolio](https://img.shields.io/badge/View-Portfolio-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](#)

<br/>

⭐ If you found this project helpful, please consider giving it a star!

</div>
