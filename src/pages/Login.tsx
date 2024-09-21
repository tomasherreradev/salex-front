import { useState } from "react";
import { Alert, AlertProps } from "../utilities/Alert"
import { useUser } from "../context/AuthContext";
import useCustomNavigate from "../hooks/useCustomNavigate";

const SignIn: React.FC = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState<AlertProps | null>(null);


  const { login } = useUser(); // Obtén la función login del contexto
  const {goTo} = useCustomNavigate();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();        
        console.log(data.user)

        login(data.token, data.user); // Llama a login aquí

        setAlert({
          message: 'Inicio de sesión exitoso!',
          bgColor: 'green',
          textColor: 'white',
        });

        goTo('/', undefined, 1000);
      } else {
        const errorData = await response.json();
        setAlert({
          message: errorData.error,
          bgColor: 'red',
          textColor: 'white',
        });


      }
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-transparent rounded-lg p-10 w-full max-w-[430px]">
        <h1 className="text-[40px] leading-10 font-black text-gray-700 mb-12 text-center">Inicia Sesión</h1>

        {alert && (
          <Alert
            message={alert.message}
            bgColor={alert.bgColor}
            textColor={alert.textColor}
            onClose={() => setAlert(null)}
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email <span className='text-red-600'>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder='user@example.com'
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={handleChange}
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
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.password}
              onChange={handleChange}
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


        <div className="mt-8 text-center">
          <a href="/signin" className="inline-block align-baseline text-sm text-blue-500 transition-colors hover:text-blue-800">
            Crear Nueva Cuenta
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
