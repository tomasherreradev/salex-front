import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useCustomNavigate from '../../../hooks/useCustomNavigate';


interface FormData {
    marca: string;
    modelo: string;
    year: string;
    estado_actual: string;
    kilometraje: string;
    fotos: File[];
    notas: string;
    placa: string;
    color: string;
}

const CreateCar: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        marca: '',
        modelo: '',
        year: '',
        estado_actual: 'Óptimas Condiciones',
        kilometraje: '',
        fotos: [],
        notas: '',
        placa: '',
        color: ''
    });
    const token = localStorage.getItem('token');
    const {goTo} = useCustomNavigate();



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFormData(prevState => ({
                ...prevState,
                fotos: Array.from(files) // Convertimos la FileList en un array
            }));
        }
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
        formData.fotos.forEach((foto) => {
            data.append(`fotos`, foto);
        });
        data.append('notas', formData.notas);
        data.append('placa', formData.placa); 
        data.append('color', formData.color); 

        console.log('Datos a enviar:', Array.from(data.entries()));


        try {
            const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/create-new`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(`${data.error}`);
            }

            toast.success('Vehículo agregado con éxito!');
            goTo('/admin/cars');

        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Agregar <span className="text-[#0056B3]">Vehiculo</span></h2>
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
                        <option value="Óptimas Condiciones">Óptimas Condiciones</option>
                        <option value="Corre y Camina">Corre y Camina</option>
                        <option value="Reparación">Reparación</option>
                        <option value="Salvamento">Salvamento</option>
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
                    <label htmlFor="placa" className="block text-sm font-medium text-gray-700">Placa</label>
                    <input 
                        type="text" 
                        name="placa" 
                        value={formData.placa} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                    <input 
                        type="text" 
                        name="color" 
                        value={formData.color} 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="foto" className="block text-sm font-medium text-gray-700">Foto</label>
                    <input 
                        type="file" 
                        name="fotos" 
                        accept="image/*" 
                        multiple 
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
