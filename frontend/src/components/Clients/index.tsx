import { Link } from "react-router-dom";
import logo from "../../imgs/logo.png";
import { openModal } from "../../utils";
import { useClients } from "./useClients";

export function Clients() {
  const {
    clients,
    refetchClients,
    onSubmit,
    reset,
    resetFields,
    isUpdating,
    register,
    handleSubmit,
    formData,
    deleteClientMutation,
  } = useClients();

  return (
    <div className="home">
      <div className="content">
        <div className="header">
          <Link to="/">
            <button type="button" className="icon">
              <i className="ph-bold ph-arrow-left"></i>
            </button>
          </Link>

          <button type="button" className="icon-filled">
            <i className="ph-bold ph-user"></i>
          </button>
          <h2 className="header-txt">CLIENTES</h2>
        </div>

        <div className="cli">
          <div className="cli-pesquisa-ctn">
            <div className="cli-pesquisa-ctn-header">
              <div>
                <label htmlFor="code-input">CÓDIGO:</label>
                <input type="text" id="code-input" />
              </div>
              <div>
                <label htmlFor="name-input">NOME:</label>
                <input type="text" id="name-input" />
              </div>
              <div>
                <label htmlFor="cpf-input">CPF/CNPJ:</label>
                <input type="text" id="cpf-input" />
              </div>
              <button
                id="search-clients"
                type="button"
                className="btn btn-flex"
                onClick={refetchClients}
              >
                <i className="ph-bold ph-magnifying-glass"></i>
                <h5>PESQUISAR</h5>
              </button>
              <button
                type="button"
                id="openModalBtn"
                className="btn btn-flex"
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

          <div className="cli-lista-ctn">
            <div id="cli-table-container" className="table-container">
              <table id="table" className="table">
                <thead>
                  <tr>
                    <th>CÓD</th>
                    <th>NOME</th>
                    <th>TELEFONE</th>
                    <th>ENDEREÇO</th>
                  </tr>
                </thead>

                <tbody>
                  {(clients || []).map((client) => (
                    <tr
                      key={client.code}
                      onClick={() => {
                        reset(client);
                        openModal();
                      }}
                    >
                      <td>{client.code}</td>
                      <td>{client.name}</td>
                      <td>{client.primaryPhone}</td>
                      <td>{client.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="cli-previa-ctn">
            {isUpdating && (
              <div className="cli-preview">
                <div className="cli-preview-1">
                  <h4>Nome:</h4>
                  <p>{formData.name}</p>
                </div>
                <div className="cli-preview-2">
                  <h4>Telefones:</h4>
                  <p>{formData.primaryPhone}</p>
                  {formData.secondaryPhone && <p>{formData.secondaryPhone}</p>}
                </div>
                {formData.obs && (
                  <div className="cli-preview-3">
                    <h4>Observações:</h4>
                    <p>{formData.obs}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="cli-logo-ctn">
            <img src={logo} alt="" className="logo" />
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
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="nome" {...register("name")} />
                  </div>
                  <div className="form-item">
                    <label htmlFor="cpf"></label>
                    <div className="form-buttons">
                      <button
                        type="button"
                        className="btn btn-flex"
                        id="create-client"
                        onClick={handleSubmit(onSubmit)}
                      >
                        <i className="ph-bold ph-file"></i>
                        <h5>SALVAR</h5>
                      </button>

                      {isUpdating && (
                        <button
                          type="button"
                          className="btn"
                          onClick={() =>
                            deleteClientMutation.mutate(formData.code)
                          }
                        >
                          <i className="ph-bold ph-file"></i>
                          <h5>EXCLUIR</h5>
                        </button>
                      )}

                      <button type="button" className="btn close">
                        <i className="ph-bold ph-x-circle"></i>
                        <h5>CANCELAR</h5>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="cpf">CPF/CNPJ:</label>
                    <input type="text" id="cpf" {...register("cpf")} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="telefonePrincipal">
                      Telefone Principal:
                    </label>
                    <input
                      type="text"
                      id="telefonePrincipal"
                      {...register("primaryPhone")}
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="telefoneSecundario">
                      Telefone Secundário:
                    </label>
                    <input
                      type="text"
                      id="telefoneSecundario"
                      {...register("secondaryPhone", { required: false })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="endereco">Endereço:</label>
                    <input
                      type="text"
                      id="endereco"
                      {...register("address", { required: false })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="observacoes">Observações:</label>
                    <textarea
                      id="observacoes"
                      {...register("obs", { required: false })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
