import {Link} from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import instagramLogo from './../assets/images/svg/instagram.svg';
import facebookLogo from './../assets/images/svg/facebook.svg';
import linkedinLogo from './../assets/images/svg/linkedin.svg';

export default function CompleteFooter() {

    const faqs = [
        {
            question: "¿Necesito tarjeta para iniciar una puja?",
            answer: "Solo una cuenta",
        },
        {
            question: "¿Hacen envíos?",
            answer: "No, solo recogida local",
        },
        {
            question: "¿Por qué necesitan verificar mi identidad?",
            answer: "Para garantizar la seguridad de las transacciones",
        },
    ];

    return (
        <footer className='mt-52 mb-24 px-20 space-y-16'>
            <div>
                <h2 className="text-4xl font-black">FAQ</h2>
            </div>

            <div className='flex flex-col gap-4'>
                {faqs.map((faq, index) => (
                    <Accordion
                        key={index}
                        sx={{
                            boxShadow: 'none',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            margin: '0', // No espacio entre los accordions
                            '&:not(:last-child)': {
                                marginBottom: '10px', // Espacio entre los accordions
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <div>
                                <Typography sx={{
                                    color: '#282B45',
                                    fontWeight: '600',
                                    fontSize: '20px'
                                }}>{faq.question}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Respuesta aquí
                                </Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>


            <div className='w-full mx-auto flex flex-col justify-center items-center'>
                <p className='mb-10'>Siguenos en nuestras redes:</p>
                <ul className='flex gap-2'>
                    <li>
                        <Link to={'#'}>
                            <img src={instagramLogo} alt="ig log" />
                        </Link>
                    </li>
                    <li>
                        <Link to={'#'}>
                            <img src={facebookLogo} alt="ig log" />
                        </Link>
                    </li>
                    <li>
                        <Link to={'#'}>
                            <img src={linkedinLogo} alt="ig log" />
                        </Link>
                    </li>
                </ul>
            </div>


        </footer>
    );
}
