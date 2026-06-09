# ⚡ FIZZ & CO — Anti-Gravity 3D E-Commerce Experience

[![Vite](https://img.shields.io/badge/Vite-B738FR?style=for-the-badge&logo=vite&logoColor=FFD622)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

An ultra-premium, highly interactive 3D e-commerce landing page and product showcase built for **FIZZ & CO**. This application utilizes WebGL acceleration and fluid physics-based animations to create an immersive "anti-gravity" product experience for three signature sparkling flavors.

[✨ Live Demo Deployment](#-hosting--deployment) • [🕹️ Core Features](#-core-features) • [🛠️ Tech Stack](#-tech-stack)

---

## 📸 Interface Preview

> **Immersive Zero-G Showcase:** Cans float elegantly on a continuous physics-based sine wave loop. Users can grab, drag, and spin the product assets $360^\circ$ horizontally to inspect ingredients and formula metrics in real-time.

---

## 🕹️ Core Features

* **🪐 Anti-Gravity Physics Loop:** Cans float seamlessly in a zero-gravity state utilizing custom mathematical render loops (`useFrame` ticker loops).
* **🔄 Interactive $360^\circ$ Viewer:** Built-in restricted `OrbitControls` allowing customers to inspect product labeling smoothly without breaking the website grid.
* **🎨 Dynamic Contextual Theme Morphing:** The layout background, button state colors, and typography accents automatically morph smoothly as users flip between flavors.
* **🧪 Dedicated "Lab" View:** A high-end grid collection separating the primary hero experience from a structured ingredient-and-benefit catalog display.

---

## 🛠️ Tech Stack & Framework Architecture

The interface utilizes a decoupling of high-performance rendering engines and state utilities:

| Technology | Layer Purpose | Key Module Used |
| :--- | :--- | :--- |
| **Vite** | Build Tooling & Environment | HMR Dev Server |
| **React** | App Architecture & State | Hooks Hooks (`useState`, `useEffect`) |
| **React Three Fiber** | Three.js Wrapper Ecosystem | `<Canvas />`, Primitive Mesh injections |
| **@react-three/drei** | 3D Helpers & Camera Drivers | `<OrbitControls />`, `<ContactShadows />` |
| **GSAP / Framer** | Timelines & Structural Motion | Smooth color-interpolation matrices |
| **Tailwind CSS** | Design Token Architecture | Backdrop-blur filters, Glassmorphic cards |

---

## 🚀 Quickstart Installation Guide

Follow these steps to spin up the local development environment on your machine:

### 1. Clone & Navigate to Repository
```bash
git clone [https://github.com/YOUR_USERNAME/fizz-and-co-3d.git](https://github.com/YOUR_USERNAME/fizz-and-co-3d.git)
cd fizz-and-co-3d
