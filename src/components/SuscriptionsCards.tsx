import { Link } from 'react-router-dom';

export default function SuscriptionsCards() {

    interface Suscripcion {
        id: number;
        tipo: string;
        precio: number;
        description: string;
        caracteristicas: string[];
        to: string;
    }

    const Suscripciones: Suscripcion[] = [
        {
            id: 1,
            tipo: 'Básica',
            precio: 0,
            description: 'Ideal para aquellos que recién comienzan en el mundo de las subastas de autos. Con nuestra Suscripción Básica, tendrás acceso a:',
            caracteristicas: [
                'Participación en subastas de autos estándar.',
                'Alertas por correo electrónico sobre nuevas subastas y vehículos de interés.',
                'Soporte al cliente básico para ayudarte con cualquier consulta.'
            ],
            to: '/signin'
        },

        {
            id: 2,
            tipo: 'Premium',
            precio: 40,
            description: 'Para los entusiastas de las subastas que buscan una ventaja competitiva. La Suscripción Premium incluye todo lo de la Básica, más:',
            caracteristicas: [
                'Acceso prioritario a subastas exclusivas.',
                'Informes detallados de historial y condición de vehículos.',
                'Asesoría personalizada de nuestros expertos en subastas.',
                'Descuentos especiales en tarifas de subasta.'
            ],
            to: '/'
        },

        {
            id: 3,
            tipo: 'Élite',
            precio: 70,
            description: 'La opción definitiva para los profesionales del sector automotriz y los compradores más exigentes. La Suscripción Elite te brinda:',
            caracteristicas: [
                'Acceso ilimitado a todas las subastas, incluidas las VIP.',
                'Alertas personalizadas en tiempo real para que no te pierdas ninguna oportunidad.',
                'Análisis avanzado de mercado y tendencias.',
                'Atención al cliente preferencial con soporte 24/7.',
                'Beneficios exclusivos, como la posibilidad de inspeccionar vehículos antes de la subasta.'
            ],
            to: '/'
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 xl:gap-32 my-20 max-w-[1300px] mx-auto">
            {Suscripciones.map(suscripcion => (
                <article
                    className={`${suscripcion.id === 1 ? 'bg-[#4D89CA]' : suscripcion.id === 2 ? 'bg-[#0056B3]' : 'bg-[#003C7D]'} w-full mx-auto p-8 pb-4 rounded-lg relative shadow-xl`}
                    key={suscripcion.id}
                >
                    <h1 className={`${suscripcion.id === 2 ? 'text-[#FFC940]' : 'text-white'} text-center font-bold text-4xl mb-6`}>
                        {suscripcion.tipo}
                    </h1>
                    <p className={`${suscripcion.id === 2 ? 'text-[#FFC940]' : 'text-white'} w-fit mx-auto text-center font-black text-7xl relative`}>
                        {suscripcion.precio} <span className="text-lg absolute right-[-18px] top-[-10px]">00</span>
                    </p>

                    <p className="text-white py-2 text-sm font-light">
                        {suscripcion.description}
                    </p>

                    <ul className="text-white py-5 text-sm font-light space-y-4 list-disc list-inside">
                        {suscripcion.caracteristicas.map(caracteristica => (
                            <li key={caracteristica}>{caracteristica}</li>
                        ))}
                    </ul>

                    {suscripcion.id === 2 && (
                        <div className="text-white text-center px-4 py-2 rounded-full">
                            <p className="font-bold text-[20px] -mb-2">Mejor Oferta!</p>
                            <span className='text-sm'>Ahorra 15% anual</span>
                        </div>
                    )}

                    <button className='w-full absolute bottom-[-10px] left-1/2 transform -translate-x-1/2'>
                        <Link
                            to={suscripcion.to}
                            className={`${suscripcion.id === 1 ? 'bg-[#FFC940] text-black' : 'bg-[#19C422] text-white'} p-2 rounded-md mt-6 lg:mt-10 shadow-xl text-lg lg:text-xl`}>
                            {suscripcion.id === 1 ? 'Registrate Hoy' : 'Escríbenos'}
                        </Link>
                    </button>

                </article>
            ))}
        </div>
    )
}
