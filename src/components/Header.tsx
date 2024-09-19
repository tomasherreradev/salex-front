import React from 'react';
import MobileHeader from './MobileNav';
import logo from './../assets/images/svg/logo.svg'
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
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
              <Link to="/" className=" lg:text-xs 2xl:text-base font-normal">Subastas</Link>
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

        <nav className='border-l pl-6 flex-shrink-0'>
          <ul className="flex items-center space-x-8 text-black">
            <li>
              <Link to="/login" className=" lg:text-xs 2xl:text-base">Inicio de Sesión</Link>
            </li>
            <li>
              <Link to="/signin" className=" bg-yellow-400 p-4 rounded-xl lg:text-xs 2xl:text-base">Regístrate</Link>
            </li>
            <li className='flex items-center gap-4'>
              <Link to="/signin" className="xl:text-xs 2xl:text-base">UserName</Link>
              <div className='w-12 h-12 bg-[#0056B3] rounded-full'></div>
            </li> 
          </ul>
        </nav>
      </div>

      <MobileHeader/>

    </header>
  );
}

export default Header;
