// Datos de verbos para la pestaña "Verbos".
// Cada verbo incluye su participio y la conjugación completa en
// passé composé (las 6 personas), con el texto que se leerá en voz alta.
//
// Para añadir un verbo nuevo, basta con sumar un objeto al array que
// corresponda. La conjugación de avoir se genera automáticamente con
// el helper conjAvoir(); las de être/reflexivos están escritas a mano
// porque el participio concuerda con el sujeto.

// ---------- Grupo 1: auxiliar AVOIR ----------
// El participio NO cambia. Estructura: pronombre + avoir + participio.

const avoirForms = [
  { p: "J'", aux: 'ai' },
  { p: 'Tu ', aux: 'as' },
  { p: 'Il/Elle ', aux: 'a' },
  { p: 'Nous ', aux: 'avons' },
  { p: 'Vous ', aux: 'avez' },
  { p: 'Ils/Elles ', aux: 'ont' },
]

// Genera las 6 formas del passé composé con avoir para un participio dado.
function conjAvoir(participle) {
  return avoirForms.map(({ p, aux }) => ({
    text: `${p}${aux} ${participle}`,
    // Para el audio juntamos pronombre + auxiliar + participio.
    speak: `${p.trim()} ${aux} ${participle}`,
  }))
}

const avoirVerbsRaw = [
  ['avoir', 'eu', 'tener / haber'],
  ['être', 'été', 'ser / estar'],
  ['faire', 'fait', 'hacer'],
  ['dire', 'dit', 'decir'],
  ['pouvoir', 'pu', 'poder'],
  ['vouloir', 'voulu', 'querer'],
  ['savoir', 'su', 'saber'],
  ['voir', 'vu', 'ver'],
  ['devoir', 'dû', 'deber / tener que'],
  ['prendre', 'pris', 'tomar / coger'],
  ['donner', 'donné', 'dar'],
  ['parler', 'parlé', 'hablar'],
  ['manger', 'mangé', 'comer'],
  ['aimer', 'aimé', 'amar / gustar'],
  ['trouver', 'trouvé', 'encontrar'],
  ['demander', 'demandé', 'pedir / preguntar'],
  ['comprendre', 'compris', 'entender'],
  ['mettre', 'mis', 'poner'],
  ['croire', 'cru', 'creer'],
  ['entendre', 'entendu', 'escuchar / oír'],
  ['penser', 'pensé', 'pensar'],
  ['laisser', 'laissé', 'dejar'],
  ['regarder', 'regardé', 'mirar'],
  ['répondre', 'répondu', 'responder'],
  ['perdre', 'perdu', 'perder'],
  ['gagner', 'gagné', 'ganar'],
  ['acheter', 'acheté', 'comprar'],
  ['finir', 'fini', 'terminar'],
  ['choisir', 'choisi', 'elegir'],
  ['vendre', 'vendu', 'vender'],
  ['lire', 'lu', 'leer'],
  ['écrire', 'écrit', 'escribir'],
  ['ouvrir', 'ouvert', 'abrir'],
  ['fermer', 'fermé', 'cerrar'],
  ['apprendre', 'appris', 'aprender'],
  ['attendre', 'attendu', 'esperar'],
  ['boire', 'bu', 'beber'],
  ['connaître', 'connu', 'conocer'],
  ['sentir', 'senti', 'sentir / oler'],
  ['payer', 'payé', 'pagar'],
]

export const avoirVerbs = avoirVerbsRaw.map(([fr, participle, es]) => ({
  fr,
  participle,
  es,
  conjugation: conjAvoir(participle),
}))

// ---------- Grupo 2: verbos REFLEXIVOS (auxiliar être) ----------
// El participio concuerda con el sujeto. Lista escrita a mano.

export const reflexiveVerbs = [
  {
    fr: 'se laver', participle: 'lavé', es: 'lavarse',
    conjugation: [
      { text: 'Je me suis lavé(e)', speak: 'Je me suis lavé' },
      { text: "Tu t'es lavé(e)", speak: "Tu t'es lavé" },
      { text: "Il s'est lavé / Elle s'est lavée", speak: "Il s'est lavé. Elle s'est lavée" },
      { text: 'Nous nous sommes lavé(e)s', speak: 'Nous nous sommes lavés' },
      { text: 'Vous vous êtes lavé(e)s', speak: 'Vous vous êtes lavés' },
      { text: 'Ils se sont lavés / Elles se sont lavées', speak: 'Ils se sont lavés. Elles se sont lavées' },
    ],
  },
  {
    fr: 'se lever', participle: 'levé', es: 'levantarse',
    conjugation: [
      { text: 'Je me suis levé(e)', speak: 'Je me suis levé' },
      { text: "Tu t'es levé(e)", speak: "Tu t'es levé" },
      { text: "Il s'est levé / Elle s'est levée", speak: "Il s'est levé. Elle s'est levée" },
      { text: 'Nous nous sommes levé(e)s', speak: 'Nous nous sommes levés' },
      { text: 'Vous vous êtes levé(e)s', speak: 'Vous vous êtes levés' },
      { text: 'Ils se sont levés / Elles se sont levées', speak: 'Ils se sont levés. Elles se sont levées' },
    ],
  },
  {
    fr: 'se coucher', participle: 'couché', es: 'acostarse',
    conjugation: [
      { text: 'Je me suis couché(e)', speak: 'Je me suis couché' },
      { text: "Tu t'es couché(e)", speak: "Tu t'es couché" },
      { text: "Il s'est couché / Elle s'est couchée", speak: "Il s'est couché. Elle s'est couchée" },
      { text: 'Nous nous sommes couché(e)s', speak: 'Nous nous sommes couchés' },
      { text: 'Vous vous êtes couché(e)s', speak: 'Vous vous êtes couchés' },
      { text: 'Ils se sont couchés / Elles se sont couchées', speak: 'Ils se sont couchés. Elles se sont couchées' },
    ],
  },
  {
    fr: "s'habiller", participle: 'habillé', es: 'vestirse',
    conjugation: [
      { text: "Je me suis habillé(e)", speak: 'Je me suis habillé' },
      { text: "Tu t'es habillé(e)", speak: "Tu t'es habillé" },
      { text: "Il s'est habillé / Elle s'est habillée", speak: "Il s'est habillé. Elle s'est habillée" },
      { text: 'Nous nous sommes habillé(e)s', speak: 'Nous nous sommes habillés' },
      { text: 'Vous vous êtes habillé(e)s', speak: 'Vous vous êtes habillés' },
      { text: 'Ils se sont habillés / Elles se sont habillées', speak: 'Ils se sont habillés. Elles se sont habillées' },
    ],
  },
  {
    fr: 'se réveiller', participle: 'réveillé', es: 'despertarse',
    conjugation: [
      { text: 'Je me suis réveillé(e)', speak: 'Je me suis réveillé' },
      { text: "Tu t'es réveillé(e)", speak: "Tu t'es réveillé" },
      { text: "Il s'est réveillé / Elle s'est réveillée", speak: "Il s'est réveillé. Elle s'est réveillée" },
      { text: 'Nous nous sommes réveillé(e)s', speak: 'Nous nous sommes réveillés' },
      { text: 'Vous vous êtes réveillé(e)s', speak: 'Vous vous êtes réveillés' },
      { text: 'Ils se sont réveillés / Elles se sont réveillées', speak: 'Ils se sont réveillés. Elles se sont réveillées' },
    ],
  },
  {
    fr: "s'appeler", participle: 'appelé', es: 'llamarse',
    conjugation: [
      { text: "Je me suis appelé(e)", speak: 'Je me suis appelé' },
      { text: "Tu t'es appelé(e)", speak: "Tu t'es appelé" },
      { text: "Il s'est appelé / Elle s'est appelée", speak: "Il s'est appelé. Elle s'est appelée" },
      { text: 'Nous nous sommes appelé(e)s', speak: 'Nous nous sommes appelés' },
      { text: 'Vous vous êtes appelé(e)s', speak: 'Vous vous êtes appelés' },
      { text: 'Ils se sont appelés / Elles se sont appelées', speak: 'Ils se sont appelés. Elles se sont appelées' },
    ],
  },
  {
    fr: 'se dépêcher', participle: 'dépêché', es: 'darse prisa',
    conjugation: [
      { text: 'Je me suis dépêché(e)', speak: 'Je me suis dépêché' },
      { text: "Tu t'es dépêché(e)", speak: "Tu t'es dépêché" },
      { text: "Il s'est dépêché / Elle s'est dépêchée", speak: "Il s'est dépêché. Elle s'est dépêchée" },
      { text: 'Nous nous sommes dépêché(e)s', speak: 'Nous nous sommes dépêchés' },
      { text: 'Vous vous êtes dépêché(e)s', speak: 'Vous vous êtes dépêchés' },
      { text: 'Ils se sont dépêchés / Elles se sont dépêchées', speak: 'Ils se sont dépêchés. Elles se sont dépêchées' },
    ],
  },
  {
    fr: 'se promener', participle: 'promené', es: 'pasear',
    conjugation: [
      { text: 'Je me suis promené(e)', speak: 'Je me suis promené' },
      { text: "Tu t'es promené(e)", speak: "Tu t'es promené" },
      { text: "Il s'est promené / Elle s'est promenée", speak: "Il s'est promené. Elle s'est promenée" },
      { text: 'Nous nous sommes promené(e)s', speak: 'Nous nous sommes promenés' },
      { text: 'Vous vous êtes promené(e)s', speak: 'Vous vous êtes promenés' },
      { text: 'Ils se sont promenés / Elles se sont promenées', speak: 'Ils se sont promenés. Elles se sont promenées' },
    ],
  },
  {
    fr: 'se reposer', participle: 'reposé', es: 'descansar',
    conjugation: [
      { text: 'Je me suis reposé(e)', speak: 'Je me suis reposé' },
      { text: "Tu t'es reposé(e)", speak: "Tu t'es reposé" },
      { text: "Il s'est reposé / Elle s'est reposée", speak: "Il s'est reposé. Elle s'est reposée" },
      { text: 'Nous nous sommes reposé(e)s', speak: 'Nous nous sommes reposés' },
      { text: 'Vous vous êtes reposé(e)s', speak: 'Vous vous êtes reposés' },
      { text: 'Ils se sont reposés / Elles se sont reposées', speak: 'Ils se sont reposés. Elles se sont reposées' },
    ],
  },
  {
    fr: 'se souvenir', participle: 'souvenu', es: 'acordarse / recordar',
    conjugation: [
      { text: 'Je me suis souvenu(e)', speak: 'Je me suis souvenu' },
      { text: "Tu t'es souvenu(e)", speak: "Tu t'es souvenu" },
      { text: "Il s'est souvenu / Elle s'est souvenue", speak: "Il s'est souvenu. Elle s'est souvenue" },
      { text: 'Nous nous sommes souvenu(e)s', speak: 'Nous nous sommes souvenus' },
      { text: 'Vous vous êtes souvenu(e)s', speak: 'Vous vous êtes souvenus' },
      { text: 'Ils se sont souvenus / Elles se sont souvenues', speak: 'Ils se sont souvenus. Elles se sont souvenues' },
    ],
  },
  {
    fr: "s'asseoir", participle: 'assis', es: 'sentarse',
    conjugation: [
      { text: "Je me suis assis(e)", speak: 'Je me suis assis' },
      { text: "Tu t'es assis(e)", speak: "Tu t'es assis" },
      { text: "Il s'est assis / Elle s'est assise", speak: "Il s'est assis. Elle s'est assise" },
      { text: 'Nous nous sommes assis(es)', speak: 'Nous nous sommes assis' },
      { text: 'Vous vous êtes assis(es)', speak: 'Vous vous êtes assis' },
      { text: 'Ils se sont assis / Elles se sont assises', speak: 'Ils se sont assis. Elles se sont assises' },
    ],
  },
  {
    fr: 'se tromper', participle: 'trompé', es: 'equivocarse',
    conjugation: [
      { text: 'Je me suis trompé(e)', speak: 'Je me suis trompé' },
      { text: "Tu t'es trompé(e)", speak: "Tu t'es trompé" },
      { text: "Il s'est trompé / Elle s'est trompée", speak: "Il s'est trompé. Elle s'est trompée" },
      { text: 'Nous nous sommes trompé(e)s', speak: 'Nous nous sommes trompés' },
      { text: 'Vous vous êtes trompé(e)s', speak: 'Vous vous êtes trompés' },
      { text: 'Ils se sont trompés / Elles se sont trompées', speak: 'Ils se sont trompés. Elles se sont trompées' },
    ],
  },
  {
    fr: "s'amuser", participle: 'amusé', es: 'divertirse',
    conjugation: [
      { text: "Je me suis amusé(e)", speak: 'Je me suis amusé' },
      { text: "Tu t'es amusé(e)", speak: "Tu t'es amusé" },
      { text: "Il s'est amusé / Elle s'est amusée", speak: "Il s'est amusé. Elle s'est amusée" },
      { text: 'Nous nous sommes amusé(e)s', speak: 'Nous nous sommes amusés' },
      { text: 'Vous vous êtes amusé(e)s', speak: 'Vous vous êtes amusés' },
      { text: 'Ils se sont amusés / Elles se sont amusées', speak: 'Ils se sont amusés. Elles se sont amusées' },
    ],
  },
  {
    fr: 'se fâcher', participle: 'fâché', es: 'enfadarse',
    conjugation: [
      { text: 'Je me suis fâché(e)', speak: 'Je me suis fâché' },
      { text: "Tu t'es fâché(e)", speak: "Tu t'es fâché" },
      { text: "Il s'est fâché / Elle s'est fâchée", speak: "Il s'est fâché. Elle s'est fâchée" },
      { text: 'Nous nous sommes fâché(e)s', speak: 'Nous nous sommes fâchés' },
      { text: 'Vous vous êtes fâché(e)s', speak: 'Vous vous êtes fâchés' },
      { text: 'Ils se sont fâchés / Elles se sont fâchées', speak: 'Ils se sont fâchés. Elles se sont fâchées' },
    ],
  },
  {
    fr: 'se préparer', participle: 'préparé', es: 'prepararse',
    conjugation: [
      { text: 'Je me suis préparé(e)', speak: 'Je me suis préparé' },
      { text: "Tu t'es préparé(e)", speak: "Tu t'es préparé" },
      { text: "Il s'est préparé / Elle s'est préparée", speak: "Il s'est préparé. Elle s'est préparée" },
      { text: 'Nous nous sommes préparé(e)s', speak: 'Nous nous sommes préparés' },
      { text: 'Vous vous êtes préparé(e)s', speak: 'Vous vous êtes préparés' },
      { text: 'Ils se sont préparés / Elles se sont préparées', speak: 'Ils se sont préparés. Elles se sont préparées' },
    ],
  },
  {
    fr: 'se raser', participle: 'rasé', es: 'afeitarse',
    conjugation: [
      { text: 'Je me suis rasé(e)', speak: 'Je me suis rasé' },
      { text: "Tu t'es rasé(e)", speak: "Tu t'es rasé" },
      { text: "Il s'est rasé / Elle s'est rasée", speak: "Il s'est rasé. Elle s'est rasée" },
      { text: 'Nous nous sommes rasé(e)s', speak: 'Nous nous sommes rasés' },
      { text: 'Vous vous êtes rasé(e)s', speak: 'Vous vous êtes rasés' },
      { text: 'Ils se sont rasés / Elles se sont rasées', speak: 'Ils se sont rasés. Elles se sont rasées' },
    ],
  },
  {
    fr: 'se brosser', participle: 'brossé', es: 'cepillarse',
    conjugation: [
      { text: 'Je me suis brossé(e)', speak: 'Je me suis brossé' },
      { text: "Tu t'es brossé(e)", speak: "Tu t'es brossé" },
      { text: "Il s'est brossé / Elle s'est brossée", speak: "Il s'est brossé. Elle s'est brossée" },
      { text: 'Nous nous sommes brossé(e)s', speak: 'Nous nous sommes brossés' },
      { text: 'Vous vous êtes brossé(e)s', speak: 'Vous vous êtes brossés' },
      { text: 'Ils se sont brossés / Elles se sont brossées', speak: 'Ils se sont brossés. Elles se sont brossées' },
    ],
  },
  {
    fr: 'se maquiller', participle: 'maquillé', es: 'maquillarse',
    conjugation: [
      { text: 'Je me suis maquillé(e)', speak: 'Je me suis maquillé' },
      { text: "Tu t'es maquillé(e)", speak: "Tu t'es maquillé" },
      { text: "Il s'est maquillé / Elle s'est maquillée", speak: "Il s'est maquillé. Elle s'est maquillée" },
      { text: 'Nous nous sommes maquillé(e)s', speak: 'Nous nous sommes maquillés' },
      { text: 'Vous vous êtes maquillé(e)s', speak: 'Vous vous êtes maquillés' },
      { text: 'Ils se sont maquillés / Elles se sont maquillées', speak: 'Ils se sont maquillés. Elles se sont maquillées' },
    ],
  },
  {
    fr: 'se disputer', participle: 'disputé', es: 'discutir / pelearse',
    conjugation: [
      { text: 'Je me suis disputé(e)', speak: 'Je me suis disputé' },
      { text: "Tu t'es disputé(e)", speak: "Tu t'es disputé" },
      { text: "Il s'est disputé / Elle s'est disputée", speak: "Il s'est disputé. Elle s'est disputée" },
      { text: 'Nous nous sommes disputé(e)s', speak: 'Nous nous sommes disputés' },
      { text: 'Vous vous êtes disputé(e)s', speak: 'Vous vous êtes disputés' },
      { text: 'Ils se sont disputés / Elles se sont disputées', speak: 'Ils se sont disputés. Elles se sont disputées' },
    ],
  },
  {
    fr: "s'intéresser", participle: 'intéressé', es: 'interesarse',
    conjugation: [
      { text: "Je me suis intéressé(e)", speak: 'Je me suis intéressé' },
      { text: "Tu t'es intéressé(e)", speak: "Tu t'es intéressé" },
      { text: "Il s'est intéressé / Elle s'est intéressée", speak: "Il s'est intéressé. Elle s'est intéressée" },
      { text: 'Nous nous sommes intéressé(e)s', speak: 'Nous nous sommes intéressés' },
      { text: 'Vous vous êtes intéressé(e)s', speak: 'Vous vous êtes intéressés' },
      { text: 'Ils se sont intéressés / Elles se sont intéressées', speak: 'Ils se sont intéressés. Elles se sont intéressées' },
    ],
  },
]

// ---------- Grupo 3: la CASA DE ÊTRE ----------
// Verbos de movimiento / cambio de estado. El participio concuerda.

function conjEtre(masc, fem) {
  // masc = participio masculino singular; fem = femenino singular.
  const mascPl = masc + 's'
  const femPl = fem + 's'
  return [
    { text: `Je suis ${masc}(e)`, speak: `Je suis ${masc}` },
    { text: `Tu es ${masc}(e)`, speak: `Tu es ${masc}` },
    { text: `Il est ${masc} / Elle est ${fem}`, speak: `Il est ${masc}. Elle est ${fem}` },
    { text: `Nous sommes ${mascPl}(es)`, speak: `Nous sommes ${mascPl}` },
    { text: `Vous êtes ${masc}(e)(s)`, speak: `Vous êtes ${masc}` },
    { text: `Ils sont ${mascPl} / Elles sont ${femPl}`, speak: `Ils sont ${mascPl}. Elles sont ${femPl}` },
  ]
}

const etreVerbsRaw = [
  // [infinitivo, participio masc, participio fem, significado]
  ['naître', 'né', 'née', 'nacer'],
  ['mourir', 'mort', 'morte', 'morir'],
  ['aller', 'allé', 'allée', 'ir'],
  ['venir', 'venu', 'venue', 'venir'],
  ['arriver', 'arrivé', 'arrivée', 'llegar'],
  ['partir', 'parti', 'partie', 'irse / partir'],
  ['entrer', 'entré', 'entrée', 'entrar'],
  ['sortir', 'sorti', 'sortie', 'salir'],
  ['rester', 'resté', 'restée', 'quedarse'],
  ['tomber', 'tombé', 'tombée', 'caerse'],
  ['monter', 'monté', 'montée', 'subir'],
  ['descendre', 'descendu', 'descendue', 'bajar'],
  ['passer', 'passé', 'passée', 'pasar (por un lugar)'],
  ['retourner', 'retourné', 'retournée', 'volver / regresar'],
  ['revenir', 'revenu', 'revenue', 'volver'],
  ['devenir', 'devenu', 'devenue', 'convertirse / llegar a ser'],
  ['rentrer', 'rentré', 'rentrée', 'volver a casa'],
]

export const etreVerbs = etreVerbsRaw.map(([fr, masc, fem, es]) => ({
  fr,
  participle: masc,
  es,
  conjugation: conjEtre(masc, fem),
}))

// ---------- Grupos para la pestaña ----------

export const verbGroups = [
  {
    id: 'avoir',
    label: 'Auxiliar Avoir',
    icon: '💼',
    verbs: avoirVerbs,
    note: 'El participio NO cambia. Estructura: pronombre + avoir + participio.',
  },
  {
    id: 'reflexivos',
    label: 'Reflexivos (Être)',
    icon: '🪞',
    verbs: reflexiveVerbs,
    note: 'Llevan pronombre reflexivo (me, te, se…) y auxiliar être. El participio concuerda con el sujeto: +e femenino, +s plural.',
  },
  {
    id: 'etre',
    label: 'Casa de Être',
    icon: '🏠',
    verbs: etreVerbs,
    note: 'Verbos de movimiento o cambio de estado. Auxiliar être y el participio concuerda con el sujeto: +e femenino, +s plural.',
  },
]
