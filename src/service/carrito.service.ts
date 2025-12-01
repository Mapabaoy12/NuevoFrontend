import { carritoClient } from './api.config';

// Interfaces del Backend
export interface ItemDTO {
  productoId: number;
  cantidad: number;
}

export interface CarritoDTO {
  id: number;
  usuarioId: number;
  items: ItemCarritoDTO[];
  total: number;
}

export interface ItemCarritoDTO {
  id: number;
  productoId: number;
  nombreProducto?: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Boleta {
  id: number;
  carritoId: number;
  fechaEmision: string;
  total: number;
}

export const CarritoService = {
  async crear(usuarioId: number): Promise<CarritoDTO> {
    const { data } = await carritoClient.post<CarritoDTO>(`/carrito/crear/${usuarioId}`);
    return data;
  },

  async obtener(carritoId: number): Promise<CarritoDTO> {
    const { data } = await carritoClient.get<CarritoDTO>(`/carrito/${carritoId}`);
    return data;
  },

  async agregarItem(carritoId: number, item: ItemDTO): Promise<CarritoDTO> {
    const { data } = await carritoClient.post<CarritoDTO>(
      `/carrito/agregar-item/${carritoId}/`,
      item
    );
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
