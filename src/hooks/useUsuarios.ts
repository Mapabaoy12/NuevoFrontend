import { useCallback, useEffect, useState } from 'react';
import UsuarioService, { TipoUsuarioService } from '../service/usuariosService';
import type { Usuario, UsuarioPayload, TipoUsuario } from '../interfaces/Usuario';

interface UseUsuariosState {
  usuarios: Usuario[];
  loading: boolean;
  error: Error | null;
  recargar: () => Promise<void>;
  crear: (usuario: UsuarioPayload) => Promise<Usuario>;
  actualizar: (id: number, usuario: UsuarioPayload) => Promise<Usuario>;
  eliminar: (id: number) => Promise<void>;
}

export const useUsuarios = (): UseUsuariosState => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const cargarUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await UsuarioService.listar();
      setUsuarios(data);
    } catch (err) {
      const parsedError = err instanceof Error ? err : new Error('Error desconocido al cargar usuarios');
      setError(parsedError);
    } finally {
      setLoading(false);
    }
  }, []);

  const crear = useCallback(async (usuario: UsuarioPayload): Promise<Usuario> => {
    const nuevoUsuario = await UsuarioService.crear(usuario);
    await cargarUsuarios();
    return nuevoUsuario;
  }, [cargarUsuarios]);

  const actualizar = useCallback(async (id: number, usuario: UsuarioPayload): Promise<Usuario> => {
    const usuarioActualizado = await UsuarioService.actualizar(id, usuario);
    await cargarUsuarios();
    return usuarioActualizado;
  }, [cargarUsuarios]);

  const eliminar = useCallback(async (id: number): Promise<void> => {
    await UsuarioService.eliminar(id);
    await cargarUsuarios();
  }, [cargarUsuarios]);

  useEffect(() => {
    void cargarUsuarios();
  }, [cargarUsuarios]);

  return {
    usuarios,
    loading,
    error,
    recargar: cargarUsuarios,
    crear,
    actualizar,
    eliminar
  };
};

export const useTiposUsuario = () => {
  const [tipos, setTipos] = useState<TipoUsuario[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      try {
        const data = await TipoUsuarioService.listar();
        setTipos(data);
      } finally {
        setLoading(false);
      }
    };
    void cargar();
  }, []);

  return { tipos, loading };
};

export default useUsuarios;