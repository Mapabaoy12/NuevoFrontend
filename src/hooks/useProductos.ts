import { useCallback, useEffect, useState } from 'react';

import ProductoService, { type ProductoFrontend} from '../service/producto.service';

interface UseProductosState {
  productos: ProductoFrontend[];
  loading: boolean;
  error: string | null;
  recargar: () => Promise<void>;
}

export const useProductos = (): UseProductosState => {
  const [productos, setProductos] = useState<ProductoFrontend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductoService.listar();
      setProductos(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar productos del servidor');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void cargarProductos();
  }, [cargarProductos]);

  return { productos, loading, error, recargar: cargarProductos };
};

export default useProductos;