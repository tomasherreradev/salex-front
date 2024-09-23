import React, { ReactNode, useEffect } from 'react';
import { useUser } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {  
    if (!user) {
      navigate('/');
    } else if (user.categoria !== 'administrador') {
      navigate('/');
    }
  }, [user, navigate]);
  

  return <>{user?.categoria === 'administrador' ? children : null}</>;
};

export default ProtectedRoute;
