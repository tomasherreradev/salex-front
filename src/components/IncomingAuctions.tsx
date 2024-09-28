import { Link } from 'react-router-dom';
import useFetchData from '../hooks/useFetch';
import { useUser } from '../context/AuthContext';
import { useEffect } from 'react';


export default function IncomingAuctions() {
    const { user } = useUser();


    const { data: auctions } = useFetchData(`${import.meta.env.VITE_SALEX_BACK_API_URL}/auctions/get-all`)
    useEffect(()=> {
        console.log(auctions)
    })

    return (
        <div className='p-4 w-full max-w-[1600px] mx-auto'>
            <h2 className='text-[#2F343C] text-3xl sm:text-4xl lg:text-5xl font-black mb-8 sm:mb-10 mt-8 sm:mt-10'>
                Próximas Subastas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 2xl:gap-32">
                {auctions.map(auction => {
                    const dateObj = new Date(auction.fecha_inicio);
                    const fecha = dateObj.toLocaleDateString();
                    const hora = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })


                    return (
                        <div key={auction.id} className="bg-[#0056B3] text-white rounded-3xl overflow-hidden relative">
                            <div className='p-4 flex flex-col'>
                                <p className="font-semibold uppercase text-center text-lg">Próxima Subasta</p>
                                <h1 className="text-[#FFC940] font-black uppercase text-center text-4xl">
                                    {fecha}
                                </h1>
                                <p className="font-black uppercase text-center text-2xl">{hora}</p>
                            </div>

                            <img src={`${import.meta.env.VITE_SALEX_BACK_API_URL}${auction.foto_auto}`} alt={`${auction.marca} ${auction.modelo}`} className="w-full h-56 md:h-64 lg:h-72 object-cover" />
                            <div className="py-5 flex justify-center">
                                {user ?
                                    (
                                        <Link to={`/auction/${auction.id}`} className="bg-[#FFC940] p-2 text-black rounded-md mt-6 lg:mt-10 text-lg lg:text-xl">
                                            Ver Detalles
                                        </Link>)

                                    : (
                                        <Link to={'/signin'} className="bg-[#FFC940] p-2 text-black rounded-md mt-6 lg:mt-10 text-lg lg:text-xl">
                                            Regístrate Ahora
                                        </Link>
                                    )}
                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}
