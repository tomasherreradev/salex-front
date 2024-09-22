import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Panel de Administración</h2>
      <div className="flex flex-col gap-12 items-center">
        <Link to="/admin/users" className="w-full sm:w-1/3">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold">Usuarios</h3>
          </div>
        </Link>
        <Link to="/admin/cars" className="w-full sm:w-1/3">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold">Autos</h3>
          </div>
        </Link>
        <Link to="/admin/auctions" className="w-full sm:w-1/3">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold">Subastas</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
