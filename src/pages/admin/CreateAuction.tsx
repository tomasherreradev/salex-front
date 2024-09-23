import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CreateAuction: React.FC = () => {
    const token = localStorage.getItem('token')

    const [formData, setFormData] = useState({
        auto_id: '',
        precio_inicial: '',
        puja_minima: '',
        ganador_id: '',
        activo: true, // Valor por defecto
        fecha_inicio: '',
        fecha_fin: '',
        precio_final: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Crear un FormData para enviar los datos
        const data = {
            auto_id: formData.auto_id,
            precio_inicial: parseFloat(formData.precio_inicial),
            puja_minima: parseFloat(formData.puja_minima),
            ganador_id: formData.ganador_id || null,
            activo: formData.activo ? 1 : 0,
            fecha_inicio: formData.fecha_inicio,
            fecha_fin: formData.fecha_fin,
            precio_final: formData.precio_final || null
        };


        try {
            const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/auctions/create-new`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
              });

            if(response.ok) {
                toast.success('Subasta agregada con éxito!');
                setFormData({
                    auto_id: '',
                    precio_inicial: '',
                    puja_minima: '',
                    ganador_id: '',
                    activo: true,
                    fecha_inicio: '',
                    fecha_fin: '',
                    precio_final: ''
                });
            } else {
                const data = await response.json();
                toast.error(`Error: ${data.message}`, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                  style: {
                    backgroundColor: '#4D171A', 
                    color: '#ffffff', 
                  }
                });
            }

            
        } catch (error) {
            toast.error('Error al agregar la subasta.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Agregar Subasta</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="auto_id" className="block text-sm font-medium text-gray-700">ID del Auto</label>
                    <input 
                        type="number" 
                        name="auto_id" 
                        value={formData.auto_id} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="precio_inicial" className="block text-sm font-medium text-gray-700">Precio Inicial</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        name="precio_inicial" 
                        value={formData.precio_inicial} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="puja_minima" className="block text-sm font-medium text-gray-700">Puja Mínima</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        name="puja_minima" 
                        value={formData.puja_minima} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="ganador_id" className="block text-sm font-medium text-gray-700">ID del Ganador (opcional)</label>
                    <input 
                        type="number" 
                        name="ganador_id" 
                        value={formData.ganador_id} 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="activo" className="flex items-center">
                        <input 
                            type="checkbox" 
                            name="activo" 
                            checked={formData.activo} 
                            onChange={() => setFormData({ ...formData, activo: !formData.activo })} 
                            className="mr-2" 
                        />
                        Activo
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                    <input 
                        type="datetime-local" 
                        name="fecha_inicio" 
                        value={formData.fecha_inicio} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fecha_fin" className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                    <input 
                        type="datetime-local" 
                        name="fecha_fin" 
                        value={formData.fecha_fin} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="precio_final" className="block text-sm font-medium text-gray-700">Precio Final (opcional)</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        name="precio_final" 
                        value={formData.precio_final} 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Agregar Subasta
                </button>
            </form>
        </div>
    );
};

export default CreateAuction;
