import axios from 'axios';

// URLs base para cada microservicio
const API_USUARIOS = import.meta.env. VITE_API_USUARIOS ??  'http://localhost:8180/api/v1';
const API_CORE = import.meta. env.VITE_API_CORE ?? 'http://localhost:8080/api/v1';
const API_CARRITO = import. meta.env. VITE_API_CARRITO ?? 'http://localhost:8280/api/v1';

// Cliente para micro-usuarios
export const usuariosClient = axios. create({
  baseURL: API_USUARIOS,
  headers: { 'Content-Type': 'application/json' }
});

// Cliente para micro-core (productos y categorías)
export const coreClient = axios.create({
  baseURL: API_CORE,
  headers: { 'Content-Type': 'application/json' }
});

// Cliente para micro-carrito
export const carritoClient = axios.create({
  baseURL: API_CARRITO,
  headers: { 'Content-Type': 'application/json' }
});