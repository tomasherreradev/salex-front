import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

const useDeleteItem = (token: string | null, fetchData: () => void) => {
  const handleDelete = async (id: number, deleteUrl: string, itemName: string) => {
    confirmAlert({
      title: `Confirmar eliminación de ${itemName}`,
      message: `¿Estás seguro de que deseas eliminar este ${itemName}?`,
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              });

              if (response.ok) {
                toast.success(`${itemName} eliminado correctamente`);
                fetchData(); // Refrescar la lista
              } else {
                const data = await response.json();
                toast.error(`Error: ${data.message || 'Error al eliminar el ' + itemName}`);
              }
            } catch (error) {
              toast.error(`Error al eliminar el ${itemName}`);
            }
          },
        },
        {
          label: 'No',
          onClick: () => toast.info('Eliminación cancelada'),
        },
      ],
    });
  };

  return { handleDelete };
};

export default useDeleteItem;
