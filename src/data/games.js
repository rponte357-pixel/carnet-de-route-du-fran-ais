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
// Modo hilo + palabra a palabra: cada palabra genera su propia rueda con
// sus letras (más algún distractor de 'letters'). 'letters' es opcional
// y solo aporta distractores; las palabras ya no tienen que compartir set.
export const wordWheels = [
  {
    id: 'ww-1', title: 'Casa y objetos',
    prompt: 'Desliza para formar la palabra francesa de cada pista.',
    letters: ['S', 'N', 'R', 'T'],
    words: [
      { word: 'TABLE', hint: 'La mesa' },
      { word: 'PORTE', hint: 'La puerta' },
      { word: 'LIT', hint: 'La cama' },
      { word: 'MUR', hint: 'La pared' },
      { word: 'CLE', hint: 'La llave' },
    ],
  },
  {
    id: 'ww-2', title: 'Comida',
    prompt: 'Desliza para formar la palabra francesa de cada pista.',
    letters: ['S', 'N', 'L', 'R'],
    words: [
      { word: 'PAIN', hint: 'El pan' },
      { word: 'EAU', hint: 'El agua' },
      { word: 'VIN', hint: 'El vino' },
      { word: 'POMME', hint: 'La manzana' },
      { word: 'CAFE', hint: 'El café' },
    ],
  },
  {
    id: 'ww-3', title: 'Naturaleza',
    prompt: 'Desliza para formar la palabra francesa de cada pista.',
    letters: ['T', 'S', 'R', 'N'],
    words: [
      { word: 'MER', hint: 'El mar' },
      { word: 'SOLEIL', hint: 'El sol' },
      { word: 'FLEUR', hint: 'La flor' },
      { word: 'ARBRE', hint: 'El árbol' },
      { word: 'NEIGE', hint: 'La nieve' },
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
