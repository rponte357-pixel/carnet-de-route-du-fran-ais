import { useState, useMemo } from 'react'
import SpeakButton from '../SpeakButton.jsx'

// Rueda de letras: toca letras para formar palabras francesas válidas.

function normalize(s) {
  return String(s).trim().toUpperCase()
}

function wheelPositions(n, r) {
  const out = []
  for (let i = 0; i < n; i++) {
    const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / n
    out.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r })
  }
  return out
}

export default function WordWheel({ wheel }) {
  const total = wheel.words.length
  const [current, setCurrent] = useState([])
  const [found, setFound] = useState([]) // índices encontrados
  const [flash, setFlash] = useState(null) // 'ok' | 'ko' | 'dup'
  const [revealed, setRevealed] = useState(false)

  const positions = useMemo(() => wheelPositions(wheel.letters.length, 96), [wheel])
  const wordIndex = useMemo(() => {
    const map = new Map()
    wheel.words.forEach((w, i) => map.set(normalize(w.word), i))
    return map
  }, [wheel])

  const done = found.length === total

  function tap(letter) {
    if (done || revealed) return
    setCurrent((c) => [...c, letter])
    setFlash(null)
  }

  function check() {
    if (current.length === 0) return
    const word = current.join('')
    const idx = wordIndex.get(normalize(word))
    if (idx === undefined) {
      setFlash('ko')
      setTimeout(() => { setCurrent([]); setFlash(null) }, 600)
      return
    }
    if (found.includes(idx)) {
      setFlash('dup')
      setTimeout(() => { setCurrent([]); setFlash(null) }, 600)
      return
    }
    setFlash('ok')
    setFound((f) => [...f, idx])
    setTimeout(() => { setCurrent([]); setFlash(null) }, 500)
  }

  function reset() {
    setCurrent([])
    setFound([])
    setFlash(null)
    setRevealed(false)
  }

  return (
    <div className="ww">
      <p className="cw__prompt">{wheel.prompt}</p>

      <div className="ww__score">
        {found.length} / {total} encontradas
      </div>

      <div className="ww__slots">
        {wheel.words.map((w, i) => {
          const isFound = found.includes(i)
          const show = isFound || revealed
          return (
            <div key={i} className={'ww__slot' + (isFound ? ' ww__slot--found' : '')}>
              <div className="ww__slot-word">
                {show ? w.word : '•'.repeat(w.word.length)}
                {show && <SpeakButton text={w.word} size="small" />}
              </div>
              <div className="ww__slot-hint">{w.hint}</div>
            </div>
          )
        })}
      </div>

      <div className={'ww__current ww__current--' + (flash || 'idle')}>
        {current.length === 0
          ? <span className="ww__placeholder">Toca las letras…</span>
          : current.join(' ')}
      </div>

      <div className="ww__wheel">
        {wheel.letters.map((letter, i) => (
          <button
            key={i}
            type="button"
            className="ww__letter"
            style={{
              left: `calc(50% + ${positions[i].x}px - 24px)`,
              top: `calc(50% + ${positions[i].y}px - 24px)`,
            }}
            onClick={() => tap(letter)}
            disabled={done || revealed}
          >
            {letter}
          </button>
        ))}
        <button
          type="button"
          className="ww__center"
          onClick={check}
          disabled={current.length === 0 || done || revealed}
          aria-label="Comprobar palabra"
        >
          ✓
        </button>
      </div>

      <div className="ww__controls">
        <button type="button" className="btn btn--ghost" onClick={() => setCurrent((c) => c.slice(0, -1))} disabled={current.length === 0 || done || revealed}>
          ⌫ Borrar
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => setCurrent([])} disabled={current.length === 0 || done || revealed}>
          Limpiar
        </button>
      </div>

      {done ? (
        <>
          <div className="feedback-banner feedback-banner--ok">¡Has encontrado todas las palabras!</div>
          <button type="button" className="btn" onClick={reset}>Jugar de nuevo</button>
        </>
      ) : !revealed ? (
        <button type="button" className="btn btn--ghost" onClick={() => setRevealed(true)}>
          Rendirse y ver soluciones
        </button>
      ) : (
        <button type="button" className="btn" onClick={reset}>Jugar de nuevo</button>
      )}
    </div>
  )
}
