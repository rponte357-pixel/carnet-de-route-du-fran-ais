// "Conectores para Brillar" — frases para sonar a nivel B1 en la prueba oral y escrita.

export const connectorGroups = [
  {
    label: 'Para ganar tiempo',
    phrase: "Alors, c'est une question intéressante...",
    es: 'Bueno, esa es una pregunta interesante...',
  },
  {
    label: 'Para ordenar',
    phrase: "D'abord... ensuite... finalement...",
    es: 'Primero... luego... finalmente...',
  },
  {
    label: 'Para opinar',
    phrase: "À mon avis, je pense que...",
    es: 'En mi opinión, pienso que...',
  },
  {
    label: 'Para contrastar',
    phrase: 'Pourtant... (Sin embargo)',
    es: 'Sin embargo...',
  },
  {
    label: 'Para añadir',
    phrase: 'De plus... / En plus...',
    es: 'Además...',
  },
  {
    label: 'Para dar un ejemplo',
    phrase: 'Par exemple...',
    es: 'Por ejemplo...',
  },
  {
    label: 'Para concluir',
    phrase: 'En conclusion... / Pour conclure...',
    es: 'En conclusión... / Para concluir...',
  },
  {
    label: 'Para explicar causa',
    phrase: 'Parce que... / Car...',
    es: 'Porque... / Ya que...',
  },
  {
    label: 'Para explicar consecuencia',
    phrase: 'Donc... / Alors...',
    es: 'Entonces... / Así que...',
  },
]

export const connectorExercises = [
  {
    sentence: "___ , je pense que voyager est essentiel pour apprendre une langue.",
    options: ['À mon avis', "D'abord", 'Donc'],
    correctIndex: 0,
    explanation: '"À mon avis" se usa para introducir una opinión personal.',
  },
  {
    sentence: "J'aime ce travail. ___ , le salaire n'est pas très bon.",
    options: ['De plus', 'Pourtant', 'Par exemple'],
    correctIndex: 1,
    explanation: '"Pourtant" (sin embargo) introduce un contraste con lo dicho antes.',
  },
  {
    sentence: "___ , je me suis levé. ___ , j'ai pris mon petit-déjeuner.",
    options: ["D'abord / Ensuite", 'Pourtant / Donc', 'Par exemple / Car'],
    correctIndex: 0,
    explanation: '"D\'abord... ensuite..." ordena una secuencia de acciones.',
  },
  {
    sentence: 'Il pleuvait beaucoup, ___ nous sommes restés à la maison.',
    options: ['donc', 'pourtant', 'par exemple'],
    correctIndex: 0,
    explanation: '"Donc" introduce la consecuencia lógica de lo anterior.',
  },
]
