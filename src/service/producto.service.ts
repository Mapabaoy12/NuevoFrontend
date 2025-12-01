import { coreClient } from './api.config';
import type { Producto, ProductoPayload, Categoria, CategoriaPayload } from '../interfaces/Producto';

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


export const ProductoService = {
  async listar(): Promise<Producto[]> {
    const { data } = await coreClient.get<Producto[]>('/productos');
    return Array.isArray(data) ? data : [];
  },

  async obtener(id: number): Promise<Producto> {
    const { data } = await coreClient.get<Producto>(`/productos/${id}`);
    return data;
  },

  async listarPorCategoria(nombreCategoria: string): Promise<Producto[]> {
    const { data } = await coreClient.get<Producto[]>(`/productos/categoria/${nombreCategoria}`);
    return data;
  },

  async crear(producto: ProductoPayload): Promise<Producto> {
    const { data } = await coreClient.post<Producto>('/productos', producto);
    return data;
  },

  async actualizar(id: number, producto: ProductoPayload): Promise<Producto> {
    const { data } = await coreClient.put<Producto>(`/productos/${id}`, producto);
    return data;
  },

  async eliminar(id: number): Promise<void> {
    await coreClient.delete(`/productos/${id}`);
  }
};

export const CategoriaService = {
  async listar(): Promise<Categoria[]> {
    const { data } = await coreClient.get<Categoria[]>('/categorias');
    return data;
  },

  async obtener(id: number): Promise<Categoria> {
    const { data } = await coreClient.get<Categoria>(`/categorias/${id}`);
    return data;
  },

  async crear(categoria: CategoriaPayload): Promise<Categoria> {
    const { data } = await coreClient.post<Categoria>('/categorias', categoria);
    return data;
  },

  async actualizar(id: number, categoria: CategoriaPayload): Promise<Categoria> {
    const { data } = await coreClient.put<Categoria>(`/categorias/${id}`, categoria);
    return data;
  },

  async eliminar(id: number): Promise<void> {
    await coreClient.delete(`/categorias/${id}`);
  }
};

export default ProductoService;