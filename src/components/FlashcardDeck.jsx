import { useState } from 'react'

export default function FlashcardDeck({ words }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const word = words[index]

  function go(delta) {
    setFlipped(false)
    setIndex((i) => (i + delta + words.length) % words.length)
  }

  function shuffleDeck() {
    setFlipped(false)
    setIndex(Math.floor(Math.random() * words.length))
  }

  return (
    <div className="flashcard-stage">
      <div
        className={'flashcard' + (flipped ? ' flashcard--flipped' : '')}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flashcard__inner">
          <div className="flashcard__face">
            <span className="flashcard__lang">Français</span>
            <span className="flashcard__word">{word.fr}</span>
            <span className="flashcard__hint">Toca para ver la traducción</span>
          </div>
          <div className="flashcard__face flashcard__face--back">
            <span className="flashcard__lang">Español</span>
            <span className="flashcard__word">{word.es}</span>
          </div>
        </div>
      </div>

      <div className="flashcard-controls">
        <button type="button" className="btn" onClick={() => go(-1)} aria-label="Palabra anterior">←</button>
        <span className="flashcard-counter">{index + 1} / {words.length}</span>
        <button type="button" className="btn" onClick={() => go(1)} aria-label="Palabra siguiente">→</button>
      </div>
      <button type="button" className="btn btn--ghost" onClick={shuffleDeck}>🔀 Palabra al azar</button>
    </div>
  )
}
