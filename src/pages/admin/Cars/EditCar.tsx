import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FormData {
    marca: string;
    modelo: string;
    year: string;
    estado_actual: string;
    kilometraje: string;
    foto: File | null; 
    notas: string;
}

const EditCar: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [carData, setCarData] = useState<FormData>({
        marca: '',
        modelo: '',
        year: '',
        estado_actual: 'nuevo',
        kilometraje: '',
        foto: null,
        notas: '',
    });

    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarData = async () => {
            const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/get/${id}`);
            if (response.ok) {
                const data = await response.json();
                setCarData(data);
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
        const file = e.target.files?.[0] || null; 
        setCarData(prevState => ({
            ...prevState,
            foto: file, 
        }));
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
        if (carData.foto) {
            formData.append('foto', carData.foto); 
        }

        const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}` 
            },
            body: formData, 
        });
        

        console.log(response)

        if (response.ok) {
            toast.success('Vehículo actualizado con éxito');
            navigate('/admin/cars');
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
            <h1 className="text-2xl font-bold text-center mb-6">Editar Vehiculo</h1>
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
                    <label htmlFor="estado_actual" className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                        name="estado_actual"
                        value={carData.estado_actual}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="nuevo">Nuevo</option>
                        <option value="usado">Usado</option>
                    </select>
                </div>


                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Actualizar Vehiculo
                </button>
            </form>
        </div>
    );
};

export default EditCar;
