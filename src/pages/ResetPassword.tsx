import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {

  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [formSubmited, setFormSubmited] = useState(false);

  useEffect(()=> {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if(tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formSubmited) {
      return
    }

    try {
      const response = await fetch('http://localhost:5000/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password })
      });

      const data = await response.json();

      if (response.ok) {
        setFormSubmited(true);
        navigate('/login')
      } else {
        console.log(data.error)
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-transparent rounded-lg p-10 w-full max-w-[500px]">
        <h1 className="text-[40px] leading-10 font-black text-gray-700 mb-12 text-center">Recuperar Cuenta</h1>
        <form className="max-w-[350px] mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Ingresa tu nuevo password:
            </label>
            <input
              type="password"
              id="password"
              placeholder='983jkf0248'
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex flex-col gap-4">
            <a href="/login" className="inline-block align-baseline text-left text-sm transition-colors hover:text-blue-800">
              ¿Ya tienes una cuenta?
            </a>
            <button
              type="submit"
              className="bg-[#0056B3] text-white hover:bg-white hover:text-[#0056B3] py-2 px-4 border rounded transition-all disabled:opacity-50 disabled:hover:bg-[#0056B3] disabled:hover:text-white"
              disabled={formSubmited}
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
  )
}
