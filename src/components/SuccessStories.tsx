import type { Car } from './../types/index'

type SuccessStoriesProps = {
    cars: Car[];
};

export default function SuccessStories({ cars }: SuccessStoriesProps) {
    return (
        <div className='p-4 w-full max-w-[1600px] mx-auto'>
            <h2 className='text-[#2F343C] text-3xl sm:text-4xl lg:text-5xl font-black mb-8 sm:mb-10 mt-8 sm:mt-10'>
                Casos de Éxito
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {cars.map(car => (
                    <div key={car.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden relative">
                        <img src={car.foto} alt={`${car.marca} ${car.modelo}`} className="w-full h-56 md:h-64 lg:h-72 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg text-[#2F343C] pb-2 font-bold uppercase">{car.year} {car.marca} {car.modelo}</h2>
                        </div>
                        <p className="text-[#2F343C] absolute right-2 top-5 bg-white py-1 px-2 rounded-full text-xs sm:text-sm shadow-lg">
                            Oferta final{' '}
                            <span className='font-bold text-base sm:text-lg'>
                                ${car.final_price.toFixed(2)} USD
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
