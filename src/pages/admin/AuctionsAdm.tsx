import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import usePagination from '../../hooks/usePagination';

const AuctionsAdm: React.FC = () => {

  const auctionsData = [
    { id: 1, vehiculo: 'Toyota Corolla', precio_inicial: 10000 },
    { id: 2, vehiculo: 'Honda Civic', precio_inicial: 8000 },
  ];

  const headers = [
    'id',
    'vehiculo',
    'precio_inicial',
  ]

  const {currentItems, paginate, currentPage, totalPages} = usePagination(auctionsData, 10)


  const handleEdit = (id: number) => {
    console.log('Editar registro con ID:', id);
    // Lógica para editar el registro
  };

  const handleDelete = (id: number) => {
    console.log('Eliminar registro con ID:', id);
    // Lógica para eliminar el registro
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
