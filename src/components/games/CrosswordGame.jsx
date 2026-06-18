import { useState, useMemo, useRef } from 'react'

// Crucigrama: la cuadrícula se calcula desde las definiciones de palabras.
// Escribes la palabra francesa (sin tildes) en las casillas.

function key(r, c) {
  return `${r},${c}`
}

function buildModel(words) {
  const cells = {}
  const wordModels = words.map((w, wi) => {
    const ks = []
    const upper = w.word.toUpperCase()
    for (let i = 0; i < upper.length; i++) {
      const r = w.dir === 'across' ? w.row : w.row + i
      const c = w.dir === 'across' ? w.col + i : w.col
      const k = key(r, c)
      if (!cells[k]) cells[k] = { letter: upper[i], r, c, dirs: {} }
      cells[k].dirs[w.dir] = true
      ks.push(k)
    }
    return { ...w, idx: wi, cells: ks }
  })

  let rows = 0, cols = 0
  Object.values(cells).forEach((c) => {
    rows = Math.max(rows, c.r + 1)
    cols = Math.max(cols, c.c + 1)
  })

  const order = Object.values(cells)
    .sort((a, b) => a.r - b.r || a.c - b.c)
    .map((c) => key(c.r, c.c))

  const startKeys = new Set(wordModels.map((w) => w.cells[0]))
  const numbers = {}
  let n = 0
  for (const k of order) {
    if (startKeys.has(k)) { n++; numbers[k] = n }
  }
  wordModels.forEach((w) => { w.number = numbers[w.cells[0]] })

  return { cells, words: wordModels, rows, cols, order, numbers }
}

export default function CrosswordGame({ puzzle }) {
  const model = useMemo(() => buildModel(puzzle.words), [puzzle])
  const [values, setValues] = useState({})
  const [checked, setChecked] = useState(false)
  const [activeDir, setActiveDir] = useState('across')
  const inputRefs = useRef({})

  const filledAll = model.order.every((k) => (values[k] || '').length === 1)

  function handleChange(r, c, raw) {
    if (checked) return
    const ch = raw.replace(/[^a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ]/g, '').slice(-1).toUpperCase()
    const k = key(r, c)
    setValues((v) => ({ ...v, [k]: ch }))
    if (ch) focusStep(r, c, +1)
  }

  function handleKeyDown(e, r, c) {
    if (checked) return
    if (e.key === 'Backspace' && !(values[key(r, c)] || '')) {
      e.preventDefault()
      focusStep(r, c, -1, true)
    }
  }

  function focusStep(r, c, step, clear = false) {
    const [dr, dc] = activeDir === 'across' ? [0, step] : [step, 0]
    const k = key(r + dr, c + dc)
    if (model.cells[k]) {
      if (clear) setValues((v) => ({ ...v, [k]: '' }))
      inputRefs.current[k]?.focus()
    }
  }

  function handleFocus(r, c) {
    const cell = model.cells[key(r, c)]
    if (cell.dirs.across && cell.dirs.down) {
      setActiveDir((d) => (d === 'across' ? 'down' : 'across'))
    } else {
      setActiveDir(cell.dirs.across ? 'across' : 'down')
    }
  }

  function strip(s) {
    return s.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  const across = model.words.filter((w) => w.dir === 'across').sort((a, b) => a.number - b.number)
  const down = model.words.filter((w) => w.dir === 'down').sort((a, b) => a.number - b.number)

  const allCorrect = checked && model.order.every(
    (k) => strip(values[k] || '') === strip(model.cells[k].letter)
  )

  function reset() {
    setValues({})
    setChecked(false)
  }

  return (
    <div className="cw">
      <p className="cw__prompt">{puzzle.prompt}</p>

      <div
        className="cw__grid"
        style={{ gridTemplateColumns: `repeat(${model.cols}, 40px)` }}
      >
        {Array.from({ length: model.rows }).map((_, r) =>
          Array.from({ length: model.cols }).map((_, c) => {
            const k = key(r, c)
            const cell = model.cells[k]
            if (!cell) return <div key={k} className="cw__void" />
            const val = values[k] || ''
            const wrong = checked && strip(val) !== strip(cell.letter)
            return (
              <div
                key={k}
                className={'cw__cell' + (checked && !wrong ? ' cw__cell--ok' : '') + (wrong ? ' cw__cell--wrong' : '')}
              >
                {model.numbers[k] && <span className="cw__num">{model.numbers[k]}</span>}
                <input
                  ref={(el) => { inputRefs.current[k] = el }}
                  type="text"
                  maxLength={1}
                  value={checked ? cell.letter : val}
                  onChange={(e) => handleChange(r, c, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, r, c)}
                  onFocus={() => handleFocus(r, c)}
                  disabled={checked}
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck="false"
                  aria-label={`Fila ${r + 1}, columna ${c + 1}`}
                />
              </div>
            )
          })
        )}
      </div>

      <div className="cw__clues">
        <div className="cw__clues-col">
          <div className="cw__clues-title">→ Horizontal</div>
          {across.map((w) => (
            <div key={w.number + w.dir} className="cw__clue">
              <strong>{w.number}.</strong> {w.clue} <span className="cw__clue-len">({w.word.length})</span>
            </div>
          ))}
        </div>
        <div className="cw__clues-col">
          <div className="cw__clues-title">↓ Vertical</div>
          {down.map((w) => (
            <div key={w.number + w.dir} className="cw__clue">
              <strong>{w.number}.</strong> {w.clue} <span className="cw__clue-len">({w.word.length})</span>
            </div>
          ))}
        </div>
      </div>

      {!checked ? (
        <button type="button" className="btn" onClick={() => setChecked(true)} disabled={!filledAll}>
          Comprobar
        </button>
      ) : (
        <>
          <div className={'feedback-banner ' + (allCorrect ? 'feedback-banner--ok' : 'feedback-banner--ko')}>
            {allCorrect ? '¡Perfecto! Todas las palabras son correctas.' : 'Algunas casillas estaban mal; se muestra la solución.'}
          </div>
          <button type="button" className="btn" onClick={reset}>Jugar de nuevo</button>
        </>
      )}
    </div>
  )
}
