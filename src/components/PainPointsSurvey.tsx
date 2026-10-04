import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle,
  Send
} from 'lucide-react';

interface SurveyData {
  primaryPainPoint: string;
  signalsFocus: string;
  currentWorkflow: string;
  desiredSolution: string;
  email?: string;
  name?: string;
}

interface PainPointsSurveyProps {
  onOpenExplainModal: () => void;
}

export const PainPointsSurvey: React.FC<PainPointsSurveyProps> = ({ onOpenExplainModal }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [answers, setAnswers] = useState<SurveyData>({
    primaryPainPoint: '',
    signalsFocus: '',
    currentWorkflow: '',
    desiredSolution: '',
    email: '',
    name: '',
  });

  const totalSteps = 4;

  const painPointOptions = [
    {
      id: 'wiring',
      label: 'Messy Wiring & Loose Leads',
      desc: 'Engineers spend weeks stripping wires, crimping header pins, and troubleshooting loose screw terminals.'
    },
    {
      id: 'damage',
      label: 'Accidental Prototype Damage',
      desc: 'A misplaced voltage lead or slipping clip previously damaged or destroyed an expensive prototype board.'
    },
    {
      id: 'repeatability',
      label: 'Lack of Repeatability Between Benches',
      desc: 'Tests that pass on one engineer’s desk fail on another because the ad-hoc test setups and wiring aren’t standardized.'
    },
    {
      id: 'software',
      label: 'Custom Software Setup Delays',
      desc: 'Spending too much time writing one-off Python scripts or configuring DAQ drivers rather than validating the product.'
    }
  ];

  const signalsOptions = [
    {
      id: 'analog',
      label: 'Analog & High-Density Sensors',
      desc: 'Voltages, currents, strain gauges, load cells, or battery cell voltages.'
    },
    {
      id: 'bus',
      label: 'Vehicle & Industrial Buses',
      desc: 'CAN, CAN-FD, LIN, or RS485 communication lines.'
    },
    {
      id: 'digital',
      label: 'Digital I/O & PWM Timing',
      desc: 'High-speed triggers, pulse-width modulation, relays, or discrete logic.'
    },
    {
      id: 'thermal',
      label: 'Thermal & Environmental Chamber Testing',
      desc: 'Multi-channel thermocouple or RTD thermal profiling across soak cycles.'
    },
    {
      id: 'mixed',
      label: 'Mixed-Signal (All of the Above)',
      desc: 'A combination of analog, vehicle buses, and digital switching in one test setup.'
    }
  ];

  const workflowOptions = [
    {
      id: 'adhoc-python',
      label: 'Individual Python or MATLAB scripts per engineer',
      desc: 'Scripts are maintained locally and break when bench setups change.'
    },
    {
      id: 'labview',
      label: 'National Instruments LabVIEW or TestStand',
      desc: 'We use NI software, but physical bench wiring remains fragile and ad-hoc.'
    },
    {
      id: 'manual',
      label: 'Manual benchtop instruments (DMMs, scopes, power supplies)',
      desc: 'Engineers manually probe test points and record results by hand.'
    },
    {
      id: 'new',
      label: 'Setting up a new validation process from scratch',
      desc: 'We are standing up a new hardware validation bench or bring-up line.'
    }
  ];

  const solutionOptions = [
    {
      id: 'turnkey-box',
      label: 'A Turnkey Box with Keyed Quick-Connect Ports',
      desc: 'Drop on the desk, plug the device under test in seconds with zero custom wire stripping.'
    },
    {
      id: 'companion-software',
      label: 'Ready-to-Use Software with Automated Reports',
      desc: 'Real-time oscilloscope, test sequences, and 1-click pass/fail compliance certificates.'
    },
    {
      id: 'harness',
      label: 'Custom Mating Cable Harnesses for our Specific DUT',
      desc: 'Labeled, strain-relieved cabling fabricated directly to our device’s pinouts.'
    },
    {
      id: 'complete-package',
      label: 'Complete Hardware + Software Ecosystem',
      desc: 'Standardized validation box, companion software, and mating harness together.'
    }
  ];

  const handleSelectOption = (key: keyof SurveyData, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(5);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({
      primaryPainPoint: '',
      signalsFocus: '',
      currentWorkflow: '',
      desiredSolution: '',
      email: '',
      name: '',
    });
    setCurrentStep(1);
    setSubmitted(false);
  };

  const handleSubmitFinal = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="survey" className="w-full max-w-3xl mx-auto scroll-mt-24">
      <div className="apple-card rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 mb-8 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#0071e3] font-semibold">
                Pain Point Survey
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-[#86868b]">
                {currentStep <= 4 ? `Question ${currentStep} of ${totalSteps}` : 'Assessment Results'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mt-1 tracking-tight">
              Hardware Validation Needs Assessment
            </h3>
          </div>

          <button
            onClick={onOpenExplainModal}
            className="text-xs text-[#86868b] hover:text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Unsure what we do?</span>
          </button>
        </div>

        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">
              What is the biggest challenge your team faces during hardware validation?
            </h4>

            <div className="space-y-3 pt-2">
              {painPointOptions.map((opt) => {
                const isSelected = answers.primaryPainPoint === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption('primaryPainPoint', opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-neutral-900 border-white ring-1 ring-white/20 text-white'
                        : 'bg-neutral-950/40 border-white/10 text-[#a1a1a6] hover:border-white/20 hover:bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-medium text-sm text-white">{opt.label}</div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-white bg-white' : 'border-neutral-600'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                      </div>
                    </div>
                    <p className="text-xs text-[#86868b] mt-1 leading-relaxed">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">
              What signals or hardware interfaces do you validate most frequently?
            </h4>

            <div className="space-y-3 pt-2">
              {signalsOptions.map((opt) => {
                const isSelected = answers.signalsFocus === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption('signalsFocus', opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-neutral-900 border-white ring-1 ring-white/20 text-white'
                        : 'bg-neutral-950/40 border-white/10 text-[#a1a1a6] hover:border-white/20 hover:bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-medium text-sm text-white">{opt.label}</div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-white bg-white' : 'border-neutral-600'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                      </div>
                    </div>
                    <p className="text-xs text-[#86868b] mt-1 leading-relaxed">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">
              How does your team currently run hardware validation tests?
            </h4>

            <div className="space-y-3 pt-2">
              {workflowOptions.map((opt) => {
                const isSelected = answers.currentWorkflow === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption('currentWorkflow', opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-neutral-900 border-white ring-1 ring-white/20 text-white'
                        : 'bg-neutral-950/40 border-white/10 text-[#a1a1a6] hover:border-white/20 hover:bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-medium text-sm text-white">{opt.label}</div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-white bg-white' : 'border-neutral-600'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                      </div>
                    </div>
                    <p className="text-xs text-[#86868b] mt-1 leading-relaxed">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">
              What would save your engineers the most time right now?
            </h4>

            <div className="space-y-3 pt-2">
              {solutionOptions.map((opt) => {
                const isSelected = answers.desiredSolution === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption('desiredSolution', opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-neutral-900 border-white ring-1 ring-white/20 text-white'
                        : 'bg-neutral-950/40 border-white/10 text-[#a1a1a6] hover:border-white/20 hover:bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-medium text-sm text-white">{opt.label}</div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-white bg-white' : 'border-neutral-600'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                      </div>
                    </div>
                    <p className="text-xs text-[#86868b] mt-1 leading-relaxed">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5 (Summary) */}
        {currentStep === 5 && (
          <div className="space-y-6">
            {!submitted ? (
              <>
                <div className="p-5 rounded-2xl bg-neutral-950 border border-white/10 space-y-4">
                  <div className="text-xs uppercase tracking-wider text-[#0071e3] font-semibold">
                    Assessment Summary
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-neutral-900 border border-white/5">
                      <span className="text-[#86868b] block text-[11px]">Primary Bottleneck:</span>
                      <span className="font-medium text-white mt-0.5 block">
                        {painPointOptions.find(o => o.id === answers.primaryPainPoint)?.label || 'Hardware Setup Overheads'}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-900 border border-white/5">
                      <span className="text-[#86868b] block text-[11px]">Signal Focus:</span>
                      <span className="font-medium text-white mt-0.5 block">
                        {signalsOptions.find(o => o.id === answers.signalsFocus)?.label || 'Mixed-Signal Validation'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#d1d5db] leading-relaxed pt-1">
                    <strong className="text-white">Suggested Recommendation:</strong> A productized 
                    turnkey validation box utilizing genuine NI hardware with custom keyed quick-connect 
                    bulkheads and our accompanying test software.
                  </p>
                </div>

                <form onSubmit={handleSubmitFinal} className="space-y-3 pt-2">
                  <div className="text-xs font-medium text-[#86868b]">
                    Would you like our engineering team to send you a tailored configuration proposal? (Optional)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={answers.name || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, name: e.target.value }))}
                      className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 focus:border-white focus:outline-none text-xs text-white"
                    />
                    <input
                      type="email"
                      placeholder="Work Email"
                      value={answers.email || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, email: e.target.value }))}
                      className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 focus:border-white focus:outline-none text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full font-medium text-xs text-black bg-white hover:bg-[#e5e5e7] transition-all flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Me My Custom Assessment</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-white">Thank you for sharing your feedback.</h4>
                <p className="text-xs text-[#86868b] max-w-md mx-auto leading-relaxed">
                  Our systems engineering team at Sidkan Automation will review your test requirements 
                  and reach out with suggested hardware configurations and pinout drawings.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 rounded-full bg-neutral-900 border border-white/10 text-white text-xs font-medium"
                  >
                    Take Survey Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation */}
        {currentStep <= 4 && (
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`text-xs font-medium flex items-center gap-1.5 transition-colors ${
                currentStep === 1
                  ? 'text-neutral-600 cursor-not-allowed'
                  : 'text-[#86868b] hover:text-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !answers.primaryPainPoint) ||
                (currentStep === 2 && !answers.signalsFocus) ||
                (currentStep === 3 && !answers.currentWorkflow) ||
                (currentStep === 4 && !answers.desiredSolution)
              }
              className={`px-6 py-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                (currentStep === 1 && !answers.primaryPainPoint) ||
                (currentStep === 2 && !answers.signalsFocus) ||
                (currentStep === 3 && !answers.currentWorkflow) ||
                (currentStep === 4 && !answers.desiredSolution)
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-white hover:bg-[#e5e5e7] text-black shadow-md'
              }`}
            >
              <span>{currentStep === 4 ? 'See Recommendation' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
