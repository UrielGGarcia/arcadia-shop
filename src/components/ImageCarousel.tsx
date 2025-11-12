import React, { useState } from "react";

interface ImageCarouselProps {
  images?: string[]; // 👈 puede venir indefinido
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const validImages = images && images.length > 0 ? images : ["/placeholder.jpg"];
  // 👆 usa una imagen de respaldo si no hay imágenes

  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % validImages.length);
  const prev = () => setIndex((index - 1 + validImages.length) % validImages.length);

  return (
    <div className="relative w-60 h-60 overflow-hidden rounded-xl border border-gray-200 shadow-lg">
      <img
        src={validImages[index]}
        alt={`Imagen ${index + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {validImages.length > 1 && (
        <>
          {/* Flechas */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black/90"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black/90"
          >
            ›
          </button>

          {/* Puntitos */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {validImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  i === index ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
