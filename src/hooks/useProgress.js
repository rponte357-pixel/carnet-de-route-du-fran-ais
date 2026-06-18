import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'carnetB1.progress.v1'

const DEFAULT_PROGRESS = {
  auxiliares: { correct: 0, incorrect: 0 },
  tiempos: { correct: 0, incorrect: 0 },
  conectores: { correct: 0, incorrect: 0 },
  vocab: {
    familia: { correct: 0, incorrect: 0 },
    trabajo: { correct: 0, incorrect: 0 },
    nacionalidad: { correct: 0, incorrect: 0 },
    comida: { correct: 0, incorrect: 0 },
    viajes: { correct: 0, incorrect: 0 },
  },
}

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROGRESS
    const parsed = JSON.parse(raw)
    // Merge con los valores por defecto para tolerar futuras categorías nuevas.
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      vocab: { ...DEFAULT_PROGRESS.vocab, ...(parsed.vocab || {}) },
    }
  } catch {
    return DEFAULT_PROGRESS
  }
}

/**
 * Hook global de progreso. Persiste en localStorage para que el usuario
 * pueda cerrar el navegador y conservar sus estadísticas de estudio.
 */
export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const registerResult = useCallback((path, isCorrect) => {
    setProgress((prev) => {
      const next = structuredClone(prev)
      // path puede ser ['auxiliares'] o ['vocab', 'familia']
      let node = next
      for (let i = 0; i < path.length - 1; i++) {
        node = node[path[i]]
      }
      const leafKey = path[path.length - 1]
      const leaf = node[leafKey]
      if (isCorrect) leaf.correct += 1
      else leaf.incorrect += 1
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS)
  }, [])

  return { progress, registerResult, resetProgress }
}
