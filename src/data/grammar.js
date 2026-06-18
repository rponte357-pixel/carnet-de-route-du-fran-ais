// Contenido de gramática basado en el "Resumen Relámpago" + ampliado
// para cubrir lo que suele pedirse en la prueba B1 de la EOI.

export const pastTenses = {
  passeCompose: {
    title: 'Passé Composé',
    rule: 'Acciones cerradas, hechos puntuales con principio y fin claros. Es el tiempo de "lo que pasó". Se forma con un auxiliar (être o avoir) en presente + el participio pasado.',
    examples: [
      'Je suis allé(e) à la plage. (Fui a la playa)',
      "J'ai mangé un croissant. (Comí un croissant)",
      'Hier, nous avons visité le musée. (Ayer visitamos el museo)',
    ],
  },
  imparfait: {
    title: 'Imparfait',
    rule: 'Descripciones, estados, rutinas o acciones habituales en el pasado, sin un final marcado. Es el tiempo del "cómo era" o "lo que pasaba siempre". Equivale a "Hacía", "Vivía", "Iba (normalmente)".',
    examples: [
      "Quand j'étais petit, il faisait froid. (Cuando era pequeño, hacía frío)",
      "Tous les étés, nous allions chez mes grands-parents. (Todos los veranos íbamos a casa de mis abuelos)",
      "Elle habitait à Lyon. (Ella vivía en Lyon)",
    ],
  },
  futurProche: {
    title: 'Futur Proche',
    rule: 'Tus planes seguros, decididos o inmediatos. Se forma con Aller (presente) + Infinitivo.',
    examples: [
      'Cet été, je vais voyager en France. (Este verano voy a viajar a Francia)',
      'Nous allons partir dans une heure. (Vamos a salir en una hora)',
      'Tu vas adorer ce restaurant. (Vas a adorar este restaurante)',
    ],
  },
}

// Los 14 verbos clásicos de ÊTRE (a menudo agrupados en parejas de opuestos)
export const etreVerbs = [
  { fr: 'Aller', es: 'Ir', pair: 'Venir' },
  { fr: 'Venir', es: 'Venir', pair: 'Aller' },
  { fr: 'Entrer', es: 'Entrar', pair: 'Sortir' },
  { fr: 'Sortir', es: 'Salir', pair: 'Entrer' },
  { fr: 'Arriver', es: 'Llegar', pair: 'Partir' },
  { fr: 'Partir', es: 'Irse', pair: 'Arriver' },
  { fr: 'Monter', es: 'Subir', pair: 'Descendre' },
  { fr: 'Descendre', es: 'Bajar', pair: 'Monter' },
  { fr: 'Naître', es: 'Nacer', pair: 'Mourir' },
  { fr: 'Mourir', es: 'Morir', pair: 'Naître' },
  { fr: 'Rester', es: 'Quedarse', pair: 'Passer' },
  { fr: 'Passer', es: 'Pasar', pair: 'Rester' },
  { fr: 'Retourner', es: 'Volver', pair: 'Tomber' },
  { fr: 'Tomber', es: 'Caer', pair: 'Retourner' },
]

export const reflexiveRule = {
  title: 'Bonus: los verbos pronominales',
  text: 'Todos los verbos reflexivos/pronominales (se lever, se laver, se réveiller, s\'habiller...) SIEMPRE usan être en passé composé, sin excepción. Ej: Je me suis levé(e) à 7h.',
}

// Banco amplio de verbos para el "Entrenamiento de Auxiliares".
// auxiliary: 'etre' | 'avoir'
export const auxiliaryTrainerVerbs = [
  { fr: 'Sortir', es: 'Salir', auxiliary: 'etre' },
  { fr: 'Aller', es: 'Ir', auxiliary: 'etre' },
  { fr: 'Venir', es: 'Venir', auxiliary: 'etre' },
  { fr: 'Entrer', es: 'Entrar', auxiliary: 'etre' },
  { fr: 'Arriver', es: 'Llegar', auxiliary: 'etre' },
  { fr: 'Partir', es: 'Irse', auxiliary: 'etre' },
  { fr: 'Monter', es: 'Subir', auxiliary: 'etre' },
  { fr: 'Descendre', es: 'Bajar', auxiliary: 'etre' },
  { fr: 'Naître', es: 'Nacer', auxiliary: 'etre' },
  { fr: 'Mourir', es: 'Morir', auxiliary: 'etre' },
  { fr: 'Rester', es: 'Quedarse', auxiliary: 'etre' },
  { fr: 'Passer', es: 'Pasar', auxiliary: 'etre' },
  { fr: 'Retourner', es: 'Volver', auxiliary: 'etre' },
  { fr: 'Tomber', es: 'Caer', auxiliary: 'etre' },
  { fr: 'Devenir', es: 'Convertirse en', auxiliary: 'etre' },
  { fr: 'Revenir', es: 'Regresar', auxiliary: 'etre' },
  { fr: 'Se lever', es: 'Levantarse', auxiliary: 'etre' },
  { fr: "S'habiller", es: 'Vestirse', auxiliary: 'etre' },
  { fr: 'Se réveiller', es: 'Despertarse', auxiliary: 'etre' },
  { fr: 'Se promener', es: 'Pasear', auxiliary: 'etre' },
  { fr: 'Manger', es: 'Comer', auxiliary: 'avoir' },
  { fr: 'Faire', es: 'Hacer', auxiliary: 'avoir' },
  { fr: 'Prendre', es: 'Tomar / Coger', auxiliary: 'avoir' },
  { fr: 'Parler', es: 'Hablar', auxiliary: 'avoir' },
  { fr: 'Avoir', es: 'Tener / Haber', auxiliary: 'avoir' },
  { fr: 'Être', es: 'Ser / Estar', auxiliary: 'avoir' },
  { fr: 'Voir', es: 'Ver', auxiliary: 'avoir' },
  { fr: 'Vouloir', es: 'Querer', auxiliary: 'avoir' },
  { fr: 'Pouvoir', es: 'Poder', auxiliary: 'avoir' },
  { fr: 'Devoir', es: 'Deber', auxiliary: 'avoir' },
  { fr: 'Dire', es: 'Decir', auxiliary: 'avoir' },
  { fr: 'Écrire', es: 'Escribir', auxiliary: 'avoir' },
  { fr: 'Lire', es: 'Leer', auxiliary: 'avoir' },
  { fr: 'Boire', es: 'Beber', auxiliary: 'avoir' },
  { fr: 'Acheter', es: 'Comprar', auxiliary: 'avoir' },
  { fr: 'Travailler', es: 'Trabajar', auxiliary: 'avoir' },
  { fr: 'Visiter', es: 'Visitar', auxiliary: 'avoir' },
  { fr: 'Réserver', es: 'Reservar', auxiliary: 'avoir' },
  { fr: 'Apprendre', es: 'Aprender', auxiliary: 'avoir' },
  { fr: 'Comprendre', es: 'Entender', auxiliary: 'avoir' },
  { fr: 'Attendre', es: 'Esperar', auxiliary: 'avoir' },
  { fr: 'Perdre', es: 'Perder', auxiliary: 'avoir' },
  { fr: 'Trouver', es: 'Encontrar', auxiliary: 'avoir' },
  { fr: 'Connaître', es: 'Conocer', auxiliary: 'avoir' },
]

// Ejercicio: elegir Passé Composé vs Imparfait según el contexto.
export const tenseChoiceExercises = [
  {
    sentence: 'Quand je ___ (être) petit, je ___ (jouer) au foot tous les jours.',
    options: ['étais / jouais', 'ai été / ai joué', 'étais / ai joué'],
    correctIndex: 0,
    explanation: 'Descripción + rutina pasada → Imparfait en ambos verbos: "étais" (era) y "jouais" (jugaba habitualmente).',
  },
  {
    sentence: 'Hier soir, nous ___ (aller) au cinéma et nous ___ (voir) un bon film.',
    options: ['allions / voyions', 'sommes allés / avons vu', 'allions / avons vu'],
    correctIndex: 1,
    explanation: '"Hier soir" marca una acción puntual y cerrada → Passé Composé: "sommes allés" (être) y "avons vu" (avoir).',
  },
  {
    sentence: "Il ___ (pleuvoir) quand je ___ (sortir) de la maison.",
    options: ['pleuvait / suis sorti(e)', 'a plu / sortais', 'pleuvait / sortais'],
    correctIndex: 0,
    explanation: 'La acción de fondo (descripción del clima) va en Imparfait ("pleuvait"); la acción puntual que interrumpe va en Passé Composé ("suis sorti(e)").',
  },
  {
    sentence: "L'année dernière, je ___ (voyager) trois fois en Italie.",
    options: ['voyageais', 'ai voyagé', 'suis voyagé'],
    correctIndex: 1,
    explanation: '"Trois fois" + "l\'année dernière" = hecho contado y cerrado → Passé Composé: "ai voyagé" (voyager se conjuga con avoir).',
  },
  {
    sentence: 'Avant, elle ___ (habiter) à Madrid, mais maintenant elle vit à Paris.',
    options: ['a habité', 'habitait', 'est habitée'],
    correctIndex: 1,
    explanation: '"Avant... mais maintenant" describe un estado pasado que cambió → Imparfait: "habitait".',
  },
  {
    sentence: 'Ce matin, je ___ (se lever) à 6h et je ___ (prendre) le train.',
    options: ['me levais / prenais', 'me suis levé(e) / ai pris', 'me suis levé(e) / prenais'],
    correctIndex: 1,
    explanation: '"Ce matin" + dos acciones puntuales y encadenadas → Passé Composé en ambas: "me suis levé(e)" (pronominal, être) y "ai pris" (avoir).',
  },
  {
    sentence: 'Pendant les vacances, nous ___ (faire) une randonnée chaque jour.',
    options: ['avons fait', 'faisions', 'sommes faits'],
    correctIndex: 1,
    explanation: '"Chaque jour" indica una rutina repetida durante las vacaciones → Imparfait: "faisions".',
  },
  {
    sentence: "Soudain, le téléphone ___ (sonner) pendant que je ___ (dîner).",
    options: ['sonnait / dînais', 'a sonné / dînais', 'a sonné / ai dîné'],
    correctIndex: 1,
    explanation: '"Soudain" marca la acción puntual que interrumpe ("a sonné", passé composé); la acción de fondo va en imparfait ("dînais").',
  },
]

export const futurProcheExercises = [
  { sentence: 'Demain, je ___ (visiter) le Louvre.', answer: 'vais visiter', translation: 'Mañana, voy a visitar el Louvre.' },
  { sentence: 'Nous ___ (partir) en vacances la semaine prochaine.', answer: 'allons partir', translation: 'Nos vamos de vacaciones la semana que viene.' },
  { sentence: 'Tu ___ (adorer) ce restaurant, je te le promets.', answer: 'vas adorer', translation: 'Vas a adorar este restaurante, te lo prometo.' },
  { sentence: 'Ils ___ (prendre) le train de 9h.', answer: 'vont prendre', translation: 'Van a tomar el tren de las 9h.' },
  { sentence: 'Cet été, je ___ (voyager) en France.', answer: 'vais voyager', translation: 'Este verano, voy a viajar a Francia.' },
]
