import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import CarritoService, { type CarritoDTO, type ItemDTO, type Boleta } from '../service/carrito.service';
import type { Producto } from '../data/productos';

// Interfaces
interface CartItem extends Producto {
    quantity: number;
    itemIdBackend?: number; // ID del item en el backend
}

interface PromoCode {
    code: string;
    discount: number;
    isValid: boolean;
}

interface CartState {
    carritoId: number | null; // ID del carrito en el backend
    usuarioId: number | null;
    items: CartItem[];
    total: number;
    itemCount: number;
    promoCode: PromoCode | null;
    subtotal: number;
    discount: number;
    loading: boolean;
    synced: boolean; // Indica si está sincronizado con el backend
}

type CartAction =
    | { type: 'SET_CARRITO_ID'; payload: { carritoId: number; usuarioId: number } }
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'APPLY_PROMO_CODE'; payload: PromoCode }
    | { type: 'REMOVE_PROMO_CODE' }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartState }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SYNC_FROM_BACKEND'; payload: CarritoDTO };

interface CartContextType {
    cart: CartState;
    addToCart: (producto: Producto) => Promise<void>;
    removeFromCart: (id: number) => Promise<void>;
    updateQuantity: (id: number, quantity: number) => Promise<void>;
    applyPromoCode: (code: string) => boolean;
    removePromoCode: () => void;
    clearCart: () => Promise<void>;
    initializeCart: (usuarioId: number) => Promise<void>;
    generarBoleta: () => Promise<Boleta>;
}

// Códigos promocionales válidos
const VALID_PROMO_CODES: Record<string, number> = {
    'FELICES50': 10,
    'DESCUENTO20': 20,
};

// Estado inicial
const initialState: CartState = {
    carritoId: null,
    usuarioId: null,
    items: [],
    total: 0,
    itemCount: 0,
    promoCode: null,
    subtotal: 0,
    discount: 0,
    loading: false,
    synced: false,
};

// Funciones helper
const calculateSubtotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.precio * item.quantity, 0);
};

const calculateTotal = (subtotal: number, discount: number): number => {
    return subtotal - discount;
};

const calculateDiscount = (subtotal: number, promoCode: PromoCode | null): number => {
    if (!promoCode || !promoCode.isValid) return 0;
    return Math.round(subtotal * (promoCode.discount / 100));
};

const calculateItemCount = (items: CartItem[]): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'SET_CARRITO_ID':
            return {
                ... state,
                carritoId: action. payload.carritoId,
                usuarioId: action.payload.usuarioId,
                synced: true,
            };

        case 'SET_LOADING':
            return { ...state, loading: action.payload };

        case 'ADD_TO_CART': {
            const existingIndex = state.items. findIndex(item => item.id === action.payload.id);
            let newItems: CartItem[];

            if (existingIndex > -1) {
                newItems = state.items.map((item, index) =>
                    index === existingIndex
                        ? { ... item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                newItems = [...state.items, action.payload];
            }

            const subtotal = calculateSubtotal(newItems);
            const discount = calculateDiscount(subtotal, state.promoCode);
            const total = calculateTotal(subtotal, discount);

            return {
                ...state,
                items: newItems,
                subtotal,
                discount,
                total,
                itemCount: calculateItemCount(newItems),
            };
        }

        case 'REMOVE_FROM_CART': {
            const newItems = state.items.filter(item => item.id !== action.payload);
            const subtotal = calculateSubtotal(newItems);
            const discount = calculateDiscount(subtotal, state.promoCode);
            const total = calculateTotal(subtotal, discount);

            return {
                ... state,
                items: newItems,
                subtotal,
                discount,
                total,
                itemCount: calculateItemCount(newItems),
            };
        }

        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                const newItems = state. items.filter(item => item.id !== id);
                const subtotal = calculateSubtotal(newItems);
                const discount = calculateDiscount(subtotal, state. promoCode);
                const total = calculateTotal(subtotal, discount);

                return {
                    ... state,
                    items: newItems,
                    subtotal,
                    discount,
                    total,
                    itemCount: calculateItemCount(newItems),
                };
            }

            const newItems = state.items. map(item =>
                item.id === id ?  { ...item, quantity } : item
            );

            const subtotal = calculateSubtotal(newItems);
            const discount = calculateDiscount(subtotal, state.promoCode);
            const total = calculateTotal(subtotal, discount);

            return {
                ...state,
                items: newItems,
                subtotal,
                discount,
                total,
                itemCount: calculateItemCount(newItems),
            };
        }

        case 'APPLY_PROMO_CODE': {
            const subtotal = calculateSubtotal(state.items);
            const discount = calculateDiscount(subtotal, action.payload);
            const total = calculateTotal(subtotal, discount);

            return {
                ...state,
                promoCode: action.payload,
                discount,
                total,
            };
        }

        case 'REMOVE_PROMO_CODE': {
            const subtotal = calculateSubtotal(state.items);
            return {
                ...state,
                promoCode: null,
                discount: 0,
                total: subtotal,
            };
        }

        case 'CLEAR_CART':
            return {
                ...initialState,
                carritoId: state.carritoId,
                usuarioId: state.usuarioId,
            };

        case 'LOAD_CART':
            return action.payload;

        case 'SYNC_FROM_BACKEND': {
            const backendCarrito = action.payload;
            // Aquí mapearías los items del backend a tu formato local
            return {
                ...state,
                carritoId: backendCarrito.id,
                total: backendCarrito.total,
                synced: true,
                loading: false,
            };
        }

        default:
            return state;
    }
};

// Contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    // Cargar carrito desde localStorage al iniciar (fallback local)
    useEffect(() => {
        const savedCart = localStorage. getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: parsedCart });
            } catch {
                localStorage.removeItem('cart');
            }
        }
    }, []);

    // Guardar en localStorage como cache
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Inicializar carrito en el backend
    const initializeCart = useCallback(async (usuarioId: number) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const carritoBackend = await CarritoService.crear(usuarioId);
            dispatch({
                type: 'SET_CARRITO_ID',
                payload: { carritoId: carritoBackend.id, usuarioId }
            });
        } catch (error) {
            console. error('Error al inicializar carrito en backend:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    // Agregar al carrito (sincronizado con backend)
    const addToCart = useCallback(async (producto: Producto) => {
        // Primero actualizar estado local para UX inmediata
        const cartItem: CartItem = { ...producto, quantity: 1 };
        dispatch({ type: 'ADD_TO_CART', payload: cartItem });

        // Si hay carritoId, sincronizar con backend
        if (cart.carritoId) {
            try {
                const itemDTO: ItemDTO = {
                    productoId: producto.id,
                    cantidad: 1,
                };
                await CarritoService.agregarItem(cart.carritoId, itemDTO);
            } catch (error) {
                console.error('Error al sincronizar con backend:', error);
                // El item ya está en el estado local, se sincronizará después
            }
        }
    }, [cart.carritoId]);

    // Remover del carrito
    const removeFromCart = useCallback(async (id: number) => {
        const item = cart.items. find(i => i.id === id);
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });

        if (cart.carritoId && item?. itemIdBackend) {
            try {
                await CarritoService.eliminarItem(cart.carritoId, item. itemIdBackend);
            } catch (error) {
                console.error('Error al eliminar item del backend:', error);
            }
        }
    }, [cart. carritoId, cart.items]);

    // Actualizar cantidad
    const updateQuantity = useCallback(async (id: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
        // Aquí podrías agregar lógica para actualizar en el backend
    }, []);

    // Aplicar código promocional
    const applyPromoCode = useCallback((code: string): boolean => {
        const upperCode = code.toUpperCase(). trim();
        const discount = VALID_PROMO_CODES[upperCode];

        if (discount !== undefined) {
            dispatch({
                type: 'APPLY_PROMO_CODE',
                payload: { code: upperCode, discount, isValid: true },
            });
            return true;
        }
        return false;
    }, []);

    // Remover código promocional
    const removePromoCode = useCallback(() => {
        dispatch({ type: 'REMOVE_PROMO_CODE' });
    }, []);

    // Limpiar carrito
    const clearCart = useCallback(async () => {
        dispatch({ type: 'CLEAR_CART' });
        // Aquí podrías crear un nuevo carrito en el backend si es necesario
    }, []);

    // Generar boleta
    const generarBoleta = useCallback(async () => {
        if (! cart.carritoId) {
            throw new Error('No hay carrito activo');
        }
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const boleta = await CarritoService. generarBoleta(cart.carritoId);
            console.log('Boleta generada:', boleta);
            dispatch({ type: 'CLEAR_CART' });
            return boleta;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [cart.carritoId]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                applyPromoCode,
                removePromoCode,
                clearCart,
                initializeCart,
                generarBoleta,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado con CartProvider');
    }
    return context;
};