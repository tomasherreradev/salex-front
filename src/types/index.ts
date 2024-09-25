export type Car = {
    // id: number;
    // final_price: number;
    // foto: string;
    // year: number;
    // marca: string;
    // modelo: string;
    id: number,
    final_price: number,
    foto: string,
    year: number,
    marca: string,
    modelo: string
};


export interface User {
    id: number,
    nombre: string, 
    email: string,
    categoria: string,
    suscripcion_activa: boolean
  }
  