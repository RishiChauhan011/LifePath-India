
import { useState, useEffect, useContext } from 'react';
import { Mic, Square, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import useVoiceInput from '../../hooks/useVoiceInput';

const VoiceAssistant = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [selectedLang, setSelectedLang] = useState('en-IN'); // Default to Indian English
    
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const { isListening, transcript, startListening, resetTranscript, hasRecognition, error } = useVoiceInput();
    const [availableVoices, setAvailableVoices] = useState([]);

    // Cleanup on unmount
    useEffect(() => {
        const loadVoices = () => {
             const voices = window.speechSynthesis.getVoices();
             if (voices.length > 0) {
                 setAvailableVoices(voices);
             }
        };

        loadVoices();
        
        // Chrome loads voices asynchronously
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.cancel();
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    // Effect to handle processing ONLY after listening stops
    useEffect(() => {
        if (!isListening && transcript && !isSpeaking && !isProcessing) {
             // Basic debounce to ensure we have the final transcript
             const timer = setTimeout(() => {
                 console.log("[VoiceDebug] Triggering processing for:", transcript);
                 processSpeech(transcript);
             }, 200);
             return () => clearTimeout(timer);
        }
    }, [isListening]); // Only trigger when isListening toggles off

    // ... (keep usage processing effect)

    // ... (keep scripts)

    // ... (keep processSpeech)

    const speakResponse = (text, lang) => {
        console.log(`[VoiceDebug] speaking response: ${text}`);
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        setIsSpeaking(false);

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Robust Voice Selection
        let voices = availableVoices;
        if (voices.length === 0) {
            voices = window.speechSynthesis.getVoices(); // Try getting again just in case
        }

        let preferredVoice = null;

        if (lang.startsWith('gu')) {
             // Gujarati Fallback Chain: Gujarati -> Hindi -> Indian English -> Default
            preferredVoice = voices.find(v => v.lang.includes('gu')) || 
                             voices.find(v => v.lang.includes('hi')) ||
                             voices.find(v => v.lang === 'en-IN');
        } else if (lang.startsWith('hi')) {
            // Hindi Fallback Chain: Hindi -> Indian English -> Default
            preferredVoice = voices.find(v => v.lang.includes('hi')) || 
                             voices.find(v => v.lang === 'en-IN');
        } else {
            // English Fallback Chain: Google US -> Indian English -> US English -> Default
            preferredVoice = voices.find(v => v.name.includes('Google US English')) || 
                             voices.find(v => v.lang === 'en-IN') || 
                             voices.find(v => v.lang.includes('en-US'));
        }

        // Final fallback to ANY voice if specific one fails
        if (!preferredVoice && voices.length > 0) {
             preferredVoice = voices[0];
             console.warn("[VoiceDebug] No specific language voice found, using default:", preferredVoice.name);
        }

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            console.log(`[VoiceDebug] Selected Voice: ${preferredVoice.name} (${preferredVoice.lang})`);
        } else {
             console.warn("[VoiceDebug] No voices available at all. Utilizing system default.");
        }

        utterance.lang = lang; 
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => {
            console.log("[VoiceDebug] TTS Started");
            setIsSpeaking(true);
            setResponseText(text);
        };
        utterance.onend = () => {
             console.log("[VoiceDebug] TTS Ended");
             setIsSpeaking(false);
        };
        utterance.onerror = (e) => {
            console.error("[VoiceDebug] TTS Error", e);
            setIsSpeaking(false);
        };

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
        setSelectedLang(prev => {
            if (prev === 'en-IN') return 'hi-IN';
            if (prev === 'hi-IN') return 'gu-IN';
            return 'en-IN';
        });
    };

    if (!hasRecognition) {
         return (
            <div className="fixed bottom-6 right-6 z-50">
                <div className="bg-red-500/90 text-white text-xs p-2 rounded-lg mb-2 shadow-lg max-w-[150px]">
                    Voice Not Supported in this Browser
                </div>
                 <button className="p-4 rounded-full bg-gray-600 text-white cursor-not-allowed opacity-50">
                    <Mic size={24} />
                </button>
            </div>
         );
    }

    const getLangLabel = (lang) => {
        if (lang === 'en-IN') return 'EN';
        if (lang === 'hi-IN') return 'HI';
        if (lang === 'gu-IN') return 'GU';
        return 'EN';
    };

    return (
        <div className="fixed top-24 right-6 z-50 flex flex-col items-end gap-2">
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
                                    {getLangLabel(selectedLang)}
                                  </span>
                                </h4>
                                <p className="text-gray-300 leading-relaxed">
                                    {isListening ? (transcript || "Speak now...") : isProcessing ? "Thinking..." : responseText}
                                </p>
                                {/* Retry / Replay Button if there is text but no speech */}
                                {!isSpeaking && responseText && !isListening && !isProcessing && (
                                     <button 
                                        onClick={() => speakResponse(responseText, selectedLang)}
                                        className="mt-2 text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded flex items-center gap-1 transition"
                                     >
                                        <Sparkles size={12} /> Replay
                                     </button>
                                )}
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
                    {getLangLabel(selectedLang)}
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
