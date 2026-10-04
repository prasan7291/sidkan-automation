import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Minimize2, 
  ChevronRight, 
  Cpu, 
  HelpCircle,
  Sliders,
  Box,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ChatbotWidgetProps {
  currentPage: 'home' | 'configurator';
  onNavigateToConfigurator: () => void;
  onNavigateToHome: () => void;
  onOpenExplainModal: () => void;
  onOpenQuoteModal: (summary?: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  currentPage,
  onNavigateToConfigurator,
  onNavigateToHome,
  onOpenExplainModal,
  onOpenQuoteModal,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Suggested questions based on the active page
  const homeSuggestions = [
    'What does Sidkan Automation do?',
    'How do quick-connect ports prevent miswiring?',
    'What is the companion software?',
    'Can I configure a custom box?'
  ];

  const configuratorSuggestions = [
    'What is the difference between NI 9178 and NI 9189?',
    'When should I choose NI 9205 vs NI 9220?',
    'Can I combine CAN-FD with analog cards?',
    'How do I request a quote for my build?'
  ];

  const currentSuggestions = currentPage === 'configurator' ? configuratorSuggestions : homeSuggestions;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: currentPage === 'configurator'
        ? 'Hello! I am your Sidkan Systems Assistant. You are currently on the Box Configurator page. Ask me about NI cDAQ chassis (like 9178 or 9189), specific C-Series modules (like NI 9205 or 9862), or connector options!'
        : 'Hello! Welcome to Sidkan Automation. I can help answer questions about our productized NI cDAQ/cRIO validation boxes, quick-connect interfaces, or our companion test software. What would you like to know?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Context switch alert when user navigates
  useEffect(() => {
    if (messages.length > 0) {
      const pageName = currentPage === 'configurator' ? 'Box Configurator' : 'Overview';
      setMessages(prev => [
        ...prev,
        {
          id: `context-switch-${Date.now()}`,
          sender: 'assistant',
          text: `You just navigated to the ${pageName} page. I am ready to answer any questions specific to this section!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [currentPage]);

  // Intelligent context-aware response generator
  const generateResponse = (query: string): { text: string; action?: { label: string; onClick: () => void } } => {
    const q = query.toLowerCase();

    // 1. Configurator-specific inquiries
    if (q.includes('9178') && (q.includes('9189') || q.includes('difference') || q.includes('compare'))) {
      return {
        text: 'The NI cDAQ-9178 is an 8-slot USB 3.0 chassis designed for benchtop laboratory desks with dual external BNC trigger lines and 7 hardware timing engines. In contrast, the NI cDAQ-9189 uses Gigabit TSN Ethernet (Time-Sensitive Networking, IEEE 802.1AS) with dual RJ45 switch ports, allowing sub-microsecond synchronization across multiple daisy-chained boxes in distributed test cells.'
      };
    }

    if (q.includes('9178')) {
      return {
        text: 'The NI cDAQ-9178 is an 8-slot high-speed USB 3.0 chassis. It features 4 independent 32-bit counter/timers, 7 hardware timing engines for simultaneous mixed-signal tasks, and dual BNC trigger inputs for external clock synchronization. Sidkan packages it in a 340mm milled aluminum enclosure with quick-connect bulkheads.'
      };
    }

    if (q.includes('9189')) {
      return {
        text: 'The NI cDAQ-9189 is an 8-slot Gigabit TSN Ethernet chassis. It is ideal for networked validation cells, distributed environmental thermal chambers, and automotive test stands where Ethernet cables are run over long distances.'
      };
    }

    if (q.includes('9205') && (q.includes('9220') || q.includes('difference'))) {
      return {
        text: 'The NI 9205 is a high-density 32-channel single-ended (or 16-ch differential) voltage input card with programmable gain (±10V, ±5V, ±1V, ±200mV) using a multiplexed 250 kS/s ADC. The NI 9220 has 16 differential channels with a dedicated ADC per channel (100 kS/s simultaneous), meaning all 16 channels are captured at the exact same instant with zero phase delay—essential for inverter and transient timing.'
      };
    }

    if (q.includes('9205')) {
      return {
        text: 'The NI 9205 is a 32-channel analog voltage input module (16-bit, 250 kS/s aggregate). It supports programmable input ranges (±10V, ±5V, ±1V, ±200mV). On the Sidkan control box, we route it to an Amphenol 37-pin circular bayonet or DB37 bulkhead. It is the gold standard for battery pack cell monitoring and multi-rail DC bring-up.'
      };
    }

    if (q.includes('9220')) {
      return {
        text: 'The NI 9220 provides 16 simultaneous differential analog inputs (±10V, 16-bit) at 100 kS/s per channel. Because each channel has its own dedicated ADC, there is zero phase skew between channels, making it ideal for 3-phase motor inverters and AC power harmonics.'
      };
    }

    if (q.includes('9862') || q.includes('can') || q.includes('can-fd') || q.includes('vehicle bus')) {
      return {
        text: 'The NI 9862 is a 1-port High-Speed CAN / CAN-FD interface capable of up to 8 Mbps data bitrate with 500 Vrms isolation. It features an onboard NI-XNET hardware processor that offloads cyclic frame transmission and DBC signal conversion from your PC. On the Sidkan box, it terminates in an Amphenol DB9 connector with switchable 120Ω bus termination.'
      };
    }

    if (q.includes('9263') || q.includes('analog output') || q.includes('voltage output') || q.includes('stimulus')) {
      return {
        text: 'The NI 9263 provides 4 isolated analog voltage outputs (±10V, 16-bit DAC) at 100 kS/s simultaneous per channel. We route it to an array of 4 isolated BNC coaxial connectors on the front panel. It is widely used to simulate analog sensor voltages (e.g., throttle position, pressure sensors) into a DUT.'
      };
    }

    if (q.includes('9401') || q.includes('dio') || q.includes('pwm') || q.includes('digital')) {
      return {
        text: 'The NI 9401 is an ultra-fast 8-channel bidirectional digital I/O card with 100 ns update speed (up to 10 MHz, 5V TTL). It is perfect for capturing high-speed PWM motor control signals, optical encoder pulses, and generating microsecond trigger pulses.'
      };
    }

    if (q.includes('9213') || q.includes('9214') || q.includes('thermocouple') || q.includes('temperature')) {
      return {
        text: 'The NI 9213 provides 16 thermocouple channels (J, K, T, E, R, S, B, N types) with 24-bit resolution and built-in cold-junction compensation (CJC). For aerospace or medical certification requiring extreme precision (0.45°C accuracy), we also offer the isothermal NI 9214.'
      };
    }

    if (q.includes('quote') || q.includes('pricing') || q.includes('price') || q.includes('buy') || q.includes('cost')) {
      return {
        text: 'You can request an official quotation and 3D CAD drawing at any time! Click the button below to submit your requirements, and a Sidkan systems engineer will provide formal pricing and pinout drawings.',
        action: {
          label: 'Open Quote Request Form',
          onClick: () => onOpenQuoteModal('Assistance requested via AI Assistant')
        }
      };
    }

    if (q.includes('software') || q.includes('suite') || q.includes('app') || q.includes('white background')) {
      return {
        text: 'Sidkan TestSuite is our companion desktop software. Designed with a clean, high-contrast white analytics interface, it auto-detects your cDAQ/cRIO box, visualizes live waveforms on an oscilloscope, executes automated pass/fail verification routines, and exports PDF/CSV compliance certificates.'
      };
    }

    if (q.includes('quick-connect') || q.includes('connector') || q.includes('port') || q.includes('amphenol') || q.includes('wiring')) {
      return {
        text: 'Instead of having engineers strip individual wires into fragile screw terminals, Sidkan routes all C-Series module signals to rugged, keyed quick-connect bulkheads (such as Amphenol MIL-DTL circular bayonets and Phoenix Contact tool-less push-in terminals). The keyed mechanical indices make inverted mating physically impossible.'
      };
    }

    if (q.includes('survey') || q.includes('pain point')) {
      return {
        text: 'We have an interactive 4-step Pain Point Survey on the Overview page! It helps diagnose your biggest test bottlenecks—whether that is wiring time, damaged prototype boards, or lack of bench repeatability.'
      };
    }

    if (q.includes('configurator') || q.includes('configure') || q.includes('build')) {
      return {
        text: 'You can design your exact hardware validation unit on our Box Configurator page! You can select any NI chassis (like 9178 or 9189) and assign modules like NI 9205 to see the technical specs and a physical preview of the box.',
        action: currentPage !== 'configurator' ? {
          label: 'Go to Box Configurator',
          onClick: onNavigateToConfigurator
        } : undefined
      };
    }

    // Default intelligent fallbacks
    if (currentPage === 'configurator') {
      return {
        text: 'On this Configurator page, you can choose your NI chassis from the first dropdown (e.g. cDAQ-9178 or cDAQ-9189), and then select modules for each slot (such as NI 9205 Voltage AI, NI 9263 Analog Output, NI 9401 DIO, or NI 9862 CAN-FD). The description box will show you the exact capabilities and control box front-panel layout.'
      };
    }

    return {
      text: 'Sidkan Automation productizes National Instruments cDAQ and cRIO hardware into turnkey validation boxes with quick-connect ports and companion validation software. Would you like to try the Box Configurator or take the quick Pain Point Survey?',
      action: {
        label: 'Open Box Configurator',
        onClick: onNavigateToConfigurator
      }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: response.action
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Pill Trigger Button when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-black hover:bg-[#e5e5e7] shadow-2xl shadow-black/80 transition-all group font-medium text-xs tracking-tight"
          aria-label="Open Sidkan AI Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-slate-900">Ask Sidkan Assistant</span>
          <span className="text-[10px] text-neutral-500 font-normal hidden sm:inline">
            • {currentPage === 'configurator' ? 'Configurator Mode' : 'Overview'}
          </span>
        </button>
      )}

      {/* Floating Chatbot Window (Apple / Tesla Minimalist Style) */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[420px] h-[560px] max-h-[85vh] rounded-3xl bg-[#121214] border border-white/15 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 bg-neutral-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-white tracking-tight">
                  Sidkan Systems Assistant
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-[#86868b]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Active Context: <strong className="text-white font-normal">{currentPage === 'configurator' ? 'Box Configurator' : 'Overview'}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-[#86868b] hover:text-white hover:bg-white/10 transition-colors"
                title="Minimize Chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-[#86868b] hover:text-white hover:bg-white/10 transition-colors"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-white text-black font-normal rounded-tr-sm'
                      : 'bg-neutral-900 border border-white/10 text-[#d1d5db] rounded-tl-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Optional Action Button */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-white/10">
                      <button
                        onClick={msg.action.onClick}
                        className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
                      >
                        <span>{msg.action.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-neutral-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-neutral-900 border border-white/10 text-neutral-400 w-20">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Suggestion Pills */}
          <div className="px-4 py-2 bg-neutral-950/60 border-t border-white/5 overflow-x-auto">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              {currentSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-[#a1a1a6] hover:text-white transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-neutral-950 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={currentPage === 'configurator' ? 'Ask about chassis, modules, or pinouts...' : 'Ask about Sidkan boxes, software, or specs...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full bg-neutral-900 border border-white/10 focus:border-white focus:outline-none text-xs text-white placeholder-neutral-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-8 h-8 rounded-full bg-white text-black disabled:opacity-40 flex items-center justify-center hover:bg-neutral-200 transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
