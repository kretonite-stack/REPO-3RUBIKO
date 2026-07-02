# 3Kubiko — Landing corporativa

Sitio construido en **Astro**, desplegado en **Vercel**, con **Supabase** como
backend (formulario de contacto). Sigue la dirección visual oficial del kit
de marca: arco **noche → amanecer** a lo largo de la página.

## Stack
- [Astro](https://astro.build) 7 (output estático + adapter de Vercel)
- Tailwind CSS 4 (vía plugin de Vite)
- Supabase (`@supabase/supabase-js`)

## Setup local

```bash
npm install
cp .env.example .env   # completa las variables (ver abajo)
npm run dev
```

## Variables de entorno

Ver `.env.example`. Resumen:

| Variable | Dónde conseguirla |
|---|---|
| `PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API (anon/public key, **no** la service_role) |
| `PUBLIC_HERO_VIDEO_URL` | URL directa del video en Cloudinary (`res.cloudinary.com/.../video/upload/....mp4`) |
| `PUBLIC_HERO_POSTER_URL` | Poster del hero (idealmente `poster_transition.webp` del kit, ver pendientes) |

En Vercel, estas mismas variables se configuran en **Project Settings → Environment Variables**.

## Base de datos

Correr `supabase/schema.sql` en el SQL editor de tu proyecto Supabase para
crear la tabla `contact_messages` con RLS habilitada (solo permite `insert`
público, sin lectura desde el cliente).

## Arco narrativo (kit visual oficial)

1. **Hero** (noche) — video Cloudinary, zona segura tercio izquierdo.
2. **Nosotros** (claro) — fondo `bg_about_warm_concrete.png`.
3. **Servicios** (noche profunda) — fondo `bg_services_night.jpg`, íconos outline.
4. **Proyectos** (oscuro, topográfico) — fondo `bg_projects_topographic.png`.
5. **Proceso** (twilight) — fondo `bg_glass_twilight.png`, tarjetas glassmorphism.
6. **Contacto / CTA** (amanecer) — fondo `bg_cta_sunrise.jpg`, formulario a Supabase.

Paleta y tipografía ya están tomadas de `04_ui/tokens.css` del kit y viven en
`src/styles/global.css` (una sola fuente de verdad para todo el sitio).

## Pendiente — assets del kit visual

El código ya está preparado para recibirlos (rutas comentadas con `TODO` en
cada componente), pero faltan subir los archivos binarios del kit
(`3kubiko_visual_kit/`) a este repo:

- [ ] `01_brand/*` → logo, a `public/brand/`
- [ ] `02_hero/poster_transition.webp` → poster real del hero (hoy usa el generado por Cloudinary)
- [ ] `03_backgrounds/*` → fondos de cada sección, a `public/backgrounds/`
- [ ] `05_icons/*.svg` → iconografía real, a `public/icons/` (hoy hay placeholders circulares)
- [ ] Copy completo del subtítulo del Hero y de las secciones sin texto (Nosotros, Servicios, Proyectos, Proceso)
- [ ] Contenido real de Proyectos (el kit no traía casos específicos)

## Despliegue

Conectar el repo en Vercel (Import Project → GitHub → REPO-3RUBIKO), configurar
las variables de entorno de la tabla de arriba, y cada push a `main` despliega
automáticamente.
