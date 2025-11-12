import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "../interfaces/product.interface";
import type { Filtro } from "../interfaces/filter.interface";

interface Props {
  products: Product[];
  filtro: Filtro
}

export const ProductGrid: React.FC<Props> = ({ products, filtro }) => {
  const [isResultado, setIsResultado] = useState<Product[]>([]);
  useEffect(() => {
    if (filtro === "Default") {
      setIsResultado(products)
    } else {
      const result: Product[] = products.filter(item => item.tipo === filtro)
      setIsResultado(result);
    }
  }, [filtro])
  return (

    <section className="px-6 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {
        isResultado.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </section>
  );
};
