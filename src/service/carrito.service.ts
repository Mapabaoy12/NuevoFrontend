import { carritoClient } from './api.config';
import type { Carrito, ItemCarrito, Boleta } from '../interfaces/Carrito';

export const CarritoService = {
  async crear(usuarioId: number): Promise<Carrito> {
    const { data } = await carritoClient.post<Carrito>(`/carrito/crear/${usuarioId}`);
    return data;
  },

  async obtener(carritoId: number): Promise<Carrito> {
    const { data } = await carritoClient.get<Carrito>(`/carrito/${carritoId}`);
    return data;
  },

  async agregarItem(carritoId: number, item: Omit<ItemCarrito, 'id'>): Promise<Carrito> {
    const { data } = await carritoClient.post<Carrito>(`/carrito/agregar-item/${carritoId}/`, item);
    return data;
  },

  async eliminarItem(carritoId: number, itemId: number): Promise<void> {
    await carritoClient.delete(`/carrito/${carritoId}/eliminar-item/${itemId}`);
  },

  async generarBoleta(carritoId: number): Promise<Boleta> {
    const { data } = await carritoClient.post<Boleta>(`/boletas/generar/${carritoId}`);
    return data;
  }
};

export default CarritoService;