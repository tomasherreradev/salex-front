import { useState } from "react";
import { toast } from "react-toastify";
import useCustomNavigate from "../hooks/useCustomNavigate";
import Loading from 'react-loading'; // Importa el spinner

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    documento: ''
  });
  
  const { goTo } = useCustomNavigate();
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Activa el spinner de carga

    const userData = {
      ...formData,
      categoria: 'usuario',
      suscripcion_activa: false
    };

    try {
      const response = await fetch('http://localhost:5000/users/create-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        toast.success('Registro Exitoso, Confirma Tu Email', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          style: {
            backgroundColor: '#1C3022', 
            color: '#ffffff', 
          }
        });

        goTo('/login', undefined, 1000);
        
      } else {
        const data = await response.json();
        toast.error(`Error: ${data.error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          style: {
            backgroundColor: '#4D171A', 
            color: '#ffffff', 
          }
        });
      }

    } catch (error) {
      console.error(error);
      toast.error('Error al registrar el usuario. Inténtalo de nuevo.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        style: {
          backgroundColor: '#4D171A', 
          color: '#ffffff', 
        }
      });
    } finally {
      setIsLoading(false); // Desactiva el spinner de carga
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-transparent rounded-lg p-10 w-full max-w-[430px] relative">
        <h1 className="text-[40px] leading-10 font-black text-gray-700 mb-12 text-center">Registrate</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre completo <span className='text-red-600'>*</span>
            </label>
            <input
              type="text"
              id="nombre"
              placeholder='John Doe'
              value={formData.nombre}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email <span className='text-red-600'>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder='user@example.com'
              value={formData.email}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>

          <div className="mb-4">
            <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">
              Phone <span className="font-normal text-[11px] text-gray-400">Puedes añadirlo más tarde</span>
            </label>
            <input
              type="phone"
              id="telefono"
              placeholder='+00 0 0000 000000'
              value={formData.telefono}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña <span className='text-red-600'>*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder='983jkf0248'
              value={formData.password}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>

          <div className="mb-4">
            <label htmlFor="documento" className="block text-gray-700 text-sm font-bold mb-2">
              Documento <span className='text-red-600'>*</span>
            </label>
            <input
              type="number"
              id="documento"
              placeholder='example pattern'
              value={formData.documento}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            />
          </div>


          <div className="flex flex-col gap-4">
            <a href="/forgot-password" className="inline-block align-baseline text-left text-sm transition-colors hover:text-blue-800">
              ¿Olvidaste Tu Contraseña?
            </a>
            <button
              type="submit"
              className="bg-[#0056B3] text-white hover:bg-white hover:text-[#0056B3] py-2 px-4 border rounded transition-all"
            >
              Continuar
            </button>

          </div>
        </form>

        {isLoading && (
          <div className="flex justify-center mt-4">
            <Loading type="bubbles" color="#0056B3" />
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/login" className="inline-block align-baseline text-sm text-blue-500 transition-colors hover:text-blue-800">
            Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  )
}
