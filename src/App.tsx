import React from "react";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="font-sans text-black">
        <Header />
        <Home />
      </div>
    </CartProvider>
  );
};

export default App;
