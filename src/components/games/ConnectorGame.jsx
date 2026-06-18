import { useState, useEffect, useRef, useMemo } from 'react'
import { connectorLevels } from '../../data/connectorGame.js'
import SpeakButton from '../SpeakButton.jsx'

// "La Machine à Phrases": coloca el conector correcto en cada hueco del
// párrafo. Arrastrar (escritorio) o tocar (móvil). Puntos + combo +
// temporizador suave. Niveles que se desbloquean. Al completar, se puede
// escuchar el párrafo entero en francés.

const TIME_PER_LEVEL = 45 // segundos (suave: no penaliza, solo bonus)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ConnectorGame() {
  const [unlocked, setUnlocked] = useState(1) // niveles desbloqueados
  const [levelIdx, setLevelIdx] = useState(null) // null = pantalla de niveles
  const [score, setScore] = useState(0)

  if (levelIdx === null) {
    return (
      <LevelSelect
        unlocked={unlocked}
        totalScore={score}
        onPick={(i) => setLevelIdx(i)}
      />
    )
  }

  return (
    <LevelPlay
      key={connectorLevels[levelIdx].id}
      level={connectorLevels[levelIdx]}
      levelNumber={levelIdx + 1}
      totalLevels={connectorLevels.length}
      onExit={() => setLevelIdx(null)}
      onComplete={(pts) => {
        setScore((s) => s + pts)
        setUnlocked((u) => Math.max(u, Math.min(connectorLevels.length, levelIdx + 2)))
      }}
      onNext={() => {
        if (levelIdx + 1 < connectorLevels.length) setLevelIdx(levelIdx + 1)
        else setLevelIdx(null)
      }}
      hasNext={levelIdx + 1 < connectorLevels.length}
    />
  )
}

// ---------- Pantalla de selección de niveles ----------
function LevelSelect({ unlocked, totalScore, onPick }) {
  return (
    <div className="cg">
      <p className="page-eyebrow">La Machine à Phrases</p>
      <h3 className="cg__h3">Construye argumentos con los conectores correctos</h3>
      <p className="page-intro">
        Coloca cada conector en su hueco para completar el párrafo. Aciertos
        seguidos suben tu combo; sé rápido para ganar bonus de tiempo. Al
        terminar, escucha el párrafo entero en francés.
      </p>

      {totalScore > 0 && (
        <div className="cg__total">Puntos totales: <b>{totalScore}</b></div>
      )}

      <div className="cg__levels">
        {connectorLevels.map((lvl, i) => {
          const locked = i + 1 > unlocked
          return (
            <button
              key={lvl.id}
              type="button"
              className={'cg__level-card' + (locked ? ' cg__level-card--locked' : '')}
              onClick={() => !locked && onPick(i)}
              disabled={locked}
            >
              <span className="cg__level-num">{locked ? '🔒' : i + 1}</span>
              <span className="cg__level-info">
                <span className="cg__level-title">{lvl.title}</span>
                <span className="cg__level-theme">{lvl.theme}</span>
              </span>
              {!locked && lvl.level && <span className={'cg__level-badge cg__level-badge--' + lvl.level.toLowerCase()}>{lvl.level}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ---------- Juego de un nivel ----------
function LevelPlay({ level, levelNumber, totalLevels, onExit, onComplete, onNext, hasNext }) {
  // estado de cada hueco: índice de blank -> conector colocado (o null)
  const [filled, setFilled] = useState(() => level.blanks.map(() => null))
  const [wrongFlash, setWrongFlash] = useState(null) // índice de hueco que parpadea en rojo
  const [combo, setCombo] = useState(0)
  const [points, setPoints] = useState(0)
  const [time, setTime] = useState(TIME_PER_LEVEL)
  const [finished, setFinished] = useState(false)
  const [dragItem, setDragItem] = useState(null) // conector que se arrastra
  const completedRef = useRef(false)

  // Banco de fichas: todas las opciones de todos los huecos, mezcladas,
  // sin duplicados de texto.
  const bank = useMemo(() => {
    const all = []
    for (const b of level.blanks) for (const o of b.options) all.push(o)
    return shuffle([...new Set(all)])
  }, [level])

  const allCorrect = filled.every((f, i) => f === level.blanks[i].answer)

  // Temporizador (suave): cuenta atrás solo mientras no esté terminado.
  useEffect(() => {
    if (finished) return
    if (time <= 0) return
    const t = setTimeout(() => setTime((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [time, finished])

  // ¿completado?
  useEffect(() => {
    if (allCorrect && !completedRef.current) {
      completedRef.current = true
      setFinished(true)
      const timeBonus = Math.max(0, time) * 2
      const total = points + timeBonus
      setPoints(total)
      onComplete(total)
    }
  }, [allCorrect]) // eslint-disable-line

  function placeInFirstEmptyOrSelected(conn, blankIdx) {
    if (finished) return
    const correct = level.blanks[blankIdx].answer
    if (conn === correct) {
      setFilled((f) => {
        const next = [...f]
        next[blankIdx] = conn
        return next
      })
      const newCombo = combo + 1
      setCombo(newCombo)
      setPoints((p) => p + 10 * newCombo) // combo multiplica
    } else {
      // fallo: parpadeo rojo, se rompe el combo
      setWrongFlash(blankIdx)
      setCombo(0)
      setPoints((p) => Math.max(0, p - 2))
      setTimeout(() => setWrongFlash(null), 500)
    }
  }

  // --- Interacción por TOQUE: seleccionar ficha, luego tocar hueco ---
  const [selectedConn, setSelectedConn] = useState(null)

  function onBankClick(conn) {
    if (finished) return
    setSelectedConn((c) => (c === conn ? null : conn))
  }

  function onBlankClick(blankIdx) {
    if (finished || filled[blankIdx]) return
    if (selectedConn) {
      placeInFirstEmptyOrSelected(selectedConn, blankIdx)
      setSelectedConn(null)
    }
  }

  // --- Interacción por ARRASTRE (escritorio) ---
  function onDragStart(e, conn) {
    setDragItem(conn)
    try { e.dataTransfer.setData('text/plain', conn); e.dataTransfer.effectAllowed = 'move' } catch { /* ignore */ }
  }
  function onDrop(e, blankIdx) {
    e.preventDefault()
    const conn = dragItem || (e.dataTransfer && e.dataTransfer.getData('text/plain'))
    if (conn) placeInFirstEmptyOrSelected(conn, blankIdx)
    setDragItem(null)
  }

  // Fichas aún disponibles (las correctas ya colocadas se quitan del banco)
  const placedCorrect = new Set(filled.filter(Boolean))
  const availableBank = bank.filter((c) => !placedCorrect.has(c))

  function reset() {
    setFilled(level.blanks.map(() => null))
    setCombo(0)
    setPoints(0)
    setTime(TIME_PER_LEVEL)
    setFinished(false)
    setSelectedConn(null)
    completedRef.current = false
  }

  return (
    <div className="cg">
      <button type="button" className="back-link" onClick={onExit}>← Niveles</button>

      <div className="cg__hud">
        <span className="cg__hud-level">Nivel {levelNumber}/{totalLevels}{level.level ? ` · ${level.level}` : ''}</span>
        <span className="cg__hud-points">⭐ {points}</span>
        <span className={'cg__hud-combo' + (combo >= 2 ? ' cg__hud-combo--hot' : '')}>
          {combo >= 2 ? `🔥 Combo x${combo}` : `Combo x${combo}`}
        </span>
        <span className={'cg__hud-time' + (time <= 10 && !finished ? ' cg__hud-time--low' : '')}>
          ⏱ {time}s
        </span>
      </div>

      <div className="cg__theme">{level.theme}</div>

      {/* Párrafo con huecos */}
      <p className="cg__paragraph">
        {level.segments.map((seg, i) => (
          <span key={i}>
            {seg}
            {i < level.blanks.length && (
              <span
                className={
                  'cg__blank'
                  + (filled[i] ? ' cg__blank--filled' : '')
                  + (wrongFlash === i ? ' cg__blank--wrong' : '')
                  + (selectedConn && !filled[i] ? ' cg__blank--target' : '')
                }
                onClick={() => onBlankClick(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, i)}
                role="button"
                aria-label={filled[i] ? `Hueco con ${filled[i]}` : `Hueco vacío: ${level.blanks[i].role}`}
              >
                {filled[i] || <span className="cg__blank-role">{level.blanks[i].role}</span>}
              </span>
            )}
          </span>
        ))}
      </p>

      {!finished ? (
        <>
          <p className="cg__hint-line">
            {selectedConn
              ? `Toca el hueco donde colocar «${selectedConn}»`
              : 'Toca un conector y luego su hueco — o arrástralo.'}
          </p>
          <div className="cg__bank">
            {availableBank.map((conn) => (
              <button
                key={conn}
                type="button"
                draggable
                onDragStart={(e) => onDragStart(e, conn)}
                className={'cg__chip' + (selectedConn === conn ? ' cg__chip--selected' : '')}
                onClick={() => onBankClick(conn)}
              >
                {conn}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="cg__win">
          <div className="feedback-banner feedback-banner--ok">
            ¡Párrafo completo! +{points} puntos {time > 0 ? `(bonus de tiempo incluido)` : ''}
          </div>
          <div className="cg__full">
            <span className="cg__full-text">{level.full}</span>
            <SpeakButton text={level.full} label="Escuchar el párrafo completo" />
          </div>
          <div className="cg__win-actions">
            <button type="button" className="btn btn--ghost" onClick={reset}>Repetir</button>
            {hasNext
              ? <button type="button" className="btn" onClick={onNext}>Siguiente nivel →</button>
              : <button type="button" className="btn" onClick={onExit}>Volver a niveles</button>}
          </div>
        </div>
      )}
    </div>
  )
}
