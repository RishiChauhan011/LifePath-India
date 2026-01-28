
import { useState, useEffect, useCallback } from 'react';

const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en-US'); // Default language
  const [recognition, setRecognition] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true; // Enable real-time feedback
      // Lang will be set dynamically in startListening

      recognitionInstance.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        // Prefer final, but show interim if that's all we have so far
        const currentText = finalTranscript || interimTranscript;
        setTranscript(currentText);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        
        // Ignore "no-speech" error if we are just restarting or user was silent
        if (event.error === 'no-speech') {
             // We can optionally stay listening or just reset
             // setError('no-speech'); 
        } else {
             setError(event.error);
        }
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
        setError('not-supported');
    }
  }, []);

  const startListening = useCallback((lang = 'en-US') => {
    if (recognition) {
        try {
            recognition.lang = lang;
            setLanguage(lang);
            setTranscript(''); // Clear previous transcript
            setError(null);
            recognition.start();
        } catch (error) {
            console.error("Error starting recognition:", error);
            setError('start-failed');
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
      setError(null);
  }, []);

  return {
    isListening,
    transcript,
    language,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognition: !!recognition,
    error
  };
};

export default useVoiceInput;
