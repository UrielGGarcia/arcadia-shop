import React, { useContext, useState } from "react";
import type { Product } from "../interfaces/product.interface";
import { CartContext } from "../context/CartContext";
import { ImageCarousel } from "./ImageCarousel";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("Por favor, selecciona un color antes de agregar al carrito");
      return;
    }

    // ✅ Enviamos id, talla y color
    addToCart({
      ...product,
      selectedColor,
      talla: product.talla, // redundante, pero asegura consistencia
    });

    // ✅ Mensaje de éxito temporal
    setSuccessMessage("Producto agregado correctamente");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="bg-amber-50/50 rounded-2xl shadow-2xl hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* ===== Imagen del producto ===== */}
      <div className="relative flex items-center justify-center p-1">
        <ImageCarousel images={product.images} />

        {/* Precio */}
        <span className="absolute top-3 right-8 bg-black text-white text-sm py-2 px-3 rounded-full shadow-md">
          ${product.price}
        </span>

        {/* Talla */}
        <span className="absolute top-3 left-8 bg-black/60 text-white text-sm px-3 py-2 rounded-full shadow-md font-bold">
          Talla {product.talla}
        </span>
      </div>

      {/* ===== Información del producto ===== */}
      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-lg text-black font-bold uppercase tracking-wide">
          {product.name}
        </h3>

        {/* ===== Selector de color ===== */}
        {product.color && product.color.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            {product.color.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`border px-3 py-1 rounded-md text-sm transition ${
                  selectedColor === color
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-black"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <p className="mt-3 text-green-600 text-sm font-semibold animate-fade">
            {successMessage}
          </p>
        )}

        {/* ===== Botón agregar al carrito ===== */}
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-[#C0A672] hover:bg-black hover:text-white text-black font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-sm"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};
