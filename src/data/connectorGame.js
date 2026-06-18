// "La Machine à Phrases" — datos del juego de conectores.
//
// Cada nivel es un párrafo coherente (tema B1) partido en segmentos de
// texto con huecos. En cada hueco hay que colocar el conector correcto
// según su función. Las opciones mezclan el correcto con distractores.
//
// Estructura de un nivel:
//   {
//     id, title, theme,
//     segments: [ "texto antes del hueco", "texto entre huecos", ... ],
//       -> hay (huecos + 1) segmentos; el hueco i va entre segments[i] y segments[i+1]
//     blanks: [ { answer: 'À mon avis', role: 'opinar', options: [...] }, ... ]
//     full: frase completa ya resuelta, para leerla en voz alta al final
//   }
//
// Para añadir un nivel: copia un objeto y cambia textos y huecos. El
// número de blanks debe ser (segments.length - 1).

export const connectorLevels = [
  {
    id: 'lvl-1',
    title: 'Mi rutina',
    theme: '☀️ La rutina diaria',
    segments: [
      '',
      ', je me lève à sept heures. ',
      ', je prends mon petit-déjeuner. ',
      ', je vais au travail en bus.',
    ],
    blanks: [
      { answer: "D'abord", role: 'ordenar (1º)', options: ["D'abord", 'Pourtant', 'Par exemple'] },
      { answer: 'Ensuite', role: 'ordenar (2º)', options: ['Ensuite', 'Car', 'En conclusion'] },
      { answer: 'Finalement', role: 'ordenar (final)', options: ['Finalement', 'De plus', 'À mon avis'] },
    ],
    full: "D'abord, je me lève à sept heures. Ensuite, je prends mon petit-déjeuner. Finalement, je vais au travail en bus.",
  },
  {
    id: 'lvl-2',
    title: 'Mi opinión sobre los viajes',
    theme: '✈️ Viajar',
    segments: [
      '',
      ', voyager est très important. ',
      ', on découvre d\'autres cultures. ',
      ', c\'est parfois cher.',
    ],
    blanks: [
      { answer: 'À mon avis', role: 'opinar', options: ['À mon avis', 'Donc', 'Ensuite'] },
      { answer: 'De plus', role: 'añadir', options: ['De plus', 'Pourtant', "D'abord"] },
      { answer: 'Pourtant', role: 'contrastar', options: ['Pourtant', 'Par exemple', 'Finalement'] },
    ],
    full: "À mon avis, voyager est très important. De plus, on découvre d'autres cultures. Pourtant, c'est parfois cher.",
  },
  {
    id: 'lvl-3',
    title: 'La comida sana',
    theme: '🥗 La alimentación',
    segments: [
      'Je mange beaucoup de légumes, ',
      ' c\'est bon pour la santé. ',
      ', je mange des fruits, ',
      ' une pomme ou une banane.',
    ],
    blanks: [
      { answer: 'car', role: 'causa', options: ['car', 'pourtant', 'finalement'] },
      { answer: 'De plus', role: 'añadir', options: ['De plus', 'Donc', 'Par exemple'] },
      { answer: 'par exemple', role: 'ejemplo', options: ['par exemple', 'à mon avis', 'd\'abord'] },
    ],
    full: "Je mange beaucoup de légumes, car c'est bon pour la santé. De plus, je mange des fruits, par exemple une pomme ou une banane.",
  },
  {
    id: 'lvl-4',
    title: 'El trabajo ideal',
    theme: '💼 El trabajo',
    segments: [
      '',
      ', je cherche un travail intéressant. ',
      ', le salaire est important, ',
      ' je veux aussi du temps libre. ',
      ', l\'ambiance compte beaucoup.',
    ],
    blanks: [
      { answer: 'À mon avis', role: 'opinar', options: ['À mon avis', 'Ensuite', 'Donc'] },
      { answer: 'Bien sûr', role: 'matizar', options: ['Bien sûr', 'Par exemple', 'Car'] },
      { answer: 'mais', role: 'contrastar', options: ['mais', 'donc', 'd\'abord'] },
      { answer: 'En conclusion', role: 'concluir', options: ['En conclusion', 'De plus', 'Pourtant'] },
    ],
    full: "À mon avis, je cherche un travail intéressant. Bien sûr, le salaire est important, mais je veux aussi du temps libre. En conclusion, l'ambiance compte beaucoup.",
  },
  {
    id: 'lvl-5',
    title: 'Por qué estudio francés',
    theme: '🇫🇷 Aprender idiomas',
    segments: [
      "J'étudie le français ",
      ' j\'adore cette langue. ',
      ', elle est utile pour le travail. ',
      ', je voudrais visiter Paris, ',
      ' je continue à apprendre chaque jour.',
    ],
    blanks: [
      { answer: 'parce que', role: 'causa', options: ['parce que', 'pourtant', 'finalement'] },
      { answer: 'De plus', role: 'añadir', options: ['De plus', 'Mais', 'Par exemple'] },
      { answer: 'Par ailleurs', role: 'añadir (formal)', options: ['Par ailleurs', 'Donc', 'D\'abord'] },
      { answer: "c'est pourquoi", role: 'consecuencia', options: ["c'est pourquoi", 'car', 'à mon avis'] },
    ],
    full: "J'étudie le français parce que j'adore cette langue. De plus, elle est utile pour le travail. Par ailleurs, je voudrais visiter Paris, c'est pourquoi je continue à apprendre chaque jour.",
  },
]
