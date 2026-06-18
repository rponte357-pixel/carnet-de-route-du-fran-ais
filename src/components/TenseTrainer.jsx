import { useMemo, useState } from 'react'
import { tenseChoiceExercises, futurProcheExercises } from '../data/grammar.js'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function normalize(str) {
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function TenseTrainer({ stats, onResult }) {
  const order = useMemo(() => shuffle(tenseChoiceExercises.map((_, i) => i)), [])
  const [pos, setPos] = useState(0)
  const [selected, setSelected] = useState(null)

  const exercise = tenseChoiceExercises[order[pos % order.length]]

  function choose(index) {
    if (selected !== null) return
    setSelected(index)
    onResult(index === exercise.correctIndex)
  }

  function next() {
    setSelected(null)
    setPos((p) => p + 1)
  }

  const total = stats.correct + stats.incorrect

  return (
    <div>
      <p className="page-eyebrow">Entrenamiento de tiempos</p>
      <h2 className="page-title">Passé composé vs. imparfait</h2>
      <p className="page-intro">
        Lee la frase y elige la combinación de tiempos correcta. Presta atención a
        las palabras clave (hier, chaque jour, soudain, pendant...): casi siempre
        delatan qué tiempo usar.
      </p>

      <div className="card quiz-card">
        <p className="quiz-question">{exercise.sentence}</p>
        <div className="quiz-options">
          {exercise.options.map((opt, i) => {
            let cls = 'quiz-option'
            if (selected !== null) {
              if (i === exercise.correctIndex) cls += ' quiz-option--correct'
              else if (i === selected) cls += ' quiz-option--incorrect'
            }
            return (
              <button key={opt} type="button" className={cls} onClick={() => choose(i)} disabled={selected !== null}>
                {opt}
              </button>
            )
          })}
        </div>

        {selected !== null && (
          <div className={'feedback-banner ' + (selected === exercise.correctIndex ? 'feedback-banner--ok' : 'feedback-banner--ko')} style={{ marginTop: 18, textAlign: 'left' }}>
            {exercise.explanation}
          </div>
        )}

        <div className="score-row">
          <span className="score-ok">Aciertos: <b>{stats.correct}</b></span>
          <span className="score-ko">Errores: <b>{stats.incorrect}</b></span>
          {total > 0 && <span>Precisión: <b>{Math.round((stats.correct / total) * 100)}%</b></span>}
        </div>

        {selected !== null && (
          <button type="button" className="btn" style={{ marginTop: 18 }} onClick={next}>
            Siguiente frase →
          </button>
        )}
      </div>

      <hr className="divider" />

      <FuturProchePractice />
    </div>
  )
}

function FuturProchePractice() {
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(null) // bool

  const exercise = futurProcheExercises[index % futurProcheExercises.length]

  function check() {
    const isCorrect = normalize(value) === normalize(exercise.answer)
    setChecked(isCorrect)
  }

  function next() {
    setIndex((i) => i + 1)
    setValue('')
    setChecked(null)
  }

  return (
    <div>
      <h3 style={{ marginBottom: 6 }}>Repaso rápido: futur proche</h3>
      <p className="page-intro" style={{ marginBottom: 16 }}>
        Completa el hueco con <i>aller</i> conjugado + infinitivo.
      </p>
      <div className="card">
        <p className="quiz-question" style={{ fontSize: 18, marginBottom: 16 }}>{exercise.sentence}</p>
        <div className="writing-blanks" style={{ gridTemplateColumns: '1fr', maxWidth: 320 }}>
          <div>
            <label htmlFor="futur-input">Tu respuesta</label>
            <input
              id="futur-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="ej: vais visiter"
              disabled={checked !== null}
            />
          </div>
        </div>

        {checked === null ? (
          <button type="button" className="btn" style={{ marginTop: 16 }} onClick={check} disabled={!value.trim()}>
            Comprobar
          </button>
        ) : (
          <>
            <div className={'feedback-banner ' + (checked ? 'feedback-banner--ok' : 'feedback-banner--ko')} style={{ marginTop: 16, textAlign: 'left' }}>
              {checked ? '¡Correcto! ' : `Respuesta esperada: "${exercise.answer}". `}
              {exercise.translation}
            </div>
            <button type="button" className="btn" style={{ marginTop: 14 }} onClick={next}>
              Siguiente →
            </button>
          </>
        )}
      </div>
    </div>
  )
}
