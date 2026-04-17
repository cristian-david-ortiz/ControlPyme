# ControlPyme

ControlPyme es una plataforma SaaS de gestión para pequeños negocios que permite administrar clientes, productos, ventas y facturación desde un solo sistema.

El objetivo del proyecto es ofrecer una herramienta simple y eficiente para que comercios pequeños puedan organizar su información, controlar su stock y generar reportes de ventas, reemplazando métodos manuales como cuadernos o planillas.

Este proyecto fue desarrollado como una aplicación Full Stack utilizando Laravel para el backend y React para el frontend, siguiendo buenas prácticas de arquitectura y desarrollo.

Características principales
Autenticación de usuarios (registro, login y protección de rutas)
Panel de dashboard con métricas y estadísticas
Gestión completa de clientes
Gestión completa de productos y categorías
Registro de ventas
Control automático de stock
Generación de facturas en PDF
Reportes de ventas y actividad del negocio
API pública para integraciones externas
Interfaz moderna y responsiva
Tecnologías utilizadas
Backend
Laravel
Laravel Sanctum (autenticación API)
MySQL
Eloquent ORM
REST API
Frontend
React
React Router
Axios
Context API / Zustand
Tailwind CSS
Otras herramientas
Git
GitHub
Chart libraries para dashboards
Librerías de generación de PDF
Arquitectura del sistema

La aplicación sigue una arquitectura API REST, donde el backend expone endpoints consumidos por el frontend.

React (Frontend)
       ↓
API REST
       ↓
Laravel (Backend)
       ↓
MySQL (Base de datos)

Esta separación permite escalar el sistema y facilitar futuras integraciones como aplicaciones móviles o servicios externos.

Objetivo del proyecto

El objetivo principal de ControlPyme es demostrar habilidades de desarrollo Full Stack, incluyendo:

diseño de bases de datos
desarrollo de APIs REST
autenticación y seguridad
integración frontend-backend
arquitectura de aplicaciones
desarrollo de funcionalidades de negocio reales

Este proyecto forma parte de mi portfolio como desarrollador.

Estado del proyecto

Actualmente el proyecto se encuentra en desarrollo activo, agregando progresivamente nuevas funcionalidades como reportes avanzados, API pública y mejoras en la experiencia de usuario.

Próximas funcionalidades
roles y permisos avanzados
sistema multiempresa
exportación de reportes
notificaciones
aplicación móvil futura
