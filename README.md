# Sidkan Automation Website

Official website and interactive product showcase for **Sidkan Automation**, productizing turnkey hardware validation boxes built on **National Instruments (NI) CompactDAQ & CompactRIO** architecture with military-grade quick-connect port interfaces and real-time automated validation software.

---

## 🌟 Key Features

1. **Slick Industrial Aesthetic**: Dark-themed, high-precision engineering styling with glowing status LEDs, oscilloscope waveforms, and telemetry monitors.
2. **Interactive Hero Hardware Visualizer**: Real-time simulated hardware box front panel with clickable ports (Amphenol circular bayonet, Phoenix Push-in, DB9 CAN-FD, BNC coaxial) showing active signal readings and pinout diagnostics.
3. **Interactive Box Configurator**:
   - Choose between **Benchtop 4-Slot cDAQ**, **Benchtop 8-Slot cDAQ**, **19" 3U Rackmount cRIO**, or **Rugged IP67 Pelican Field Unit**.
   - Assign genuine NI C-Series modules (NI 9205 AI, NI 9220 AI, NI 9263 AO, NI 9401 DIO, NI 9485 SSR, NI 9213 Thermocouple, NI 9862 CAN-FD, NI 9237 Bridge).
   - Select quick-connect bulkhead styles.
   - Dynamic Bill of Materials (BOM) summary & Instant Quote Request generator.
4. **Sidkan TestSuite Pro Live Simulator**:
   - Multi-channel animated canvas oscilloscope with variable sample rates (10 kS/s to 1 MS/s), signal toggling (Sine, PWM, Thermal, CAN-FD), and channel controls.
   - Automated Validation Sequence Runner with real-time test execution and pass verdicts.
   - Automated ISO 9001:2015-compliant hardware validation certificate preview & printable PDF modal.
5. **Developer & Systems Integration**:
   - Python SDK (`import sidkan`), NumPy/Pandas streaming.
   - LabVIEW VI instrument driver integration.
   - REST API & WebSockets for CI/CD hardware-in-the-loop (HIL) automation.
6. **Interactive ROI & Efficiency Calculator**:
   - Computes engineering hours saved and prototype scrap risk mitigation for engineering managers.
7. **Quotation & Spec Sheet Modal**:
   - Interactive modal with form validation, pre-filled configurator summary, and confetti celebration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Development
To launch the Vite development server with hot module replacement:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
To create an optimized, minified production build:
```bash
npm run build
```
The output will be placed in the `dist/` directory, ready to be deployed to Vercel, Netlify, Cloudflare Pages, AWS S3, or any static web host.

---

## 📂 Project Structure

```text
├── index.html                   # HTML entrypoint with custom fonts & metadata
├── src/
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces for modules, boxes, sequences
│   ├── data/
│   │   └── modulesData.ts       # NI C-Series catalog, enclosures, connector specs
│   ├── components/
│   │   ├── Navbar.tsx           # Fixed glassmorphic navigation header
│   │   ├── Hero.tsx             # Hero with interactive front-panel box preview
│   │   ├── ProblemSolution.tsx  # Ad-hoc wire rats' nest vs. Sidkan standard
│   │   ├── ProductsShowcase.tsx # Enclosure lineup (4-Slot, 8-Slot, 3U Rack, Pelican)
│   │   ├── QuickConnectDeepDive.tsx # Port & harness architecture breakdown
│   │   ├── BoxConfigurator.tsx  # Flagship interactive custom test box builder
│   │   ├── SoftwareShowcase.tsx # Live simulated Sidkan TestSuite & oscilloscope
│   │   ├── SoftwareFeatures.tsx # Python SDK, LabVIEW, REST code snippets
│   │   ├── RoiCalculator.tsx    # Interactive lab efficiency & ROI calculator
│   │   ├── IndustryUseCases.tsx # Automotive, Aerospace, MedTech & Electronics
│   │   ├── QuoteModal.tsx       # RFQ form with configurator pre-fill & confetti
│   │   ├── TestReportModal.tsx  # Automated compliance certificate preview
│   │   └── Footer.tsx           # Detailed footer with specs and legal disclaimer
│   ├── App.tsx                  # Main application orchestrator
│   ├── main.tsx                 # React DOM mount point
│   └── index.css                # Tailwind CSS + custom engineering utilities
├── tailwind.config.js           # Industrial dark color palette & keyframes
└── tsconfig.app.json            # TypeScript configuration
```
