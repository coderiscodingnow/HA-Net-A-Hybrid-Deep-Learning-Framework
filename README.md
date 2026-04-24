# HA-Net — Hybrid Deep Learning Framework for Explainable HACCP Compliance

![HA-Net Header](https://via.placeholder.com/1200x300/0A0F1E/00E5A0?text=HA-Net+Hybrid+Deep+Learning+Framework)

**HA-Net** is a full-stack research demo web application designed as an advanced, industrial-scientific command center for food safety and Hazard Analysis and Critical Control Points (HACCP) compliance. It visualizes the intersection of food science, regulatory compliance, and cutting-edge Artificial Intelligence.

## 🚀 Features

The application is structured into 6 distinct, highly interactive modules:

1. **Executive Dashboard**: A system-wide overview featuring a 24-hour risk timeline, active hazard alerts, compliance rates, and a live batch monitoring table.
2. **Semantic Knowledge Graph**: An interactive, D3-powered force-directed graph mapping the ontology between biological/chemical hazards, critical control points (CCPs), processing materials, and international regulations.
3. **Real-Time Risk Analyzer**: A simulation of the HA-Net TCN/Transformer model in action. Features interactive telemetry sliders (Temperature, pH, Water Activity, etc.) to assess real-time production risk.
4. **XAI Explanation Engine**: An Explainable AI (XAI) dashboard providing SHAP feature importance charts, LIME local decision boundary visualizations, and natural language terminal-style compliance reports.
5. **Synthetic Data GAN Simulator**: A Conditional GAN (cGAN) interface simulating rare failure modes and generating synthetic edge-case scenarios to augment model robustness.
6. **Federated Learning Network Monitor**: Visualizes privacy-preserving distributed training across multiple manufacturing facilities with animated gradient updates and live aggregation logs.

## 🎨 Design & Aesthetics

The UI is built with a meticulously crafted **Dark Industrial-Scientific Aesthetic**, mimicking a real biosafety monitoring command center:
- **Color Palette**: Dark navy/charcoal backgrounds (`#0A0F1E`, `#0D1526`) with sharp accents: Bio-Amber (`#F5A623`), Safe-Green (`#00E5A0`), and Hazard-Red (`#FF3B5C`).
- **Typography**: `Space Mono` for monospace data readouts and `Sora` for modern headings.
- **Visuals**: Features glowing glassmorphism cards, dynamic animated SVG gauges, CSS keyframe sweeps, and pulse alerts for critical hazards.

## 🛠️ Technology Stack

- **Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Pure Vanilla CSS + CSS Variables (No external UI frameworks to ensure absolute aesthetic control)
- **Data Visualization**: Recharts (Dashboards, Bar Charts, Scatter Plots) & D3.js (Force-Directed Knowledge Graph)
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/coderiscodingnow/HA-Net-A-Hybrid-Deep-Learning-Framework.git
   cd HA-Net-A-Hybrid-Deep-Learning-Framework
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open your browser and navigate to `http://localhost:5173`.

## 📄 Disclaimer

This is a **research and demonstration application**. All telemetry, batches, and model predictions visualized in this dashboard are strictly simulated mock data designed to illustrate the concept of an AI-driven HACCP compliance framework. No actual machine learning models or backend databases are connected.

---
*Built for advanced AI-driven food safety compliance demonstrations.*
