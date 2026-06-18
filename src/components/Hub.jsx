// Pantalla de inicio (hub) con burbujas circulares, una por sección.
// Inspirada en el "bubble nav" de la app de inglés C1, adaptada a la
// paleta y secciones de Carnet de Route.

const BUBBLES = [
  { id: 'gramatica', eyebrow: 'Révision', title: 'Grammaire', variant: 'academic' },
  { id: 'auxiliares', eyebrow: 'Entraînement', title: 'Auxiliaires', variant: 'house' },
  { id: 'verbos', eyebrow: 'Conjugaison', title: 'Verbes', variant: 'verbs' },
  { id: 'tiempos', eyebrow: 'Entraînement', title: 'Temps', variant: 'tenses' },
  { id: 'conectores', eyebrow: 'Expression', title: 'Connecteurs', variant: 'connectors' },
  { id: 'redaccion', eyebrow: 'Écriture', title: 'Rédaction', variant: 'editorial' },
  { id: 'vocabulario', eyebrow: 'Lexique', title: 'Vocabulaire', variant: 'flags' },
  { id: 'juegos', eyebrow: 'Jouer', title: 'Jeux', variant: 'playful' },
  { id: 'progreso', eyebrow: 'Suivi', title: 'Progrès', variant: 'progress' },
]

export default function Hub({ onSelect }) {
  return (
    <div className="hub">
      <div className="hub-header">
        <h1>Carnet de Route</h1>
        <p>Elige una sección para empezar tu repaso de francés A2–B1</p>
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
