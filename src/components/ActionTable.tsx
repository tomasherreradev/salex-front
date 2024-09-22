interface AuctionEvent {
  title: string;
  date: string;
  time: string;
  status: 'Seguir Subasta' | 'Siguiendo';
}

const events: AuctionEvent[] = [
  { title: 'Especial Vehículos Todo Terreno - 4 × 4', date: '00/00/00', time: '00:00 AM', status: 'Seguir Subasta' },
  { title: 'Camiones y Cargadores', date: '00/00/00', time: '00:00 AM', status: 'Siguiendo' },
  { title: 'Motores', date: '00/00/00', time: '00:00 AM', status: 'Seguir Subasta' },
  { title: 'Jeepetas y Jeeps Usados', date: '00/00/00', time: '00:00 AM', status: 'Siguiendo' },
  { title: 'Carros para la familia', date: '00/00/00', time: '00:00 AM', status: 'Seguir Subasta' },
  { title: 'Exclusivos de Camionetas', date: '00/00/00', time: '00:00 AM', status: 'Siguiendo' },
];


const ActionTable = () => {

  return (
    <section className="flex flex-col md:flex-row w-full px-20 mb-8 h-auto md:h-[415px]">
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Próximos Eventos</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-center text-sm text-black-600">
            <th className="py-2 px-4 ">Subasta</th>
            <th className="py-2 px-4 ">Fecha</th>
            <th className="py-2 px-4 ">Hora</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="py-2 px-4 text-center text-black-600">{event.title}</td>
              <td className="py-2 px-4 text-center">{event.date}</td>
              <td className="py-2 px-4 text-center">{event.time}</td>
              <td className="py-2 px-4 flex justify-center w-315">
                <button
                  className={`py-2 px-4 font-bold rounded-lg min-w-[150px]  ${
                    event.status === 'Seguir Subasta'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-400 text-white'
                  }`}
                >
                  {event.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
  
  );
};

export default ActionTable;