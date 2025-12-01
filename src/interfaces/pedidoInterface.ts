import type { CartItem } from "./cartInterface";

export interface Pedido {
    id: string;
    fecha: Date;
    items: CartItem[];
    subtotal: number;
    descuentoCodigo: number;
    descuentoUsuario: number;
    total: number;
    codigoPromoAplicado?: string;
    estado: 'completado' | 'pendiente' | 'cancelado';
}

export interface PedidosState {
    pedidos: Pedido[];
}

export interface PedidosContextType {
    pedidos: Pedido[];
    agregarPedido: (pedido: Omit<Pedido, 'id' | 'fecha' | 'estado'>) => void;
    obtenerPedidosUsuario: (userEmail: string) => Pedido[];
    actualizarEstadoPedido: (pedidoId: string, nuevoEstado: 'completado' | 'pendiente' | 'cancelado') => void;
    eliminarPedido: (pedidoId: string) => void;
}
