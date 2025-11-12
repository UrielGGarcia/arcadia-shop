import React, { useContext, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { CartDrawer } from "./CartDrawer";

export const Header: React.FC = () => {
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-100 flex justify-between items-center px-6 p-2 bg-[#f5f2e9] shadow-sm border-b border-black/10">
        <div className="flex items-center space-x-3">
          <img src="/logo.jpg" alt="Logo" className=" w-40" />
 
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingCart className="text-black w-8 h-8" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </div>
      </header>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
