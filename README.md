# Portafolio web

Portafolio personal hecho con HTML, CSS y JavaScript para Skillnest.

## Estructura

```
portafolio/
├── index.html
├── css/styles.css
├── js/script.js
├── img/          (capturas de tus proyectos)
└── video/        (presentacion.mp4)
```

## Qué debes cambiar antes de entregar

1. En `index.html` busca y reemplaza:
   - `Nombre Apellido` por tu nombre (y `NA.dev` en el logo)
   - `tu-usuario` por tu usuario de GitHub
   - `tu-correo@gmail.com` por tu correo profesional (también en `js/script.js`)
   - `tu-perfil` por tu perfil de LinkedIn
2. Revisa los textos de "Sobre mí", los niveles de las habilidades (`data-nivel`) y las tareas.
3. Agrega en `img/` las capturas: `cinepedia.png`, `bookhub.png`, `portafolio.png`, `video-portada.png`.
4. Graba tu video y guárdalo como `video/presentacion.mp4` (idealmente menos de 25 MB).

## Publicar en GitHub Pages

1. Crea un repositorio nuevo y exclusivo, por ejemplo `portafolio`.
2. Sube los archivos:
   ```
   git init
   git add .
   git commit -m "Primera versión del portafolio"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/portafolio.git
   git push -u origin main
   ```
3. En GitHub: Settings → Pages → Source: `Deploy from a branch` → Branch: `main` y carpeta `/ (root)`.
4. Espera uno o dos minutos. Tu sitio quedará en `https://tu-usuario.github.io/portafolio/`.
