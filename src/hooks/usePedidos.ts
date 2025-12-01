import { useCallback, useEffect, useState } from 'react';
import PedidoService, { type BoletaBackend, type PedidoFrontend } from '../service/pedidoService';

interface UsePedidosState {
  pedidos: PedidoFrontend[];
  loading: boolean;
  error: string | null;
  generarPedido: (carritoId: number, userEmail: string) => Promise<PedidoFrontend | null>;
  cargarPedidosUsuario: (usuarioId: number, userEmail: string) => Promise<void>;
  cargarTodosPedidos: () => Promise<void>;
  recargar: () => Promise<void>;
}

// Mapear boleta del backend al formato del frontend
const mapearBoletaAPedido = (boleta: BoletaBackend, userEmail: string): PedidoFrontend => ({
  id: `${userEmail}-${boleta.id}`,
  idBackend: boleta.id,
  usuarioId: boleta.usuarioId,
  fecha: new Date(boleta.fecha),
  items: boleta.detalles?.map((d: any) => ({
    productoId: d.productoId,
    nombre: `Producto #${d.productoId}`,
    cantidad: d.cantidad,
    precioUnitario: d.precioUnitario,
    subtotal: d.subtotal,
  })) || [],
  subtotal: boleta.total,
  descuentoCodigo: 0,
  descuentoUsuario: 0,
  total: boleta.total,
  estado: 'completado',
});

export const usePedidosBackend = (): UsePedidosState => {
  const [pedidos, setPedidos] = useState<PedidoFrontend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar pedidos desde localStorage como fallback
  useEffect(() => {
    const savedPedidos = localStorage.getItem('pedidosBackend');
    if (savedPedidos) {
      try {
        const parsed = JSON.parse(savedPedidos);
        setPedidos(parsed. map((p: any) => ({
          ... p,
          fecha: new Date(p.fecha)
        })));
      } catch {
        localStorage.removeItem('pedidosBackend');
      }
    }
  }, []);

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    if (pedidos.length > 0) {
      localStorage.setItem('pedidosBackend', JSON.stringify(pedidos));
    }
  }, [pedidos]);

  // Generar pedido desde carrito
  const generarPedido = useCallback(async (
    carritoId: number, 
    userEmail: string
  ): Promise<PedidoFrontend | null> => {
    setLoading(true);
    setError(null);
    try {
      const boleta = await PedidoService.generarPedido(carritoId);
      const nuevoPedido = mapearBoletaAPedido(boleta, userEmail);
      setPedidos(prev => [nuevoPedido, ...prev]);
      return nuevoPedido;
    } catch (err) {
      console.error('Error al generar pedido:', err);
      setError('Error al generar el pedido');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar pedidos de un usuario específico
  const cargarPedidosUsuario = useCallback(async (
    usuarioId: number, 
    userEmail: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const boletas = await PedidoService.listarPorUsuario(usuarioId);
      const pedidosMapeados = boletas.map((b: BoletaBackend) => mapearBoletaAPedido(b, userEmail));
      setPedidos(pedidosMapeados);
    } catch (err) {
      console.error('Error al cargar pedidos:', err);
      // Mantener pedidos locales si el backend no está disponible
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar todos los pedidos (admin)
  const cargarTodosPedidos = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const boletas = await PedidoService.listarTodas();
      const pedidosMapeados = boletas.map((b: BoletaBackend) => mapearBoletaAPedido(b, 'admin'));
      setPedidos(pedidosMapeados);
    } catch (err) {
      console.error('Error al cargar todos los pedidos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const recargar = useCallback(async () => {
    await cargarTodosPedidos();
  }, [cargarTodosPedidos]);

  return {
    pedidos,
    loading,
    error,
    generarPedido,
    cargarPedidosUsuario,
    cargarTodosPedidos,
    recargar,
  };
};

export default usePedidosBackend;