import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div style={{ width: 200, backgroundColor: '#f0f0f0', height: '100vh' }}>
      <List>
        <ListItem component={Link} to="/admin">
          <ListItemText primary="Panel de Administración" />
        </ListItem>
        <ListItem component={Link} to="/admin/users">
          <ListItemText primary="Usuarios" />
        </ListItem>
        <ListItem component={Link} to="/admin/cars">
          <ListItemText primary="Autos" />
        </ListItem>
        <ListItem component={Link} to="/admin/auctions">
          <ListItemText primary="Subastas" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
