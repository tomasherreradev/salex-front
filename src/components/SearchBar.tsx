import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  apiEndpoint: string;
  span: string
  redirectTo: string;
  searchBy: string
}

const SearchBar: React.FC<SearchBarProps> = ({ apiEndpoint, redirectTo, span, searchBy }) => {
  const [searchParam, setSearchParam] = useState<string>('');
  const [result, setResult] = useState<any | null>(null); // Cambia a null
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchParam) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parameter: searchParam.trim() }),
      });

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setResult(data); // Cambia esto para usar setResult
      } else {
        setError('Error fetching data.');
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center my-12 gap-5">
      <div className='flex gap-2'>
        <input
          type="text"
          className="w-full max-w-lg p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder={`${searchBy}`}
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="w-full max-w-lg flex justify-center">
        {result ? ( // Cambia aquí a result directamente
          <Link to={`${redirectTo}${result.id}`} className="p-4 border rounded-lg shadow">
            Ver Registro: {''}
            <span className='font-bold text-blue-600'>
              {result[span]}
            </span>
          </Link>
        ) : (
          !loading && <div className="text-gray-500">Sin búsquedas</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
