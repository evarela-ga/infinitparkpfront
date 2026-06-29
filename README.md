# Infinito Water Park — Plataforma Digital 360° (Prototipo)

Prototipo interactivo completo de la plataforma digital de **Infinito Water Park**,
el parque acuático más grande de Argentina (Córdoba). Navegable 100% en el browser,
sin backend, multiidioma (Español / English / Português).

---

## 🚀 Deploy en GitHub Pages (paso a paso)

1. **Creá un repositorio** en GitHub (público), por ejemplo `infinito-waterpark`.
2. **Subí todos los archivos** de esta carpeta **manteniendo la estructura** (incluyendo
   la carpeta `uploads/`, `support.js`, `i18n.js`, `image-slot.js` y el archivo `.nojekyll`).
   - Por la web: *Add file → Upload files* y arrastrá todo.
   - Por consola:
     ```bash
     git init
     git add .
     git commit -m "Infinito Water Park - prototipo"
     git branch -M main
     git remote add origin https://github.com/USUARIO/infinito-waterpark.git
     git push -u origin main
     ```
3. En el repo: **Settings → Pages**.
4. En **Source**, elegí **Deploy from a branch**, branch **main** y carpeta **/ (root)**. Guardá.
5. Esperá ~1–2 minutos. Tu sitio queda online en:
   ```
   https://USUARIO.github.io/infinito-waterpark/
   ```

> El archivo `.nojekyll` ya está incluido para que GitHub Pages sirva todos los
> archivos tal cual (sin procesarlos con Jekyll). No lo borres.

---

## 🌐 Cómo funciona

- **`index.html`** es la portada: muestra un splash de marca y redirige a la landing real
  (`index.dc.html`). Es el archivo que GitHub Pages abre por defecto.
- Todas las pantallas son archivos `.dc.html` autocontenidos que se enlazan entre sí con
  rutas relativas — la navegación funciona directo, sin servidor propio.
- Librerías (React, Chart.js, QRCode, Tabler Icons, Google Fonts) se cargan desde CDN,
  por lo que se necesita **conexión a internet** para visualizarlo.

---

## 🗺 Mapa de pantallas

### Experiencia pública (huésped sin registrar)
| Archivo | Pantalla |
|---|---|
| `index.dc.html` | Landing institucional (hero de olas animadas) |
| `atracciones.dc.html` | Atracciones + mapa interactivo de las 7 zonas |
| `gastronomia.dc.html` | Gastronomía y pulsera cashless |
| `tickets.dc.html` | Tickets — selección de fecha y tipo |
| `checkout.dc.html` | Checkout en 3 pasos |
| `confirmacion.dc.html` | Confirmación + QR digital |
| `estacionamiento.dc.html` | Estacionamiento en tiempo real |
| `como-llegar.dc.html` | Cómo llegar |
| `noticias.dc.html` | Noticias / Blog |
| `faq.dc.html` | Preguntas frecuentes |
| `contacto.dc.html` | Contacto |

### Portal del huésped (registrado)
| Archivo | Pantalla |
|---|---|
| `mi-cuenta.dc.html` | Login / Registro |
| `dashboard-huesped.dc.html` | Dashboard personal |
| `mis-tickets.dc.html` | Mis tickets + wallet QR |
| `mi-pulsera.dc.html` | Pulsera cashless |
| `planificador.dc.html` | Planificador de visita |
| `infinito-pass.dc.html` | InfinitoPass — gamificación |

### Backoffice operativo
| Archivo | Pantalla |
|---|---|
| `backoffice-login.dc.html` | Login backoffice |
| `backoffice-dashboard.dc.html` | Dashboard ejecutivo |
| `backoffice-acceso.dc.html` | Control de acceso |
| `backoffice-estacionamiento.dc.html` | Gestión de estacionamiento |
| `backoffice-tickets.dc.html` | Tickets & Ventas |
| `backoffice-atracciones.dc.html` | Panel de atracciones |
| `backoffice-gastronomia.dc.html` | Gastronomía / F&B |
| `backoffice-crm.dc.html` | CRM de visitantes |
| `backoffice-gamificacion.dc.html` | Gamificación InfinitoPass |
| `backoffice-reportes.dc.html` | Reportes & Analytics |
| `backoffice-config.dc.html` | Configuración del sistema |

### Roles operativos (tablets / móvil in-situ)
| Archivo | Pantalla |
|---|---|
| `rol-acceso.dc.html` | Punto de escaneo QR (torniquete) |
| `rol-atraccion.dc.html` | Tablet de operador de atracción |
| `rol-pos.dc.html` | POS gastronómico |
| `rol-seguridad.dc.html` | Seguridad y emergencias |
| `rol-guardavidas.dc.html` | Panel de guardavidas |
| `rol-mantenimiento.dc.html` | Consola de limpieza y mantenimiento |

---

## 👤 Credenciales de demo

**Backoffice:** `admin@infinitowaterpark.com` / `demo2026`

## 🌎 Idiomas

Selector flotante (abajo a la izquierda): **ES / EN / PT**. Traduce textos, fechas y montos,
y recuerda la elección entre páginas.

## 🛠 Tecnologías

HTML + CSS + JavaScript · React (runtime) · Chart.js · QRCode.js · Tabler Icons · Google Fonts (Poppins + Inter)

---

© 2026 Infinito Water Park — Prototipo de presentación.
