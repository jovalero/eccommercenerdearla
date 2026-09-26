# HOLUX Rewards Cloud 💎🎡
> **E-commerce de Alta Perfumería de Nicho con Sistema Gamificado de Recompensas**  
> Desarrollado para el **Nerdearla App Showcase 2026** y optimizado para **Webflow Cloud**.

---

## 🌟 Visión del Proyecto

**HOLUX Rewards Cloud** es una aplicación e-commerce de lujo y fullstack construida sobre **Next.js 15+ (App Router)** y **Tailwind CSS**. Fusiona la estética editorial de alta gama de la perfumería europea (Xerjoff, Tom Ford, Creed, Nishane) con mecánicas interactivas de fidelización y gamificación ("Holux Lucky Wheel").

---

## 🚀 Características Principales

### 1. E-commerce de Lujo (Identidad HOLUX)
- **Catálogo de Alta Gama**: Perfumes nicho con fotografías en alta definición, precios en ARS y cálculo automático de **6 cuotas sin interés**.
- **Pirámides Olfativas Interactivas**: Modal de producto con desglose en tiempo real de:
  - 🌿 *Notas de Salida* (primeros 15 min).
  - 🌸 *Notas de Corazón* (cuerpo y carácter de la fragancia).
  - 🪵 *Notas de Fondo* (fijación, estela y longevidad).
- **Filtros Vivos y Buscador**: Filtrado instantáneo por casas perfumistas (*Xerjoff, Tom Ford, Nishane, Montale, Paris Corner*), ordenamiento por precio y búsqueda de notas olfativas.

### 2. Gamificación: "Holux Lucky Wheel" (Ruleta de la Fortuna)
- **Física de Giro Realista**: Ruleta SVG con cálculo de desaceleración y aguja indicadora superior.
- **Celebración con Confeti**: Efectos dinámicos dorados y esmeralda al ganar un premio vía `canvas-confetti`.
- **6 Segmentos de Premios Reales**:
  - 🏷️ **25% OFF** en toda la tienda (Código `WHEEL25`).
  - 🚚 **Envío Gratis Inmediato** a todo el país (Código `FREESHIP`).
  - 💎 **500 Puntos VIP Holux** acreditados al instante.
  - 🏷️ **15% OFF** directo (Código `LUCKY15`).
  - 🎁 **Muestra de Nicho de Regalo** vial 2ml (Código `GIFTNICHE`).
  - 💫 **50 Puntos de Cortesía** para seguir participando.
- **Aplicación Instantánea**: Botón directo para inyectar el premio al carrito de compras con un solo clic.

### 3. Motor Inteligente de Cupones & Monedero VIP
- **Validación Serverless**: Endpoint `/api/coupons` que procesa porcentajes, montos bonificados y obsequios.
- **Cupones incluidos de fábrica**:
  - `WHEEL25` - 25% de descuento en la orden.
  - `FREESHIP` - Costo de envío $0.
  - `LUCKY15` - 15% de descuento.
  - `GIFTNICHE` - Vial de lujo Xerjoff/Creed 2ml agregado sin cargo al carrito.
  - `NERDEARLA20` - 20% OFF exclusivo para la comunidad de Nerdearla.
  - `BIENVENIDA10` - 10% de bienvenida para nuevos clientes.
- **Monedero VIP (Wallet)**: Tarjeta digital de membresía *HOLUX Club Privé (Black Tier)*, contador de puntos acumulados y repositorio de cupones con copia rápida al portapapeles.

### 4. Carrito Lateral (Drawer) & Simulador de Checkout
- **Drawer Desplegable**: Gestión ágil de cantidades, resumen financiero y visualización de cupones activos.
- **Checkout Seguro**: Formulario de envío, selección de pago (6 Cuotas, Mercado Pago, Transferencia) y confirmación de orden con número de pedido `#HLX-XXXX` y acreditación de puntos de lealtad.

---

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15.2 (App Router)](https://nextjs.org/)
- **Librería UI**: [React 19](https://react.dev/)
- **Estilos**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Animaciones & FX**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment Target**: Webflow Cloud / Cloudflare Workers / Edge Runtime

---

## 💻 Ejecución en Entorno Local

1. Navegar a la carpeta del proyecto:
```bash
cd holux-rewards-cloud
```

2. Instalar dependencias (si aún no se han instalado):
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible inmediatamente en `http://localhost:3000`.

4. Compilar para producción:
```bash
npm run build
npm run start
```

---

## ☁️ Guía de Despliegue en Webflow Cloud (Paso a Paso)

La aplicación fue diseñada siguiendo las directrices de serverless y edge ready para su despliegue en **Webflow Cloud**.

### Paso 1: Inicializar el repositorio Git
Desde la terminal en `c:\Users\Valero\Desktop\eccommercepremios\holux-rewards-cloud`:

```bash
cd c:\Users\Valero\Desktop\eccommercepremios\holux-rewards-cloud
git init
git add .
git commit -m "feat: initial commit holux-rewards-cloud fullstack app"
```

### Paso 2: Crear el repositorio en GitHub y subir el código
1. Crea un nuevo repositorio en tu cuenta de GitHub (ejemplo: `holux-rewards-cloud`).
2. Vincula el remoto y sube tus cambios:

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/holux-rewards-cloud.git
git push -u origin main
```

### Paso 3: Conectar a Webflow Cloud
1. Ingresa a tu panel de **Webflow Cloud Apps** o consola de despliegue.
2. Selecciona **"Add New App / Site"** e importa tu repositorio de GitHub `holux-rewards-cloud`.
3. Webflow Cloud detectará automáticamente la configuración de **Next.js**:
   - **Build Command**: `next build` o `npm run build`
   - **Output Directory**: `.next`
   - **Node Version**: `20.x` o superior
4. Presiona **Deploy**. En menos de 2 minutos tu tienda de fragancias con gamificación estará en vivo con HTTPS y CDN global.

---

## 👤 Autor & Agradecimientos
Desarrollado para el **Nerdearla App Showcase 2026**.  
*HOLUX Haute Parfumerie &copy; 2026. Todos los derechos reservados.*
