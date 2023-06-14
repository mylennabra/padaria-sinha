import { Link } from "react-router-dom";
import { openModal } from "../../utils";
import { useSettings } from "./useSettings";

const Settings = () => {
  const {
    users,
    refetchUsers,
    register,
    reset,
    resetFields,
    formData,
    isUpdating,
    onSubmit,
    handleSubmit,
  } = useSettings();

  return (
    <div className="content">
      <div className="header">
        <Link to="/">
          <button type="button" className="icon">
            <i className="ph-bold ph-arrow-left"></i>
          </button>
        </Link>

        <button type="button" className="icon-filled">
          <i className="ph-bold ph-gear"></i>
        </button>

        <h2 className="header-txt">AJUSTES</h2>
      </div>
      <div className="pro">
        <div className="pro-pesquisa-ctn">
          <div className="pro-pesquisa-ctn-header">
            <div>
              <label htmlFor="cod">LOGIN:</label>
              <input type="text" id="settings-login-filter" />
            </div>
            <div>
              <label htmlFor="cod">NOME:</label>
              <input type="text" id="settings-name-filter" />
            </div>

            <button type="button" className="btn" onClick={refetchUsers}>
              <i className="ph-bold ph-magnifying-glass"></i>
              <h5>PESQUISAR</h5>
            </button>
            <button
              type="button"
              id="openModalBtn"
              className="btn"
              onClick={() => {
                resetFields();
                openModal();
              }}
            >
              <i className="ph-bold ph-plus-circle"></i>
              <h5>NOVO</h5>
            </button>
          </div>
        </div>
        <div className="pro-lista-ctn">
          <div className="pro-table-container">
            <table className="pro-table">
              <thead>
                <tr>
                  <th>CÓD</th>
                  <th>LOGIN</th>
                  <th>NOME</th>
                </tr>
              </thead>
              <tbody>
                {(users || []).map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => {
                      reset(user);
                      openModal();
                    }}
                  >
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div id="modal" className="modal">
          <div className="modal-content">
            <div className="close-btn">
              <button type="button" className="icon close">
                <i className="ph-bold ph-x-circle"></i>
              </button>
            </div>
            <div className="form">
              <div className="form-row">
                <div className="form-item">
                  <label htmlFor="cpf">LOGIN:</label>
                  <input type="text" id="nomeReceita" {...register("email")} />
                </div>
                <div className="form-item">
                  <label htmlFor="cpf"> </label>
                  <div className="form-buttons">
                    <button
                      type="button"
                      className="btn"
                      onClick={handleSubmit(onSubmit)}
                    >
                      <i className="ph-bold ph-file"></i>
                      <h5>SALVAR</h5>
                    </button>
                    <button type="button" className="btn close">
                      <i className="ph-bold ph-x-circle"></i>
                      <h5>CANCELAR</h5>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <label htmlFor="codigo">NOME:</label>
                <input type="text" id="codigoReceita" {...register("name")} />
              </div>

              {!isUpdating && (
                <div className="form-item">
                  <label htmlFor="senha">SENHA:</label>
                  <input
                    type="text"
                    id="nomeReceita"
                    {...register("password")}
                  />
                </div>
              )}

              <div className="radio-ctn">
                <label htmlFor="senha">PERMISSÃO:</label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    id="opcao1"
                    value="customer-employee"
                    checked={
                      formData.context === "customer_employee"
                        ? true
                        : undefined
                    }
                    {...register("context")}
                  />
                  <label htmlFor="opcao1">Funcionário</label>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    id="opcao2"
                    value="manager"
                    checked={formData.context === "manager"}
                    {...register("context")}
                  />
                  <label htmlFor="opcao2">Gerente</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
