
import { useState, useEffect, useCallback } from 'react';

const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en-US'); // Default language
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      // Lang will be set dynamically in startListening

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = useCallback((lang = 'en-US') => {
    if (recognition) {
        try {
            recognition.lang = lang;
            setLanguage(lang);
            setTranscript(''); // Clear previous transcript
            recognition.start();
        } catch (error) {
            console.error("Error starting recognition:", error);
        }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
      setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    language,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognition: !!recognition
  };
};

export default useVoiceInput;
