import {Link} from 'react-router-dom';
import PortraitIcon from '@mui/icons-material/Portrait';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import GavelIcon from '@mui/icons-material/Gavel';
import { SvgIconComponent } from '@mui/icons-material';


type AuctionProcessType = {
    id: number,
    logo: SvgIconComponent,
    title: string,
    description: string
}



const auctionProcessArray: AuctionProcessType[] = [
    {
        id: 1,
        logo: PortraitIcon,
        title: 'Registra Tu Cuenta',
        description: 'Crea tu cuenta gratuita y segura. Recibe notificaciones de subastas nuevas.'

    },

    {
        id: 2,
        logo: ContentPasteSearchIcon,
        title: 'Encontrar Subasta',
        description: 'Explora los vehículos en oferta en toda la plataforma. Encuentra el ideal.'

    },

    {
        id: 3,
        logo: GavelIcon,
        title: 'Pujar',
        description: 'Explora los vehículos en oferta en toda la plataforma. Encuentra el ideal.'

    },
]


export default function AuctionProcess() {
  return (
    <div className='bg-[#0056B3] w-full p-4 mt-32'>
        <div className='w-full max-w-[1600px] mx-auto'>
            <h2 className='text-4xl text-white font-black my-8'>
                Proceso De Subasta
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 2xl:gap-32">
                {auctionProcessArray.map(process => (
                    <div key={process.id} className="bg-white p-4 rounded-lg flex flex-col justify-center items-center">
                        <process.logo style={{width: '100px', height: '100px', color: '#0056B3'}}/>
                        <div className="p-6">
                            <h2 className="text-3xl text-center font-black text-[#0056B3] my-2">{process.title}</h2>
                            <p className="">
                                {process.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="py-5 flex justify-center">
                <Link to={'/signin'} className="bg-[#FFC940] p-3 mt-5 mb-14 text-black rounded-md text-base">
                    Regístrate Aquí Para Empezar
                </Link>
            </div>

            </div>
    </div>
  )
}
