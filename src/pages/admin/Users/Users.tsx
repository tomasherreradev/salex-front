import React from 'react';
import Table from '../../../components/Table';
import { Link } from 'react-router-dom';
import usePagination from '../../../hooks/usePagination';
import useFetchData from '../../../hooks/useFetch';
import useDeleteItem from '../../../hooks/useDeleteItems';
import useCustomNavigate from '../../../hooks/useCustomNavigate';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Users: React.FC = () => {
  const token = localStorage.getItem('token');
  const { data: userData, loading, refetch } = useFetchData(`${import.meta.env.VITE_SALEX_BACK_API_URL}/users/get-all`);
  const { currentItems, paginate, currentPage, totalPages } = usePagination(userData, 10);
  const { handleDelete } = useDeleteItem(token, refetch);
  const { goTo } = useCustomNavigate();

  const headers = ['id', 'nombre', 'email', 'categoria', 'suscripcion_activa'];

  const handleEdit = (id: number) => {
    goTo(`/admin/users/edit/${id}`);
  };

  // Función para manejar la eliminación de un usuario
  const confirmDelete = (id: number, itemName: string) => {
    const deleteUrl = `${import.meta.env.VITE_SALEX_BACK_API_URL}/users/delete/${id}`; // Cambia la URL según tu API
    handleDelete(id, deleteUrl, itemName = 'Usuario');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold">Gestión de <span className="text-[#0056B3]">Usuarios</span></h2>
        <div className="bg-green-800 text-white p-2 rounded-xl hover:bg-green-950 transition-colors">
          <Link to="/admin/users/create">Agregar Usuario</Link>
        </div>
      </div>

      <Table 
        data={currentItems} 
        headers={headers} 
        onEdit={handleEdit} 
        onDelete={confirmDelete} // Pasar la función de confirmación de eliminación
      />

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

export default Users;
