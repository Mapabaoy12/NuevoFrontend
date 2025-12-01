import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import UsuarioService, { type UsuarioBackend, type RegistroPayload } from '../service/usuariosService';

// Interface extendida del usuario (combina backend + datos locales)
export interface Usuario {
    id?: number;
    nombre: string;
    apellido?: string;
    email: string;
    telefono?: string;
    fechaNacimiento?: string;
    direccion?: string;
    codigoPromocional?: string;
    tipoUsuario?: string;
    esDuocUC: boolean;
    esMayorDe50: boolean;
    tieneDescuentoFelices50: boolean;
    descuentoPorcentaje: number;
    tortaGratisCumpleanosDisponible: boolean;
    tortaGratisCumpleanosUsada: boolean;
}

interface UserContextType {
    user: Usuario | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: RegistroPayload & { datosExtra?: Partial<Usuario> }) => Promise<boolean>;
    logout: () => void;
    updateUser: (userData: Partial<Usuario>) => Promise<boolean>;
    isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper functions
const calcularEdad = (fechaNacimiento: string): number => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy. getFullYear() - nacimiento.getFullYear();
    const mes = hoy. getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
};

const esDuocEmail = (email: string): boolean => {
    const emailLower = email.toLowerCase();
    return emailLower.endsWith('@duoc. cl') || emailLower. endsWith('@duocuc.cl');
};

// Mapear usuario del backend al formato del frontend
const mapearUsuarioBackend = (backendUser: UsuarioBackend, datosExtra?: Partial<Usuario>): Usuario => {
    const email = backendUser. email;
    const fechaNacimiento = datosExtra?.fechaNacimiento || '';
    const edad = fechaNacimiento ? calcularEdad(fechaNacimiento) : 0;
    const esDuoc = esDuocEmail(email);
    const esMayorDe50 = edad >= 50;
    
    return {
        id: backendUser.id,
        nombre: `${backendUser. nombre} ${backendUser.apellido || ''}`. trim(),
        apellido: backendUser.apellido,
        email: backendUser.email,
        tipoUsuario: backendUser.tipoUsuario,
        telefono: datosExtra?.telefono || '',
        fechaNacimiento: fechaNacimiento,
        direccion: datosExtra?.direccion || '',
        codigoPromocional: datosExtra?. codigoPromocional || '',
        esDuocUC: esDuoc,
        esMayorDe50: esMayorDe50,
        tieneDescuentoFelices50: datosExtra?.tieneDescuentoFelices50 || false,
        descuentoPorcentaje: esMayorDe50 ? 50 : (datosExtra?.tieneDescuentoFelices50 ?  10 : 0),
        tortaGratisCumpleanosDisponible: esDuoc,
        tortaGratisCumpleanosUsada: datosExtra?.tortaGratisCumpleanosUsada || false,
    };
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cargar usuario desde localStorage al iniciar
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
            } catch {
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Guardar usuario en localStorage cuando cambie
    useEffect(() => {
        if (user) {
            localStorage. setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Login con backend
    const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const usuarioBackend = await UsuarioService.buscarPorEmail(email);
            
            if (!usuarioBackend) {
                setError('Usuario no encontrado');
                return false;
            }

            // Obtener datos extra guardados localmente (si existen)
            const datosExtraGuardados = localStorage. getItem(`userData_${email}`);
            const datosExtra = datosExtraGuardados ?  JSON.parse(datosExtraGuardados) : {};

            const usuarioCompleto = mapearUsuarioBackend(usuarioBackend, datosExtra);
            setUser(usuarioCompleto);
            return true;
        } catch (err) {
            console.error('Error en login:', err);
            setError('Error al iniciar sesión');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Registro con backend
    const register = useCallback(async (
        userData: RegistroPayload & { datosExtra?: Partial<Usuario> }
    ): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            // Crear usuario en el backend
            const nuevoUsuario = await UsuarioService. crear({
                nombre: userData.nombre,
                apellido: userData. apellido,
                email: userData.email,
                contrasenia: userData.contrasenia,
                tipoUsuario: userData.tipoUsuario || 'Cliente',
            });

            // Guardar datos extra localmente
            if (userData.datosExtra) {
                localStorage.setItem(
                    `userData_${userData.email}`,
                    JSON.stringify(userData.datosExtra)
                );
            }

            // Mapear y establecer usuario
            const usuarioCompleto = mapearUsuarioBackend(nuevoUsuario, userData.datosExtra);
            setUser(usuarioCompleto);
            return true;
        } catch (err) {
            console.error('Error en registro:', err);
            setError('Error al registrar usuario.  El email podría ya estar en uso.');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Actualizar usuario
    const updateUser = useCallback(async (userData: Partial<Usuario>): Promise<boolean> => {
        if (!user?. id) return false;

        setLoading(true);
        try {
            // Actualizar en backend
            await UsuarioService. actualizar(user. id, {
                nombre: userData.nombre?. split(' ')[0] || user.nombre. split(' ')[0],
                apellido: userData.apellido || userData.nombre?.split(' '). slice(1).join(' ') || '',
                email: userData.email || user.email,
            });

            // Actualizar datos locales
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);

            // Guardar datos extra
            localStorage.setItem(
                `userData_${updatedUser.email}`,
                JSON. stringify({
                    telefono: updatedUser.telefono,
                    fechaNacimiento: updatedUser.fechaNacimiento,
                    direccion: updatedUser.direccion,
                    codigoPromocional: updatedUser.codigoPromocional,
                    tieneDescuentoFelices50: updatedUser.tieneDescuentoFelices50,
                    tortaGratisCumpleanosUsada: updatedUser.tortaGratisCumpleanosUsada,
                })
            );

            return true;
        } catch (err) {
            console.error('Error actualizando usuario:', err);
            return false;
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Logout
    const logout = useCallback(() => {
        setUser(null);
        setError(null);
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
                updateUser,
                isAuthenticated: !! user,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (! context) {
        throw new Error('useUser debe ser usado con UserProvider');
    }
    return context;
};