import { useState, useEffect, useMemo, useRef } from 'react'
import SpeakButton from '../SpeakButton.jsx'

// Rueda de letras con HILO: deslizas el dedo (o el ratón) uniendo las
// letras para formar la palabra. Modo "palabra a palabra": se muestra
// una sola palabra objetivo (pista + casillas); al acertar pasa a la
// siguiente. Al completar todas, fin de ronda.

const SIZE = 300
const RADIUS = 108
const NODE_R = 26
const HIT_R = 36

function strip(s) {
  return String(s).trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Construye el conjunto de letras de la rueda para una palabra: usa las
// letras de la palabra y, si la ronda da letras extra, añade algunas
// como distractores hasta un mínimo, todo barajado.
function buildWheelLetters(targetWord, extraPool) {
  const base = strip(targetWord).split('')
  const pool = (extraPool || []).map((l) => strip(l)).filter(Boolean)
  // Añadir distractores que no rompan (hasta llegar a 7-8 nodos)
  const target = Math.min(8, Math.max(6, base.length + 2))
  let i = 0
  while (base.length < target && pool.length > 0) {
    base.push(pool[i % pool.length])
    i++
    if (i > 20) break
  }
  return shuffle(base)
}

export default function WordWheel({ wheel }) {
  const svgRef = useRef(null)
  const total = wheel.words.length

  const [pos, setPos] = useState(0)        // índice de la palabra actual
  const [solved, setSolved] = useState(0)  // cuántas resueltas
  const [trace, setTrace] = useState([])   // índices de nodos en orden
  const [cursor, setCursor] = useState(null)
  const [tracing, setTracing] = useState(false)
  const [flash, setFlash] = useState(null) // 'ok' | 'ko'
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(false)

  const currentWord = wheel.words[pos]

  // Letras de la rueda para la palabra actual (barajadas una vez por palabra)
  const wheelLetters = useMemo(
    () => buildWheelLetters(currentWord.word, wheel.letters),
    [currentWord, wheel.letters]
  )

  const nodes = useMemo(
    () =>
      wheelLetters.map((letter, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / wheelLetters.length
        return {
          letter,
          x: SIZE / 2 + Math.cos(angle) * RADIUS,
          y: SIZE / 2 + Math.sin(angle) * RADIUS,
        }
      }),
    [wheelLetters]
  )

  // Reset al cambiar de ronda
  useEffect(() => {
    setPos(0); setSolved(0); setTrace([]); setCursor(null)
    setTracing(false); setFlash(null); setRevealed(false); setDone(false)
  }, [wheel])

  const locked = flash === 'ok' || revealed || done

  function svgPoint(e) {
    const rect = svgRef.current.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) * SIZE) / rect.width,
      y: ((e.clientY - rect.top) * SIZE) / rect.height,
    }
  }

  function nodeAt(p) {
    let best = -1, bestDist = Infinity
    nodes.forEach((n, i) => {
      const d = Math.hypot(n.x - p.x, n.y - p.y)
      if (d < HIT_R && d < bestDist) { bestDist = d; best = i }
    })
    return best
  }

  function handleDown(e) {
    if (locked) return
    const p = svgPoint(e)
    const i = nodeAt(p)
    if (i < 0) return
    e.preventDefault()
    try { svgRef.current.setPointerCapture(e.pointerId) } catch { /* ignore */ }
    setTracing(true)
    setTrace([i])
    setCursor(p)
    setFlash(null)
  }

  function handleMove(e) {
    if (!tracing || locked) return
    e.preventDefault()
    const p = svgPoint(e)
    setCursor(p)
    const i = nodeAt(p)
    if (i < 0) return
    setTrace((t) => {
      if (t.length >= 2 && i === t[t.length - 2]) return t.slice(0, -1) // retroceder
      if (t.includes(i)) return t
      return [...t, i]
    })
  }

  function handleUp() {
    if (!tracing) return
    setTracing(false)
    setCursor(null)
    const word = trace.map((i) => nodes[i].letter).join('')
    setTrace([])
    if (word.length < 2) return

    if (strip(word) === strip(currentWord.word)) {
      setFlash('ok')
      const nextSolved = solved + 1
      setTimeout(() => {
        setSolved(nextSolved)
        setFlash(null)
        if (pos + 1 >= total) {
          setDone(true)
        } else {
          setPos((p) => p + 1)
        }
      }, 900)
    } else {
      setFlash('ko')
      setTimeout(() => setFlash(null), 700)
    }
  }

  function reset() {
    setPos(0); setSolved(0); setTrace([]); setCursor(null)
    setTracing(false); setFlash(null); setRevealed(false); setDone(false)
  }

  const liveWord = trace.map((i) => nodes[i].letter).join('')
  const threadPoints = trace.map((i) => `${nodes[i].x},${nodes[i].y}`).join(' ')

  // Casillas de la palabra actual (se rellenan al acertar o al rendirse)
  const targetLetters = currentWord.word.split('')
  const showSolution = flash === 'ok' || revealed

  if (done) {
    return (
      <div className="ww">
        <div className="feedback-banner feedback-banner--ok">
          ¡Ronda completa! Has encontrado las {total} palabras.
        </div>
        <button type="button" className="btn" onClick={reset}>Jugar de nuevo</button>
      </div>
    )
  }

  return (
    <div className="ww">
      <p className="cw__prompt">{wheel.prompt}</p>

      <div className="ww__score">{solved} / {total} encontradas</div>

      {/* Palabra objetivo actual: pista + casillas */}
      <div className="ww__target">
        <div className="ww__target-hint">Pista: <strong>{currentWord.hint}</strong></div>
        <div className="ww__target-slots">
          {targetLetters.map((l, i) => (
            <span key={i} className={'ww__target-box' + (showSolution ? ' ww__target-box--shown' : '')}>
              {showSolution ? l : ''}
            </span>
          ))}
          {showSolution && <SpeakButton text={currentWord.word} size="small" />}
        </div>
      </div>

      {/* Palabra que se está trazando / resultado */}
      <div className={'ww__current ww__current--' + (flash || (tracing ? 'tracing' : 'idle'))}>
        {liveWord || (flash === 'ko' ? 'Inténtalo otra vez' : <span className="ww__placeholder">Desliza para unir letras…</span>)}
      </div>

      {/* Rueda con hilo */}
      <svg
        ref={svgRef}
        className="ww__svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
        onPointerLeave={() => tracing && handleUp()}
        role="application"
        aria-label="Rueda de letras: desliza para unir letras y formar la palabra"
      >
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS + NODE_R + 6} className="ww__svg-bg" />

        {trace.length > 0 && (
          <polyline
            points={threadPoints + (cursor ? ` ${cursor.x},${cursor.y}` : '')}
            className={'ww__thread' + (flash === 'ko' ? ' ww__thread--ko' : '')}
          />
        )}

        {nodes.map((n, i) => {
          const active = trace.includes(i)
          return (
            <g key={i} className={'ww__node' + (active ? ' ww__node--active' : '')}>
              <circle cx={n.x} cy={n.y} r={NODE_R} />
              <text x={n.x} y={n.y + 7} textAnchor="middle">{n.letter}</text>
            </g>
          )
        })}
      </svg>

      {!revealed && flash !== 'ok' && (
        <button type="button" className="btn btn--ghost" onClick={() => setRevealed(true)}>
          Ver la respuesta
        </button>
      )}
      {revealed && (
        <button
          type="button"
          className="btn"
          onClick={() => {
            setRevealed(false)
            if (pos + 1 >= total) setDone(true)
            else { setPos((p) => p + 1); setSolved((s) => s) }
          }}
        >
          Siguiente palabra →
        </button>
      )}
    </div>
  )
}
