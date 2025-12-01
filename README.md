# 🛋️ Mueblería Hermanos Jota - Plataforma E-commerce MERN

Este proyecto es la implementación final de una plataforma completa de comercio electrónico, desarrollada con el Stack MERN (MongoDB, Express, React, Node.js). Incluye un sistema de autenticación seguro (JWT + bcrypt), gestión de estado global (React Context API) y un flujo de creación de pedidos.

---

## 🚀 Despliegues Públicos

| **Frontend (React)**      | Vercel | **https://muebleria-jota-4-frontend.vercel.app/** | Desplegado |
| **Backend (Express API)** | Render | **https://muebleria-jota-4-backend.onrender.com** | Desplegado |

## ⚙️ Arquitectura Técnica

El proyecto se divide en dos servicios principales que interactúan:

### Backend
* **Tecnología:** Node.js, Express.js.
* **Base de Datos:** MongoDB Atlas (NoSQL).
* **Autenticación:** Hashing de contraseñas con `bcrypt` y manejo de sesión con `JSON Web Tokens (JWT)`.
* **Middleware:** Rutas protegidas (`/api/orders`, `/api/auth/profile`) que verifican el JWT.

### Frontend
* **Tecnología:** React.js con React Router DOM.
* **Estado Global:** Implementación de la **React Context API** para gestionar el estado de Autenticación (`AuthContext`) y el Carrito de Compras (`CartContext`).
* **Rutas Protegidas:** Utiliza el componente `<ProtectedRoute>` para restringir el acceso a `/perfil` y `/admin/crear-producto`.

## 📋 Requisitos para Correr Localmente

Para iniciar el proyecto en su máquina:

1.  **Clonar el repositorio.**
2.  **Configurar Variables de Entorno:**
    * Crear `backend/.env` con `PORT`, `MONGODB_URI` y `JWT_SECRET`.
    * Crear `client/.env.local` con `REACT_APP_API_URL=http://localhost:4000`.
3.  **Instalar dependencias e iniciar los servicios en dos terminales separadas:**

| Terminal 1 (Backend)  | Terminal 2 (Frontend) |
| `cd backend`          | `cd client`           |
| `npm install`         | `npm install`         |
| `npm start`           | `npm start`           |
