import { vocabCategories } from '../data/vocabulary.js'

function Stat({ label, stats }) {
  const total = stats.correct + stats.incorrect
  const pct = total === 0 ? 0 : Math.round((stats.correct / total) * 100)
  return (
    <div className="passport-stat">
      <div className="passport-stat__label">{label}</div>
      <div className="passport-stat__value">{total === 0 ? '—' : `${pct}%`}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-soft)', marginTop: 4 }}>
        {stats.correct} aciertos · {stats.incorrect} errores
      </div>
      <div className="passport-stat__bar">
        <div style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function ProgressDashboard({ progress, onReset }) {
  return (
    <div>
      <p className="page-eyebrow">Tu pasaporte de estudio</p>
      <h2 className="page-title">Progreso</h2>
      <p className="page-intro">
        Un resumen de tus sesiones de entrenamiento. Se guarda en este navegador,
        así que puedes cerrar la pestaña y seguir donde lo dejaste.
      </p>

      <div className="passport-grid">
        <Stat label="Auxiliares (être / avoir)" stats={progress.auxiliares} />
        <Stat label="Passé composé vs imparfait" stats={progress.tiempos} />
        <Stat label="Conectores" stats={progress.conectores} />
        {vocabCategories.map((c) => (
          <Stat key={c.id} label={`Vocabulario · ${c.label}`} stats={progress.vocab[c.id]} />
        ))}
      </div>

      <div className="reset-row">
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          ↺ Reiniciar progreso
        </button>
      </div>
    </div>
  )
}
