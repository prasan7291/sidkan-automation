# SIDKAN AUTOMATION: PRODUCT SPECIFICATION & ENGINEERING BLUEPRINT
**Document ID:** SID-SPEC-2026-V1  
**Author:** Sidkan Automation Systems Engineering  
**Subject:** Turnkey NI cDAQ/cRIO Hardware Validation Boxes & Companion Software  
**Status:** Approved for Prototype & Production Build  

---

## 1. EXECUTIVE PRODUCT OVERVIEW

### 1.1 The Core Problem in Hardware Engineering Labs
Hardware validation and test engineering teams waste weeks building one-off, ad-hoc test benches:
- **"Rats' Nests" of Loose Wires:** Engineers strip tiny wire leads into fragile screw terminals on bare NI modules. A slight table bump or tug during an overnight thermal soak disconnects critical thermocouple or analog lines.
- **Accidental Prototype Destruction ($5,000–$20,000+):** One slipped alligator clip or miswired terminal lead injecting 24V into an unbuffered 3.3V microcontroller pin destroys rare early-stage prototype boards.
- **Non-Reproducible Test Setups:** Test routines that pass on Engineer A's bench fail on Engineer B's bench due to varying cable impedances, loose terminal connections, and ad-hoc grounding loops.
- **Software Bottlenecks:** Every engineer writes fragmented Python or LabVIEW scripts from scratch, resulting in non-standardized test data logging and manual spreadsheet collation.

### 1.2 The Sidkan Automation Solution
Sidkan Automation productizes hardware validation into **turnkey, rugged validation boxes** powered by genuine **National Instruments (NI) CompactDAQ (cDAQ) and CompactRIO (cRIO)** architecture. 

All internal module channels are cleanly routed to **industrial, keyed quick-connect front-panel bulkheads**. Combined with **clean companion validation software**, engineering teams can unbox a unit, latch on a mating DUT harness in 5 seconds with zero risk of miswiring, and start automated validation immediately.

---

## 2. PHYSICAL HARDWARE PRODUCT ARCHITECTURE

### 2.1 Enclosure Form Factors

#### Form Factor A: Sidkan ValBox Pro 8-Slot (Desktop / Benchtop Workhorse)
- **Core Chassis:** Genuine National Instruments **cDAQ-9178** (USB 3.0) or **cDAQ-9189** (Gigabit TSN Ethernet).
- **Enclosure:** CNC-milled 6061-T6 anodized aluminum chassis (Matte Charcoal / Deep Slate finish) with chamfered structural corners.
- **External Dimensions:** 340 mm (W) x 175 mm (H) x 250 mm (D).
- **Front Panel Layout:** 
  - 8 vertical module breakout bays (Slots 1 through 8).
  - Main illuminated AC/DC rocker power switch with fuse holder.
  - Front-panel brass grounding lug & ESD wrist-strap snap socket (10 mm).
  - Dual status LED indicators (Chassis Power, Bus Active, Trigger Armed).
  - Optional dual external BNC ports for chassis trigger routing (`TRIG 0` / `TRIG 1`).
- **Cooling:** Dual active magnetic-levitation silent 60mm fans with thermal intake louvers and removable dust filters.

#### Form Factor B: Sidkan ValBox Pro 4-Slot (Compact Desktop / Bring-Up Station)
- **Core Chassis:** Genuine National Instruments **cDAQ-9174** (USB 3.0) or **cDAQ-9185** (Gigabit TSN Ethernet).
- **External Dimensions:** 240 mm (W) x 165 mm (H) x 210 mm (D).
- **Intended Use:** Personal bring-up desks, firmware developers, and portable lab carts.

#### Form Factor C: Sidkan ValRack Ultra 3U (19-Inch Automated Production Rack)
- **Core Chassis:** Embedded **cRIO-9045** Quad-Core Real-Time Controller with Xilinx Kintex-7 70T FPGA.
- **Form Factor:** 19” EIA Standard Rackmount, 3U Height (132.5 mm), 380 mm depth.
- **Intended Use:** High-throughput factory End-of-Line (EOL) testing, microsecond Hardware-in-the-Loop (HIL) simulation, and life-cycle endurance rigs.

#### Form Factor D: Sidkan ValPelican Field Explorer (Rugged Mobile / In-Vehicle)
- **Core Chassis:** NI cDAQ-9185 housed inside a modified IP67 waterproof Pelican 1450 case.
- **Battery Pack:** Internal 98 Wh LiFePO4 UPS battery pack (up to 4 hours untethered logging).
- **External Bulkheads:** Weather-sealed circular military connectors with screw dust caps.

---

### 2.2 Integrated Power Distribution & Protection Subsystem

Every Sidkan validation box includes an internal power conditioning and distribution sub-assembly:
1. **Mains AC Input:** Universal 100–240 VAC, 50/60 Hz IEC inlet with integrated 5A fast-blow fuse and EMI line filter.
2. **Internal Industrial Power Supply:** Mean Well 24V DC / 120W DIN-rail industrial power supply (powers the NI chassis core and internal cooling).
3. **DUT Auxiliary Power Rails (Isolated Out to Front Panel):**
   - **+24 VDC Rail (up to 3.0 A):** For industrial actuators, contactors, solenoids, and 24V sensors.
   - **+5.0 VDC Rail (up to 3.0 A):** Clean regulated rail for TTL logic and sensor stimulus.
   - **+3.3 VDC Rail (up to 2.0 A):** Ultra-low-noise rail for microcontroller prototype powering.
4. **Hardware Safety Interlock Continuity Loop:**
   - A dedicated 2-pin circuit in the front-panel bulkhead looped through the mating cable harness.
   - If a technician unlatches the quick-connect harness during live testing, the continuity loop opens instantly, causing an internal high-speed solid-state relay to disconnect DUT high-voltage rails within **1.2 microseconds**.

---

## 3. QUICK-CONNECT PORT ECOSYSTEM & BULKHEAD SELECTION

The core mechanical innovation of the Sidkan ValBox is replacing fragile module screw terminals with standardized front-panel bulkheads.

| Connector Family | Part Standard | Key Features | Recommended Use Case |
| :--- | :--- | :--- | :--- |
| **Amphenol MIL-DTL Circular** | Amphenol D38999 / PT Bayonet | Quarter-turn positive locking, physical keying indices, IP68 sealed | Multi-channel analog voltage bundles (NI 9205), high-vibration test stands |
| **Phoenix Contact Push-In** | SPT / FK-MCP Series (3.5mm/5.0mm pitch) | Tool-less orange lever push-in spring clamps, constant contact force | R&D prototyping, thermocouple wiring, quick jumper changes |
| **Heavy-Duty Industrial D-Sub** | Shielded DB37 & DB25 (Machined Gold Pins) | Solid metal backshells with CNC knurled thumbscrews, 360° EMI foil shielding | Automated Test Equipment (ATE) mass-interconnect patch cables |
| **Precision BNC Coaxial Array** | 50Ω Isolated Bulkhead BNC | Low-noise coaxial shielding with PTFE dielectric | Analog stimulus outputs (NI 9263), IEPE accelerometers (NI 9234) |
| **Automotive Vehicle Bus Port** | Standard DB9 Male (ISO 11898-2) | Integrated front-panel toggle switch for switchable 120Ω termination | CAN and CAN-FD communication links (NI 9862) |

---

## 4. POPULAR NI C-SERIES MODULES SUPPORT MATRIX

The box is modular and accepts all standard National Instruments C-Series modules:

### 4.1 Analog & Voltage Measurement
- **NI 9205 (32-Ch Voltage Input):** ±10V, ±5V, ±1V, ±200mV programmable gain; 250 kS/s aggregate; 16-bit ADC.  
  *Application:* Battery Management System (BMS) multi-cell logging, multi-rail DC power sequencing.
- **NI 9220 (16-Ch Simultaneous Differential AI):** ±10V; 100 kS/s/ch dedicated ADC per channel.  
  *Application:* Three-phase inverter motor current/voltage phase alignment with zero inter-channel phase delay.
- **NI 9201 (8-Ch Fast Voltage Input):** ±10V; 500 kS/s aggregate; 12-bit ADC.  
  *Application:* General lab bench voltage probing, potentiometer tracking.
- **NI 9207 (16-Ch Voltage & Current Combo):** 8x ±10V Voltage + 8x 4–20 mA Current loops; 24-bit delta-sigma.  
  *Application:* Industrial 4–20mA process sensor calibration without external shunt resistors.
- **NI 9227 (4-Ch Simultaneous Current Input):** 5 Arms continuous (14 A peak); 50 kS/s/ch; 24-bit.  
  *Application:* Direct in-line AC/DC current consumption, inrush current analysis.

### 4.2 Stimulus & Signal Generation
- **NI 9263 (4-Ch Analog Voltage Output):** ±10V; 100 kS/s/ch simultaneous; 16-bit DAC; short-circuit protected.  
  *Application:* Sensor emulation (simulating throttle position or pressure sensor signals to stimulate a DUT).
- **NI 9264 (16-Ch High-Density Analog Output):** ±10V; 25 kS/s/ch; 16-bit DAC.  
  *Application:* Multi-actuator drive signals, automated test fixture reference voltages.

### 4.3 Digital Control & Relays
- **NI 9401 (8-Ch High-Speed Bidirectional DIO):** 5V TTL; 100 ns update time (10 MHz response).  
  *Application:* PWM motor gate capture, optical encoder quadrature decoding, microsecond hardware triggering.
- **NI 9403 (32-Ch High-Density DIO):** 5V TTL; 7 µs response.  
  *Application:* Multi-switch state sensing, automated test fixture pin status.
- **NI 9485 (8-Ch Solid-State Relay SSR):** 60 VDC / 30 VAC, 750 mA; bounce-free (< 250 µs switching).  
  *Application:* Hardware fault injection (automated open/short circuit simulation), power cycling endurance runs.
- **NI 9481 (4-Ch Electromechanical Relay):** 60 VDC / 250 VAC, 2A contact rating.  
  *Application:* AC mains power switching to external DUT power supplies.

### 4.4 Temperature & Environmental Testing
- **NI 9213 (16-Ch Thermocouple Input):** J, K, T, E, R, S, B, N types; built-in Cold-Junction Compensation (CJC); 24-bit.  
  *Application:* Environmental thermal chamber stress cycles, heatsink profiling.
- **NI 9214 (16-Ch Isothermal High-Accuracy Thermocouple):** 0.45°C precision with custom isothermal copper block.  
  *Application:* Medical device validation (IEC 60601), aerospace avionics thermal qualification.
- **NI 9217 (4-Ch PT100 RTD Input):** 100Ω Platinum RTD; 24-bit; 1 mA internal excitation.  
  *Application:* Ultra-stable reference temperature probes.

### 4.5 Vehicle Bus & Specialized Sensor Inputs
- **NI 9862 (1-Port High-Speed CAN / CAN-FD):** Up to 8 Mbps data bitrate; onboard NI-XNET hardware processor; 500 Vrms isolation.  
  *Application:* Automotive ECU communication, EV battery controller telemetry, DBC frame decoding.
- **NI 9237 (4-Ch Simultaneous Bridge & Strain Gauge):** Half & Full bridge; 50 kS/s/ch; internal excitation voltage (2.5V–10V); internal shunt calibration.  
  *Application:* Structural load cell force measurement, strain gauge torque verification.
- **NI 9234 (4-Ch Sound & Vibration IEPE):** ±5V; 51.2 kS/s; 24-bit delta-sigma; 2 mA IEPE excitation.  
  *Application:* Accelerometer vibration profiling, acoustic bearing diagnostics.

---

## 5. COMPANION SOFTWARE PLATFORM ARCHITECTURE ("SIDKAN TESTSUITE STUDIO")

Per engineering requirements, the software suite features an **Apple-grade, ultra-clean light mode interface (crisp white background)** for maximum legibility in laboratory environments.

```
+-----------------------------------------------------------------------------------+
|  [●][●][●]  Sidkan TestSuite Studio v3.2 — [cDAQ-9178 Connected]                  |
+-----------------------------------------------------------------------------------+
|  [ RMS: 3.304 V ]   [ Pk-Pk: 3.328 V ]   [ CLOCK: 250 kS/s ]   [ STATUS: PASS ]   |
+-----------------------------------------------------------------------------------+
|  [Oscilloscope Canvas - PURE WHITE BACKGROUND]                                    |
|   ┌─────────────────────────────────────────────────────────────────────────────┐ |
|   │ 4.0V |                                                                      │ |
|   │      |   ~~~~~~~\                     /~~~~~~~\                     /~~~~~~ │ |
|   │ 3.3V |----------- \ ---------------- / ------- \ ----------------- / ------ │ |
|   │      |             \_______/~~~~~~~ /           \_______/~~~~~~~~ /         │ |
|   │ 0.0V |______________________________________________________________________│ |
|   │       CH0: 3.3V Rail (NI 9205)   |   CH1: PWM Gate (NI 9401)                │ |
|   └─────────────────────────────────────────────────────────────────────────────┘ |
+-----------------------------------------------------------------------------------+
|  AUTOMATED HARDWARE VALIDATION SEQUENCE                                           |
|  1. DUT Inrush Peak Current (< 4.0A) ...................... Measured: 3.12A  [PASS] |
|  2. 5V Rail Linearity Sweep (< ±0.05%) .................... Measured: 0.01%  [PASS] |
|  3. CAN-FD Cyclic Latency (< 2.5 ms) ...................... Measured: 1.2ms  [PASS] |
|  4. Thermal Chamber Soak (< 55.0°C) ....................... Measured: 41.8°C [PASS] |
+-----------------------------------------------------------------------------------+
|  [Run Automated Test Sweep]     [Export CSV Telemetry]     [Generate PDF Certificate]  |
+-----------------------------------------------------------------------------------+
```

### 5.1 Software Core Features
1. **Auto-Discovery Daemon:** Automatically identifies attached NI cDAQ (USB or Ethernet TSN) or cRIO chassis over the local network or USB bus without requiring manual NI MAX configuration.
2. **Real-Time High-Resolution Oscilloscope:**
   - Multi-channel synchronized waveform rendering on a clean white background.
   - Interactive timebase controls (100 µs/div to 1 s/div), trigger level markers, and voltage scale offsets.
3. **Automated Sequence Engine:**
   - Configurable test sequences defining parameters, target tolerance masks (min/max thresholds), and sample counts.
   - Executes routines sequentially and outputs instantaneous `PASS` / `FAIL` verdicts with microsecond timestamping.
4. **1-Click Compliance Test Report Generator:**
   - Exports audit-ready PDF test certificates complying with ISO 9001:2015, AS9100, and IATF 16949 audit requirements.
   - Records chassis serial number, module calibration dates, measured values vs. tolerances, and cryptographic tamper-proof hash.
5. **Developer SDK & CI/CD Integration:**
   - **Python SDK (`import sidkan`):** Native NumPy array streaming and Pandas telemetry exports.
   - **NI LabVIEW & TestStand:** Native polymorphic VIs and TestStand sequence step types.
   - **REST & WebSocket API:** Allows remote triggering of test runs from GitHub Actions or GitLab CI runners for nightly automated Hardware-in-the-Loop (HIL) testing.

---

## 6. STEP-BY-STEP ROADMAP TO BUILD THE PHYSICAL PRODUCT

### Phase 1: Mechanical Enclosure & Prototyping
1. **CAD Modeling (SolidWorks / Fusion 360):**
   - Model the 8-bay and 4-bay aluminum enclosures around the physical dimensions of the NI cDAQ-9178 and cDAQ-9174 chassis.
   - Design mounting standoffs that secure the NI chassis firmly while allowing adequate ventilation airflow.
2. **Front-Panel Bulkhead Cutouts:**
   - CNC-mill circular cutouts for Amphenol circular bayonets (D38999 size 13/15).
   - Machine rectangular cutouts for Phoenix Contact 16-pin push-in terminal blocks and DB9 D-Sub connectors.
   - Machine cutouts for the illuminated master rocker switch and BNC trigger connectors.
3. **Internal Interposer Wire Harnesses:**
   - Fabricate internal jumper looms that mate from the rear of the front-panel quick-connect bulkheads to the NI C-Series module front connectors (e.g., Amphenol circular to internal D-Sub 37 or spring screw block).
   - Use MIL-W-22759/16 PTFE-insulated stranded copper wire with braided tin-copper EMI shielding.

### Phase 2: Power & Safety Subsystem Assembly
1. Mount the Mean Well 24V DIN-rail power supply and line filter inside the rear chassis floor.
2. Wire the AC line inlet through the master power switch and fuse block.
3. Install the solid-state safety interlock relay board. Connect the continuity loop through Pin A and Pin B of the primary quick-connect bulkhead.
4. Connect the front-panel brass grounding stud directly to the chassis frame and earth ground line.

### Phase 3: Software & Firmware Bring-Up
1. Install NI-DAQmx runtime drivers on the host computer.
2. Build the Python / C# hardware communication service utilizing `nidaqmx` and `nixnet` C-bindings.
3. Connect the frontend UI (React / Electron desktop app) to the telemetry daemon via local high-speed WebSockets.
4. Validate sample rates, buffer overflow handling, and automated report PDF rendering.

### Phase 4: Calibration & Validation
1. Verify channel measurement linearity using a calibrated Fluke 8846A 6.5-digit precision multimeter.
2. Perform high-voltage insulation and ground bond testing (hipot test) to guarantee operator safety up to 1,500 Vrms.
3. Validate thermal dissipation by running an 8-module full-load stress test inside a 50°C thermal chamber for 48 continuous hours.

---

## 7. BILL OF MATERIALS (BOM) ESTIMATE (8-SLOT VALBOX PRO PROTOTYPE)

| Item | Component Description | Manufacturer / Part # | Qty | Est. Cost (USD) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | NI CompactDAQ 8-Slot USB Chassis | National Instruments cDAQ-9178 | 1 | $1,850.00 |
| 2 | High-Density Analog Input Module | National Instruments NI 9205 | 1 | $1,150.00 |
| 3 | 4-Ch Analog Output Stimulus Module | National Instruments NI 9263 | 1 | $720.00 |
| 4 | High-Speed Digital I/O Module | National Instruments NI 9401 | 1 | $420.00 |
| 5 | CAN-FD Automotive Bus Module | National Instruments NI 9862 | 1 | $1,050.00 |
| 6 | Custom Milled Aluminum Enclosure | 6061-T6 Aluminum CNC + Anodizing | 1 | $380.00 |
| 7 | Front-Panel Bulkhead Connectors | Amphenol MIL-DTL / Phoenix Contact | 1 set | $160.00 |
| 8 | Internal 24V / 120W Industrial PSU | Mean Well NDR-120-24 | 1 | $45.00 |
| 9 | Internal Interposer Wiring & Shielding | PTFE M22759 wire + Braided Sleeving | 1 set | $75.00 |
| 10 | Cooling Fans & Thermal Switch | Noctua / Sanyo Denki 60mm Mag-Lev | 2 | $35.00 |
| 11 | Hardware Interlock Relay Board | Custom SSR Interlock Module | 1 | $40.00 |
| **TOTAL** | **Turnkey Hardware Prototype Est.** | | | **~$5,925.00** |

---

*This specification serves as the formal hardware and software design authority for Sidkan Automation product builds.*
