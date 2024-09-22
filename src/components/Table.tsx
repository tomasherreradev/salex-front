import React from 'react';

interface TableProps {
  data: Array<{ [key: string]: any }>;
  headers: string[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, headers, onEdit, onDelete }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="border border-gray-300 px-4 py-2 text-left">
              {header}
            </th>
          ))}
          <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-b border-gray-300">
            {headers.map((header) => (
              <td key={header} className="border border-gray-300 px-4 py-2">
                {row[header]}
              </td>
            ))}
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => onEdit(row.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600 transition"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(row.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
