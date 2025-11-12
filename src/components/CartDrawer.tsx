import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { X, Plus, Minus, Trash2 } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleSendWhatsApp = () => {
    const message = [
      "🛒 Nuevo pedido desde Arcadia:",
      "",
      ...cart.map(
        (p) => `${p.quantity}x ${p.name} - $${p.price * (p.quantity || 1)}`
      ),
      "",
      `Total: $${total}`,
    ].join("\n");

    const phone = "2281005976"; // número del negocio
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-[110] flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-black/10">
        <h2 className="text-lg font-semibold text-black">Tu carrito</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm">Tu carrito está vacío.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-xs text-gray-500">${item.price} c/u</p>

                {/* Controles de cantidad */}
                <div className="flex items-center mt-1">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="p-1 rounded-full hover:bg-gray-100 transition"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="mx-2 text-sm font-medium text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="p-1 rounded-full hover:bg-gray-100 transition"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">
                  ${item.price * (item.quantity || 1)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 hover:bg-gray-100 rounded-full transition"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-black/10 bg-white">
          <p className="font-semibold mb-3 text-right">Total: ${total}</p>
          <button
            onClick={handleSendWhatsApp}
            className="w-full bg-[#C0A672] text-black font-semibold py-2 rounded-full hover:bg-amber-950 hover:text-white transition"
          >
            Enviar pedido por WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};
