import { Link } from 'react-router-dom';
import carsHomeImage2 from './../assets/images/jpg/cars-home-2.jpg';


const UpcomingActions = () => {

  return (
    <section className="flex flex-col md:flex-row w-full px-20  h-auto md:h-[415px]">
    {/* Sección de la imagen */}
    <div className="w-full md:w-[30%] h-[250px] md:h-full">
      <img src={carsHomeImage2} alt="carshome2" className="w-full h-full object-cover rounded-l-lg" />
    </div>

    {/* Sección del contenido */}
    <div className="bg-[#0056B3] w-full text-white flex flex-col justify-center items-center p-6 lg:p-0 rounded-r-lg">
      <p className="text-4xl lg:text-5xl font-black uppercase text-center">Próxima Subasta</p>
      <h1 className="text-6xl lg:text-8xl text-[#FFC940] font-black uppercase text-center mt-2 lg:mt-4">
        Jueves 15
      </h1>
      <p className="text-4xl lg:text-5xl font-black uppercase text-center mt-2 lg:mt-4">6:00PM</p>

      <Link to={'/signin'} className="bg-[#FFC940] p-2 text-black rounded-md mt-6 lg:mt-10 text-lg lg:text-xl">
        Regístrate Ahora
      </Link>
    </div>
  </section>
  
  );
};

export default UpcomingActions;