export type Car = {
    // id: number;
    // final_price: number;
    // foto: string;
    // year: number;
    // marca: string;
    // modelo: string;
    id: number;
    marca: string;
    modelo: string;
    year: number;
    estado_actual: 'nuevo' | 'usado';
    kilometraje: number;
    foto: string;
    notas: string;
};


export interface User {
    id: number,
    nombre: string, 
    email: string,
    categoria: string,
    suscripcion_activa: boolean
  }
  