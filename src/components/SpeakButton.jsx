import { useState, useEffect } from 'react'

// Botón de altavoz que pronuncia un texto en francés usando la
// síntesis de voz del navegador (Web Speech API). No necesita
// ninguna librería externa ni conexión a internet.

let cachedVoice = null

function getFrenchVoice() {
  if (cachedVoice) return cachedVoice
  const voices = window.speechSynthesis.getVoices()
  // Preferimos una voz francesa de Francia (fr-FR); si no, cualquier 'fr'.
  cachedVoice =
    voices.find((v) => v.lang === 'fr-FR') ||
    voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('fr')) ||
    null
  return cachedVoice
}

export default function SpeakButton({ text, label = 'Escuchar en francés', size = 'normal' }) {
  const [supported, setSupported] = useState(true)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false)
      return
    }
    // Algunas plataformas cargan las voces de forma asíncrona.
    const load = () => getFrenchVoice()
    load()
    window.speechSynthesis.onvoiceschanged = load
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  function speak(e) {
    // Evita que el clic en el altavoz gire la tarjeta u otras acciones del contenedor.
    if (e) e.stopPropagation()
    if (!supported || !text) return

    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'fr-FR'
    const voice = getFrenchVoice()
    if (voice) utter.voice = voice
    utter.rate = 0.95 // un pelín más lento ayuda a entender
    utter.onstart = () => setSpeaking(true)
    utter.onend = () => setSpeaking(false)
    utter.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utter)
  }

  if (!supported) return null

  return (
    <button
      type="button"
      className={'speak-btn' + (speaking ? ' speak-btn--active' : '') + (size === 'small' ? ' speak-btn--small' : '')}
      onClick={speak}
      aria-label={label}
      title={label}
    >
      🔊
    </button>
  )
}
