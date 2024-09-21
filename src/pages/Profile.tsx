import React, { useState, useEffect } from 'react';
import { Alert, AlertProps } from '../utilities/Alert';
import { useUser } from '../context/AuthContext';

const Profile: React.FC = () => {
    const { user, updateUserContext } = useUser();
    const [name, setName] = useState<string>('John Doe');
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('user@example.com');
    const [phone, setPhone] = useState<string>('');
    const [document, setDocument] = useState<string>('');

    const [alert, setAlert] = useState<AlertProps | null>(null);


    useEffect(() => {
        if (user) {
            setName(user.nombre || '')
            setEmail(user.email || '')
            setPhone(user.telefono || '');
            setDocument(user.documento || '')
        }
    }, [user])


    const handleSaveChanges = async () => {
        try {
            const response = await fetch('http://localhost:5000/users/update-user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    nombre: name,
                    email,
                    telefono: phone,
                    documento: document,
                    categoria: user?.categoria,
                    suscripcion_activa: user?.suscripcion_activa,
                    oldPassword,
                    newPassword,
                    repeatPassword
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setAlert({
                    message: data.error,
                    bgColor: 'red',
                    textColor: 'white',
                });
                throw new Error(data.error);
            }

            // Actualiza el contexto con los nuevos datos
            updateUserContext({ nombre: name, email, telefono: phone, documento: document });

            setAlert({
                message: 'Datos actualizados correctamente',
                bgColor: 'green',
                textColor: 'white',
            });

        } catch (error) {
            console.error('Error al actualizar los datos:', error);
        }
    };

    const handleDeleteProfile = () => {
        // Lógica para eliminar el perfil
        console.log('Perfil eliminado');
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-black mb-8">Perfil</h1>
            {alert && (
                <Alert
                    message={alert.message}
                    bgColor={alert.bgColor}
                    textColor={alert.textColor}
                    onClose={() => setAlert(null)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                            Nombre completo <span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="old-password">
                            Contraseña anterior <span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="old-password"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="new-password">
                            Nueva Contraseña <span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="repeat-password">
                            Repetir Nueva Contraseña <span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="repeat-password"
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Foto de Perfil (Soporte para jpg y png)
                        </label>
                        <div className="w-full h-40 border border-dashed border-gray-300 flex items-center justify-center rounded-lg">
                            <button className="text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="mb-6 flex justify-between items-center">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full max-w-[500px] p-3 border border-gray-300 rounded-lg"
                        />
                        <button className="bg-[#FFC940] w-full max-w-[200px] px-4 py-2 rounded-lg ml-4 hover:bg-yellow-600 transition-colors">
                            Verificar Email
                        </button>
                    </div>

                    <div className="mb-6 flex justify-between items-center">
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+01 000 000 00 00"
                            className="w-full max-w-[500px] p-3 border border-gray-300 rounded-lg"
                        />
                        <button className="bg-[#FFC940] w-full max-w-[200px] px-4 py-2 rounded-lg ml-4 hover:bg-yellow-600 transition-colors">
                            Verificar Telefono
                        </button>
                    </div>

                    <div className="mb-6 flex justify-between items-center">
                        <input
                            id="document"
                            type="text"
                            value={document}
                            onChange={(e) => setDocument(e.target.value)}
                            className="w-full max-w-[500px] p-3 border border-gray-300 rounded-lg"
                        />
                        <button className="bg-[#FFC940] w-full max-w-[200px] px-4 py-2 rounded-lg ml-4 hover:bg-yellow-600 transition-colors">
                            Verificar Identidad
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 w-full flex justify-between">
                <button
                    onClick={handleDeleteProfile}
                    className="bg-[#FFC940] px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    Eliminar Perfil
                </button>

                <button
                    onClick={handleSaveChanges}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default Profile;
