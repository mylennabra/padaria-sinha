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

        <Link to="/produtos">
          <div className="main-btn-a-icon">
            <i className="ph ph-package"></i>
          </div>
          <div className="main-btn-a-text">
            <p>PRODUTOS</p>
          </div>
        </Link>

        <Link to="/receitas">
          <div className="main-btn-a-icon">
            <i className="ph ph-cooking-pot"></i>
          </div>
          <div className="main-btn-a-text">
            <p>RECEITAS</p>
          </div>
        </Link>

        <Link to="/vendas">
          <div className="main-btn-a-icon">
            <i className="ph ph-laptop"></i>
          </div>
          <div className="main-btn-a-text">
            <p>VENDAS</p>
          </div>
        </Link>

        <Link to="/contas">
          <div className="main-btn-a-icon">
            <i className="ph ph-hand-coins"></i>
          </div>
          <div className="main-btn-a-text">
            <p>CONTAS</p>
          </div>
        </Link>

        <Link to="/ajustes">
          <div className="main-btn-a-icon">
            <i className="ph ph-gear"></i>
          </div>
          <div className="main-btn-a-text">
            <p>AJUSTES</p>
          </div>
        </Link>

        <Link to="/entrar">
          <div className="main-btn-a-icon">
            <i className="ph ph-sign-out"></i>
          </div>
          <div className="main-btn-a-text">
            <p>SAIR</p>
          </div>
        </Link>
      </div>

      <p className="pada">2023</p>
    </div>
  );
}

export default Home;
