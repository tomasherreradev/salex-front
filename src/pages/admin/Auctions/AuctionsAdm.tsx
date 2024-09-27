import React, { useEffect } from 'react';
import Table from '../../../components/Table';
import { Link } from 'react-router-dom';
import usePagination from '../../../hooks/usePagination';
import useFetchData from '../../../hooks/useFetch';
import useDeleteItem from '../../../hooks/useDeleteItems';
import Pagination from '../../../utilities/Pagination';
import useCustomNavigate from '../../../hooks/useCustomNavigate';

const Auctions: React.FC = () => {
  const token = localStorage.getItem('token');
  const { goTo } = useCustomNavigate();
  const { data: auctionsData, loading, refetch } = useFetchData(`${import.meta.env.VITE_SALEX_BACK_API_URL}/auctions/get-all`);
  const { currentItems, paginate, currentPage, totalPages } = usePagination(auctionsData, 10);
  const { handleDelete } = useDeleteItem(token, refetch);

  useEffect(() => {
    console.log(auctionsData);
  }, [auctionsData]);

  const headers = ['id', 'marca', 'modelo', 'year', 'estado_actual', 'kilometraje', 'precio_inicial', 'puja_minima', 'fecha_inicio', 'fecha_fin'];

  const handleEdit = (id: number) => {
    console.log(`yendo a /admin/auctions/edit/${id}`);
    goTo(`/admin/auctions/edit/${id}`); // Navega a la ruta de edición
  };

  const confirmDelete = (id: number, itemName: string) => {
    const deleteUrl = `${import.meta.env.VITE_SALEX_BACK_API_URL}/auctions/delete/${id}`;
    handleDelete(id, deleteUrl, itemName = 'Subasta');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Mapea los datos para incluir la URL de la imagen
  const mappedItems = currentItems.map(item => ({
    ...item,
    id: item.id, // Asegúrate de que esta clave sea la correcta
    fotoUrl: item.foto ? `${import.meta.env.VITE_SALEX_BACK_API_URL}${item.foto}` : null
  }));

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold">Gestión de <span className="text-[#0056B3]">Subastas</span></h2>
        <div className="bg-green-800 text-white p-2 rounded-xl hover:bg-green-950 transition-colors">
          <Link to="/admin/auctions/create">Agregar Subasta</Link>
        </div>
      </div>

      <Table 
        data={mappedItems}
        headers={headers} 
        onEdit={handleEdit} 
        onDelete={confirmDelete}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </div>
  );
};

export default Auctions;
