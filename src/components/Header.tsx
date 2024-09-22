import React from 'react';
import MobileHeader from './MobileNav';
import logo from './../assets/images/svg/logo.svg';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useUser } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Header: React.FC = () => {
  const { user, logout} = useUser();
  
  const handleLogout = () => {
    logout()
    toast.success('Cerraste Sesión', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      style: {
        backgroundColor: '#1C3022', 
        color: '#ffffff', 
      }
    })
  }

  return (
    <header className="text-[#0056B3] px-5 xl:px-14 py-2 shadow-small text-sm xl:text-base">
      <div className="lg:flex items-center justify-between hidden">
        <Link className='xl:min-w-[230px]' to="/">
          <img className='w-full max-w-[160px] h-auto' src={logo} alt="logo" />
        </Link>

        <div className="flex-grow flex justify-center">
          <ul className='flex space-x-8'>
            <li>
              <Link to="/" className=" lg:text-xs 2xl:text-base font-normal">Inicio</Link>
            </li>
            <li>
              <Link to="/subastas" className=" lg:text-xs 2xl:text-base font-normal">Subastas</Link>
            </li>
            <li>
              <Link to="/" className=" lg:text-xs 2xl:text-base font-normal">Mis Subastas</Link>
            </li>
            <li>
              <Link to="/about-us" className=" lg:text-xs 2xl:text-base font-normal">Quienes Somos</Link>
            </li>
            <li>
              <Link to="/suscriptions" className=" lg:text-xs 2xl:text-base font-normal">Suscripciones</Link>
            </li>
          </ul>
        </div>

        {user ? (
          <>          
            <button className='list-none mr-6 bg-yellow-400 text-black p-3 rounded-xl lg:text-xs 2xl:text-base' onClick={handleLogout}>
              <p className=" lg:text-xs 2xl:text-base">Cerrar Sesión</p>
            </button>

            <nav className='border-l pl-6 flex-shrink-0'>
              <li className='flex items-center gap-4'>
                <Link to="/me" className="xl:text-xs 2xl:text-base">
                  <span className='font-bold'>Bienvenido</span>, {user ? user.nombre : 'Invitado'}
                </Link>
                {user && user.foto ? (
                  <img
                    src={`${import.meta.env.VITE_SALEX_BACK_API_URL}${user.foto}`}
                    alt="Foto de perfil"
                    className='w-12 h-12 rounded-full object-cover'
                  />
                ) : (
                  <div className='w-12 h-12 bg-[#0056B3] rounded-full flex justify-center items-center'>
                    <PersonIcon style={{ width: '80%', height: 'auto', color: '#FFFFFF' }} />
                  </div>
                )}
              </li>
            </nav>
          </>

        ) : (
          <nav>
            <ul className="flex items-center space-x-8 text-black">
              <li>
                <Link to="/login" className=" lg:text-xs 2xl:text-base">Inicio de Sesión</Link>
              </li>
              <li>
                <Link to="/signin" className=" bg-yellow-400 p-4 rounded-xl lg:text-xs 2xl:text-base">Regístrate</Link>
              </li>
              <li className='flex items-center gap-4'>
                <Link to="/signin" className="xl:text-xs 2xl:text-base">Invitado</Link>
                <div className='w-12 h-12 bg-[#0056B3] rounded-full flex justify-center items-center'>
                  <PersonIcon style={{ width: '80%', height: 'auto', color: '#FFFFFF' }}></PersonIcon>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <MobileHeader />
    </header>
  );
};

export default Header;
