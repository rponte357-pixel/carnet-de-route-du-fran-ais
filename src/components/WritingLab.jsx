import { useState } from 'react'
import { writingTemplates } from '../data/writingTemplates.js'

function buildOutput(template, values) {
  let output = template.template
  template.blanks.forEach((blank) => {
    const value = values[blank.key]?.trim()
    const display = value ? `<mark>${escapeHtml(value)}</mark>` : `<mark>${escapeHtml(blank.placeholder)}</mark>`
    output = output.split(`{${blank.key}}`).join(display)
  })
  return output
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default function WritingLab() {
  return (
    <div>
      <p className="page-eyebrow">Redacciones modeladas</p>
      <h2 className="page-title">Tu entrevista o redacción, lista</h2>
      <p className="page-intro">
        Rellena los huecos con tus datos reales. El texto se actualiza al momento
        para que practiques leyéndolo en voz alta, tal como lo dirías en el examen.
      </p>

      {writingTemplates.map((tpl) => (
        <TemplateCard key={tpl.id} tpl={tpl} />
      ))}
    </div>
  )
}

function TemplateCard({ tpl }) {
  const [values, setValues] = useState({})

  function update(key, val) {
    setValues((v) => ({ ...v, [key]: val }))
  }

  const html = buildOutput(tpl, values)

  return (
    <div className="card writing-card">
      <h3>{tpl.title}</h3>
      <div className="writing-card__es">{tpl.titleEs}</div>

      <div className="writing-output" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="writing-blanks">
        {tpl.blanks.map((blank) => (
          <div key={blank.key}>
            <label htmlFor={`${tpl.id}-${blank.key}`}>{blank.label}</label>
            <input
              id={`${tpl.id}-${blank.key}`}
              type="text"
              placeholder={blank.placeholder}
              value={values[blank.key] || ''}
              onChange={(e) => update(blank.key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
