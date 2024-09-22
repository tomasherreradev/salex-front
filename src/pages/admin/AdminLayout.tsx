import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom'; // Importamos Outlet
import Sidebar from './Sidebar';

const AdminLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Sistema de Subastas</Typography>
          </Toolbar>
        </AppBar>
        {/* Outlet va aquí para renderizar las rutas hijas */}
        <div style={{ padding: 16 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
