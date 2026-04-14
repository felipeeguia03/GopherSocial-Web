# GopherSocial — Frontend

Frontend de **GopherSocial**, una red social construida con React + TypeScript. Consume la API REST desarrollada en Go e incluye autenticación, feed personalizado, gestión de publicaciones y sistema de seguidores.

**Demo en producción:** [gopher-social-web.vercel.app](https://gopher-social-web.vercel.app)  
**API Backend:** [gophersocial.onrender.com](https://gophersocial.onrender.com/v1/health)  
**Documentación de la API:** [Swagger UI](https://gophersocial.onrender.com/v1/swagger/index.html)

---

## Funcionalidades

- **Autenticación completa** — registro, login con JWT, confirmación de cuenta por email y cierre de sesión
- **Feed personalizado** — muestra publicaciones de los usuarios que seguís, con búsqueda y paginación
- **Publicaciones** — crear, editar y eliminar posts con etiquetas; sección de comentarios en tiempo de lectura
- **Perfiles de usuario** — foto de iniciales, publicaciones propias, estado de seguimiento en tiempo real
- **Sistema de seguidores** — seguir y dejar de seguir desde el perfil y desde Explorar; el botón refleja el estado real desde el backend
- **Explorar** — búsqueda de usuarios con debounce y sección de "Recomendados" con usuarios sugeridos
- **Rutas protegidas** — todas las páginas internas requieren sesión activa; redirección automática al login

---

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | [React 18](https://react.dev/) |
| Lenguaje | [TypeScript 5](https://www.typescriptlang.org/) |
| Routing | [React Router v6](https://reactrouter.com/) |
| Build tool | [Vite 5](https://vitejs.dev/) |
| Estilos | CSS puro con variables (dark theme) |
| Deploy | [Vercel](https://vercel.com/) |

---

## Arquitectura

```
src/
├── context/
│   └── AuthContext.tsx       # Estado global de autenticación (token + userId)
├── components/
│   ├── Navbar.tsx            # Barra de navegación con links dinámicos
│   └── ProtectedRoute.tsx    # HOC que redirige si no hay sesión
├── pages/
│   ├── LoginPage.tsx         # Formulario de login con manejo de errores
│   ├── RegisterPage.tsx      # Registro de cuenta nueva
│   ├── FeedPage.tsx          # Feed paginado con búsqueda
│   ├── PostPage.tsx          # Detalle de publicación + comentarios
│   ├── NewPostPage.tsx       # Creación de publicaciones
│   ├── ProfilePage.tsx       # Perfil público con estado de seguimiento
│   └── SearchPage.tsx        # Búsqueda y usuarios recomendados
├── ConfirmationPage.tsx      # Activación de cuenta por token de email
├── App.tsx                   # Exporta API_URL
└── main.tsx                  # Router, layout y footer
```

**Decisiones de diseño:**
- `AuthContext` persiste el token en `localStorage` para sobrevivir recargas
- El estado `is_following` se inicializa desde el backend al cargar cada vista, evitando inconsistencias
- Debounce de 350ms en búsqueda de usuarios para no saturar la API
- `vercel.json` con rewrite `/*` → `index.html` para que React Router funcione en rutas directas

---

## Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `VITE_API_URL` | URL base de la API | `http://localhost:8080/v1` |

Crear un archivo `.env` en la raíz:

```bash
VITE_API_URL=https://gophersocial.onrender.com/v1
```

---

## Correr localmente

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

Requiere que el backend esté corriendo. Ver el [README del backend](../vol7/README.md).

---

## Deploy

El proyecto está desplegado en **Vercel** con CD automático: cada push a `main` dispara un nuevo deploy.

El archivo `vercel.json` configura el rewrite necesario para que React Router maneje todas las rutas:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Autor

**Felipe Eguia Cima** — [gopher-social-web.vercel.app](https://gopher-social-web.vercel.app)
