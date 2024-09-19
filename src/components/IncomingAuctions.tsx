import { Link } from 'react-router-dom';
import type { Car } from './../types/index'

type IncomingAuctionsProps = {
    cars: Car[];
};

export default function IncomingAuctions({ cars }: IncomingAuctionsProps) {
    return (
        <div className='p-4 w-full max-w-[1600px] mx-auto'>
            <h2 className='text-[#2F343C] text-3xl sm:text-4xl lg:text-5xl font-black mb-8 sm:mb-10 mt-8 sm:mt-10'>
                Próximas Subastas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 2xl:gap-32">
                {cars.map(car => (
                    <div key={car.id} className="bg-[#0056B3] text-white rounded-3xl overflow-hidden relative">
                        <div className='p-4 flex flex-col'>
                            <p className="font-semibold uppercase text-center text-lg">Próxima Subasta</p>
                            <h1 className="text-[#FFC940] font-black uppercase text-center text-4xl">
                            Miércoles 15
                            </h1>
                            <p className="font-black uppercase text-center text-2xl">6:00PM</p>
                        </div>

                        <img src={car.foto} alt={`${car.marca} ${car.modelo}`} className="w-full h-56 md:h-64 lg:h-72 object-cover" />
                        <div className="py-5 flex justify-center">
                            <Link to={'/signin'} className="bg-[#FFC940] p-3 text-black rounded-md text-base">
                                Regístrate Ahora
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
