import React from 'react';
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import usePagination from '../../hooks/usePagination';


const Cars: React.FC = () => {
    const carsData = [
        { id: 1, marca: 'Toyota', modelo: 'Corolla', year: 2020 },
        { id: 2, marca: 'Honda', modelo: 'Civic', year: 2018 },
        { id: 3, marca: 'Ford', modelo: 'Focus', year: 2019 },
        { id: 4, marca: 'Chevrolet', modelo: 'Malibu', year: 2021 },
        { id: 5, marca: 'Nissan', modelo: 'Altima', year: 2020 },
        { id: 6, marca: 'Hyundai', modelo: 'Elantra', year: 2022 },
        { id: 7, marca: 'Kia', modelo: 'Forte', year: 2021 },
        { id: 8, marca: 'Volkswagen', modelo: 'Jetta', year: 2020 },
        { id: 9, marca: 'Subaru', modelo: 'Impreza', year: 2019 },
        { id: 10, marca: 'Mazda', modelo: '3', year: 2021 },
        { id: 11, marca: 'BMW', modelo: '3 Series', year: 2022 },
        { id: 12, marca: 'Audi', modelo: 'A4', year: 2021 },
        { id: 13, marca: 'Mercedes-Benz', modelo: 'C-Class', year: 2020 },
        { id: 14, marca: 'Lexus', modelo: 'IS', year: 2022 },
        { id: 15, marca: 'Toyota', modelo: 'Camry', year: 2021 },
        { id: 16, marca: 'Honda', modelo: 'Accord', year: 2020 },
        { id: 17, marca: 'Ford', modelo: 'Mustang', year: 2019 },
        { id: 18, marca: 'Chevrolet', modelo: 'Camaro', year: 2022 },
        { id: 19, marca: 'Nissan', modelo: 'Maxima', year: 2021 },
        { id: 20, marca: 'Hyundai', modelo: 'Sonata', year: 2022 },
      ];
      
    const headers = ['id', 'marca', 'modelo', 'year']; 

    //paginacion
    const {currentItems, paginate, currentPage, totalPages} = usePagination(carsData, 10)


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
        <h2 className="text-3xl font-bold">Gestión de <span className="text-[#0056B3]">Autos</span></h2>
        <div className="bg-green-800 text-white p-2 rounded-xl hover:bg-green-950 transition-colors">
          <Link to="/admin/cars/create">Agregar Vehiculo</Link>
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
