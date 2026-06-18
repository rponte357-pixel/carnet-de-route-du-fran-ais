import { useState } from 'react'
import { crosswordPuzzles, wordWheels } from '../data/games.js'
import CrosswordGame from './games/CrosswordGame.jsx'
import WordWheel from './games/WordWheel.jsx'
import Hangman from './games/Hangman.jsx'
import ConnectorGame from './games/ConnectorGame.jsx'

const GAMES = [
  { id: 'crossword', title: 'Mots Croisés', eyebrow: 'Orthographe', variant: 'connectors', desc: 'Rellena la cuadrícula con palabras francesas a partir de las pistas.' },
  { id: 'wordwheel', title: 'Roue des Lettres', eyebrow: 'Vocabulaire', variant: 'tenses', desc: 'Forma palabras francesas con las letras de la rueda.' },
  { id: 'hangman', title: 'Le Pendu', eyebrow: 'Devine', variant: 'house', desc: 'Adivina la palabra francesa letra a letra antes de quedarte sin intentos.' },
  { id: 'connectors', title: 'Machine à Phrases', eyebrow: 'Connecteurs', variant: 'editorial', desc: 'Coloca los conectores correctos para construir párrafos con sentido.' },
]

export default function GamesHub() {
  const [game, setGame] = useState(null) // null | 'crossword' | 'wordwheel' | 'hangman'
  const [puzzleIdx, setPuzzleIdx] = useState(0)
  const [wheelIdx, setWheelIdx] = useState(0)

  // --- Sub-hub de juegos ---
  if (game === null) {
    return (
      <div>
        <p className="page-eyebrow">Espace jeux</p>
        <h2 className="page-title">Jeux de vocabulaire</h2>
        <p className="page-intro">
          Practica el francés jugando. Elige un juego para empezar.
        </p>

        <div className="bubble-container bubble-container--sub">
          {GAMES.map((g, i) => (
            <button
              key={g.id}
              type="button"
              className={`bubble bubble--${g.variant}`}
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => setGame(g.id)}
            >
              <span className="bubble-content">
                <span className="bubble-eyebrow">{g.eyebrow}</span>
                <span className="bubble-title">{g.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const meta = GAMES.find((g) => g.id === game)

  return (
    <div>
      <button type="button" className="back-link" onClick={() => setGame(null)}>
        ← Jeux
      </button>
      <h2 className="page-title" style={{ marginTop: 8 }}>{meta.title}</h2>

      {game === 'crossword' && (
        <>
          <div className="subnav" role="tablist" aria-label="Crucigramas">
            {crosswordPuzzles.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={puzzleIdx === i}
                className="subnav__btn"
                onClick={() => setPuzzleIdx(i)}
              >
                {p.title}
              </button>
            ))}
          </div>
          <CrosswordGame key={crosswordPuzzles[puzzleIdx].id} puzzle={crosswordPuzzles[puzzleIdx]} />
        </>
      )}

      {game === 'wordwheel' && (
        <>
          <div className="subnav" role="tablist" aria-label="Rondas">
            {wordWheels.map((w, i) => (
              <button
                key={w.id}
                type="button"
                role="tab"
                aria-selected={wheelIdx === i}
                className="subnav__btn"
                onClick={() => setWheelIdx(i)}
              >
                {w.title}
              </button>
            ))}
          </div>
          <WordWheel key={wordWheels[wheelIdx].id} wheel={wordWheels[wheelIdx]} />
        </>
      )}

      {game === 'hangman' && <Hangman />}

      {game === 'connectors' && <ConnectorGame />}
    </div>
  )
}
