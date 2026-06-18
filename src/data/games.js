// Datos propios para los juegos de la sección "Juegos".
// Pensados específicamente para cada juego, todo en francés con pistas
// en español. Los crucigramas se han generado con cruces válidos.
//
// Para añadir contenido: suma objetos a estos arrays.

// ====== CRUCIGRAMAS ======
// La cuadrícula se calcula sola a partir de row/col/dir. Palabras sin
// tildes ni espacios (convención de crucigrama).
export const crosswordPuzzles = [
  {
    "id": "cw-comida",
    "title": "Comida",
    "prompt": "Completa el crucigrama con vocabulario de comida en francés.",
    "words": [
      {
        "word": "POMME",
        "clue": "La manzana",
        "row": 5,
        "col": 0,
        "dir": "across"
      },
      {
        "word": "VIANDE",
        "clue": "La carne",
        "row": 0,
        "col": 4,
        "dir": "down"
      },
      {
        "word": "LAIT",
        "clue": "La leche",
        "row": 1,
        "col": 2,
        "dir": "across"
      },
      {
        "word": "OEUF",
        "clue": "El huevo",
        "row": 5,
        "col": 1,
        "dir": "down"
      },
      {
        "word": "PAIN",
        "clue": "El pan",
        "row": 3,
        "col": 1,
        "dir": "across"
      },
      {
        "word": "SUCRE",
        "clue": "El azúcar",
        "row": 7,
        "col": 0,
        "dir": "across"
      }
    ]
  },
  {
    "id": "cw-familia",
    "title": "Familia",
    "prompt": "Completa el crucigrama con miembros de la familia.",
    "words": [
      {
        "word": "MERE",
        "clue": "La madre",
        "row": 2,
        "col": 3,
        "dir": "across"
      },
      {
        "word": "PERE",
        "clue": "El padre",
        "row": 1,
        "col": 4,
        "dir": "down"
      },
      {
        "word": "FRERE",
        "clue": "El hermano",
        "row": 0,
        "col": 6,
        "dir": "down"
      },
      {
        "word": "TANTE",
        "clue": "La tía",
        "row": 4,
        "col": 0,
        "dir": "across"
      },
      {
        "word": "FILLE",
        "clue": "La hija",
        "row": 0,
        "col": 6,
        "dir": "across"
      },
      {
        "word": "ONCLE",
        "clue": "El tío",
        "row": 3,
        "col": 2,
        "dir": "down"
      }
    ]
  },
  {
    "id": "cw-casa",
    "title": "La casa",
    "prompt": "Completa el crucigrama con partes de la casa.",
    "words": [
      {
        "word": "SALON",
        "clue": "El salón",
        "row": 5,
        "col": 4,
        "dir": "across"
      },
      {
        "word": "LIT",
        "clue": "La cama",
        "row": 5,
        "col": 6,
        "dir": "down"
      },
      {
        "word": "CUISINE",
        "clue": "La cocina",
        "row": 2,
        "col": 4,
        "dir": "down"
      },
      {
        "word": "PORTE",
        "clue": "La puerta",
        "row": 8,
        "col": 0,
        "dir": "across"
      },
      {
        "word": "JARDIN",
        "clue": "El jardín",
        "row": 0,
        "col": 8,
        "dir": "down"
      },
      {
        "word": "MUR",
        "clue": "La pared",
        "row": 3,
        "col": 3,
        "dir": "across"
      }
    ]
  }
]

// ====== RUEDA DE LETRAS (Word Wheel) ======
// Un conjunto de letras; se forman palabras francesas válidas.
export const wordWheels = [
  {
    id: 'ww-1', title: 'Ronda 1',
    prompt: 'Forma palabras francesas tocando las letras.',
    letters: ['A', 'M', 'I', 'R', 'E', 'S'],
    words: [
      { word: 'MER', hint: 'El mar' },
      { word: 'AMI', hint: 'El amigo' },
      { word: 'MISE', hint: 'La puesta / apuesta' },
      { word: 'MAIRE', hint: 'El alcalde' },
      { word: 'MARIE', hint: 'Casado/a' },
    ],
  },
  {
    id: 'ww-2', title: 'Ronda 2',
    prompt: 'Forma palabras francesas tocando las letras.',
    letters: ['T', 'A', 'B', 'L', 'E', 'O'],
    words: [
      { word: 'TABLE', hint: 'La mesa' },
      { word: 'BOL', hint: 'El cuenco' },
      { word: 'LOT', hint: 'El lote' },
      { word: 'BLE', hint: 'El trigo' },
      { word: 'BAL', hint: 'El baile' },
    ],
  },
  {
    id: 'ww-3', title: 'Ronda 3',
    prompt: 'Forma palabras francesas tocando las letras.',
    letters: ['P', 'O', 'R', 'T', 'E', 'S'],
    words: [
      { word: 'PORT', hint: 'El puerto' },
      { word: 'PORTE', hint: 'La puerta' },
      { word: 'ROSE', hint: 'La rosa' },
      { word: 'SPORT', hint: 'El deporte' },
      { word: 'POSTE', hint: 'Correos / el puesto' },
    ],
  },
];

// ====== AHORCADO (Hangman) ======
// Palabra francesa a adivinar letra a letra, pista en español.
// La comparación ignora tildes; se muestra con tildes.
export const hangmanWords = [
  { word: 'MAISON', hint: 'La casa' },
  { word: 'VOITURE', hint: 'El coche' },
  { word: 'FROMAGE', hint: 'El queso' },
  { word: 'JARDIN', hint: 'El jardín' },
  { word: 'ÉCOLE', hint: 'La escuela' },
  { word: 'TRAVAIL', hint: 'El trabajo' },
  { word: 'VOYAGE', hint: 'El viaje' },
  { word: 'BONHEUR', hint: 'La felicidad' },
  { word: 'CHIEN', hint: 'El perro' },
  { word: 'SOLEIL', hint: 'El sol' },
  { word: 'FENÊTRE', hint: 'La ventana' },
  { word: 'MONTAGNE', hint: 'La montaña' },
  { word: 'ENFANT', hint: 'El niño / la niña' },
  { word: 'CUISINE', hint: 'La cocina' },
  { word: 'LIVRE', hint: 'El libro' },
  { word: 'MÉDECIN', hint: 'El médico' },
  { word: 'PLAGE', hint: 'La playa' },
  { word: 'FLEUR', hint: 'La flor' },
  { word: 'GÂTEAU', hint: 'El pastel' },
  { word: 'AMITIÉ', hint: 'La amistad' },
];
