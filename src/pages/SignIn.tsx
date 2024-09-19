
export default function Registro() {
  return (
<div className="flex items-center justify-center">
      <div className="bg-transparent rounded-lg p-10 w-full max-w-[430px]">
        <h1 className="text-[40px] leading-10 font-black text-gray-700 mb-12 text-center">Registrate</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre completa <span className='text-red-600'>*</span>
            </label>
            <input
              type="text"
              id="nombre"
              placeholder='John Doe'
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
              placeholder='000 000 00 00'
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
          <a href="/login" className="inline-block align-baseline text-sm text-blue-500 transition-colors hover:text-blue-800">
            Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  )
}
