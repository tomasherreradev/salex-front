import React, {useEffect, useState} from 'react';
import Table from '../../../components/Table';
import { Link } from 'react-router-dom';
import usePagination from '../../../hooks/usePagination';
import {toast} from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface User {
  id: number,
  nombre: string, 
  email: string,
  categoria: string,
  suscripcion_activa: boolean
}

const Users: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([{
     id: 0, 
     nombre: '',
     email: '',
     categoria: '',
     suscripcion_activa: false
  }])
  
  const headers = ['id', 'nombre', 'email', 'categoria', 'suscripcion_activa'];
  const {currentItems, paginate, currentPage, totalPages} = usePagination(userData, 10);

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
    const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/users/get-all`);
    if(!response.ok) {
      toast.error('Se produjo un error al obtener los datos');
      return;
    } 
    const data = await response.json();
    setUserData(data)
    
    } catch (error) {
      toast.error(`${error}`);
    }
  }


  const handleEdit = (id: number) => {
    console.log('Editar usuario con ID:', id);
  };

  const handleDelete = async (id: number) => {
    // Mostrar el cuadro de confirmación
    confirmAlert({
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/users/delete/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              });
    
              if (response.ok) {
                toast.success('Usuario eliminado correctamente');
                fetchUsers();
              } else {
                toast.error('Error al eliminar el usuario');
              }
            } catch (error) {
              toast.error(`Se produjo un error: ${error}`);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {
            toast.info('Eliminación cancelada');
          }
        }
      ]
    });
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
