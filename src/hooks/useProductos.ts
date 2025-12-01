import { useCallback, useEffect, useState } from 'react';
import ProductoService, { CategoriaService } from '../service/producto.service';
import type { Producto, ProductoPayload, Categoria } from '../interfaces/Producto';

interface UseProductosState {
  productos: Producto[];
  loading: boolean;
  error: Error | null;
  recargar: () => Promise<void>;
  crear: (producto: ProductoPayload) => Promise<Producto>;
  actualizar: (id: number, producto: ProductoPayload) => Promise<Producto>;
  eliminar: (id: number) => Promise<void>;
  filtrarPorCategoria: (nombreCategoria: string) => Promise<void>;
}

export const useProductos = (): UseProductosState => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const cargarProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductoService.listar();
      setProductos(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar productos'));
    } finally {
      setLoading(false);
    }
  }, []);

  const filtrarPorCategoria = useCallback(async (nombreCategoria: string) => {
    setLoading(true);
    try {
      const data = await ProductoService.listarPorCategoria(nombreCategoria);
      setProductos(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const crear = useCallback(async (producto: ProductoPayload) => {
    const nuevo = await ProductoService.crear(producto);
    await cargarProductos();
    return nuevo;
  }, [cargarProductos]);

  const actualizar = useCallback(async (id: number, producto: ProductoPayload) => {
    const actualizado = await ProductoService.actualizar(id, producto);
    await cargarProductos();
    return actualizado;
  }, [cargarProductos]);

  const eliminar = useCallback(async (id: number) => {
    await ProductoService.eliminar(id);
    await cargarProductos();
  }, [cargarProductos]);

  useEffect(() => {
    void cargarProductos();
  }, [cargarProductos]);

  return { productos, loading, error, recargar: cargarProductos, crear, actualizar, eliminar, filtrarPorCategoria };
};

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await CategoriaService.listar();
      setCategorias(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  return { categorias, loading, recargar: cargar };
};

export default useProductos;