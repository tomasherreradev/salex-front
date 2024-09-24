import React from 'react';
import Table from '../../../components/Table';
import { Link } from 'react-router-dom';
import usePagination from '../../../hooks/usePagination';
import useFetchData from '../../../hooks/useFetch';
import useDeleteItem from '../../../hooks/useDeleteItems';
import Pagination from '../../../utilities/Pagination';
import useCustomNavigate from '../../../hooks/useCustomNavigate';

const Cars: React.FC = () => {
  const token = localStorage.getItem('token');
  const { goTo } = useCustomNavigate();
  const { data: carsData, loading, refetch } = useFetchData(`${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/get-all`);
  const { currentItems, paginate, currentPage, totalPages } = usePagination(carsData, 10);
  const { handleDelete } = useDeleteItem(token, refetch);

  const headers = ['id', 'marca', 'modelo', 'year', 'estado_actual', 'kilometraje', 'notas', 'placa', 'color', 'foto'];

  const handleEdit = (id: number) => {
    goTo(`/admin/cars/edit/${id}`);
  };


  const confirmDelete = (id: number, itemName: string) => {
    const deleteUrl = `${import.meta.env.VITE_SALEX_BACK_API_URL}/cars/delete/${id}`; // Cambia la URL según tu API
    handleDelete(id, deleteUrl, itemName = 'Vehiculo');
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

      <Table 
        data={currentItems} 
        headers={headers} 
        onEdit={handleEdit} 
        onDelete={confirmDelete}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </div>
  );
};

export default Cars;
