import React from 'react';

interface Props { }

const aboutUsContent = [
    {
        title: "Quienes Somos",
        content: "Auto Subastas Es Tu Plataforma De Confianza Para La Compra Y Venta De Vehículos A Través De Subastas En Línea. Fundada Con El Objetivo De Revolucionar El Mercado Automotriz, Ofrecemos Una Experiencia Única, Transparente Y Accesible Para Todos Nuestros Usuarios.",
    },
    {
        title: "Nuestra Misión",
        content: "En Auto Subastas, Nuestra Misión Es Facilitar El Acceso A Una Amplia Variedad De Vehículos, Desde Autos Usados Hasta Modelos De Lujo, Permitiendo A Nuestros Clientes Encontrar El Vehículo Perfecto Al Mejor Precio. Nos Comprometemos A Proporcionar Un Servicio Eficiente Y Seguro, Garantizando La Satisfacción Y Confianza De Cada Uno De Nuestros Usuarios.",
    },
    {
        title: "Por Qué Elegirnos",
        content: "Con Años De Experiencia En El Mercado Automotriz Y Un Profundo Conocimiento De Las Necesidades De Nuestros Clientes, En Auto Subastas Estamos Comprometidos A Ofrecerte Un Servicio Excepcional. Nuestro Enfoque Innovador Y Orientado Al Cliente Nos Distingue Como Líderes En Subastas De Vehículos En Línea.",
    },
    {
        title: "Únete A Nuestra Comunidad",
        content: "Forma Parte De La Creciente Comunidad De Compradores Y Vendedores Satisfechos Que Han Encontrado En Auto Subastas La Mejor Manera De Adquirir Y Vender Vehículos. Te Invitamos A Explorar Nuestras Subastas, Descubrir Ofertas Exclusivas Y Experimentar La Comodidad Y Eficiencia De Nuestra Plataforma.",
    },
];

const valuesContent = [
    {
        title: "Misión",
        content: "Vestibulum congue imperdiet mollis. Nunc vel arcu sem. Duis condimentum, eros euismod facilisis placerat, risus urna elementum tellus, vel luctus odio ipsum et est.",
    },
    {
        title: "Visión",
        content: "Vestibulum congue imperdiet mollis. Nunc vel arcu sem. Duis condimentum, eros euismod facilisis placerat, risus urna elementum tellus, vel luctus odio ipsum et est.",
    },
    {
        title: "Valores",
        content: "Vestibulum congue imperdiet mollis. Nunc vel arcu sem. Duis condimentum, eros euismod facilisis placerat, risus urna elementum tellus, vel luctus odio ipsum et est.",
    },
];

const offeringsContent = [
    {
        title: "Variedad De Vehículos",
        content: "Contamos Con Una Extensa Selección De Autos, Desde Compactos Y Sedanes Hasta SUVs Y Vehículos De Alto Rendimiento, Disponibles Para Subasta En Tiempo Real.",
    },
    {
        title: "Transparencia Total",
        content: "Proveemos Información Detallada Y Verificada De Cada Vehículo, Incluyendo Historial De Mantenimiento, Kilometraje Y Condiciones Actuales, Para Que Puedas Tomar Decisiones Informadas.",
    },
    {
        title: "Plataforma Segura",
        content: "Nuestra Plataforma Utiliza Tecnología Avanzada Para Asegurar Que Todas Las Transacciones Sean Seguras Y Confiables, Protegiendo Tus Datos Personales Y Financieros.",
    },
    {
        title: "Soporte Integral",
        content: "Un Equipo De Atención Al Cliente Dedicado Está Disponible Para Asistirte En Cada Paso Del Proceso, Desde La Inscripción En La Subasta Hasta La Entrega Del Vehículo.",
    },
];

const AboutUs: React.FC<Props> = () => {
    return (
        <div className="py-16">
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto">
                    {aboutUsContent.map((section, index) => (
                        <div key={index} className="bg-white rounded-lg p-6">
                            <h2 className="font-black text-gray-800 mb-4 text-3xl md:text-4xl">
                                {section.title}
                            </h2>
                            <p className="text-gray-600">{section.content}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-[#0056B3] ">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 p-6 md:p-12 md:w-full md:max-w-[1200px] xl:container mx-auto'>
                        {valuesContent.map((value, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
                                <h2 className="font-black text-[#0056B3] mb-4 text-3xl md:text-4xl">
                                    {value.title}
                                </h2>
                                <p className="text-gray-600 flex-grow">{value.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 container mx-auto">
                    <h2 className="font-black text-gray-800 mb-4 text-3xl md:text-4xl">
                        ¿Qué Ofrecemos?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {offeringsContent.map((offering, index) => (
                            <div key={index}>
                                <ul className="list-disc pl-6 text-gray-600">
                                    <li>
                                        <p>
                                            <span className="font-bold">{offering.title}: </span>
                                            {offering.content}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
