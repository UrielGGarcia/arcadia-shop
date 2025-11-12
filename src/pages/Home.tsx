import React, { useState } from "react";
import { ProductGrid } from "../components/ProductGrid";
import type { Product } from "../interfaces/product.interface";
import productData from '../data/productos.json'
import prenda1 from '/assets/jersey_yankees_azul_blanco.png'
import prenda2 from '/assets/jersey_dodgers_blanco_azul.png'
import prenda3 from '/assets/jersey_cowboys_azul_blanco.png'
import type { Filtro } from "../interfaces/filter.interface";



const products: Product[] = productData;
export const Home: React.FC = () => {
    const [ishacer, setisHacer] = useState(false);
    const [isFiltro, setIsFiltro] = useState<Filtro>("Default")
    const opciones: Filtro[] = ["Playeras Oversize", "Jerseys beisbol", "Casual", "Invierno", "Deportiva", "Sudaderas"]
    return (
        <main className="min-h-screen bg-white">
            <div
                className="md:hidden sticky top-16 p-2 bg-white z-50">
                <div className="no-scrollbar flex overflow-scroll gap-2 ">
                    {opciones.map(opcion =>
                        <button
                            onClick={() => { setIsFiltro(opcion) }}
                            className="border border-gray-400 p-1 rounded-lg whitespace-nowrap">
                            {opcion}
                        </button>
                    )}
                </div>

                {isFiltro !== "Default" && (
                    <button
                        onClick={() => { setIsFiltro("Default") }}
                        className="border border-gray-400 p-1 rounded-lg whitespace-nowrap mt-2">
                        Limpiar filtros
                    </button>)
                }
            </div>


            <section className="flex flex-col lg:flex-row items-center justify-between bg-white rounded-2xl p-8 mb-5 shadow-sm">
                <div className="text-center md:text-left space-y-2 md:w-1/3 lg:w-1/3 flex flex-col items-center lg:items-start">
                    <h2 className="text-3xl md:text-5xl text-center lg:text-left font-bold text-gray-700 whitespace-nowrap">
                        Nueva actualización
                    </h2>
                    <p className="text-gray-500 text-lg text-center lg:text-left">Noviembre 2025</p>
                    <button
                        onClick={() => { setisHacer(!ishacer) }}
                        className="hidden lg:block animate-bounce border rounded-xl mt-4 text-lg  bg-gray-700 text-white font-bold p-1 ">
                        Hacer mi pedido
                    </button>
                    {ishacer &&
                        <section className="text-left text-lg hidden  lg:block">
                            Para hacer tu pedido, ofrecemos la experiencia de explorar nuestro catálogo, puedes agregar al carrito y hacer tu pedido directamente desde el catálogo
                        </section>
                    }
                </div>

                <div className="relative mt-6 md:mt-0 md:w-2/3 flex justify-center">
                    <img
                        src={prenda1}
                        alt="jersey1"
                        className="w-30 md:w-60 lg:w-80 drop-shadow-2xl hover:scale-105 transition-transform duration-300 -rotate-15 -mr-4"
                    />
                    <img
                        src={prenda2}
                        alt="jersey2"
                        className="w-30 md:w-60 lg:w-80 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    />
                    <img
                        src={prenda3}
                        alt="Njersey3"
                        className="w-30 md:w-60 lg:w-80 drop-shadow-2xl hover:scale-105 transition-transform duration-300 rotate-15 -ml-4"
                    />
                </div>
                <button
                    onClick={() => { setisHacer(!ishacer) }}
                    className="lg:hidden animate-bounce border rounded-xl mt-4 text-lg  bg-gray-700 text-white font-bold p-1">
                    Hacer mi pedido
                </button>
                {ishacer &&
                    <section className="text-center text-lg lg:hidden">
                        Para hacer tu pedido, ofrecemos la experiencia de explorar nuestro catálogo, puedes agregar al carrito y hacer tu pedido directamente desde el catálogo
                    </section>
                }
            </section>
            <div
                className="hidden md:block sticky top-16 p-2 bg-white z-50">
                <div className="no-scrollbar flex overflow-scroll gap-2 ">
                    {opciones.map(opcion =>
                        <button
                            onClick={() => { setIsFiltro(opcion) }}
                            className="border border-gray-400 p-1 rounded-lg whitespace-nowrap text-2xl">
                            {opcion}
                        </button>
                    )}
                </div>

                {isFiltro !== "Default" && (
                    <button
                        onClick={() => { setIsFiltro("Default") }}
                        className="border border-gray-400 p-1 rounded-lg whitespace-nowrap mt-2">
                        Limpiar filtros
                    </button>)
                }
            </div>
            {isFiltro !== "Default" && (
                <p className="text-2xl md:text-3xl ml-5 font-bold">{isFiltro}</p>
            )}

            <ProductGrid
                filtro={isFiltro}
                products={products} />
        </main>
    );
};
