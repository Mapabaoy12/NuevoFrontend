import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import ProductoService, { type ProductoBackend } from '../service/producto.service';
import UsuarioService, { type UsuarioBackend } from '../service/usuariosService';
import PedidoService, { type BoletaBackend } from '../service/pedidoService';

// Interfaces
interface ProductoAdmin {
    id: number;
    titulo: string;
    imagen: string;
    forma: string;
    tamanio: string;
    precio: number;
    descripcion: string;
    stock?: number;
    categoria?: string;
}

export interface UsuarioAdmin {
    id?: number;
    nombre: string;
    apellido?: string;
    email: string;
    tipoUsuario?: string;
    telefono: string;
    fechaNacimiento: string;
    direccion: string;
    esDuocUC?: boolean;
    esMayorDe50?: boolean;
    tieneDescuentoFelices50?: boolean;
    descuentoPorcentaje?: number;
    tortaGratisCumpleanosDisponible?: boolean;
    tortaGratisCumpleanosUsada?: boolean;
}

interface PedidoAdmin {
    id: string;
    idBackend?: number;
    usuarioId?: number;
    fecha: Date;
    total: number;
    estado: 'completado' | 'pendiente' | 'cancelado';
    items: {
        productoId: number;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
    }[];
}

interface AdminContextType {
    // Productos
    productos: ProductoAdmin[];
    loadingProductos: boolean;
    errorProductos: string | null;
    cargarProductos: () => Promise<void>;
    agregarProducto: (producto: Omit<ProductoAdmin, 'id'>) => Promise<void>;
    actualizarProducto: (id: number, producto: Partial<ProductoAdmin>) => Promise<void>;
    eliminarProducto: (id: number) => Promise<void>;
    
    // Usuarios
    usuarios: UsuarioAdmin[];
    loadingUsuarios: boolean;
    errorUsuarios: string | null;
    cargarUsuarios: () => Promise<void>;
    actualizarUsuario: (id: number, usuario: Partial<UsuarioAdmin>) => Promise<void>;
    eliminarUsuario: (id: number) => Promise<void>;
    
    // Pedidos
    pedidos: PedidoAdmin[];
    loadingPedidos: boolean;
    errorPedidos: string | null;
    cargarPedidos: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    // Estados de Productos
    const [productos, setProductos] = useState<ProductoAdmin[]>([]);
    const [loadingProductos, setLoadingProductos] = useState(false);
    const [errorProductos, setErrorProductos] = useState<string | null>(null);

    // Estados de Usuarios
    const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState(false);
    const [errorUsuarios, setErrorUsuarios] = useState<string | null>(null);

    // Estados de Pedidos
    const [pedidos, setPedidos] = useState<PedidoAdmin[]>([]);
    const [loadingPedidos, setLoadingPedidos] = useState(false);
    const [errorPedidos, setErrorPedidos] = useState<string | null>(null);

    // ============== PRODUCTOS ==============
    const cargarProductos = useCallback(async () => {
        setLoadingProductos(true);
        setErrorProductos(null);
        try {
            const data = await ProductoService.listar();
            setProductos(data);
        } catch (err) {
            console.error('Error al cargar productos:', err);
            setErrorProductos('Error al cargar productos del servidor');
            // Fallback a localStorage
            const saved = localStorage.getItem('productos');
            if (saved) setProductos(JSON.parse(saved));
        } finally {
            setLoadingProductos(false);
        }
    }, []);

    const agregarProducto = useCallback(async (nuevoProducto: Omit<ProductoAdmin, 'id'>) => {
        setLoadingProductos(true);
        try {
            // Mapear al formato del backend
            const productoBackend = {
                nombre: nuevoProducto.titulo,
                descripcion: nuevoProducto.descripcion,
                precio: nuevoProducto.precio,
                stock: nuevoProducto.stock || 0,
            };
            await ProductoService.crear(productoBackend);
            await cargarProductos(); // Recargar lista
        } catch (err) {
            console.error('Error al agregar producto:', err);
            setErrorProductos('Error al agregar producto');
            throw err;
        } finally {
            setLoadingProductos(false);
        }
    }, [cargarProductos]);

    const actualizarProducto = useCallback(async (id: number, productoActualizado: Partial<ProductoAdmin>) => {
        setLoadingProductos(true);
        try {
            const productoBackend: Partial<ProductoBackend> = {};
            if (productoActualizado.titulo) productoBackend.nombre = productoActualizado.titulo;
            if (productoActualizado.descripcion) productoBackend.descripcion = productoActualizado.descripcion;
            if (productoActualizado.precio !== undefined) productoBackend.precio = productoActualizado.precio;
            if (productoActualizado.stock !== undefined) productoBackend.stock = productoActualizado.stock;
            await ProductoService.actualizar(id, productoBackend);
            await cargarProductos();
        } catch (err) {
            console.error('Error al actualizar producto:', err);
            setErrorProductos('Error al actualizar producto');
            throw err;
        } finally {
            setLoadingProductos(false);
        }
    }, [cargarProductos]);

    const eliminarProducto = useCallback(async (id: number) => {
        setLoadingProductos(true);
        try {
            await ProductoService.eliminar(id);
            await cargarProductos();
        } catch (err) {
            console.error('Error al eliminar producto:', err);
            setErrorProductos('Error al eliminar producto');
            throw err;
        } finally {
            setLoadingProductos(false);
        }
    }, [cargarProductos]);

    // ============== USUARIOS ==============
    const cargarUsuarios = useCallback(async () => {
        setLoadingUsuarios(true);
        setErrorUsuarios(null);
        try {
            const data = await UsuarioService.listar();
            // Mapear del formato backend al formato admin
            const usuariosMapeados: UsuarioAdmin[] = data.map((u: UsuarioBackend) => {
                const datosExtra = obtenerDatosExtraUsuario(u.email);
                return {
                    id: u.id,
                    nombre: `${u.nombre} ${u.apellido || ''}`.trim(),
                    apellido: u.apellido,
                    email: u.email,
                    tipoUsuario: u.tipoUsuario,
                    telefono: datosExtra.telefono || '',
                    fechaNacimiento: datosExtra.fechaNacimiento || '',
                    direccion: datosExtra.direccion || '',
                    esDuocUC: datosExtra.esDuocUC,
                    esMayorDe50: datosExtra.esMayorDe50,
                    tieneDescuentoFelices50: datosExtra.tieneDescuentoFelices50,
                    descuentoPorcentaje: datosExtra.descuentoPorcentaje,
                    tortaGratisCumpleanosDisponible: datosExtra.tortaGratisCumpleanosDisponible || false,
                    tortaGratisCumpleanosUsada: datosExtra.tortaGratisCumpleanosUsada || false,
                };
            });
            setUsuarios(usuariosMapeados);
        } catch (err) {
            console.error('Error al cargar usuarios:', err);
            setErrorUsuarios('Error al cargar usuarios del servidor');
            // Fallback a localStorage
            const saved = localStorage.getItem('usuariosRegistrados');
            if (saved) setUsuarios(JSON.parse(saved));
        } finally {
            setLoadingUsuarios(false);
        }
    }, []);

    const actualizarUsuario = useCallback(async (id: number, usuarioActualizado: Partial<UsuarioAdmin>) => {
        setLoadingUsuarios(true);
        try {
            const usuarioBackend = {
                nombre: usuarioActualizado.nombre?.split(' ')[0] || '',
                apellido: usuarioActualizado.apellido || usuarioActualizado.nombre?.split(' ').slice(1).join(' ') || '',
                email: usuarioActualizado.email || '',
                tipoUsuario: usuarioActualizado.tipoUsuario || 'Cliente',
            };
            await UsuarioService.actualizar(id, usuarioBackend);
            await cargarUsuarios();
        } catch (err) {
            console.error('Error al actualizar usuario:', err);
            setErrorUsuarios('Error al actualizar usuario');
            throw err;
        } finally {
            setLoadingUsuarios(false);
        }
    }, [cargarUsuarios]);

    const eliminarUsuario = useCallback(async (id: number) => {
        setLoadingUsuarios(true);
        try {
            await UsuarioService.eliminar(id);
            await cargarUsuarios();
        } catch (err) {
            console.error('Error al eliminar usuario:', err);
            setErrorUsuarios('Error al eliminar usuario');
            throw err;
        } finally {
            setLoadingUsuarios(false);
        }
    }, [cargarUsuarios]);

    // ============== PEDIDOS ==============
    const cargarPedidos = useCallback(async () => {
        setLoadingPedidos(true);
        setErrorPedidos(null);
        try {
            const boletas = await PedidoService.listarTodas();
            const pedidosMapeados: PedidoAdmin[] = boletas.map((b: BoletaBackend) => ({
                id: `boleta-${b.id}`,
                idBackend: b.id,
                usuarioId: b.usuarioId,
                fecha: new Date(b.fecha),
                total: b.total,
                estado: 'completado' as const,
                items: b.detalles?.map((d: any) => ({
                    productoId: d.productoId,
                    cantidad: d.cantidad,
                    precioUnitario: d.precioUnitario,
                    subtotal: d.subtotal,
                })) || [],
            }));
            setPedidos(pedidosMapeados);
        } catch (err) {
            console.error('Error al cargar pedidos:', err);
            setErrorPedidos('Error al cargar pedidos del servidor');
            // Fallback a localStorage
            const saved = localStorage.getItem('pedidos');
            if (saved) {
                const parsed = JSON.parse(saved);
                setPedidos(parsed.map((p: any) => ({ ...p, fecha: new Date(p.fecha) })));
            }
        } finally {
            setLoadingPedidos(false);
        }
    }, []);

    // Helper para obtener datos extra del usuario desde localStorage
    const obtenerDatosExtraUsuario = useCallback((email: string): Partial<UsuarioAdmin> => {
        try {
            const datosExtra = localStorage.getItem(`userData_${email}`);
            if (datosExtra) {
                return JSON.parse(datosExtra);
            }
        } catch {
            // Ignorar errores
        }
        return {};
    }, []);

    // Cargar datos iniciales
    useEffect(() => {
        cargarProductos();
        cargarUsuarios();
        cargarPedidos();
    }, [cargarProductos, cargarUsuarios, cargarPedidos]);

    return (
        <AdminContext.Provider
            value={{
                // Productos
                productos,
                loadingProductos,
                errorProductos,
                cargarProductos,
                agregarProducto,
                actualizarProducto,
                eliminarProducto,
                // Usuarios
                usuarios,
                loadingUsuarios,
                errorUsuarios,
                cargarUsuarios,
                actualizarUsuario,
                eliminarUsuario,
                // Pedidos
                pedidos,
                loadingPedidos,
                errorPedidos,
                cargarPedidos,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin solamente debe ser usado con AdminProvider');
    }
    return context;
};