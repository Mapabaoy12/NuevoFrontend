import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { productos as productosIniciales, type Producto } from '../data/productos';
import type { Usuario } from '../data/Usuario';

interface AdminContextType {
    // Productos
    productos: Producto[];
    agregarProducto: (producto: Omit<Producto, 'id'>) => void;
    actualizarProducto: (id: number, producto: Partial<Producto>) => void;
    eliminarProducto: (id: number) => void;
    
    // Usuarios
    usuarios: Usuario[];
    actualizarUsuario: (email: string, usuario: Partial<Usuario>) => void;
    eliminarUsuario: (email: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    // Estado de productos
    const [productos, setProductos] = useState<Producto[]>(() => {
        const savedProductos = localStorage.getItem('productos');
        if (savedProductos) {
            try {
                return JSON.parse(savedProductos);
            } catch {
                return productosIniciales;
            }
        }
        return productosIniciales;
    });

    // Estado de usuarios
    const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
        const savedUsuarios = localStorage.getItem('usuariosRegistrados');
        if (savedUsuarios) {
            try {
                return JSON.parse(savedUsuarios);
            } catch {
                return [];
            }
        }
        return [];
    });

    // Guardar productos en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
    }, [productos]);

    // Guardar usuarios en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
    }, [usuarios]);

    // Funciones CRUD para productos
    const agregarProducto = (nuevoProducto: Omit<Producto, 'id'>) => {
        const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1;
        const productoCompleto: Producto = {
            ...nuevoProducto,
            id: nuevoId,
            stock: nuevoProducto.stock || 0
        };
        setProductos([...productos, productoCompleto]);
    };

    const actualizarProducto = (id: number, productoActualizado: Partial<Producto>) => {
        setProductos(productos.map(p => 
            p.id === id ? { ...p, ...productoActualizado } : p
        ));
    };

    const eliminarProducto = (id: number) => {
        setProductos(productos.filter(p => p.id !== id));
    };

    // Funciones CRUD para usuarios
    const actualizarUsuario = (email: string, usuarioActualizado: Partial<Usuario>) => {
        setUsuarios(usuarios.map(u => 
            u.email === email ? { ...u, ...usuarioActualizado } : u
        ));
    };

    const eliminarUsuario = (email: string) => {
        setUsuarios(usuarios.filter(u => u.email !== email));
    };

    return (
        <AdminContext.Provider
            value={{
                productos,
                agregarProducto,
                actualizarProducto,
                eliminarProducto,
                usuarios,
                actualizarUsuario,
                eliminarUsuario,
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
