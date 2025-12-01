import { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { UserForm } from './UserForm';
import { HiRefresh } from 'react-icons/hi';
import type { UsuarioAdmin } from '../../../context/AdminContext';

export const UserList = () => {
    const { 
        usuarios, 
        loadingUsuarios, 
        errorUsuarios,
        cargarUsuarios,
        actualizarUsuario, 
        eliminarUsuario 
    } = useAdmin();
    
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState<UsuarioAdmin | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTipo, setFilterTipo] = useState<string>('todos');

    // Filtrar usuarios
    const usuariosFiltrados = usuarios.filter(usuario => {
        const matchesSearch = usuario.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            usuario.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTipo = filterTipo === 'todos' || usuario.tipoUsuario === filterTipo;
        return matchesSearch && matchesTipo;
    });

    const handleEditUser = (usuario: UsuarioAdmin) => {
        setEditingUser(usuario);
        setShowForm(true);
    };

    const handleSubmit = async (usuario: UsuarioAdmin) => {
        if (!usuario.id) {
            alert('Los usuarios deben registrarse desde la página de registro');
            return;
        }
        try {
            await actualizarUsuario(usuario.id, usuario);
            setShowForm(false);
            setEditingUser(undefined);
        } catch (err) {
            alert('Error al actualizar el usuario');
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            try {
                await eliminarUsuario(id);
            } catch (err) {
                alert('Error al eliminar el usuario');
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingUser(undefined);
    };

    // Estadísticas
    const totalUsuarios = usuarios. length;
    const usuariosCliente = usuarios.filter(u => u.tipoUsuario === 'Cliente'). length;
    const usuariosAdmin = usuarios.filter(u => u.tipoUsuario === 'Admin' || u.tipoUsuario === 'Administrador').length;

    // Loading state
    if (loadingUsuarios && usuarios. length === 0) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
                <span className="ml-3 text-gray-600">Cargando usuarios...</span>
            </div>
        );
    }

    return (
        <div>
            {/* Error message */}
            {errorUsuarios && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center">
                    <span>{errorUsuarios}</span>
                    <button onClick={() => cargarUsuarios()} className="text-red-700 hover:text-red-900">
                        <HiRefresh size={20} />
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
                        <button
                            onClick={() => cargarUsuarios()}
                            disabled={loadingUsuarios}
                            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                            title="Recargar usuarios"
                        >
                            <HiRefresh size={20} className={loadingUsuarios ? 'animate-spin' : ''} />
                        </button>
                    </div>
                    <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                        🔗 Conectado al backend
                    </div>
                </div>

                {/* Barra de búsqueda */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    />
                </div>

                {/* Filtros */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por tipo</label>
                    <select
                        value={filterTipo}
                        onChange={(e) => setFilterTipo(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="todos">Todos los usuarios</option>
                        <option value="Cliente">Clientes</option>
                        <option value="Admin">Administradores</option>
                    </select>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Usuarios</p>
                    <p className="text-2xl font-bold text-blue-600">{totalUsuarios}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Clientes</p>
                    <p className="text-2xl font-bold text-green-600">{usuariosCliente}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Administradores</p>
                    <p className="text-2xl font-bold text-purple-600">{usuariosAdmin}</p>
                </div>
            </div>

            {/* Lista de usuarios */}
            <div className="space-y-4">
                {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map(usuario => (
                        <div key={usuario.id || usuario.email} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold">
                                    {usuario.nombre?. charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{usuario.nombre}</h3>
                                    <p className="text-sm text-gray-500">{usuario.email}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                        {usuario.tipoUsuario || 'Cliente'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditUser(usuario)}
                                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => usuario.id && handleDelete(usuario. id)}
                                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No se encontraron usuarios</p>
                    </div>
                )}
            </div>

            {/* Modal de edición */}
            {showForm && editingUser && editingUser.id && (
                <UserForm
                    usuario={{
                        id: editingUser.id,
                        nombre: editingUser.nombre,
                        email: editingUser.email,
                        telefono: editingUser.telefono,
                        fechaNacimiento: editingUser.fechaNacimiento,
                        direccion: editingUser.direccion,
                        esDuocUC: editingUser.esDuocUC || false,
                        esMayorDe50: editingUser.esMayorDe50 || false,
                        tieneDescuentoFelices50: editingUser.tieneDescuentoFelices50 || false,
                        descuentoPorcentaje: editingUser.descuentoPorcentaje || 0,
                        tortaGratisCumpleanosDisponible: editingUser.tortaGratisCumpleanosDisponible || false,
                        tortaGratisCumpleanosUsada: editingUser.tortaGratisCumpleanosUsada || false,
                    }}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};