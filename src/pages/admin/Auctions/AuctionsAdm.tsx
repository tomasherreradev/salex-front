import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import usePagination from '../../../hooks/usePagination';
import useCustomNavigate from '../../../hooks/useCustomNavigate';
import { confirmAlert } from 'react-confirm-alert'; // Importar react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importar los estilos por defecto

const AuctionsAdm: React.FC = () => {
  const [auctionsData, setAuctionsData] = useState([]);
  const { goTo } = useCustomNavigate();
  const token = localStorage.getItem('token');

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

  const { currentItems, paginate, currentPage, totalPages } = usePagination(auctionsData, 10);

  const getAuctions = async () => {
    const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/auctions/get-all`);
    if (response.ok) {
      setAuctionsData(await response.json());
    } else {
      const data = await response.json();
      toast.error(`Error: ${data.message || 'Error desconocido'}`);
    }
  };

  useEffect(() => {
    getAuctions();
  }, []);

  const handleEdit = (id: number) => {
    goTo(`/admin/auctions/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    // Confirmar antes de eliminar
    confirmAlert({
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta subasta?',
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/auctions/delete/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
            if (response.ok) {
              toast.success('Subasta eliminada');
              getAuctions(); // Refrescar la lista de subastas
            } else {
              const data = await response.json();
              toast.error(`Error: ${data.message || 'Error al eliminar subasta'}`);
            }
          }
        },
        {
          label: 'No',
          onClick: () => toast.info('Eliminación cancelada')
        }
      ]
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold">Gestión de <span className="text-[#0056B3]">Subastas</span></h2>
        <div className="bg-green-800 text-white p-2 rounded-xl hover:bg-green-950 transition-colors">
          <Link to="/admin/auctions/create">Agregar Subasta</Link>
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

export default AuctionsAdm;
