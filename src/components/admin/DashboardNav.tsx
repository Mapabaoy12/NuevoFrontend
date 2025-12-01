interface DashboardNavProps {
    activeTab: 'productos' | 'usuarios' | 'pedidos';
    onTabChange: (tab: 'productos' | 'usuarios' | 'pedidos') => void;
}

export const DashboardNav = ({ activeTab, onTabChange }: DashboardNavProps) => {
    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-4">
                <button
                    onClick={() => onTabChange('productos')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'productos'
                            ? 'border-rose-500 text-rose-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Gestion de Productos
                </button>
                <button
                    onClick={() => onTabChange('usuarios')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'usuarios'
                            ? 'border-rose-500 text-rose-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Gestion de Usuarios
                </button>
                <button
                    onClick={() => onTabChange('pedidos')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'pedidos'
                            ? 'border-rose-500 text-rose-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Gestion de Pedidos
                </button>
            </nav>
        </div>
    );
};
