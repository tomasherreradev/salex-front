import { Dropdown } from '../components/DropDown';
import whiteLogo from './../assets/images/svg/white-logo.svg';
import carsHome from './../assets/images/jpg/cars-home.jpg'

const HeroSection = () => {
    return (
            <section
                className="relative bg-cover bg-center h-[700px] flex justify-center items-center"
                style={{ backgroundImage: `url(${carsHome})` }}>
                <div className="absolute inset-0 bg-black/80"></div>

                {/* Contenido encima del overlay */}
                <div className="relative z-5 p-8 text-white text-center">
                    <img src={whiteLogo} alt="Logo" className="mx-auto mb-8" />
                    <h2 className='text-4xl font-black text-center py-8'>Identifica tu próxima inversión</h2>

                    <div className='flex flex-col sm:flex-row justify-center gap-12'>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 bg-gray-300 text-black py-2 px-4 rounded-lg shadow-lg">
                            <Dropdown label="Marca" options={['Todos', 'Ford', 'Chevrolet', 'Toyota']} />
                            <Dropdown label="Modelo" options={['Todos', 'Sedan', 'SUV', 'Truck']} />
                            <Dropdown label="Año" options={['Todos', '2022', '2021', '2020']} />
                            <Dropdown label="Precio" options={['Todos', '$10,000 - $20,000', '$20,000 - $30,000']} />
                        </div>
                        <button
                            className="bg-blue-600 text-white font-bold py-2 sm:py-0 px-4 rounded-lg hover:bg-blue-700"
                            onClick={() => console.log('Buscar clicked')}
                        >
                            Buscar
                        </button>

                    </div>
                </div>

            </section>
    );
};


export default HeroSection;
