# Carnet de Route — Repaso Francés B1 (EOI)

Aplicación React para preparar la prueba oficial de **Francés B1 de la EOI**: gramática esencial, entrenamiento de auxiliares (être/avoir), passé composé vs. imparfait, conectores de nivel B1, redacciones modeladas y vocabulario temático (familia, trabajo y profesiones, nacionalidad, comida y viajes).

El progreso de cada entrenamiento se guarda automáticamente en el navegador (`localStorage`), así que puedes cerrar la pestaña y seguir donde lo dejaste.

## Secciones incluidas

- **Gramática** — resumen de Passé Composé, Imparfait y Futur Proche, con la lista de los 14 verbos de être y la regla de los verbos pronominales.
- **Auxiliares** — juego de "¿être o avoir?" con más de 40 verbos.
- **Tiempos** — ejercicios de elección entre passé composé e imparfait, más práctica de futur proche.
- **Conectores** — fórmulas para ganar tiempo, ordenar, opinar, contrastar, etc., con ejercicio de uso.
- **Redacción** — plantillas tipo "rellena el hueco" para Mi Familia, Mis Vacaciones, Mi Trabajo y Mi Próximo Viaje.
- **Vocabulario** — tarjetas (flashcards) y quiz de opción múltiple para 5 categorías: familia, trabajo/profesiones, nacionalidad, comida y viajes (más de 120 palabras en total).
- **Progreso** — panel resumen con tu porcentaje de aciertos por categoría.
- **Audio en francés** — botón de altavoz 🔊 en las tarjetas, el entrenador de auxiliares, el quiz y los ejercicios de tiempos. Usa la voz del propio navegador (no necesita conexión ni instalar nada). El sonido se activa tras el primer clic en la página, como exigen los navegadores.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js)

## Instalación y uso en local

```bash
npm install
npm run dev
```

Abre la URL que indique la terminal (normalmente `http://localhost:5173`).

## Compilar para producción

```bash
npm run build
npm run preview   # para probar la build localmente
```

Los archivos finales se generan en la carpeta `dist/`.

## Subir el proyecto a GitHub

```bash
git init
git add .
git commit -m "Carnet de Route: app de repaso para el francés B1 (EOI)"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

## Publicar gratis con GitHub Pages

1. En `vite.config.js`, cambia `base: './'` por `base: '/TU-REPOSITORIO/'` (el nombre exacto de tu repositorio).
2. Instala la dependencia de despliegue (ya incluida en `package.json`) y publica:
   ```bash
   npm run deploy
   ```
3. En GitHub, ve a **Settings → Pages** y selecciona la rama `gh-pages` como origen.
4. Tu app quedará publicada en `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

> Alternativa sin configuración: importa el repositorio en [Vercel](https://vercel.com) o [Netlify](https://netlify.com) — detectan Vite automáticamente y no necesitas tocar `base`.

## Actualizar el proyecto después de hacer cambios

Una vez que el proyecto ya está en GitHub, cada vez que modifiques algo (añadir vocabulario, cambiar un componente, etc.) sigue este ciclo.

### 1. Prueba el cambio en local

Mientras editas, deja `npm run dev` corriendo: se recarga solo al guardar. Cuando termines, párralo con `Ctrl + C` y comprueba que la versión final compila bien:

```bash
npm run build
npm run preview
```

Abre la URL exacta que imprima la terminal. Si usas `base: '/TU-REPOSITORIO/'`, la app vive en esa subruta (no en la raíz).

### 2. Sube los cambios a GitHub (rama main)

```bash
git add .
git commit -m "Describe aquí qué cambiaste"
git push
```

- `git add .` prepara todos los archivos modificados.
- `git commit -m "..."` guarda el cambio con un mensaje que lo describa.
- `git push` lo envía a GitHub. (Solo la primera vez se usa `git push -u origin main`; después basta con `git push`.)

### 3. Vuelve a publicar la versión online

Subir a `main` actualiza el **código fuente**, pero la web publicada en GitHub Pages no cambia hasta que vuelves a desplegar:

```bash
npm run deploy
```

Este comando recompila la app y actualiza la rama `gh-pages`. En uno o dos minutos verás los cambios en `https://TU-USUARIO.github.io/TU-REPOSITORIO/` (refresca con `Cmd + Shift + R` si tu navegador muestra la versión antigua en caché).

> En Vercel o Netlify no hace falta el paso 3: cada `git push` redespliega la web automáticamente.

### Resumen rápido

| Quiero... | Comando |
|---|---|
| Ver el cambio mientras trabajo | `npm run dev` |
| Probar la versión final en local | `npm run build` y luego `npm run preview` |
| Guardar y subir el código a GitHub | `git add .` → `git commit -m "..."` → `git push` |
| Actualizar la web publicada (GitHub Pages) | `npm run deploy` |

## Ampliar el contenido

Todo el contenido vive en `src/data/`, separado de los componentes, para que sea fácil añadir más material sin tocar la lógica:

- `grammar.js` — reglas, verbos de être/avoir y ejercicios de tiempos.
- `connectors.js` — conectores y su ejercicio.
- `vocabulary.js` — palabras de cada categoría temática.
- `writingTemplates.js` — plantillas de redacción.

Para añadir una palabra nueva de vocabulario, por ejemplo, basta con añadir un objeto `{ fr: '...', es: '...' }` al array de la categoría correspondiente en `vocabulary.js`; aparecerá automáticamente en las tarjetas y en el quiz.

## Estructura del proyecto

```
src/
├── App.jsx                 # Navegación principal entre secciones
├── index.css                # Sistema de diseño "carnet de viaje"
├── main.jsx                 # Punto de entrada
├── components/              # Componentes de UI
├── data/                    # Contenido de estudio (editable)
└── hooks/
    └── useProgress.js       # Persistencia del progreso en localStorage
```

---

Bon courage pour l'examen ! 🇫🇷
