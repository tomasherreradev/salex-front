import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const useFetchData = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos
  const fetchData = useCallback(async () => {
    setLoading(true); // Muestra el loading cada vez que se llama a esta función
    try {
      const response = await fetch(url);
      if (!response.ok) {
        toast.error('Se produjo un error al obtener los datos');
        return;
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Realiza la solicitud inicial
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData }; // Agregamos la función refetch
};

export default useFetchData;
