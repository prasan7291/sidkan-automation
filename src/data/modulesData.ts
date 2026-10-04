import { NIChassis, NIModule, EnclosureOption, ConnectorOption, TestSequenceStep } from '../types';

export const POPULAR_CHASSIS: NIChassis[] = [
  {
    id: 'cdaq-9178',
    model: 'NI cDAQ-9178',
    name: '8-Slot USB 3.0 Benchtop Chassis',
    slots: 8,
    bus: 'USB 3.0 / USB 2.0 (Type-B locking cable)',
    description: 'The industry-standard 8-slot USB CompactDAQ chassis. Features 4 independent 32-bit counter/timers, 7 hardware timing engines, and dual BNC trigger inputs for external clock/trigger synchronization. Ideal for high-channel-count benchtop test benches and laboratory desks.',
    timingEngines: '7 independent timing engines (AI, AO, DI, DO) + 4 general-purpose 32-bit counters',
    connectivity: 'Locking USB 3.0 High-Retention Port + Dual External BNC Trigger Lines',
    dimensions: '272 mm (W) x 88 mm (H) x 94 mm (D) internal core',
    boxLookDescription: 'Housed in Sidkan’s precision-milled matte anodized aluminum benchtop housing (340mm wide). Front panel features 8 vertical module bays, an illuminated master rocker switch, dual green/amber status LEDs, and an integrated chassis ground lug.',
    powerRequirement: '9 to 30 VDC via internal regulated power supply (110-240V AC universal inlet included)'
  },
  {
    id: 'cdaq-9189',
    model: 'NI cDAQ-9189',
    name: '8-Slot Gigabit TSN Ethernet Chassis',
    slots: 8,
    bus: 'Gigabit Ethernet TSN (Time-Sensitive Networking, IEEE 802.1AS)',
    description: 'High-performance 8-slot Ethernet chassis equipped with Time-Sensitive Networking (TSN). Provides sub-microsecond synchronization across daisy-chained chassis over standard Cat6 cables. Perfect for distributed test cells, environmental chambers, and automotive test stands.',
    timingEngines: '7 hardware timing engines + TSN IEEE 802.1AS hardware clock sync (< 100 ns jitter)',
    connectivity: 'Dual Gigabit RJ45 TSN Ethernet ports with integrated 2-port network switch',
    dimensions: '272 mm (W) x 88 mm (H) x 94 mm (D) internal core',
    boxLookDescription: 'Enclosed in Sidkan’s heavy-duty aluminum chassis with dual ruggedized Neutrik etherCON RJ45 Ethernet ports on the rear and 8 quick-connect modular bulkheads on the front.',
    powerRequirement: '9 to 30 VDC isolated industrial terminal or standard AC mains'
  },
  {
    id: 'cdaq-9174',
    model: 'NI cDAQ-9174',
    name: '4-Slot USB 3.0 Compact Benchtop Chassis',
    slots: 4,
    bus: 'USB 3.0 High-Retention Interface',
    description: 'Compact 4-slot USB chassis designed for engineers who need a portable, desktop hardware validation box. Supports up to 4 mixed-signal C-Series modules with 4 independent counter/timers.',
    timingEngines: 'Multiple timing engines supporting simultaneous mixed-signal analog and digital tasks',
    connectivity: 'Locking USB 3.0 Port with thumbscrew cable clamp',
    dimensions: '161 mm (W) x 88 mm (H) x 94 mm (D) internal core',
    boxLookDescription: 'Housed in Sidkan’s compact 4-bay enclosure (220mm wide). Features 4 quick-connect front bulkheads, quiet magnetic-levitation cooling fan, and front power switch.',
    powerRequirement: '9 to 30 VDC (includes compact 24V desktop power brick)'
  },
  {
    id: 'cdaq-9185',
    model: 'NI cDAQ-9185',
    name: '4-Slot Gigabit TSN Ethernet Chassis',
    slots: 4,
    bus: 'Gigabit Ethernet TSN (Time-Sensitive Networking)',
    description: 'Compact 4-slot Ethernet chassis with IEEE 802.1AS TSN synchronization. Built for remote test stands where the validation box is mounted directly inside or adjacent to an environmental thermal chamber.',
    timingEngines: 'Hardware-timed analog, digital, and counter I/O with network-synchronized timebase',
    connectivity: 'Dual Gigabit Ethernet TSN ports with internal pass-through daisy chain',
    dimensions: '161 mm (W) x 88 mm (H) x 94 mm (D) internal core',
    boxLookDescription: 'Compact 4-slot rugged aluminum enclosure with front status LEDs and rear Ethernet jacks.',
    powerRequirement: '9 to 30 VDC wide input range'
  },
  {
    id: 'crio-9045',
    model: 'NI cRIO-9045',
    name: '8-Slot CompactRIO Real-Time & FPGA Controller',
    slots: 8,
    bus: 'Embedded Quad-Core 1.6 GHz Intel Atom + Xilinx Kintex-7 70T FPGA',
    description: 'Standalone embedded controller for mission-critical Hardware-in-the-Loop (HIL) testing and microsecond deterministic control loops. Runs NI Linux Real-Time OS without requiring a dedicated PC.',
    timingEngines: 'Microsecond FPGA logic execution with ultra-low latency hardware interlocks',
    connectivity: 'Dual Gigabit Ethernet, USB 3.0, USB 2.0, Mini DisplayPort, SD storage slot',
    dimensions: '328 mm (W) x 88 mm (H) x 120 mm (D) internal core',
    boxLookDescription: '19” rackmount or heavy benchtop chassis with illuminated CPU/FPGA status indicators, front USB debug port, and high-current isolated DUT power injection.',
    powerRequirement: 'Dual redundant 9-30 VDC power inputs with reverse-voltage protection'
  }
];

export const POPULAR_MODULES: NIModule[] = [
  {
    id: 'ni-9205',
    model: 'NI 9205',
    name: '32-Channel Voltage Analog Input (±10V)',
    category: 'Voltage Input',
    channels: '32 Single-Ended or 16 Differential',
    sampleRate: '250 kS/s aggregate',
    voltageRange: '±10 V, ±5 V, ±1 V, ±200 mV (programmable per channel)',
    resolution: '16-bit ADC',
    description: 'The most popular analog input module in the NI ecosystem. Features high-channel density and programmable input gain per channel. Perfect for measuring multi-rail voltages, battery cell packs, sensor telemetry, and power supplies.',
    connectorType: 'Amphenol 37-Pin Circular Bayonet or High-Density DB37 Bulkhead',
    controlBoxLook: 'Front panel Port J1/J2 labeled "VOLTAGE AI (32CH)". Connects via keyed Amphenol bayonet bulkhead or 37-pin gold contact breakout with shielded braided ground.',
    typicalUse: 'Battery management system (BMS) cell logging, multi-rail DC power rail bring-up, analog sensor telemetry'
  },
  {
    id: 'ni-9220',
    model: 'NI 9220',
    name: '16-Channel Simultaneous Differential Voltage Input',
    category: 'Voltage Input',
    channels: '16 Differential Inputs',
    sampleRate: '100 kS/s per channel simultaneous',
    voltageRange: '±10 V',
    resolution: '16-bit dedicated ADC per channel',
    description: 'Contains 16 dedicated ADCs allowing all channels to be sampled at the exact same instant without phase delay. Crucial for AC phase angle measurements, transient capture, and high-speed multi-phase motor testing.',
    connectorType: 'Phoenix Contact Push-In Spring Terminals or MIL-DTL Circular',
    controlBoxLook: 'Front panel bulkhead labeled "SIMULTANEOUS AI". Equipped with orange/gray tool-free push-in spring clamps for rapid probe insertion.',
    typicalUse: 'Inverter three-phase current/voltage phase alignment, fast transient spike detection, audio/vibration testing'
  },
  {
    id: 'ni-9201',
    model: 'NI 9201',
    name: '8-Channel Fast Voltage Analog Input (±10V)',
    category: 'Voltage Input',
    channels: '8 Single-Ended',
    sampleRate: '500 kS/s aggregate',
    voltageRange: '±10 V',
    resolution: '12-bit ADC',
    description: 'High-speed analog input card suited for general voltage logging, high-speed potentiometers, optical sensor signals, and control loop verification.',
    connectorType: 'Screwless Push-In Industrial Terminal Block',
    controlBoxLook: 'Compact 8-pin spring terminal strip with illuminated channel activity LED.',
    typicalUse: 'General lab bench voltage probing, potentiometer tracking, fast analog trigger detection'
  },
  {
    id: 'ni-9207',
    model: 'NI 9207',
    name: '16-Channel Voltage & Current Combo Input',
    category: 'Voltage & Current',
    channels: '8 Voltage (±10V) + 8 Current (±21.5 mA)',
    sampleRate: '500 S/s aggregate (high-precision 24-bit delta-sigma)',
    voltageRange: '±10 V (voltage channels) / 0–20 mA or 4–20 mA (current loops)',
    resolution: '24-bit ADC',
    description: 'Dual-purpose module designed for process control and industrial instrumentation. Eliminates the need for external shunt resistors when measuring 4-20mA current loop transmitters and DC voltages.',
    connectorType: 'Industrial Phoenix Push-In Terminal Strip',
    controlBoxLook: 'Front panel terminal strip divided into two distinct color-coded banks (Blue for Voltage, Amber for 4-20mA Current).',
    typicalUse: 'Industrial 4-20 mA sensor calibration, pressure transmitters, mixed voltage and current logging'
  },
  {
    id: 'ni-9227',
    model: 'NI 9227',
    name: '4-Channel Simultaneous Current Input (5 Arms)',
    category: 'Current Input',
    channels: '4 Differential Current Channels',
    sampleRate: '50 kS/s per channel simultaneous',
    voltageRange: '5 Arms continuous (14 A peak)',
    resolution: '24-bit ADC',
    description: 'Precision AC/DC current input card capable of direct in-line current measurement up to 5 Arms with internal current transformers and calibration.',
    connectorType: 'Heavy-Duty 4x Quick-Disconnect High-Current Terminals',
    controlBoxLook: 'Dedicated heavy-gauge isolated binding posts on the front panel rated for 15A continuous surge.',
    typicalUse: 'DUT current consumption profiling, motor phase current analysis, inrush current peak capture'
  },
  {
    id: 'ni-9263',
    model: 'NI 9263',
    name: '4-Channel Analog Output Voltage Generator',
    category: 'Analog Output',
    channels: '4 Isolated Analog Outputs',
    sampleRate: '100 kS/s per channel simultaneous',
    voltageRange: '±10 V, 16-bit DAC',
    resolution: '16-bit',
    description: 'Ultra-clean voltage stimulus generator for sensor simulation, ECU command signals, feedback control loops, and programmable setpoint sweeps. Protected against short circuits.',
    connectorType: '4x BNC Coaxial Quick-Connect Array or Screwless Terminal',
    controlBoxLook: 'Array of 4 insulated 50Ω BNC female connectors labeled "AO 0", "AO 1", "AO 2", "AO 3" with amber active stimulus LEDs.',
    typicalUse: 'Sensor simulation (simulating throttle position or temperature sensors to test a DUT), waveform generation'
  },
  {
    id: 'ni-9264',
    model: 'NI 9264',
    name: '16-Channel High-Density Analog Output',
    category: 'Analog Output',
    channels: '16 Single-Ended Analog Outputs',
    sampleRate: '25 kS/s per channel',
    voltageRange: '±10 V',
    resolution: '16-bit',
    description: 'High channel-count analog stimulus card. Allows controlling up to 16 external voltage inputs or actuators simultaneously from a single compact card slot.',
    connectorType: 'High-Density DB37 Male or 37-pin Circular',
    controlBoxLook: 'High-density 37-pin bulkhead labeled "ANALOG STIMULUS (16CH)".',
    typicalUse: 'Multi-actuator drive signals, automated test fixture multi-channel reference voltages'
  },
  {
    id: 'ni-9401',
    model: 'NI 9401',
    name: '8-Channel High-Speed Digital I/O (100 ns)',
    category: 'Digital & Timing',
    channels: '8 Bidirectional Digital Channels (configurable in 4-bit nibbles)',
    sampleRate: '100 ns update time (up to 10 MHz)',
    voltageRange: '5V TTL / CMOS Compatible',
    resolution: 'Digital Logic (0V Low / 5V High)',
    description: 'Ultra-fast bidirectional digital card. Built for sub-microsecond pulse-width modulation (PWM) output, encoder quadrature decoding, hardware triggering, and digital protocol testing (SPI, I2C bitbang).',
    connectorType: 'Amphenol Circular 10-Pin or High-Speed Lever Push-In',
    controlBoxLook: 'Front panel quick-connect port labeled "HIGH-SPEED DIO" with 8 green digital activity LEDs that pulse on signal transitions.',
    typicalUse: 'PWM motor control signal capture, optical encoder pulse counting, hardware triggering, logic verification'
  },
  {
    id: 'ni-9403',
    model: 'NI 9403',
    name: '32-Channel High-Density Digital I/O',
    category: 'Digital & Timing',
    channels: '32 Bidirectional Lines',
    sampleRate: '7 µs response time',
    voltageRange: '5V TTL logic',
    resolution: 'Digital Logic',
    description: 'High-density digital card for reading multiple limit switches, relay status feedback, button presses, and driving logic lines.',
    connectorType: 'High-Density D-Sub 37-Pin',
    controlBoxLook: 'Front panel Port labeled "32-CH DIGITAL I/O" with status bank indicator.',
    typicalUse: 'End-of-line test fixture pin status, relay control, DIP switch emulation'
  },
  {
    id: 'ni-9485',
    model: 'NI 9485',
    name: '8-Channel Solid-State Relay (SSR)',
    category: 'Relays & Switching',
    channels: '8 Independent SPST Solid-State Relays',
    sampleRate: 'Switching time < 250 µs',
    voltageRange: 'Up to 60 VDC / 30 VAC, 750 mA continuous per channel',
    resolution: 'Relay (Open / Closed)',
    description: 'Bounce-free solid-state switching for hardware fault injection, automated DUT power cycling, and load disconnection. Millions of switching cycles endurance without contact degradation.',
    connectorType: 'Industrial Push-In Barrier Strip',
    controlBoxLook: 'Front panel labeled "SSR RELAY BANK" with 8 amber relay status LEDs indicating contact closure.',
    typicalUse: 'Hardware fault injection (open-circuit / short-circuit testing), DUT automated power cycling'
  },
  {
    id: 'ni-9481',
    model: 'NI 9481',
    name: '4-Channel Electromechanical Relay (2A, 250 VAC)',
    category: 'Relays & Switching',
    channels: '4 SPST Electromechanical Relays',
    sampleRate: 'Mechanical switching time ~ 7 ms',
    voltageRange: 'Up to 60 VDC / 250 VAC, 2A contact rating',
    resolution: 'Relay (Open / Closed)',
    description: 'High-voltage electromechanical relay card for switching mains AC voltages, safety interlocks, and heavy DC solenoid loads.',
    connectorType: 'Heavy-Duty Industrial Push-In Header',
    controlBoxLook: 'Heavy-duty labeled terminal block with audible mechanical click and red closure LEDs.',
    typicalUse: 'AC power switching to DUT power supplies, industrial safety interlock loops'
  },
  {
    id: 'ni-9213',
    model: 'NI 9213',
    name: '16-Channel High-Density Thermocouple Input',
    category: 'Temperature',
    channels: '16 Thermocouple Inputs (J, K, T, E, R, S, B, N types)',
    sampleRate: '75 S/s aggregate (low noise delta-sigma)',
    voltageRange: '±78.125 mV (with built-in cold-junction compensation CJC)',
    resolution: '24-bit ADC (0.02°C sensitivity)',
    description: 'High-precision thermocouple card with integrated cold-junction compensation sensors. Ideal for thermal chamber stress testing, heatsink profiling, and battery thermal runaway monitoring.',
    connectorType: 'Isothermal Mini-Thermocouple Bayonet Panel or Spring Terminal',
    controlBoxLook: 'Faceplate equipped with isothermal copper backplate and numbered TC ports labeled "THERMOCOUPLE (16CH)".',
    typicalUse: 'Environmental thermal chamber validation, component temperature soak profiling, battery pack thermal maps'
  },
  {
    id: 'ni-9214',
    model: 'NI 9214',
    name: '16-Channel High-Accuracy Isothermal Thermocouple',
    category: 'Temperature',
    channels: '16 Thermocouple Inputs',
    sampleRate: '68 S/s aggregate',
    voltageRange: '±78.125 mV (0.45°C overall measurement accuracy)',
    resolution: '24-bit ADC',
    description: 'Ultra-high accuracy thermocouple card with custom isothermal terminal block and redundant thermistor CJC sensors. Designed for aerospace and medical thermal certification.',
    connectorType: 'Precision Isothermal High-Accuracy Terminal Block',
    controlBoxLook: 'Anodized aluminum thermal block with shield grounding post.',
    typicalUse: 'Medical device thermal validation (IEC 60601), aerospace avionics thermal cert'
  },
  {
    id: 'ni-9217',
    model: 'NI 9217',
    name: '4-Channel PT100 RTD Temperature Input',
    category: 'Temperature',
    channels: '4 Channels (3-wire or 4-wire PT100 RTD)',
    sampleRate: '400 S/s aggregate',
    voltageRange: '100Ω Platinum RTD (-200°C to 850°C)',
    resolution: '24-bit ADC',
    description: 'Precision RTD resistance temperature detector card with integrated 1 mA excitation current source. Delivers superior stability compared to thermocouples.',
    connectorType: '4x LEMO Push-Pull or Spring Clamps',
    controlBoxLook: 'Front panel labeled "RTD TEMPERATURE" with 4-wire lead terminals.',
    typicalUse: 'Ultra-accurate cryogenic and furnace temperature monitoring, precision reference probes'
  },
  {
    id: 'ni-9862',
    model: 'NI 9862',
    name: '1-Port High-Speed CAN / CAN-FD Interface (8 Mbps)',
    category: 'Vehicle & Bus',
    channels: '1x CAN / CAN-FD Port (ISO 11898-2)',
    sampleRate: 'Up to 8 Mbps data bitrate (CAN-FD), 1 Mbps classical CAN',
    voltageRange: 'Transceiver isolated up to 500 Vrms',
    resolution: 'Hardware-timed frames (NI-XNET processor)',
    description: 'Automotive vehicle bus validation interface powered by the onboard NI-XNET processor. Offloads cyclic frame transmission and DBC signal conversion from the PC, ensuring zero frame loss during high-bus-load testing.',
    connectorType: 'Standard Amphenol DB9 Male with Switchable 120Ω Resistor',
    controlBoxLook: 'Front panel DB9 connector labeled "CAN-FD / ISO 11898-2" with a toggle switch for 120Ω bus termination and dual TX/RX traffic LEDs.',
    typicalUse: 'Automotive ECU communication validation, EV battery controller telemetry, DBC frame decoding'
  },
  {
    id: 'ni-9237',
    model: 'NI 9237',
    name: '4-Channel Simultaneous Bridge & Strain Gauge',
    category: 'Sensors & Bridge',
    channels: '4 Bridge Inputs (Quarter, Half, and Full Bridge)',
    sampleRate: '50 kS/s per channel simultaneous',
    voltageRange: '±25 mV/V with internal excitation voltage (2.5V, 3.3V, 5V, 10V)',
    resolution: '24-bit ADC',
    description: 'Precision strain and load cell measurement module. Features internal bridge completion resistors (120Ω and 350Ω) and programmable internal shunt calibration.',
    connectorType: '4x RJ50 Quick-Lock or LEMO 6-Pin Circular',
    controlBoxLook: 'Front panel row of 4 gold-plated quick-lock circular ports labeled "STRAIN / LOAD CELL 0–3".',
    typicalUse: 'Structural strain gauge monitoring, load cell force testing, pressure transducer verification'
  },
  {
    id: 'ni-9234',
    model: 'NI 9234',
    name: '4-Channel Sound & Vibration IEPE Input',
    category: 'Acoustic & Vibration',
    channels: '4 Differential IEPE / AC/DC Coupled Inputs',
    sampleRate: '51.2 kS/s per channel simultaneous',
    voltageRange: '±5 V, software-selectable 2 mA IEPE excitation current',
    resolution: '24-bit Delta-Sigma ADC (102 dB dynamic range)',
    description: 'Dynamic signal acquisition module designed for accelerometers and microphones. Features built-in anti-aliasing filters that automatically adjust to sample rate.',
    connectorType: '4x Isolated BNC Female Coaxial Ports',
    controlBoxLook: 'Array of 4 BNC connectors labeled "IEPE / VIBRATION" with blue activity LEDs.',
    typicalUse: 'Mechanical vibration profiling, motor bearing acoustic analysis, impact shock testing'
  }
];

export const NI_MODULES_CATALOG = POPULAR_MODULES;

export const ENCLOSURES_CATALOG: EnclosureOption[] = [
  {
    id: 'valbox-4',
    name: 'Sidkan ValBox Pro 4-Slot',
    chassisType: 'cDAQ',
    slots: 4,
    formFactor: 'Benchtop',
    description: 'Compact, ruggedized extruded-aluminum benchtop chassis engineered for hardware engineers, automated test stations, and prototype bring-up desks.',
    features: [
      'Genuine NI cDAQ-9185 TSN Gigabit Ethernet Chassis (or USB 3.0 cDAQ-9174)',
      'Front-panel keyed quick-disconnect multi-pin bulkhead connectors',
      'Integrated DUT 24V/5V/3.3V DC isolated power injection port with fused protection',
      'Dual active silent mag-lev cooling fans with thermal intake sensing',
      'Grounding stud & ESD strap ground post integrated on front bezel'
    ],
    dimensions: '240mm (W) x 165mm (H) x 210mm (D)',
    powerInput: '9-30 VDC Industrial Jack or Universal 110-240V AC Adapter',
    badge: 'Most Popular for Lab Benches'
  },
  {
    id: 'valbox-8',
    name: 'Sidkan ValBox Pro 8-Slot',
    chassisType: 'cDAQ',
    slots: 8,
    formFactor: 'Benchtop',
    description: 'Expanded capacity validation powerhouse for high-channel-count automated test benches requiring mixed-signal AI, AO, DIO, and CAN bus simultaneously.',
    features: [
      'Genuine NI cDAQ-9189 TSN Ethernet or cDAQ-9178 USB 3.0 Core',
      'Breakout faceplates with Amphenol circular & high-density push-ins',
      'Over-voltage and ESD suppression backplane for harsh prototype environments',
      'OLED diagnostic status display for IP address, link speed, and module health',
      'Built-in trigger routing and external sync BNC ports'
    ],
    dimensions: '340mm (W) x 175mm (H) x 250mm (D)',
    powerInput: '100-240V AC IEC Inlet with Illuminated Power Switch',
    badge: 'High-Density Mixed-Signal'
  }
];

export const CONNECTOR_OPTIONS: ConnectorOption[] = [
  {
    id: 'amphenol-circular',
    name: 'Amphenol MIL-DTL Industrial Circular Bayonet',
    type: 'Circular Multi-Pin Keyed Quick-Lock',
    matingCycles: '> 2,000 cycles',
    ipRating: 'IP68 Mated',
    idealFor: 'Vibration-heavy test benches, automotive test cells, frequent connect/disconnect harness cycles.',
    description: 'Quarter-turn positive bayonet locking mechanism with keyed indexing to make miswiring physically impossible.'
  },
  {
    id: 'phoenix-pushin',
    name: 'Phoenix Contact Push-In Spring Clamps',
    type: 'Tool-Less Lever Push-In Terminal',
    matingCycles: '> 500 re-terminations',
    ipRating: 'IP20 Benchtop',
    idealFor: 'R&D prototyping labs, quick jumper wires, rapidly changing test configurations.',
    description: 'Fast wire insertion with spring cage tension that prevents vibration-induced loosening common with traditional screw terminals.'
  }
];

export const INITIAL_TEST_SEQUENCE: TestSequenceStep[] = [
  {
    id: 1,
    name: 'Chassis Initialization & Clock Lock',
    module: 'cDAQ-9178 / 9189',
    parameter: 'Clock Jitter & IP Ping',
    target: '< 100 ns jitter',
    measured: '28 ns jitter',
    status: 'PASS',
    durationMs: 340
  },
  {
    id: 2,
    name: 'DUT Isolated Power-On Inrush Test',
    module: 'NI 9205 AI',
    parameter: 'Inrush Peak Current',
    target: '< 4.50 A for < 10 ms',
    measured: '3.18 A peak @ 4.2 ms',
    status: 'PASS',
    durationMs: 520
  }
];
