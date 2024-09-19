import carsAboutImage from './../assets/images/jpg/about-us-cars.png';
import carsBgAbout from './../assets/images/jpg/cars-bg-about.jpg';
import SuscriptionsCards from '../components/SuscriptionsCards';

export default function Suscriptions() {

  return (
    <>
    <div className='bg-cover bg-center text-white md:min-h-[650px]' style={{ backgroundImage: `url(${carsBgAbout})` }}>
      <section className='md:flex max-h-[300] md:max-h-auto'>
        {/* Contenido textual */}
        <div className='w-full relative'>
          <div className="absolute z-9 inset-0 md:min-h-[650px]" style={{ backgroundColor: 'rgba(0, 86, 179, 0.8)' }}></div>
          <div className='z-10 sticky flex flex-col p-6 md:pt-20 md:px-32'>
            <h2 className='text-4xl font-black text-[#FFC940] mb-5'>Suscripciones</h2>
            <p className='text-2xl md:text-3xl font-light mb-10 max-w-[600px]'>
              Elige la suscripción que mejor se adapte a ti
              y comienza a disfrutar de las ventajas
              de ser miembro de <span className='font-bold'>Auto Subastas</span>.
            </p>

            <div className='flex justify-end md:pt-20'>
              <p className='text-2xl md:text-3xl text-right font-light max-w-[380px]'>
                ¡Las mejores oportunidades en subastas de autos
                están a solo un clic!
              </p>
            </div>
          </div>
        </div>

        {/* Imagen en pantallas grandes ocupando todo el alto */}
        <div className="w-full md:w-1/2 flex md:min-h-[650px]">
          <img 
            src={carsAboutImage} 
            className='w-full max-h-[300px] md:max-h-none md:h-full object-cover' 
            alt="cars about" 
          />
        </div>
      </section>
    </div>

    <SuscriptionsCards/>
    
    </>
  );
}
