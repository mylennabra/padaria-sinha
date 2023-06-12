import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Clients from "./components/Clients";
import Home from "./components/Home";
import Products from "./components/Products";
import { queryClient } from "./config/api";
import favicon from "./imgs/logo-r.png";
import { closeModal } from "./utils";

const App = () => {
  document.querySelectorAll(".close").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  return (
    <BrowserRouter>
      <link rel="icon" type="image/png" href={favicon} />

      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/*" element={null} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
