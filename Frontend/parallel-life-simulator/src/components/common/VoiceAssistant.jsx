
import { useState, useEffect, useContext } from 'react';
import { Mic, Square, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const VoiceAssistant = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [selectedLang, setSelectedLang] = useState('en-IN'); // Default to Indian English
    
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const { isListening, transcript, startListening, resetTranscript, hasRecognition } = useVoiceInput();

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    // Effect to handle processing after listening stops
    useEffect(() => {
        if (!isListening && transcript && !isSpeaking && !isProcessing) {
            processSpeech(transcript);
        }
    }, [isListening, transcript]);

    const growthScriptEn = `Based on your current trajectory, I suggest exploring high-yield sip investments. Start small, perhaps 5% of your monthly income. Also, upskilling in AI tools could boost your primary income career significantly in the next 2 years.`;
    
    const growthScriptGu = `Tamari haal ni situation jota, hu tamane high-yield SIP ma nivesh karvani salah aapis. Tamari monthly income na 5% thi sharuat karo. Saathe j, AI tools ma aagal vadho, je tamara career mate faydakarak raheshe.`;

    const getPageContextScript = () => {
        const timeOfDay = new Date().getHours() < 12 ? 'Good morning' : 'Good evening';
        const userName = user?.name ? user.name.split(' ')[0] : 'User';
        
        switch(location.pathname) {
            case '/dashboard':
                return `${timeOfDay}, ${userName}. Welcome to your dashboard. Your current financial health looks stable. Based on your recent activity, I project a 12% growth in your assets by next year if you maintain your current savings rate. I suggest reviewing your investment portfolio to optimize for better returns.`;
            case '/profile-setup':
                return `I see you are setting up your profile, ${userName}. Detailed input here is crucial. Providing accurate education and career history allows me to build a more precise parallel life simulation for you. Don't forget to list all your skills.`;
            case '/scenarios':
                return `This is the Scenario Builder. Here you can explore different "What If" life paths. Try creating a scenario where you switch careers or move to a new city to see how it impacts your long-term wealth.`;
            case '/simulation':
                return `I am currently processing your life simulation. This involves analyzing thousands of data points to predict your possible futures. Please wait a moment while I crunch the numbers.`;
            case '/results':
                return `Your simulation results are ready. It looks like the parallel path you chose outperforms your current trajectory by 15%. However, it comes with slightly higher risk. I recommend analyzing the year-by-year breakdown below.`;
            case '/settings':
                return `Here you can configure your application preferences and account settings.`;
            default:
                return `${timeOfDay}, ${userName}. I am your AI assistant. I am here to help you navigate your parallel life simulation. Click on "New Simulation" to get started, or check your Dashboard for updates.`;
        }
    };

    const processSpeech = (text) => {
        setIsProcessing(true);
        const lowerText = text.toLowerCase();
        
        // Simulating "Thinking" delay
        setTimeout(() => {
            let reply = "";
            let lang = selectedLang;

            // NLP / Intent Recognition Logic
            if (selectedLang.startsWith('gu')) {
                // Gujarati Logic
                if (lowerText.includes('bhavishya') || lowerText.includes('vikaas') || lowerText.includes('growth')) {
                    reply = growthScriptGu;
                } else if (lowerText.includes('samjav') || lowerText.includes('explain')) {
                    // Context aware explanation fallback
                     reply = "Aa page tamara financial data vishe che. Tame growth mate puchi shako cho.";
                } else {
                    reply = `Maaf karjo, hu tamari vaat samji na sakyo. Tame 'bhavishya' vishe puchi shako cho.`;
                }
            } else {
                // English Logic
                if (lowerText.includes('growth') || lowerText.includes('future') || lowerText.includes('suggest')) {
                    reply = growthScriptEn;
                } else if (lowerText.includes('explain') || lowerText.includes('what is this') || lowerText.includes('help')) {
                    // Read page context
                    reply = getPageContextScript();
                } else if (lowerText.includes('dashboard')) {
                    // Navigation command
                    reply = "Navigating to Dashboard...";
                    // In a real app we'd trigger navigation here, but need to pass navigate prop or hook
                    window.location.href = '/dashboard'; // Simple fallback or use navigate hook if available
                } else {
                    reply = `I heard: "${text}". Try asking "Explain this" or "Suggestion for growth".`;
                }
            }

            speakResponse(reply, lang);
            setIsProcessing(false);
            resetTranscript(); // Clear transcript after processing
        }, 1500); 
    };

    const speakResponse = (text, lang) => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Attempt to select a good voice
        const voices = window.speechSynthesis.getVoices();
        let preferredVoice = null;

        if (lang.startsWith('gu')) {
            // Try to find a Gujarati voice, fallback to Hindi or first available (system usually handles fallback)
            preferredVoice = voices.find(v => v.lang.includes('gu')) || voices.find(v => v.lang.includes('hi'));
        } else {
            // Prefer Google US English or Indian English
            preferredVoice = voices.find(v => v.name.includes('Google US English')) || voices.find(v => v.lang === 'en-IN') || voices[0];
        }

        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.lang = lang; 
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => {
            setIsSpeaking(true);
            setResponseText(text);
        };
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const handleInteraction = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else if (isListening) {
             // If currently listening, stop isn't explicitly exposed but toggle logic implies waiting or cancelling. 
             // Ideally we just wait, but here we can just do nothing or show a "Stop" button.
             // For single button interaction, we prevent re-triggering.
        } else {
            // Start Listening
            startListening(selectedLang);
        }
    };

    const toggleLanguage = (e) => {
        e.stopPropagation();
        setSelectedLang(prev => prev === 'en-IN' ? 'gu-IN' : 'en-IN');
    };

    if (!hasRecognition) {
        return null; // Or render a fallback UI
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
                {(isSpeaking || isListening || isProcessing) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-xl mb-4 text-sm text-white max-w-sm relative overflow-hidden"
                    >
                        {/* Animated Background for Processing/Listening */}
                        {(isListening || isProcessing) && (
                             <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center gap-1">
                                {[1,2,3,4,5].map(i => (
                                    <motion.div 
                                        key={i}
                                        animate={{ height: [10, 40, 10] }}
                                        transition={{ repeat: Infinity, duration: isListening ? 0.5 : 1.5, delay: i * 0.1 }}
                                        className={`w-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-yellow-500'}`}
                                    />
                                ))}
                             </div>
                        )}

                       <div className="relative z-10 flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${isListening ? 'bg-red-500/20 text-red-500' : 'bg-primary-blue/20 text-primary-blue'}`}>
                                {isListening ? <Mic size={20} className="animate-pulse" /> : <Sparkles size={20} />}
                            </div>
                            <div>
                                <h4 className="font-bold mb-1 flex items-center gap-2">
                                  {isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'AI Insight'}
                                  {/* Lang Badge */}
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 border border-slate-600">
                                    {selectedLang === 'en-IN' ? 'EN' : 'GU'}
                                  </span>
                                </h4>
                                <p className="text-gray-300 leading-relaxed">
                                    {isListening ? (transcript || "Speak now...") : isProcessing ? "Thinking..." : responseText}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-2">
                 {/* Language Toggle Mini Button */}
                 <button 
                    onClick={toggleLanguage}
                    className="p-2 rounded-full bg-slate-800 border border-slate-600 text-xs font-bold text-slate-300 hover:bg-slate-700 transition"
                    title="Switch Language"
                 >
                    {selectedLang === 'en-IN' ? 'EN' : 'GU'}
                 </button>

                <button
                    onClick={handleInteraction}
                    className={`p-4 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center ${
                        isSpeaking || isListening || isProcessing
                        ? 'bg-white text-primary-blue animate-pulse ring-4 ring-primary-blue/30' 
                        : 'bg-gradient-to-r from-primary-blue to-primary-purple text-white shadow-primary-blue/20'
                    }`}
                >
                    {isSpeaking ? <Square size={24} fill="currentColor" /> : <Mic size={24} />}
                </button>
            </div>
        </div>
    );
};

export default VoiceAssistant;
