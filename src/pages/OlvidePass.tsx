
export default function OlvidePass() {
  return (
<div className="flex items-center justify-center">
      <div className="bg-transparent rounded-lg p-10 w-full max-w-[500px]">
        <h1 className="text-[40px] leading-10 font-black text-gray-700 mb-12 text-center">Recuperar Cuenta</h1>
        <form className="max-w-[350px] mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email <span className='text-red-600'>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder='user@example.com'
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
        <div className="mt-8 text-center">
          <a href="/signin" className="inline-block align-baseline text-sm text-blue-500 transition-colors hover:text-blue-800">
            Crear Nueva Cuenta
          </a>
        </div>
      </div>
    </div>
  )
}
