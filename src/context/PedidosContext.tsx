import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Pedido, PedidosContextType } from '../interfaces/pedidoInterface';
import { useUser } from './UserContext';

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const { user } = useUser();

    // Cargar pedidos desde localStorage al iniciar
    useEffect(() => {
        const savedPedidos = localStorage.getItem('pedidos');
        if (savedPedidos) {
            try {
                const parsedPedidos = JSON.parse(savedPedidos);
                // Convertir las fechas de string a Date
                const pedidosConFechas = parsedPedidos.map((p: any) => ({
                    ...p,
                    fecha: new Date(p.fecha)
                }));
                setPedidos(pedidosConFechas);
            } catch {
                // Si hay error, limpiar datos corruptos
                localStorage.removeItem('pedidos');
            }
        }
    }, []);

    // Guardar pedidos en localStorage cada vez que cambien
    useEffect(() => {
        if (pedidos.length > 0) {
            localStorage.setItem('pedidos', JSON.stringify(pedidos));
        }
    }, [pedidos]);

    const agregarPedido = (pedidoData: Omit<Pedido, 'id' | 'fecha' | 'estado'>) => {
        if (!user) {
            return; // Silenciosamente no hacer nada si no hay usuario
        }

        const nuevoPedido: Pedido = {
            ...pedidoData,
            id: `${user.email}-${Date.now()}`,
            fecha: new Date(),
            estado: 'completado'
        };

        setPedidos(prev => [nuevoPedido, ...prev]);
    };

    const obtenerPedidosUsuario = (userEmail: string): Pedido[] => {
        return pedidos.filter(pedido => pedido.id.startsWith(userEmail));
    };

    const actualizarEstadoPedido = (pedidoId: string, nuevoEstado: 'completado' | 'pendiente' | 'cancelado') => {
        setPedidos(prev => 
            prev.map(pedido => 
                pedido.id === pedidoId 
                    ? { ...pedido, estado: nuevoEstado }
                    : pedido
            )
        );
    };

    const eliminarPedido = (pedidoId: string) => {
        setPedidos(prev => prev.filter(pedido => pedido.id !== pedidoId));
    };

    return (
        <PedidosContext.Provider
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
    if (!context) {
        throw new Error('usePedidos must be used within a PedidosProvider');
    }
    return context;
};
