# Rick and Morty API Explorer - React App

Esta aplicación web fue desarrollada como parte del Laboratorio de Consumo de API con React. Utiliza la [Rick and Morty API](https://rickandmortyapi.com/) para mostrar un listado de personajes con búsqueda, filtros avanzados, paginación, modales de detalle y un sistema de favoritos interactivo. El diseño está completamente tematizado como un portal interdimensional.

## Características

- **Consumo de API:** Integración con la API pública de Rick and Morty utilizando `fetch` y `async/await`.
- **Listado y Paginación:** Visualización de personajes en tarjetas con scroll paginado.
- **Buscador y Filtros:** Búsqueda por nombre en tiempo real (con debounce) y filtrado por estado vital (Alive/Dead/Unknown) y género.
- **Vista de Detalle:** Modal interactivo que muestra la información completa del personaje, incluyendo episodios en los que aparece.
- **Sistema de Favoritos:** Posibilidad de guardar personajes favoritos usando `localStorage` para persistencia de datos sin necesidad de backend.
- **Diseño Temático "Multiverse Portal":** Interfaz de usuario responsiva con estética de neón (verdes ácidos, morados), animaciones fluidas, y *glassmorphism*.

## Tecnologías Utilizadas

- React (con Hooks: `useState`, `useEffect`)
- Vite (como herramienta de build y servidor de desarrollo)
- CSS Puro (con variables CSS y animaciones)

## Instrucciones para Ejecutar Localmente

Sigue estos pasos para arrancar el proyecto en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/victorgonzalez246/rick.git
cd rick
```

### 2. Instalar dependencias
Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego ejecuta:
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
Para arrancar la aplicación en modo desarrollo, ejecuta:
```bash
npm run dev
```

El servidor iniciará, usualmente en `http://localhost:5173/`. Abre ese enlace en tu navegador web.

## Criterios de Evaluación Cumplidos

- **Consumo de API:** Correcto manejo de datos asíncronos y errores en `src/services/rickMortyApi.js`.
- **Funcionalidad:** Listado, búsqueda, detalle y paginación implementados y funcionando sin problemas.
- **Diseño temático:** UI coherente con la temática de portal interdimensional.
- **Componentización:** Arquitectura limpia dividida en componentes (`Navbar`, `SearchBar`, `CharacterCard`, `CharacterModal`, etc.).
- **Responsividad:** La interfaz se adapta correctamente a dispositivos móviles y de escritorio.

---
*Desarrollado para la entrega del Laboratorio de Consumo de API.*
