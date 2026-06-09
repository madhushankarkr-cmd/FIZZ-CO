#  Fizz & Co — Immersive 3D Anti-Gravity E-Commerce Platform

[![Deployment Status](https://img.shields.io/badge/Vercel-Live_Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://fizz-co.vercel.app/)
[![Next.js Framework](https://img.shields.io/badge/Next.js_14-v14.x-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React Ecosystem](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Three.js Engine](https://img.shields.io/badge/Three.js-WebGL-white?style=for-the-badge&logo=three.js&logoColor=black)](https://threejs.org/)
[![TailwindCSS styling](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

Welcome to **Fizz & Co**, a cutting-edge, conversion-optimized headless 3D e-commerce platform. This project blends high-performance 3D graphics with modern web technologies to reimagine interactive product showcases. By implementing real-time WebGL canvas rendering alongside Server-Side Rendering (SSR) optimization pipelines, the site achieves smooth 60FPS fluid physics and "anti-gravity" interaction without sacrificing initial page loading speeds.

🔗 **Live Production URL:** [https://fizz-co.vercel.app/](https://fizz-co.vercel.app/)

---

## 📌 Project Overview & Technical Architecture

This repository serves as a showcase for modern frontend engineering capabilities. The core objective was to break out of standard, flat 2D grid layouts common in legacy e-commerce stores, transitioning instead into an immersive product storytelling experience.

### Key Engineering Features:
* ** Mathematical Anti-Gravity Simulation:** Rather than utilizing heavy static animation scripts, the 3D can elements drift weightlessly on an uncoupled vertical sine-wave trajectory mapped directly through the WebGL render loop ticker (`useFrame`).
* ** Restricted 360° Interaction (`/experience`):** A dedicated, high-performance interactive viewport utilizing customized `@react-three/drei` pointer vectors. Users can grab, spin, and inspect the product's layout details seamlessly across the horizontal plane.
* ** SSR Dynamic Resilience:** Mitigates browser hydration issues and "window is not defined" deployment errors common when running Three.js inside Next.js by isolating rendering canvases behind asynchronous code-splitting wrappers (`ssr: false`).
* ** State-Driven Visual Context Morphing:** The layout structure, backdrop glow layers, and user interface accents smoothly update typography and token color values dynamically as the user filters through flavors.

---

##  Product Flavor System Architecture

The site's data architecture is structured around three distinct product formulations, mapping individual design tokens across the layout components:

| Flavor Name | Theme Token | Taste Profile | Key Operational Benefits |
| :--- | :--- | :--- | :--- |
| **Electric Lime** | `#059669` (Emerald) | Zesty & Sharp | Cold-pressed Tahitian lime paired with sea salt electrolytes |
| **Tropical Mango** | `#D97706` (Amber) | Sweet & Sunny | Smooth Alphonso mango puree for standard hydration |
| **Zesty Berry** | `#DC2626` (Crimson) | Tart & Bold | Antioxidant-dense wild blackberry & raspberry fusion |

---

##  The Technology Stack

* **Core Framework:** Next.js (App Router Architecture)
* **Language Runtime:** TypeScript for strict compile-time type checking and contract predictability
* **3D Library Matrix:** Three.js wrapped within `@react-three/fiber` (declarative scene graphs) and `@react-three/drei` (functional helper hooks)
* **Styling Engine:** Tailwind CSS utilizing structural backdrop blur filters and responsive layout modifiers
* **Iconography Ecosystem:** Lucide React

---

##  Local Installation & Engineering Startup

Follow these steps to replicate the live environment structure on a local loop:

### 1. Clone the Filesystem Tree
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME
