# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 💰 Finanzas App - Frontend

Frontend de aplicación de finanzas personales construido con React 19, TypeScript, Vite y Tailwind CSS.

## 🚀 Stack Tecnológico

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Zustand** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **Dinero.js** - Manejo preciso de dinero
- **Chart.js** - Gráficas y visualizaciones
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_DEFAULT_CURRENCY=MXN
VITE_ENV=development
```

## 📝 Scripts Disponibles

```bash
# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout/         # Layouts (Main, Auth)
│   ├── Navbar/         # Barra de navegación
│   └── Sidebar/        # Menú lateral
├── pages/              # Páginas de la aplicación
│   ├── Auth/           # Login y Register
│   ├── Dashboard/      # Dashboard principal
│   ├── Transactions/   # Gestión de transacciones
│   ├── Categories/     # Gestión de categorías
│   └── Accounts/       # Gestión de cuentas
├── services/           # Servicios de API
│   ├── transactionService.ts
│   ├── categoryService.ts
│   ├── accountService.ts
│   └── dashboardService.ts
├── store/              # Estado global (Zustand)
│   └── authStore.ts
├── types/              # Tipos TypeScript
│   └── index.ts
├── utils/              # Funciones helper
│   └── helpers.ts
├── config/             # Configuraciones
│   └── axios.ts
├── App.tsx             # Componente principal
├── main.tsx            # Entry point
└── index.css           # Estilos globales
```

## 🎨 Características

### Autenticación

- ✅ Login y registro
- ✅ JWT con refresh tokens
- ✅ Rutas protegidas
- ✅ Persistencia de sesión

### Dashboard

- ✅ Resumen de ingresos y gastos
- ✅ Balance total
- ✅ Transacciones recientes
- ✅ Gastos por categoría
- ✅ Visualizaciones con gráficas

### Gestión de Datos

- ✅ CRUD de transacciones
- ✅ CRUD de categorías
- ✅ CRUD de cuentas
- ✅ Filtros y búsqueda

### UX/UI

- ✅ Diseño responsive
- ✅ Tema moderno con Tailwind
- ✅ Navegación intuitiva
- ✅ Feedback visual de acciones

## 🌐 Endpoints de API

El frontend consume la API en `http://localhost:5000/api`:

- `/auth/login` - Iniciar sesión
- `/auth/register` - Registrar usuario
- `/auth/refresh` - Refrescar token
- `/transactions` - CRUD de transacciones
- `/categories` - CRUD de categorías
- `/accounts` - CRUD de cuentas
- `/dashboard/*` - Endpoints de dashboard

## 🔐 Seguridad

- Tokens JWT almacenados en localStorage
- Refresh token automático en interceptores
- Rutas protegidas con validación
- Limpieza de sesión al logout

## 📱 Responsive Design

La aplicación está optimizada para:

- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🚧 Próximas Características

- [ ] Gráficas avanzadas con tendencias
- [ ] Exportar datos a CSV/PDF
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] Multi-idioma (i18n)
- [ ] Presupuestos y metas
- [ ] Recordatorios de pagos

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**DigitalizaTuNegocio**

- GitHub: [@javieralejandro89](https://github.com/javieralejandro89)

## 🙏 Agradecimientos

- React Team
- Vite Team
- Tailwind CSS Team
- Toda la comunidad open source
