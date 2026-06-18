// Pantalla de inicio (hub) con burbujas circulares, una por sección.
// Inspirada en el "bubble nav" de la app de inglés C1, adaptada a la
// paleta y secciones de Carnet de Route.

const BUBBLES = [
  { id: 'gramatica', eyebrow: 'Repaso', title: 'Gramática', variant: 'academic' },
  { id: 'auxiliares', eyebrow: 'Práctica', title: 'Auxiliares', variant: 'house' },
  { id: 'verbos', eyebrow: 'Conjugación', title: 'Verbos', variant: 'verbs' },
  { id: 'tiempos', eyebrow: 'Práctica', title: 'Tiempos', variant: 'tenses' },
  { id: 'conectores', eyebrow: 'Expresión', title: 'Conectores', variant: 'connectors' },
  { id: 'redaccion', eyebrow: 'Escritura', title: 'Redacción', variant: 'editorial' },
  { id: 'vocabulario', eyebrow: 'Léxico', title: 'Vocabulario', variant: 'flags' },
  { id: 'juegos', eyebrow: 'Jugar', title: 'Juegos', variant: 'playful' },
  { id: 'progreso', eyebrow: 'Seguimiento', title: 'Progreso', variant: 'progress' },
]

export default function Hub({ onSelect }) {
  return (
    <div className="hub">
      <div className="hub-header">
        <h1>Carnet de Route</h1>
        <p>Elige una sección para empezar tu repaso de francés B1</p>
      </div>

      <div className="bubble-container">
        {BUBBLES.map((b, i) => (
          <button
            key={b.id}
            type="button"
            className={`bubble bubble--${b.variant}`}
            style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => onSelect(b.id)}
          >
            <span className="bubble-content">
              <span className="bubble-eyebrow">{b.eyebrow}</span>
              <span className="bubble-title">{b.title}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
