import { carritoClient } from './api.config';

// Interfaces del Backend
export interface DetalleBoletaBackend {
  id: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface BoletaBackend {
  id: number;
  usuarioId: number;
  fecha: string; // LocalDateTime del backend
  total: number;
  detalles: DetalleBoletaBackend[];
}

// Interface del Frontend (tu Pedido actual)
export interface PedidoFrontend {
  id: string;
  idBackend?: number; // ID de la boleta en el backend
  usuarioId?: number;
  fecha: Date;
  items: {
    productoId: number;
    nombre?: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
  subtotal: number;
  descuentoCodigo: number;
  descuentoUsuario: number;
  total: number;
  codigoPromoAplicado?: string;
  estado: 'completado' | 'pendiente' | 'cancelado';
}

// Mapear boleta del backend al formato del frontend
export const mapearBoletaAPedido = (boleta: BoletaBackend, userEmail: string): PedidoFrontend => ({
  id: `${userEmail}-${boleta.id}`,
  idBackend: boleta.id,
  usuarioId: boleta.usuarioId,
  fecha: new Date(boleta.fecha),
  items: boleta.detalles.map(d => ({
    productoId: d.productoId,
    cantidad: d.cantidad,
    precioUnitario: d.precioUnitario,
    subtotal: d.subtotal,
  })),
  subtotal: boleta.total,
  descuentoCodigo: 0,
  descuentoUsuario: 0,
  total: boleta.total,
  estado: 'completado',
});

export const PedidoService = {
  // Generar pedido/boleta desde el carrito
  async generarPedido(carritoId: number): Promise<BoletaBackend> {
    const { data } = await carritoClient.post<BoletaBackend>(`/boletas/generar/${carritoId}`);
    return data;
  },

  // Listar boletas de un usuario (requiere endpoint adicional en backend)
  async listarPorUsuario(usuarioId: number): Promise<BoletaBackend[]> {
    try {
      const { data } = await carritoClient.get<BoletaBackend[]>(`/boletas/usuario/${usuarioId}`);
      return data;
    } catch {
      // Si el endpoint no existe, retornar array vacío
      console.warn('Endpoint /boletas/usuario/{id} no disponible');
      return [];
    }
  },

  // Obtener boleta por ID (requiere endpoint adicional en backend)
  async obtenerPorId(boletaId: number): Promise<BoletaBackend | null> {
    try {
      const { data } = await carritoClient.get<BoletaBackend>(`/boletas/${boletaId}`);
      return data;
    } catch {
      console.warn('Endpoint /boletas/{id} no disponible');
      return null;
    }
  },

  // Listar todas las boletas (para admin, requiere endpoint adicional)
  async listarTodas(): Promise<BoletaBackend[]> {
    try {
      const { data } = await carritoClient.get<BoletaBackend[]>('/boletas');
      return data;
    } catch {
      console.warn('Endpoint /boletas no disponible');
      return [];
    }
  }
};

export default PedidoService;