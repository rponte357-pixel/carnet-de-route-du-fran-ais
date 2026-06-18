// "Redacciones Modeladas" — plantillas de escritura para la prueba B1.
// Cada plantilla tiene una lista de "blanks" (huecos) que el usuario rellena
// con sus datos reales; el texto final se compone sustituyendo cada {clave}.

export const writingTemplates = [
  {
    id: 'famille',
    title: 'Ma Famille',
    titleEs: 'Mi Familia',
    template:
      "Dans ma famille, nous sommes {nombrePersonas}. J'ai un(e) {parentesco} qui s'appelle {nombreParentesco}. Nous sommes très uni(e)s. Pendant le week-end, nous aimons {actividad} ensemble parce que c'est relaxant.",
    blanks: [
      { key: 'nombrePersonas', label: 'Número de personas', placeholder: 'ej: quatre' },
      { key: 'parentesco', label: 'Parentesco', placeholder: 'ej: frère / sœur' },
      { key: 'nombreParentesco', label: 'Nombre', placeholder: 'ej: Paul' },
      { key: 'actividad', label: 'Actividad en familia', placeholder: 'ej: faire des randonnées' },
    ],
  },
  {
    id: 'vacances',
    title: 'Les Vacances Passées',
    titleEs: 'Las Vacaciones Pasadas',
    template:
      "L'année dernière, je suis allé(e) à {lugar}. Le voyage était fantastique. Il {tiempo}. J'ai visité des monuments importants et j'ai goûté la cuisine locale. C'était une expérience inoubliable !",
    blanks: [
      { key: 'lugar', label: 'Lugar', placeholder: 'ej: Madrid' },
      { key: 'tiempo', label: 'Tiempo (clima)', placeholder: 'ej: faisait très beau' },
    ],
  },
  {
    id: 'travail',
    title: 'Mon Travail et Ma Profession',
    titleEs: 'Mi Trabajo',
    template:
      "Je suis {profesion}. Je travaille dans {lugarTrabajo} depuis {tiempoTrabajo}. J'aime mon travail parce que c'est dynamique, même si c'est parfois un peu fatigant. Actuellement, j'apprends le français pour améliorer mes compétences.",
    blanks: [
      { key: 'profesion', label: 'Profesión', placeholder: 'ej: professeur / ingénieur' },
      { key: 'lugarTrabajo', label: 'Lugar de trabajo', placeholder: 'ej: une école / un bureau' },
      { key: 'tiempoTrabajo', label: 'Tiempo trabajando', placeholder: 'ej: trois ans' },
    ],
  },
  {
    id: 'voyage-futur',
    title: 'Mon Prochain Voyage',
    titleEs: 'Mi Próximo Viaje (futur proche)',
    template:
      'Cet été, je vais voyager à {destino}. Je vais y aller en {transporte} et je vais rester {duracion}. Je vais visiter {actividadViaje} et je vais goûter la cuisine locale. Je suis très impatient(e) !',
    blanks: [
      { key: 'destino', label: 'Destino', placeholder: 'ej: Lisbonne' },
      { key: 'transporte', label: 'Medio de transporte', placeholder: 'ej: avion / train' },
      { key: 'duracion', label: 'Duración', placeholder: 'ej: une semaine' },
      { key: 'actividadViaje', label: 'Lugar/actividad a visitar', placeholder: 'ej: la vieille ville' },
    ],
  },
]
