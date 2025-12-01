import { coreClient } from './api.config';

// Interface que coincide con tu backend (ProductoDTO)
export interface ProductoBackend {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria?: {
    id: number;
    nombre: string;
  };
  imagen?: string;
}

// Tu interface del frontend
export interface ProductoFrontend {
  id: number;
  titulo: string;
  imagen: string;
  forma: string;
  tamanio: string;
  precio: number;
  descripcion: string;
  stock?: number;
}

// Función para mapear backend -> frontend
const mapearProducto = (p: ProductoBackend): ProductoFrontend => ({
  id: p.id,
  titulo: p.nombre,
  imagen: p. imagen || '/img/default-cake.jpg',
  forma: p.categoria?. nombre || 'Circulares',
  tamanio: 'Grande', // Puedes agregar este campo en tu backend si lo necesitas
  precio: p.precio,
  descripcion: p.descripcion,
  stock: p.stock
});

export const ProductoService = {
  async listar(): Promise<ProductoFrontend[]> {
    const { data } = await coreClient.get<ProductoBackend[]>('/productos');
    return data.map(mapearProducto);
  },

  async obtener(id: number): Promise<ProductoFrontend> {
    const { data } = await coreClient.get<ProductoBackend>(`/productos/${id}`);
    return mapearProducto(data);
  },

  async listarPorCategoria(nombreCategoria: string): Promise<ProductoFrontend[]> {
    const { data } = await coreClient.get<ProductoBackend[]>(`/productos/categoria/${nombreCategoria}`);
    return data.map(mapearProducto);
  },

  async crear(producto: Omit<ProductoBackend, 'id'>): Promise<ProductoFrontend> {
    const { data } = await coreClient.post<ProductoBackend>('/productos', producto);
    return mapearProducto(data);
  },

  async actualizar(id: number, producto: Partial<ProductoBackend>): Promise<ProductoFrontend> {
    const { data } = await coreClient.put<ProductoBackend>(`/productos/${id}`, producto);
    return mapearProducto(data);
  },

  async eliminar(id: number): Promise<void> {
    await coreClient.delete(`/productos/${id}`);
  }
};

export default ProductoService;