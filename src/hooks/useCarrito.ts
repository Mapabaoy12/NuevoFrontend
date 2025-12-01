import { useCallback, useState } from 'react';
import CarritoService from '../service/carrito.service';
import type { Carrito, ItemCarrito, Boleta } from '../interfaces/Carrito';

interface UseCarritoState {
  carrito: Carrito | null;
  loading: boolean;
  error: Error | null;
  crearCarrito: (usuarioId: number) => Promise<Carrito>;
  cargarCarrito: (carritoId: number) => Promise<void>;
  agregarItem: (carritoId: number, item: Omit<ItemCarrito, 'id'>) => Promise<void>;
  eliminarItem: (carritoId: number, itemId: number) => Promise<void>;
  generarBoleta: (carritoId: number) => Promise<Boleta>;
}

export const useCarrito = (): UseCarritoState => {
  const [carrito, setCarrito] = useState<Carrito | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const crearCarrito = useCallback(async (usuarioId: number) => {
    setLoading(true);
    try {
      const nuevoCarrito = await CarritoService. crear(usuarioId);
      setCarrito(nuevoCarrito);
      return nuevoCarrito;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al crear carrito'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cargarCarrito = useCallback(async (carritoId: number) => {
    setLoading(true);
    try {
      const data = await CarritoService.obtener(carritoId);
      setCarrito(data);
    } catch (err) {
      setError(err instanceof Error ?  err : new Error('Error al cargar carrito'));
    } finally {
      setLoading(false);
    }
  }, []);

  const agregarItem = useCallback(async (carritoId: number, item: Omit<ItemCarrito, 'id'>) => {
    setLoading(true);
    try {
      const carritoActualizado = await CarritoService.agregarItem(carritoId, item);
      setCarrito(carritoActualizado);
    } finally {
      setLoading(false);
    }
  }, []);

  const eliminarItem = useCallback(async (carritoId: number, itemId: number) => {
    await CarritoService. eliminarItem(carritoId, itemId);
    await cargarCarrito(carritoId);
  }, [cargarCarrito]);

  const generarBoleta = useCallback(async (carritoId: number) => {
    return await CarritoService.generarBoleta(carritoId);
  }, []);

  return { carrito, loading, error, crearCarrito, cargarCarrito, agregarItem, eliminarItem, generarBoleta };
};

export default useCarrito;