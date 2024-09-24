import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import usePagination from '../../../hooks/usePagination';
import useFetchData from '../../../hooks/useFetch';
import useDeleteItem from '../../../hooks/useDeleteItems';
import Pagination from '../../../utilities/Pagination';
import useCustomNavigate from '../../../hooks/useCustomNavigate';

const AuctionsAdm: React.FC = () => {
  const { goTo } = useCustomNavigate();
  const token = localStorage.getItem('token');
  const { data: auctionsData, loading, refetch } = useFetchData(`${import.meta.env.VITE_SALEX_BACK_API_URL}/auctions/get-all`);
  const { currentItems, paginate, currentPage, totalPages } = usePagination(auctionsData, 10);
  const { handleDelete } = useDeleteItem(token, refetch);

  const headers = [
    'id',
    'activo',
    'auto_id',
    'fecha_inicio',
    'fecha_fin',
    'ganador_id',
    'precio_inicial',
    'precio_final',
    'puja_minima'
  ];

  const handleEdit = (id: number) => {
    goTo(`/admin/auctions/edit/${id}`);
  };


  if (loading) {
    return <div>Cargando...</div>;
  }

  const confirmDelete = (id: number, itemName: string) => {
    const deleteUrl = `${import.meta.env.VITE_SALEX_BACK_API_URL}/auctions/delete/${id}`; // Cambia la URL según tu API
    handleDelete(id, deleteUrl, itemName = 'Registro');
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold">Gestión de <span className="text-[#0056B3]">Subastas</span></h2>
        <div className="bg-green-800 text-white p-2 rounded-xl hover:bg-green-950 transition-colors">
          <Link to="/admin/auctions/create">Agregar Subasta</Link>
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

export default AuctionsAdm;
