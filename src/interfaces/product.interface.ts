export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[]; // 👈 ahora es arreglo
  tipo?: string;
  talla: string;
  color: string[];
}
