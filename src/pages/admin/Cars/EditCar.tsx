import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCustomNavigate from '../../../hooks/useCustomNavigate';
import { toast } from 'react-toastify';

interface FormData {
    marca: string;
    modelo: string;
    year: string;
    estado_actual: string;
    kilometraje: string;
    fotos: File[]; // Cambiado a un array para manejar múltiples archivos
    placa: string;
    color: string;
    notas: string;
    existingFotoUrls: string[];
}

const EditCar: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [carData, setCarData] = useState<FormData>({
        marca: '',
        modelo: '',
        year: '',
        estado_actual: 'Óptimas Condiciones',
        kilometraje: '',
        fotos: [], // Comienza con un array vacío
        existingFotoUrls: [],
        placa: '',
        color: '',
        notas: '',
    });

    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const { goTo } = useCustomNavigate();

    useEffect(() => {
        const fetchCarData = async () => {
            const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/get/${id}`);
            if (response.ok) {
                const data = await response.json();
                setCarData({
                    ...data,
                    existingFotoUrls: data.fotos.map((foto: string) => `${import.meta.env.VITE_SALEX_BACK_API_URL}${foto}`),
                    fotos: [], // Mantiene vacío al cargar los datos
                });
            } else {
                toast.error('Error al obtener los datos del vehículo');
            }
            setLoading(false);
        };
        fetchCarData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setCarData({ ...carData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files); // Convierte a array
            setCarData(prevState => ({
                ...prevState,
                fotos: fileArray, // Establece los archivos seleccionados
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('marca', carData.marca);
        formData.append('modelo', carData.modelo);
        formData.append('year', carData.year);
        formData.append('estado_actual', carData.estado_actual);
        formData.append('kilometraje', carData.kilometraje);
        formData.append('notas', carData.notas);
        formData.append('placa', carData.placa);
        formData.append('color', carData.color);

        // Agrega todas las nuevas fotos si se han seleccionado
        carData.fotos.forEach((foto) => {
            formData.append('fotos', foto);
        });

        const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            toast.success('Vehículo actualizado con éxito');
            goTo('/admin/cars');
        } else {
            const data = await response.json();
            toast.error(`Error: ${data.error}`);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
            <h2 className="text-3xl font-bold">Editar <span className="text-[#0056B3]">Vehiculo</span></h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca</label>
                    <input
                        type="text"
                        name="marca"
                        value={carData.marca}
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
                        value={carData.modelo}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">Año</label>
                    <input
                        type="text"
                        name="year"
                        value={carData.year}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="notas" className="block text-sm font-medium text-gray-700">Notas</label>
                    <input
                        type="text"
                        name="notas"
                        value={carData.notas}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="fotos" className="block text-sm font-medium text-gray-700">Fotos (Nuevas)</label>
                    <input
                        type="file"
                        name="fotos"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple // Permite seleccionar múltiples archivos
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Mostrar las imágenes existentes si hay alguna */}
                {carData.existingFotoUrls.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">Fotos Existentes:</h3>
                        <div className="flex flex-wrap gap-2">
                            {carData.existingFotoUrls.map((url, index) => (
                                <img key={index} src={url} alt={`Foto del vehículo ${index + 1}`} className="h-32 w-32 object-cover" />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="kilometraje" className="block text-sm font-medium text-gray-700">Kilometraje</label>
                    <input
                        type="text"
                        name="kilometraje"
                        value={carData.kilometraje}
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
                        value={carData.placa}
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
                        value={carData.color}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="estado_actual" className="block text-sm font-medium text-gray-700">Estado Actual</label>
                    <select 
                        name="estado_actual" 
                        value={carData.estado_actual} 
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

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Actualizar Vehículo</button>
            </form>
        </div>
    );
};

export default EditCar;
