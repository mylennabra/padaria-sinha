import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";

function Home() {
  return (
    <div className="home">
      <img src={logo} alt="" className="logo" />
      <div className="main-btn">
        <Link to="/clientes">
          <div className="main-btn-a-icon">
            <i className="ph ph-user"></i>
          </div>
          <div className="main-btn-a-text">
            <p>CLIENTES</p>
          </div>
        </Link>

        <a className="main-btn-a" href="produtos.html">
          <div className="main-btn-a-icon">
            <i className="ph ph-package"></i>
          </div>
          <div className="main-btn-a-text">
            <p>PRODUTOS</p>
          </div>
        </a>
        <a className="main-btn-a" href="receita.html">
          <div className="main-btn-a-icon">
            <i className="ph ph-cooking-pot"></i>
          </div>
          <div className="main-btn-a-text">
            <p>RECEITAS</p>
          </div>
        </a>
        <a className="main-btn-a" href="vendas.html">
          <div className="main-btn-a-icon">
            <i className="ph ph-laptop"></i>
          </div>
          <div className="main-btn-a-text">
            <p>VENDAS</p>
          </div>
        </a>
        <a className="main-btn-a" href="contas.html">
          <div className="main-btn-a-icon">
            <i className="ph ph-hand-coins"></i>
          </div>
          <div className="main-btn-a-text">
            <p>CONTAS</p>
          </div>
        </a>
        <a className="main-btn-a" href="ajustes.html">
          <div className="main-btn-a-icon">
            <i className="ph ph-gear"></i>
          </div>
          <div className="main-btn-a-text">
            <p>AJUSTES</p>
          </div>
        </a>
        <a className="main-btn-a" href="#">
          <div className="main-btn-a-icon">
            <i className="ph ph-sign-out"></i>
          </div>
          <div className="main-btn-a-text">
            <p>SAIR</p>
          </div>
        </a>
      </div>
      <p className="pada">2023</p>
    </div>
  );
}

export default Home;
