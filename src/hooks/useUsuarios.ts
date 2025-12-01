import { useCallback, useEffect, useState } from 'react';
import UsuarioService, { 
  type UsuarioBackend, 
  type RegistroPayload,
  type LoginPayload 
} from '../service/usuariosService';

interface UseUsuariosState {
  usuarios: UsuarioBackend[];
  loading: boolean;
  error: string | null;
  recargar: () => Promise<void>;
  registrar: (usuario: RegistroPayload) => Promise<UsuarioBackend>;
  login: (payload: LoginPayload) => Promise<UsuarioBackend | null>;
  actualizar: (id: number, usuario: Partial<UsuarioBackend>) => Promise<UsuarioBackend>;
  eliminar: (id: number) => Promise<void>;
}

export const useUsuarios = (): UseUsuariosState => {
  const [usuarios, setUsuarios] = useState<UsuarioBackend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await UsuarioService.listar();
      setUsuarios(data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError('Error al cargar usuarios del servidor');
    } finally {
      setLoading(false);
    }
  }, []);

  const registrar = useCallback(async (usuario: RegistroPayload): Promise<UsuarioBackend> => {
    setLoading(true);
    try {
      const nuevoUsuario = await UsuarioService. crear(usuario);
      await cargarUsuarios();
      return nuevoUsuario;
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      throw new Error('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  }, [cargarUsuarios]);

  const login = useCallback(async (payload: LoginPayload): Promise<UsuarioBackend | null> => {
    setLoading(true);
    try {
      const usuario = await UsuarioService.login(payload);
      return usuario;
    } catch (err) {
      console.error('Error en login:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const actualizar = useCallback(async (id: number, usuario: Partial<UsuarioBackend>): Promise<UsuarioBackend> => {
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

  return { usuarios, loading, error, recargar: cargarUsuarios, registrar, login, actualizar, eliminar };
};

export default useUsuarios;