import { useState } from 'react'
import { verbGroups } from '../data/verbs.js'
import SpeakButton from './SpeakButton.jsx'

export default function VerbsExplorer() {
  const [groupId, setGroupId] = useState(verbGroups[0].id)
  const [openVerb, setOpenVerb] = useState(null) // fr del verbo abierto

  const group = verbGroups.find((g) => g.id === groupId)

  function toggleVerb(fr) {
    setOpenVerb((current) => (current === fr ? null : fr))
  }

  function changeGroup(id) {
    setGroupId(id)
    setOpenVerb(null)
  }

  return (
    <div>
      <p className="page-eyebrow">Verbos y conjugación</p>
      <h2 className="page-title">Passé composé: conjugación completa</h2>
      <p className="page-intro">
        Los verbos más comunes en francés, conjugados en passé composé con las
        seis personas. Toca un verbo para desplegar su conjugación y usa el
        altavoz 🔊 para escuchar cómo se pronuncia cada forma.
      </p>

      <div className="subnav" role="tablist" aria-label="Grupos de verbos">
        {verbGroups.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={groupId === g.id}
            className="subnav__btn"
            onClick={() => changeGroup(g.id)}
          >
            {g.icon} {g.label}
          </button>
        ))}
      </div>

      <p className="verb-note">{group.note}</p>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-soft)', marginBottom: 14 }}>
        {group.verbs.length} verbos
      </p>

      <div className="verb-list">
        {group.verbs.map((verb) => {
          const isOpen = openVerb === verb.fr
          return (
            <div key={verb.fr} className={'verb-item' + (isOpen ? ' verb-item--open' : '')}>
              <div className="verb-item__head">
                <button
                  type="button"
                  className="verb-item__toggle"
                  aria-expanded={isOpen}
                  onClick={() => toggleVerb(verb.fr)}
                >
                  <span className="verb-item__arrow" aria-hidden="true">{isOpen ? '▾' : '▸'}</span>
                  <span className="verb-item__fr">{verb.fr}</span>
                  <span className="verb-item__participle">({verb.participle})</span>
                  <span className="verb-item__es">{verb.es}</span>
                </button>
                <SpeakButton text={verb.fr} label={`Escuchar "${verb.fr}"`} size="small" />
              </div>

              {isOpen && (
                <ul className="conjugation">
                  {verb.conjugation.map((line, i) => (
                    <li key={i} className="conjugation__line">
                      <span className="conjugation__text">{line.text}</span>
                      <SpeakButton text={line.speak} label="Escuchar esta forma" size="small" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
