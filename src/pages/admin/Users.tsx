import React from 'react';
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import usePagination from '../../hooks/usePagination';

const Users: React.FC = () => {
  const usersData = [
    { id: 1, name: 'User 1', role: 'Administrador' },
    { id: 2, name: 'User 2', role: 'Suscriptor' },
    { id: 3, name: 'User 3', role: 'Administrador' },
    { id: 4, name: 'User 4', role: 'Suscriptor' },
    { id: 5, name: 'User 5', role: 'Administrador' },
    { id: 6, name: 'User 6', role: 'Suscriptor' },
    { id: 7, name: 'User 7', role: 'Administrador' },
    { id: 8, name: 'User 8', role: 'Suscriptor' },
    { id: 9, name: 'User 9', role: 'Administrador' },
    { id: 10, name: 'User 10', role: 'Suscriptor' },
    { id: 11, name: 'User 11', role: 'Administrador' },
    { id: 12, name: 'User 12', role: 'Suscriptor' },
    { id: 13, name: 'User 13', role: 'Administrador' },
    { id: 14, name: 'User 14', role: 'Suscriptor' },
    { id: 15, name: 'User 15', role: 'Administrador' },
    { id: 16, name: 'User 16', role: 'Suscriptor' },
    { id: 17, name: 'User 17', role: 'Administrador' },
    { id: 18, name: 'User 18', role: 'Suscriptor' },
    { id: 19, name: 'User 19', role: 'Administrador' },
    { id: 20, name: 'User 20', role: 'Suscriptor' },
    { id: 21, name: 'User 21', role: 'Administrador' },
    { id: 22, name: 'User 22', role: 'Suscriptor' },
    { id: 23, name: 'User 23', role: 'Administrador' },
    { id: 24, name: 'User 24', role: 'Suscriptor' },
    { id: 25, name: 'User 25', role: 'Administrador' },
    { id: 26, name: 'User 26', role: 'Suscriptor' },
    { id: 27, name: 'User 27', role: 'Administrador' },
    { id: 28, name: 'User 28', role: 'Suscriptor' },
    { id: 29, name: 'User 29', role: 'Administrador' },
    { id: 30, name: 'User 30', role: 'Suscriptor' },
  ];
  
  const headers = ['id', 'name', 'role'];

  const {currentItems, paginate, currentPage, totalPages} = usePagination(usersData, 10)


  const handleEdit = (id: number) => {
    console.log('Editar usuario con ID:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Eliminar usuario con ID:', id);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold">Gestión de <span className="text-[#0056B3]">Usuarios</span></h2>
        <div className="bg-green-800 text-white p-2 rounded-xl hover:bg-green-950 transition-colors">
          <Link to="/admin/users/create">Agregar Usuario</Link>
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

export default Users;
