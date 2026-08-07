# Julio Ochoa Medrano — Portafolio

Portafolio  personal. Sitio publicado en [julioochoa08.github.io](https://julioochoa08.github.io/).
 
## Estructura del proyecto

```
Julio.Ochoa/
├── index.html          # Página principal
├── css/
│   ├── tokens.css      # Variables de diseño
│   ├── base.css        # Estilos base
│   ├── components.css  # Botones, cards, nav…
│   ├── layout.css      # Hero, secciones, grids
│   └── animations.css  # Typewriter, reveal, hover
├── js/
│   ├── main.js         # Menú, formulario, accesibilidad
│   └── animations.js   # Animaciones del hero
├── img/
│   ├── profile_duo.jpg
│   └── CV_JULIO_OCHOA.pdf
├── .nojekyll           # Necesario para GitHub Pages
└── _deploy/            # Clon Git para publicar (no editar aquí)
```

## Desarrollo local

### Con npm (recomendado)

```powershell
cd "c:\Users\usuario\Desktop\Paginas_webs_Julio\Julio.Ochoa"
npm install
npm start
```

Abre **http://localhost:3457**

Sin instalar dependencias (una sola vez):

```powershell
npx serve -l 3457
```


## Publicar en GitHub Pages

1. Edita los archivos en la **raíz** de este proyecto (no en `_deploy/`).
2. Copia los cambios a `_deploy/` o haz push desde esa carpeta al repo `JulioOchoa08.github.io`.
3. En GitHub: **Settings → Pages → Branch `main` / folder `/ (root)`**.

## Personalizar

| Qué cambiar | Dónde |
|-------------|--------|
| Textos y secciones | `index.html` |
| Colores y tipografía | `css/tokens.css` |
| Email de contacto | `data-email` en `#contact-form` |
| Foto y CV | `img/` |
