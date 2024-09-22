import React, { useState, useEffect } from 'react';
import { useUser } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
    const { user, updateUserContext } = useUser();
    const [name, setName] = useState<string>('John Doe');
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('user@example.com');
    const [phone, setPhone] = useState<string>('');
    const [document, setDocument] = useState<string>('');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    useEffect(() => {
        // console.log(user)
        if (user) {
            setName(user.nombre || '');
            setEmail(user.email || '');
            setPhone(user.telefono || '');
            setDocument(user.documento || '');
        }
    }, [user]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfileImage(event.target.files[0]);
        }
    };

    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append('nombre', name);
        formData.append('email', email);
        formData.append('telefono', phone);
        formData.append('documento', document);
        formData.append('oldPassword', oldPassword);
        formData.append('newPassword', newPassword);
        formData.append('repeatPassword', repeatPassword);

        // Si hay una imagen, añadirla al FormData
        if (profileImage) {
            console.log(profileImage)
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await fetch('http://localhost:5000/users/update-user', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log(data)

            if (!response.ok) {
                toast.error(`Error: ${data.error}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    style: {
                        backgroundColor: '#4D171A',
                        color: '#ffffff',
                    }
                });
                throw new Error(data.error);
            }


            updateUserContext({
                nombre: name,
                email,
                telefono: phone,
                documento: document,
                foto: data.foto || user?.foto
            });

            toast.success('Actualización Completa', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                style: {
                    backgroundColor: '#1C3022',
                    color: '#ffffff',
                }
            })

        } catch (error) {
            console.error('Error al actualizar los datos:', error);
        }
    };

    const handleDeleteProfile = () => {
        // Lógica para eliminar el perfil
        console.log('Perfil eliminado');
    };

    return (
        <>

            {user?.categoria === 'administrador' ? (
                <div className='bg-[#0056B3] text-white p-4 mt-10 text-center'>
                    <Link to={'/admin'}>
                        Accede al panel de Administración aquí
                    </Link>
                </div>
            ) : (
                ''
            )}



            <div className="container mx-auto p-8">

                <h1 className="text-4xl font-black mb-8">Perfil</h1>

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
                            <input
                                type="file"
                                accept="image/jpeg, image/png"
                                onChange={handleImageChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
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
                        className="bg-[#2D4E9C] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;
