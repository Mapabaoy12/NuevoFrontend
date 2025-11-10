import { useState } from 'react';
import { AdminProvider } from '../context/AdminContext';
import { DashboardNav } from '../components/admin/DashboardNav';
import { ProductList } from '../components/admin/productos/ProductList';
import { UserList } from '../components/admin/usuarios/UserList';

export const AdministradorPage = () => {
    const [activeTab, setActiveTab] = useState<'productos' | 'usuarios'>('productos');

    return (
        <AdminProvider>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Panel de Administracion
                        </h1>
                        <p className="text-gray-600">
                            Gestiona productos y usuarios de la pasteleria
                        </p>
                    </div>

                    {/* Navegacion del Dashboard */}
                    <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Contenido del Dashboard */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {activeTab === 'productos' ? (
                            <ProductList />
                        ) : (
                            <UserList />
                        )}
                    </div>
                </div>
            </div>
        </AdminProvider>
    );
};
