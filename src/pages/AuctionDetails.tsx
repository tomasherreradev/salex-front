import React from 'react';
import { useParams } from 'react-router-dom';

const AuctionDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Auction Details for ID: {id}</h1>
      {/* Aquí puedes agregar detalles de la subasta */}
    </div>
  );
}

export default AuctionDetails;
