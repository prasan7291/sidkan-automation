import React, { useState } from 'react';
import { Code2, Terminal, Cpu, Database, Network, CheckCircle, Copy, Check } from 'lucide-react';

export const SoftwareFeatures: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'python' | 'labview' | 'rest'>('python');

  const pythonSnippet = `import sidkan
from sidkan import ValBox, ThresholdRule

# Connect directly to your Sidkan ValBox over TSN Gigabit Ethernet
box = ValBox(ip_address="192.168.1.100", chassis="cDAQ-9189")

# Configure Quick-Connect Ports with automatic NI-DAQmx calibration
box.configure_port("J1", module="NI-9205", sample_rate_hz=250_000)
box.configure_port("J4", module="NI-9862", baudrate_mbps=5.0)

# Define hardware validation test thresholds
rules = [
    ThresholdRule(channel="AI_0", min_volts=3.28, max_volts=3.32),
    ThresholdRule(channel="CAN_SOC", expected_state="NORMAL_OP")
]

# Execute automated sequence & generate ISO 9001 audit report
results = box.run_validation_sequence(duration_sec=30, rules=rules)

if results.passed:
    print(f"DUT Validation SUCCESS. Jitter: {results.max_jitter_ns}ns")
    results.export_pdf_report("DUT_Validation_Pass_Certificate.pdf")
`;

  const labviewSnippet = `// Sidkan LabVIEW Instrument Driver Library (VI Tree)
// 100% Native Polymorphic VIs for NI-DAQmx 24.5

[Initialize ValBox.vi] 
       ↓ 
[Read Quick-Connect AI Multi-Channel.vi] 
       ↓ 
[Compare Tolerance Masks.vi] 
       ↓ 
[Generate Sidkan PDF Compliance Certificate.vi] 
       ↓ 
[Close Chassis Session.vi]

* Includes complete palette of Express VIs & TestStand Sequence templates.`;

  const restSnippet = `// Remote CI/CD Automated Hardware-in-the-Loop Trigger
POST https://valbox-lab-04.local:8443/api/v1/test-run
Content-Type: application/json
Authorization: Bearer sk_live_sidkan_lab_key

{
  "dut_serial": "DUT-EV-BMS-9942",
  "test_profile": "automotive_transient_iso7637",
  "ports": ["J1", "J2", "J3", "J4"],
  "stream_telemetry": true,
  "webhook_url": "https://ci.internal.corp/hardware-test-done"
}

// Response: 200 OK -> Returns live WebSocket stream URL & test execution ID`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-24 relative bg-slate-950/70 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: API & Architecture highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-mono">
              <Code2 className="w-3.5 h-3.5" />
              <span>DEVELOPER-FIRST AUTOMATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Script with Python. Automate with LabVIEW. Trigger via CI/CD.
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Sidkan boxes are open platforms. Whether your team writes Python test scripts, builds 
              enterprise LabVIEW / TestStand architectures, or runs nightly hardware-in-the-loop (HIL) 
              GitHub Actions runners, we provide native SDKs with zero proprietary lock-in.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                  <CheckCircle className="w-3 h-3" />
                </div>
                <div className="text-sm">
                  <strong className="text-white">Python `sidkan` Package:</strong> High-performance NumPy streaming, 
                  multithreaded DAQ acquisition, and Pandas telemetry export.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                  <CheckCircle className="w-3 h-3" />
                </div>
                <div className="text-sm">
                  <strong className="text-white">NI-DAQmx & LabVIEW Native:</strong> Zero translation layers. 
                  Directly compatible with your existing LabVIEW VIs and NI TestStand sequences.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                  <CheckCircle className="w-3 h-3" />
                </div>
                <div className="text-sm">
                  <strong className="text-white">REST & WebSocket Telemetry:</strong> Stream high-frequency 
                  validation telemetry directly to Grafana, InfluxDB, or internal cloud databases.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Window with Tabs */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-[#070b14] border border-cyan-500/30 shadow-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center justify-between bg-[#0b101d] px-4 py-2.5 border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('python')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeTab === 'python'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Python SDK
                  </button>
                  <button
                    onClick={() => setActiveTab('labview')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeTab === 'labview'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    LabVIEW / TestStand
                  </button>
                  <button
                    onClick={() => setActiveTab('rest')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeTab === 'rest'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    REST & HIL CI/CD
                  </button>
                </div>

                <button
                  onClick={() =>
                    copyToClipboard(
                      activeTab === 'python'
                        ? pythonSnippet
                        : activeTab === 'labview'
                        ? labviewSnippet
                        : restSnippet
                    )
                  }
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code display */}
              <div className="p-5 overflow-x-auto bg-[#070b14] text-xs font-mono leading-relaxed text-slate-200">
                <pre>
                  <code>
                    {activeTab === 'python' && pythonSnippet}
                    {activeTab === 'labview' && labviewSnippet}
                    {activeTab === 'rest' && restSnippet}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
