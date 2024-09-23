import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface FormData {
    marca: string;
    modelo: string;
    year: string;
    estado_actual: string;
    kilometraje: string;
    foto: File | null; // Asegúrate de que el tipo sea File | null
    notas: string;
}

const CreateCar: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        marca: '',
        modelo: '',
        year: '',
        estado_actual: 'nuevo',
        kilometraje: '',
        foto: null,
        notas: ''
    });
    const token = localStorage.getItem('token');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; // Esto permite que file sea de tipo File o null
        setFormData(prevState => ({
            ...prevState,
            foto: file // Aquí se asigna file directamente
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Crear un FormData para enviar el archivo y los demás datos
        const data = new FormData();
        data.append('marca', formData.marca);
        data.append('modelo', formData.modelo);
        data.append('year', formData.year);
        data.append('estado_actual', formData.estado_actual);
        data.append('kilometraje', formData.kilometraje);
        if (formData.foto) {
            data.append('foto', formData.foto);
        }
        data.append('notas', formData.notas);

        try {
            const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/create-new`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}` // No agregar 'Content-Type'
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(`Error: ${data.message}`);
            }

            toast.success('Vehículo agregado con éxito!');
            setFormData({
                marca: '',
                modelo: '',
                year: '',
                estado_actual: 'nuevo',
                kilometraje: '',
                foto: null,
                notas: ''
            });
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Agregar Vehículo</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca</label>
                    <input 
                        type="text" 
                        name="marca" 
                        value={formData.marca} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">Modelo</label>
                    <input 
                        type="text" 
                        name="modelo" 
                        value={formData.modelo} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">Año</label>
                    <input 
                        type="number" 
                        name="year" 
                        value={formData.year} 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="estado_actual" className="block text-sm font-medium text-gray-700">Estado</label>
                    <select 
                        name="estado_actual" 
                        value={formData.estado_actual} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="nuevo">Nuevo</option>
                        <option value="usado">Usado</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="kilometraje" className="block text-sm font-medium text-gray-700">Kilometraje</label>
                    <input 
                        type="number" 
                        name="kilometraje" 
                        value={formData.kilometraje} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="foto" className="block text-sm font-medium text-gray-700">Foto</label>
                    <input 
                        type="file" 
                        name="foto" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="notas" className="block text-sm font-medium text-gray-700">Notas</label>
                    <textarea 
                        name="notas" 
                        value={formData.notas} 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        rows={4}
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Agregar Vehículo
                </button>
            </form>
        </div>
    );
};

export default CreateCar;
