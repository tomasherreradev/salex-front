import React, { useEffect } from 'react';

export type AlertProps = {
  message: string;
  bgColor: string;
  textColor: string;
  onClose?: () => void;  
};

export const Alert: React.FC<AlertProps> = ({ message, bgColor, textColor, onClose }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();  
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'absolute', // Cambia la posición a absoluta
        top: '13%', // Ajusta la posición según necesites
        left: '50%', // Centra horizontalmente
        transform: 'translateX(-50%)', // Compensa el desplazamiento del 50%
        backgroundColor: bgColor,
        color: textColor,
        padding: '1rem',
        borderRadius: '0.5rem',
        textAlign: 'center',
        marginBottom: '1rem',
        zIndex: 9,
        width: '100%'
      }}
    >
      {message}
    </div>
  );
};
