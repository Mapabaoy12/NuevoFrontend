import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Pedido, PedidosContextType } from '../interfaces/pedidoInterface';
import { useUser } from './UserContext';
import PedidoService, { type BoletaBackend } from '../service/pedidoService';

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

// Mapear boleta del backend al formato del frontend
const mapearBoletaAPedido = (boleta: BoletaBackend, userEmail: string): Pedido => ({
    id: `${userEmail}-${boleta.id}`,
    fecha: new Date(boleta.fecha),
    items: boleta.detalles?.map((d: any) => ({
        id: d.productoId,
        titulo: `Producto #${d.productoId}`,
        imagen: '/img/default-cake.jpg',
        forma: 'Circulares',
        tamanio: 'Grande',
        precio: d.precioUnitario,
        descripcion: '',
        quantity: d.cantidad,
    })) || [],
    subtotal: boleta.total,
    descuentoCodigo: 0,
    descuentoUsuario: 0,
    total: boleta.total,
    estado: 'completado',
});

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const { user } = useUser();

    // Cargar pedidos desde localStorage al iniciar (como cache)
    useEffect(() => {
        const savedPedidos = localStorage.getItem('pedidos');
        if (savedPedidos) {
            try {
                const parsedPedidos = JSON.parse(savedPedidos);
                const pedidosConFechas = parsedPedidos.map((p: any) => ({
                    ...p,
                    fecha: new Date(p.fecha)
                }));
                setPedidos(pedidosConFechas);
            } catch {
                localStorage.removeItem('pedidos');
            }
        }
    }, []);

    // Intentar cargar pedidos del backend cuando hay usuario
    useEffect(() => {
        const cargarDesdeBackend = async () => {
            if (user?.id) {
                try {
                    const boletas = await PedidoService.listarPorUsuario(user.id);
                    if (boletas.length > 0) {
                        const pedidosBackend = boletas.map((b: BoletaBackend) => 
                            mapearBoletaAPedido(b, user.email)
                        );
                        // Combinar con pedidos locales que no estén en el backend
                        setPedidos(prev => {
                            const idsBackend = new Set(pedidosBackend.map((p: Pedido) => p.id));
                            const pedidosLocales = prev.filter((p: Pedido) => !idsBackend.has(p.id));
                            return [...pedidosBackend, ...pedidosLocales];
                        });
                    }
                } catch (err) {
                    console.log('Backend de pedidos no disponible, usando localStorage');
                }
            }
        };
        cargarDesdeBackend();
    }, [user]);

    // Guardar pedidos en localStorage cada vez que cambien
    useEffect(() => {
        if (pedidos.length > 0) {
            localStorage.setItem('pedidos', JSON.stringify(pedidos));
        }
    }, [pedidos]);

    // Agregar pedido (se crea localmente, el backend lo crea via boleta)
    const agregarPedido = useCallback((pedidoData: Omit<Pedido, 'id' | 'fecha' | 'estado'>) => {
        if (!user) return;

        const nuevoPedido: Pedido = {
            ...pedidoData,
            id: `${user.email}-${Date.now()}`,
            fecha: new Date(),
            estado: 'completado'
        };

        setPedidos(prev => [nuevoPedido, ...prev]);
    }, [user]);

    // Obtener pedidos de un usuario específico
    const obtenerPedidosUsuario = useCallback((userEmail: string): Pedido[] => {
        return pedidos.filter(pedido => pedido.id.startsWith(userEmail));
    }, [pedidos]);

    // Actualizar estado de pedido
    const actualizarEstadoPedido = useCallback((
        pedidoId: string, 
        nuevoEstado: 'completado' | 'pendiente' | 'cancelado'
    ) => {
        setPedidos(prev => 
            prev.map(pedido => 
                pedido.id === pedidoId 
                    ? { ...pedido, estado: nuevoEstado }
                    : pedido
            )
        );
    }, []);

    // Eliminar pedido
    const eliminarPedido = useCallback((pedidoId: string) => {
        setPedidos(prev => prev.filter(pedido => pedido.id !== pedidoId));
    }, []);

    return (
        <PedidosContext. Provider
            value={{
                pedidos,
                agregarPedido,
                obtenerPedidosUsuario,
                actualizarEstadoPedido,
                eliminarPedido
            }}
        >
            {children}
        </PedidosContext.Provider>
    );
};

export const usePedidos = () => {
    const context = useContext(PedidosContext);
    if (! context) {
        throw new Error('usePedidos must be used within a PedidosProvider');
    }
    return context;
};