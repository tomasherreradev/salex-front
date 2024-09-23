import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import { Link } from 'react-router-dom';
import usePagination from '../../../hooks/usePagination';
import { toast } from 'react-toastify';
import type { Car } from '../../../types';
import useCustomNavigate from '../../../hooks/useCustomNavigate';



const Cars: React.FC = () => {
  const [carsData, setCarsData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const {goTo} = useCustomNavigate();

  const headers = ['id', 'marca', 'modelo', 'year', 'estado_actual', 'kilometraje', 'notas'];

  // Paginacion
  const { currentItems, paginate, currentPage, totalPages } = usePagination(carsData, 10);


  useEffect(() => {
    fetchCars()
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/get-all`);
      if (!response.ok) {
        throw new Error('Error al obtener los autos');
      }
      const data = await response.json();
      setCarsData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Se produjo un error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    goTo(`/admin/cars/edit/${id}`)
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (response.ok) {
      toast.success('Vehiculo eliminado');
      fetchCars();
    } else {
      const data = await response.json();
      toast.error(`Error: ${data.message || 'Error al eliminar vehiculo'}`);
    }
  };



  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold">Gestión de <span className="text-[#0056B3]">Autos</span></h2>
        <div className="bg-green-800 text-white p-2 rounded-xl hover:bg-green-950 transition-colors">
          <Link to="/admin/cars/create">Agregar Vehículo</Link>
        </div>
      </div>

      <Table data={currentItems} headers={headers} onEdit={handleEdit} onDelete={handleDelete} />

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cars;
