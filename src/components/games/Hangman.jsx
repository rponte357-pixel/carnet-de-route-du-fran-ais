import { useState, useMemo } from 'react'
import SpeakButton from '../SpeakButton.jsx'
import { hangmanWords } from '../../data/games.js'

// Ahorcado: adivina la palabra francesa letra a letra. La pista está en
// español. La comparación ignora tildes; se muestra con tildes.

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const MAX_ERRORS = 6

function strip(ch) {
  return ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
}

function pickWord(excludeWord) {
  const pool = hangmanWords.filter((w) => w.word !== excludeWord)
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function Hangman() {
  const [entry, setEntry] = useState(() => pickWord(null))
  const [guessed, setGuessed] = useState([]) // letras probadas (sin tilde)

  const letters = useMemo(() => entry.word.split(''), [entry])

  // ¿qué letras de la palabra (normalizadas) ya se adivinaron?
  const revealedSet = new Set(guessed)
  const wrong = guessed.filter((g) => !letters.some((l) => strip(l) === g))
  const errors = wrong.length
  const lost = errors >= MAX_ERRORS
  const won = letters.every((l) => l === ' ' || revealedSet.has(strip(l)))
  const over = lost || won

  function guess(letter) {
    if (over || guessed.includes(letter)) return
    setGuessed((g) => [...g, letter])
  }

  function next() {
    setEntry(pickWord(entry.word))
    setGuessed([])
  }

  return (
    <div className="hm">
      <p className="cw__prompt">Adivina la palabra francesa. Pista: <strong>{entry.hint}</strong></p>

      <div className="hm__gallows" aria-label={`Errores: ${errors} de ${MAX_ERRORS}`}>
        {Array.from({ length: MAX_ERRORS }).map((_, i) => (
          <span key={i} className={'hm__life' + (i < errors ? ' hm__life--lost' : '')}>
            {i < errors ? '✖' : '○'}
          </span>
        ))}
      </div>

      <div className="hm__word">
        {letters.map((l, i) => {
          const shown = over || revealedSet.has(strip(l))
          return (
            <span key={i} className={'hm__slot' + (shown ? ' hm__slot--shown' : '')}>
              {shown ? l : ''}
            </span>
          )
        })}
      </div>

      {!over && (
        <div className="hm__keyboard">
          {ALPHABET.map((letter) => {
            const used = guessed.includes(letter)
            const inWord = letters.some((l) => strip(l) === letter)
            return (
              <button
                key={letter}
                type="button"
                className={'hm__key' + (used ? (inWord ? ' hm__key--hit' : ' hm__key--miss') : '')}
                onClick={() => guess(letter)}
                disabled={used}
              >
                {letter}
              </button>
            )
          })}
        </div>
      )}

      {over && (
        <>
          <div className={'feedback-banner ' + (won ? 'feedback-banner--ok' : 'feedback-banner--ko')}>
            {won ? '¡Bien hecho! ' : 'La palabra era: '}
            <strong>{entry.word}</strong> ({entry.hint}) <SpeakButton text={entry.word} size="small" />
          </div>
          <button type="button" className="btn" onClick={next}>Otra palabra →</button>
        </>
      )}
    </div>
  )
}
