import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, ListItemText } from '@mui/material';

export default function MobileHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className='lg:hidden flex justify-between items-center'>
            <Link to="/">
                <img className='w-full max-w-[160px] h-auto' src="src\assets\images\svg\logo.svg" alt="logo" />
            </Link>

            <div style={{ position: 'relative' }}>
                <IconButton
                    onClick={toggleMenu}
                    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    sx={{ color: '#000', zIndex: 10 }}
                >
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
            </div>

            <div
                style={{
                    position: 'absolute',
                    top: '8%',
                    right: 0,
                    width: '100%',
                    backgroundColor: '#fff',
                    boxShadow: '0px 0px 44px 10px rgba(0, 0, 0, 0.1)',
                    zIndex: 99,
                    padding: '15px',
                    maxHeight: menuOpen ? '700px' : '0',
                    opacity: menuOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease, opacity 0.5s ease',
                }}
            >
                <ul style={{ padding: 0, textAlign: 'center' }}>
                    {[
                        { to: '/', label: 'Inicio' },
                        { to: '/subastas', label: 'Subastas' },
                        { to: '/mis-subastas', label: 'Mis Subastas' },
                        { to: '/about-us', label: 'Quiénes Somos' },
                        { to: '/suscriptions', label: 'Suscripciones' },
                        { to: '/login', label: 'Inicio de Sesión' },
                        { to: '/signin', label: 'Regístrate', signin: true },
                    ].map((item) => (
                        <li
                            key={item.to}
                            style={{ marginBottom: 0, color: '#fff', padding: '0' }}
                            onClick={closeMenu}
                        >
                            <Link
                                to={item.to}
                                className={`block w-full text-center font-normal px-3 py-5 rounded-lg text-black hover:bg-[#0056B3] hover:text-white 
                                    ${item.signin ? 'bg-yellow-500 hover:bg-yellow-300 hover:text-black' : ''}
                                `}
                                style={{ textDecoration: 'none' }}
                            >
                                <ListItemText primary={item.label} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
