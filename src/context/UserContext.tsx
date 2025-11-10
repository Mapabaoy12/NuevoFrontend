import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Usuario } from '../data/Usuario';

interface UserContextType {
    user: Usuario | null;
    login: (userData: Usuario) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Usuario | null>(null);

    // Cargar usuario desde localStorage al iniciar
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
            } catch {
                // Si hay error, limpiar datos corruptos
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Guardar usuario en localStorage cada vez que cambie
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (userData: Usuario) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe ser usado con UserProvider');
    }
    return context;
};
