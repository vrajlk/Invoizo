"use client"

import { useState, useEffect, useCallback } from "react"

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [language, setLanguage] = useState("en-US") // Default to English
  const [recognition, setRecognition] = useState(null)

  useEffect(() => {
    // Initialize speech recognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = language

      recognitionInstance.onresult = (event) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript((prevTranscript) => prevTranscript + finalTranscript + interimTranscript)
      }

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start()
        }
      }

      setRecognition(recognitionInstance)
    } else {
      console.error("Speech recognition not supported in this browser")
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [language])

  useEffect(() => {
    if (recognition) {
      recognition.lang = language
    }
  }, [language, recognition])

  const startListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.start()
        setIsListening(true)
        setTranscript("")
      } catch (error) {
        console.error("Error starting speech recognition:", error)
      }
    }
  }, [recognition])

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }, [recognition])

  const resetTranscript = useCallback(() => {
    setTranscript("")
  }, [])

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    language,
    setLanguage,
    isSupported: !!recognition,
  }
}
