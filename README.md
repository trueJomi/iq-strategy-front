# 🚀 IQ Strategy Frontend

Plataforma avanzada de visualización y ejecución de estrategias de trading, construida con tecnologías modernas para ofrecer una experiencia fluida, reactiva y profesional.

## 📋 Descripción

**IQ Strategy Frontend** es el centro de control para traders que buscan gestionar sus estrategias, visualizar predicciones de mercado y ejecutar operaciones en tiempo real. La aplicación integra análisis visual mediante gráficos avanzados y un sistema de chat interactivo para el seguimiento de señales y soporte.

---

## 🛠️ Stack Tecnológico

La aplicación utiliza un ecosistema tecnológico de última generación para garantizar rendimiento y escalabilidad:

- **Core:** [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) (con SWC para compilación ultra rápida)
- **UI Framework:** [Material UI (MUI) v6](https://mui.com/)
- **Estado Global:** [Zustand](https://github.com/pmndrs/zustand)
- **Gráficos:** [ApexCharts](https://apexcharts.com/)
- **Backend-as-a-Service:** [Firebase](https://firebase.google.com/) (Authentication, Firestore, Hosting)
- **Routing:** [React Router 6](https://reactrouter.com/)
- **Iconos:** [React Icons](https://react-icons.github.io/react-icons/)

---

## ✨ Características Principales

- 📊 **Visualización de Gráficos:** Gráficos interactivos en tiempo real para el seguimiento de activos.
- 💰 **Gestión de Operaciones:** Interfaz intuitiva para compra/venta de activos integrando servicios como Alpaca.
- 💬 **Chat Integrado:** Sistema de mensajería para interacción y recepción de notificaciones de estrategias.
- 🔐 **Autenticación Segura:** Sistema completo de Login y Registro gestionado por Firebase.
- 📱 **Diseño Responsivo:** Layout adaptativo que optimiza la visualización de gráficos y chat en PC y dispositivos móviles.
- 📜 **Historial de Transacciones:** Registro detallado de movimientos y operaciones realizadas.
- 📂 **Gestión de Carpetas/Estrategias:** Organización personalizada de acciones y predicciones.

---

## 🚀 Configuración del Proyecto

### 1. Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### 2. Instalación

Clona el repositorio e instala las dependencias:

```bash
# Instalar dependencias
npm install
```

### 3. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 4. Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 📂 Estructura de Carpetas

```text
src/
├── adapters/   # Transformación de datos externos
├── components/ # Componentes globales reutilizables
├── constants/  # Constantes y configuraciones
├── hooks/      # Hooks personalizados (Auth, API, etc.)
├── libs/       # Configuraciones de librerías externas (Firebase)
├── models/     # Definiciones de tipos e interfaces
├── pages/      # Vistas principales (Home, Login, History, etc.)
├── services/   # Llamadas a Firebase y APIs externas
└── store/      # Gestión de estado con Zustand
```

---

## 🛠️ Comandos Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila el proyecto para producción.
- `npm run lint`: Ejecuta el linter para asegurar la calidad del código.
- `npm run preview`: Previsualiza la compilación localmente.

