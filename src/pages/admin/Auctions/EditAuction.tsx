import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCustomNavigate from '../../../hooks/useCustomNavigate';
import type { Car } from '../../../types';


const EditAuction: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [auctionData, setAuctionData] = useState({
    auto_id: '',
    precio_inicial: '',
    puja_minima: '',
    fecha_inicio: '',
    fecha_fin: '',
    activo: false 
  });
  const [loading, setLoading] = useState(true);
  const [autos, setAutos] = useState<Car[]>([]); 
  const token = localStorage.getItem('token');

  const { goTo } = useCustomNavigate();

  useEffect(() => {
    const fetchAuction = async () => {
      const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/auctions/get/${id}`);
      if (response.ok) {
        const data = await response.json();
        const formattedData = {
          ...data,
          fecha_inicio: new Date(data.fecha_inicio).toISOString().slice(0, 16),
          fecha_fin: new Date(data.fecha_fin).toISOString().slice(0, 16),
        };
        setAuctionData(formattedData);
      } else {
        toast.error('Error al obtener los datos de la subasta');
      }
      setLoading(false);
    };

    const fetchAutos = async () => {
      const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/get-all`);
      if (response.ok) {
        const data = await response.json();
        setAutos(data); // Suponiendo que la respuesta contiene una lista de autos
      } else {
        toast.error('Error al obtener los autos');
      }
    };

    fetchAuction();
    fetchAutos();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  
    setAuctionData({ ...auctionData, [name]: type === 'checkbox' ? checked : value });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/auctions/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(auctionData),
    });

    if (response.ok) {
      toast.success('Subasta actualizada con éxito');
      goTo('/admin/auctions'); 
    } else {
      const data = await response.json();
      toast.error(`Error: ${data.message || 'Error desconocido'}`);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!auctionData) {
    return <div>No se encontraron datos de subasta.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Editar Subasta</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="auto_id" className="block text-sm font-medium text-gray-700">ID del Auto</label>
          <select
            name="auto_id"
            value={auctionData.auto_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar Auto</option>
            {autos.map(auto => (
              <option key={auto.id} value={auto.id}>
                {auto.marca} - {auto.modelo} - {auto.placa}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="precio_inicial" className="block text-sm font-medium text-gray-700">Precio Inicial</label>
          <input
            type="number"
            name="precio_inicial"
            value={auctionData.precio_inicial}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="puja_minima" className="block text-sm font-medium text-gray-700">Puja Mínima</label>
          <input
            type="number"
            name="puja_minima"
            value={auctionData.puja_minima}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
          <input
            type="datetime-local"
            name="fecha_inicio"
            value={auctionData.fecha_inicio}
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
            value={auctionData.fecha_fin}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="activo" className="inline-flex items-center">
            <input
              type="checkbox"
              name="activo"
              checked={auctionData.activo}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <span className="text-sm">Activo</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Actualizar Subasta
        </button>
      </form>
    </div>
  );
};

export default EditAuction;
