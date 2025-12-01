import { usuariosClient } from './api.config';
import type { Usuario, UsuarioPayload, TipoUsuario } from '../interfaces/Usuario';

export const UsuarioService = {
  async listar(): Promise<Usuario[]> {
    const { data } = await usuariosClient.get<Usuario[]>('/usuarios');
    return Array.isArray(data) ? data : [];
  },

  async obtener(id: number): Promise<Usuario> {
    const { data } = await usuariosClient.get<Usuario>(`/usuarios/${id}`);
    return data;
  },

  async crear(usuario: UsuarioPayload): Promise<Usuario> {
    const { data } = await usuariosClient.post<Usuario>('/usuarios', usuario);
    return data;
  },

  async actualizar(id: number, usuario: UsuarioPayload): Promise<Usuario> {
    const { data } = await usuariosClient.put<Usuario>(`/usuarios/${id}`, usuario);
    return data;
  },

  async eliminar(id: number): Promise<void> {
    await usuariosClient.delete(`/usuarios/${id}`);
  }
};

export const TipoUsuarioService = {
  async listar(): Promise<TipoUsuario[]> {
    const { data } = await usuariosClient.get<TipoUsuario[]>('/tipos-usuario');
    return data;
  },

  async obtener(id: number): Promise<TipoUsuario> {
    const { data } = await usuariosClient.get<TipoUsuario>(`/tipos-usuario/${id}`);
    return data;
  },

  async crear(tipo: Omit<TipoUsuario, 'id'>): Promise<TipoUsuario> {
    const { data } = await usuariosClient.post<TipoUsuario>('/tipos-usuario', tipo);
    return data;
  }
};

export default UsuarioService;