import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clients from "./components/Clients";
import Home from "./components/Home";
import Login from "./components/Login";
import Products from "./components/Products";
import Recipes from "./components/Recipes";
import { queryClient } from "./config/api";
import favicon from "./imgs/logo-r.png";
import { closeModal } from "./utils";

import "./App.css";
import Settings from "./components/Settings";
import "./sass/main.scss";

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
          <Route path="/entrar" element={<Login />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/receitas" element={<Recipes />} />
          <Route path="/ajustes" element={<Settings />} />
          <Route path="/*" element={null} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
