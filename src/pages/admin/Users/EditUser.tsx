import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import useCustomNavigate from '../../../hooks/useCustomNavigate';

interface FormData {
    nombre: string;
    email: string;
    password: string;
    telefono: string;
    documento: string;
    foto: File | null;
    categoria: 'usuario' | 'suscriptor' | 'administrador';
    suscripcion_activa: boolean;
    confirmada: boolean;
    existingFotoUrl: string | null;
}

const EditUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [userData, setUserData] = useState<FormData>({
        nombre: '',
        email: '',
        password: '',
        telefono: '',
        documento: '',
        foto: null,
        existingFotoUrl: null,
        categoria: 'usuario',
        suscripcion_activa: false,
        confirmada: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {goTo} = useCustomNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/users/get/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }

                const user = await response.json();
                setUserData({
                    nombre: user.nombre,
                    email: user.email,
                    password: '', // No rellenamos el password por seguridad
                    telefono: user.telefono,
                    documento: user.documento,
                    foto: null, // La foto será gestionada por separado
                    existingFotoUrl: user.foto ? `${user.foto}` : null,
                    categoria: user.categoria,
                    suscripcion_activa: user.suscripcion_activa,
                    confirmada: user.confirmada,
                });
                setLoading(false);
            } catch (error) {
                setError('Error al obtener los datos del usuario');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id, token]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('nombre', userData.nombre);
        formData.append('email', userData.email);
        if (userData.password) {
            formData.append('password', userData.password);
        }
        formData.append('telefono', userData.telefono);
        formData.append('documento', userData.documento);
        if (userData.foto) {
            formData.append('profileImage', userData.foto);
        }
        formData.append('categoria', userData.categoria);
        formData.append('suscripcion_activa', userData.suscripcion_activa ? '1' : '0'); // Asegúrate de que esto sea lo que tu DB espera
        formData.append('confirmada', userData.confirmada ? '1' : '0'); // Lo mismo aquí
    
        try {
            const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/users/update-user/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (response.ok) {
                toast.success('Usuario actualizado con éxito');
                goTo('/admin/users');
            } else {
                const data = await response.json();
                toast.error(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el usuario');
        }
    };
    

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
            <h2 className="text-3xl font-bold mb-6">
                Editar <span className="text-[#0056B3]">Usuario</span>
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre" className="block mb-2">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={userData.nombre}
                        onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="telefono" className="block mb-2">Teléfono:</label>
                    <input
                        type="text"
                        id="telefono"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={userData.telefono}
                        onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="documento" className="block mb-2">Documento:</label>
                    <input
                        type="text"
                        id="documento"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={userData.documento}
                        onChange={(e) => setUserData({ ...userData, documento: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="profileImage" className="block mb-2">Foto de perfil:</label>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => {
                            if (e.target.files) {
                                setUserData({ ...userData, foto: e.target.files[0] });
                            }
                        }}
                    />
                    {userData.existingFotoUrl && (
                        <img src={`${import.meta.env.VITE_SALEX_BACK_API_URL}${userData.existingFotoUrl}`} alt="Foto de perfil" className="mt-2 w-32 h-32 object-cover rounded" />
                    )}
                </div>
                <div>
                    <label htmlFor="categoria" className="block mb-2">Categoría:</label>
                    <select
                        id="categoria"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={userData.categoria}
                        onChange={(e) => setUserData({ ...userData, categoria: e.target.value as 'usuario' | 'suscriptor' | 'administrador' })}
                    >
                        <option value="usuario">Usuario</option>
                        <option value="suscriptor">Suscriptor</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="suscripcion_activa" className="inline-flex items-center">
                        <input
                            type="checkbox"
                            id="suscripcion_activa"
                            className="mr-2"
                            checked={userData.suscripcion_activa}
                            onChange={(e) => setUserData({ ...userData, suscripcion_activa: e.target.checked })}
                        />
                        Suscripción activa
                    </label>
                </div>
                <div>
                    <label htmlFor="confirmada" className="inline-flex items-center">
                        <input
                            type="checkbox"
                            id="confirmada"
                            className="mr-2"
                            checked={userData.confirmada}
                            onChange={(e) => setUserData({ ...userData, confirmada: e.target.checked })}
                        />
                        Confirmada
                    </label>
                </div>
                <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};

export default EditUser;
