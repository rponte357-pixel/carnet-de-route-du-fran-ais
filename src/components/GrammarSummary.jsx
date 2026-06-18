import { pastTenses, etreVerbs, reflexiveRule } from '../data/grammar.js'

export default function GrammarSummary() {
  const avoirVerbsNote = [
    'Manger (Comer)', 'Faire (Hacer)', 'Prendre (Tomar/Coger)', 'Parler (Hablar)',
    'Avoir (Tener/Haber)', 'Être (Ser/Estar)', 'Voir (Ver)',
  ]

  return (
    <div>
      <p className="page-eyebrow">Resumen relámpago</p>
      <h2 className="page-title">El pasado obligatorio</h2>
      <p className="page-intro">
        La prueba B1 exige dominar dos tiempos del pasado y saber elegir entre ellos
        sin dudar. Aquí tienes la regla de oro de cada uno, antes de pasar al
        entrenamiento práctico.
      </p>

      <div className="section-grid section-grid--2">
        <div className="card">
          <h3>1. {pastTenses.passeCompose.title}</h3>
          <p>{pastTenses.passeCompose.rule}</p>
          {pastTenses.passeCompose.examples.map((ex) => (
            <div className="example-line" key={ex}>{ex}</div>
          ))}
        </div>
        <div className="card">
          <h3>{pastTenses.imparfait.title}</h3>
          <p>{pastTenses.imparfait.rule}</p>
          {pastTenses.imparfait.examples.map((ex) => (
            <div className="example-line" key={ex}>{ex}</div>
          ))}
        </div>
      </div>

      <hr className="divider" />

      <h3 style={{ marginBottom: 6 }}>La batalla de los auxiliares (Être vs Avoir)</h3>
      <p className="page-intro" style={{ marginBottom: 18 }}>
        En Passé Composé, cada verbo "vota" por un auxiliar. Memoriza esta lista de
        14 verbos de ÊTRE (suelen venir en parejas de opuestos); el resto de
        verbos —y todos los regulares— usan AVOIR.
      </p>

      <div className="section-grid section-grid--2">
        <div className="card">
          <span className="tag tag--etre">🏠 Auxiliar être</span>
          <div className="verb-pill-grid">
            {etreVerbs.map((v) => (
              <div className="verb-pill" key={v.fr}>
                <b>{v.fr}</b>
                <span>{v.es}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <span className="tag tag--avoir">💼 Auxiliar avoir</span>
          <div className="verb-pill-grid">
            {avoirVerbsNote.map((v) => {
              const [fr, es] = v.split(' (')
              return (
                <div className="verb-pill" key={v}>
                  <b>{fr}</b>
                  <span>{es.replace(')', '')}</span>
                </div>
              )
            })}
          </div>
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 12, marginBottom: 0 }}>
            ...y todos los demás verbos no listados a la izquierda (regla por defecto).
          </p>
        </div>
      </div>

      <div className="card card--dashed" style={{ marginTop: 18 }}>
        <h3 style={{ fontSize: 16 }}>{reflexiveRule.title}</h3>
        <p style={{ marginBottom: 0 }}>{reflexiveRule.text}</p>
      </div>

      <hr className="divider" />

      <h3 style={{ marginBottom: 6 }}>2. El futuro express</h3>
      <div className="card">
        <p><b>{pastTenses.futurProche.title}:</b> {pastTenses.futurProche.rule}</p>
        {pastTenses.futurProche.examples.map((ex) => (
          <div className="example-line" key={ex}>{ex}</div>
        ))}
      </div>
    </div>
  )
}
