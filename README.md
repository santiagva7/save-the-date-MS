# Save the Date - Wedding Invitation Platform

<div align="center">

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4)

Una aplicación web moderna y responsiva para invitaciones de bodas con RSVP interactivo, múltiples temas de diseño y experiencia de usuario excepcional.

[Demo](#-demo) • [Características](#-características) • [Instalación](#-instalación) • [Estructura](#-estructura) • [Tecnologías](#-tecnologías)

</div>

---

## 🎯 Descripción

Save the Date es una plataforma web completa para enviar invitaciones a bodas de manera moderna e interactiva. Los invitados pueden confirmar su asistencia, indicar restricciones alimentarias, solicitar canciones y recibir información completa sobre el evento, todo desde una interfaz elegante y responsiva.

### ¿Por qué Save the Date?

- ✨ **Diseño elegante y personalizable** - Temas visuales sofisticados
- 📱 **Completamente responsivo** - Funciona perfectamente en cualquier dispositivo
- 🔐 **Sistema de autenticación** - Validación segura de invitados mediante códigos
- 💬 **RSVP interactivo** - Integración con WhatsApp para confirmaciones
- 🎵 **Solicitud de canciones** - Los invitados pueden elegir músicas para la fiesta
- 🍽️ **Registro de restricciones** - Control de dietas y alergias

---

## 🎨 Características

### Páginas y Funcionalidades

- **🔑 Login** - Autenticación de invitados mediante códigos únicos
- **💍 Invitación** - Página principal con información del evento
  - Countdown en tiempo real hasta el evento
  - Ubicación interactiva
  - Línea de tiempo del día
  - Código de vestimenta
  - Sección de regalos
  - Diálogo RSVP integrado

### Componentes Principales

| Componente | Descripción |
|-----------|-------------|
| **RSVPDialog** | Diálogo modal para confirmar asistencia y proporcionar información adicional |
| **Countdown** | Contador regresivo dinámico hasta la fecha del evento |
| **Timeline** | Cronograma visual del día de la boda |
| **Location** | Mapa e información de la ubicación del evento |
| **Dresscode** | Sección de código de vestimenta con iconografía |
| **GiftRegistry** | Integración con plataformas de regalos |
| **CardPrice** | Muestra información de precio para invitados especiales |
| **InvitationPreview** | Vista previa de la invitación personalizada |

---

## 🚀 Instalación

### Requisitos Previos

- Node.js >= 18.x
- npm o yarn

### Setup Inicial

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/save-the-date-MS.git
   cd save-the-date-MS
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

### Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Inicia el servidor de desarrollo

# Build
npm run build            # Compilar para producción
npm run build:dev        # Compilar en modo desarrollo

# Otros
npm run preview          # Ver build de producción localmente
npm run lint             # Ejecutar ESLint
```

---

## 📁 Estructura del Proyecto

```
save-the-date-MS/
├── src/
│   ├── components/
│   │   ├── RSVPDialog.tsx         # Modal de confirmación de asistencia
│   │   ├── Countdown.tsx          # Contador regresivo
│   │   ├── Timeline.tsx           # Línea de tiempo del evento
│   │   ├── Location.tsx           # Información de ubicación
│   │   ├── Dresscode.tsx          # Código de vestimenta
│   │   ├── GiftRegistry.tsx       # Sección de regalos
│   │   ├── CardPrice.tsx          # Tarjeta de precio
│   │   ├── InvitationPreview.tsx  # Vista previa
│   │   └── ui/                    # Componentes Radix UI
│   │
│   ├── pages/
│   │   ├── Login.tsx              # Página de autenticación
│   │   ├── Invitation.tsx         # Página principal de invitación
│   │   ├── DesignPreview.tsx      # Vista previa de diseños
│   │   └── NotFound.tsx           # Página 404
│   │
│   ├── contexts/
│   │   └── ThemeContext.tsx       # Contexto de temas globales
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Hook para detectar dispositivos móviles
│   │   └── use-toast.ts           # Hook para notificaciones
│   │
│   ├── lib/
│   │   ├── designThemes.ts        # Configuración de temas
│   │   └── utils.ts               # Funciones utilitarias
│   │
│   ├── data/
│   │   └── guestCodes.ts          # Códigos y datos de invitados
│   │
│   ├── App.tsx                    # Componente raíz
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Estilos globales
│
├── public/
│   ├── designs/                   # Imágenes de diseños
│   └── robots.txt
│
├── vite.config.ts                 # Configuración de Vite
├── tailwind.config.ts             # Configuración de Tailwind CSS
├── tsconfig.json                  # Configuración de TypeScript
└── package.json                   # Dependencias del proyecto
```

---

## 🛠️ Tecnologías

### Frontend
- **React 18** - Librería de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Bundler y servidor de desarrollo
- **React Router** - Enrutamiento
- **TanStack Query** - Gestión de estado async

### Estilos y UI
- **Tailwind CSS** - Framework de utilidades CSS
- **Radix UI** - Primitivos de componentes sin estilos
- **shadcn/ui** - Componentes construidos sobre Radix UI
- **Lucide React** - Iconografía moderna

### Notificaciones y Formularios
- **Sonner** - Toasts notificaciones
- **React Hook Form** - Gestión de formularios
- **Date-fns** - Manipulación de fechas

### Herramientas
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Embla Carousel** - Carrusel responsivo

---

## 🎨 Temas de Diseño

El proyecto incluye temas de diseño personalizables definidos en `src/lib/designThemes.ts`. Cada tema incluye:

- Paleta de colores personalizada
- Tipografías específicas
- Variables CSS para fácil customización

### Tema Incluido: "Natural y Elegante"

- **Colores principales**: Marrones cálidos y tonos tierra
- **Tipografía**: Josefin Slab (títulos), Josefin Sans (body)
- **Sensación**: Elegante, moderna y natural

---

## 🔐 Autenticación de Invitados

El sistema utiliza códigos únicos almacenados en `src/data/guestCodes.ts` para autenticar invitados:

```typescript
// Ejemplo de estructura de datos de invitados
{
  code: "UNICO123",
  name: "Nombre del Invitado",
  price?: 50,  // Opcional - si es pago
  help?: "... Información adicional"
}
```

---

## 💾 Almacenamiento Local

La aplicación utiliza `localStorage` para:
- Guardar información del invitado autenticado
- Almacenar respuestas RSVP
- Mantener estado de sesión

---

## 📱 Responsividad

La aplicación está completamente optimizada para:
- 📲 Dispositivos móviles (< 640px)
- 📱 Tablets (640px - 1024px)
- 💻 Escritorio (> 1024px)

Utiliza breakpoints de Tailwind CSS para adaptarse fluidamente a cualquier tamaño de pantalla.

---

## 🚀 Deployment

### Build para Producción

```bash
npm run build
```

Genera carpeta `dist/` lista para desplegar.

### Opciones de Hosting

- **Vercel** (recomendado para Vite)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**
- **AWS S3 + CloudFront**

---

## 📝 Variables de Entorno

Si necesitas variables de entorno, crea un archivo `.env.local`:

```env
# Ejemplo
VITE_API_URL=https://api.ejemplo.com
VITE_WHATSAPP_PHONE=542948450880
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 🎓 Aprender Más

Recursos útiles:
- [Documentación de React](https://react.dev)
- [Documentación de Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [React Router](https://reactrouter.com)

---

## 📧 Contacto

Preguntas o sugerencias? Abre un issue o contacta directamente.

---

<div align="center">

Made with 💍 for a special moment

</div>
