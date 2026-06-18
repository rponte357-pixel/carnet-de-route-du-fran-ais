import { useMemo, useState } from 'react'
import { buildQuizBank } from '../data/vocabulary.js'

export default function VocabQuiz({ categoryId, stats, onResult }) {
  const [seed, setSeed] = useState(0)
  const bank = useMemo(() => buildQuizBank(categoryId), [categoryId, seed])
  const [pos, setPos] = useState(0)
  const [selected, setSelected] = useState(null)

  const question = bank[pos % bank.length]
  const total = stats.correct + stats.incorrect

  function choose(option) {
    if (selected !== null) return
    setSelected(option)
    onResult(option === question.correctAnswer)
  }

  function next() {
    setSelected(null)
    if (pos + 1 >= bank.length) {
      setSeed((s) => s + 1) // regenerar opciones al completar una vuelta
      setPos(0)
    } else {
      setPos((p) => p + 1)
    }
  }

  return (
    <div className="card quiz-card">
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        ¿Cómo se dice en español?
      </p>
      <p className="quiz-question">{question.question}</p>
      <div className="quiz-options">
        {question.options.map((opt) => {
          let cls = 'quiz-option'
          if (selected !== null) {
            if (opt === question.correctAnswer) cls += ' quiz-option--correct'
            else if (opt === selected) cls += ' quiz-option--incorrect'
          }
          return (
            <button key={opt} type="button" className={cls} onClick={() => choose(opt)} disabled={selected !== null}>
              {opt}
            </button>
          )
        })}
      </div>

      <div className="score-row">
        <span className="score-ok">Aciertos: <b>{stats.correct}</b></span>
        <span className="score-ko">Errores: <b>{stats.incorrect}</b></span>
        {total > 0 && <span>Precisión: <b>{Math.round((stats.correct / total) * 100)}%</b></span>}
      </div>

      {selected !== null && (
        <button type="button" className="btn" style={{ marginTop: 18 }} onClick={next}>
          Siguiente palabra →
        </button>
      )}
    </div>
  )
}
