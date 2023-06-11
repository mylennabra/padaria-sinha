import { useMutation, useQuery } from "@tanstack/react-query";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { QueryKeys } from "../config/QueryKeys";
import { Client } from "../entities";
import { ApiError } from "../entities/ApiError.type";
import logo from "../imgs/logo.png";
import ClientService from "../services/ClientService";
import {
  closeModal,
  getClientData,
  getClientFilters,
  getClientFiltersInputs,
  openModal,
} from "../utils";

const Clients = () => {
  const [state, setState] = useState({
    canEditClient: false,
    clientCode: "",
  });

  const nameRef = useRef<HTMLInputElement>();
  const cpfRef = useRef<HTMLInputElement>();
  const addressRef = useRef<HTMLInputElement>();
  const primaryPhoneRef = useRef<HTMLInputElement>();
  const secondaryPhoneRef = useRef<HTMLInputElement>();
  const obsRef = useRef<HTMLTextAreaElement>();

  const clientRefs = {
    nameRef,
    cpfRef,
    addressRef,
    primaryPhoneRef,
    secondaryPhoneRef,
    obsRef,
  };

  const { canEditClient, clientCode } = state;

  const { data: clients, refetch: refetchClients } = useQuery<Client[]>({
    queryKey: [QueryKeys.CLIENTS],
    queryFn: () => ClientService.getAll(getClientFilters()),
  });

  const handleFilterEnterKey = (key: string) => {
    if (key === "Enter") {
      refetchClients();
    }
  };

  useEffect(() => {
    getClientFiltersInputs().forEach((input) => {
      input.addEventListener("keypress", (event) => {
        handleFilterEnterKey(event.key);
      });
    });

    document.querySelectorAll(".close").forEach((button) => {
      button.addEventListener("click", () => closeModal(button));
    });
  }, []);

  const createClientMutation = useMutation({
    mutationKey: [QueryKeys.CLIENTS],
    mutationFn: () => ClientService.create(getClientData(clientRefs)),
    onSuccess: () => {
      refetchClients();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const handleCreateClient = () => {
    setState((oldState) => ({ ...oldState, canEditClient: false }));
    createClientMutation.mutate();
  };

  const updateClientMutation = useMutation({
    mutationKey: [QueryKeys.CLIENTS],
    mutationFn: (client: Client) => ClientService.update(client),
    onSuccess: () => {
      refetchClients();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const handleUpdateClient = (client: Client) => {
    openModal();

    (document.getElementById("nome") as HTMLInputElement)!.value = client.name;
    (document.getElementById("cpf") as HTMLInputElement)!.value = client.cpf;
    (document.getElementById("endereco") as HTMLInputElement)!.value =
      client.address || "";

    (document.getElementById("telefonePrincipal") as HTMLInputElement)!.value =
      client.primaryPhone;

    (document.getElementById("telefoneSecundario") as HTMLInputElement).value =
      client.secondaryPhone || "";

    (document.getElementById("observacoes") as HTMLInputElement).value =
      client.obs || "";

    setState({ clientCode: client.code, canEditClient: true });
  };

  const handleShowClientPreview = (client: Client) => {
    const cliPreviewCtn = document.querySelector(".cli-previa-ctn");

    cliPreviewCtn!.innerHTML = `
        <div class="cli-preview">
          <div class="cli-preview-1">
            <h4>Nome:</h4>
            <p>${client.name}</p>
          </div>
          <div class="cli-preview-2">
            <h4>Telefones:</h4>
            <p>${client.primaryPhone}</p>
            <p>${client.secondaryPhone}</p>
          </div>
          ${
            client.obs
              ? `
            <div class="cli-preview-3">
              <h4>Observações:</h4>
              <p>${client.obs}</p>
            </div>
          `
              : ""
          }
        </div>
      `;
  };

  return (
    <div className="home">
      <div className="content">
        <div className="header">
          <button
            type="button"
            className="icon"
            onClick={() => (window.location.href = "main.html")}
          >
            <i className="ph-bold ph-arrow-left"></i>
          </button>
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
                onClick={() => refetchClients()}
              >
                <i className="ph-bold ph-magnifying-glass"></i>
                <h5>PESQUISAR</h5>
              </button>
              <button
                type="button"
                id="openModalBtn"
                className="btn btn-flex"
                onClick={openModal}
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
                      onMouseEnter={() => handleShowClientPreview(client)}
                      onMouseOver={() => handleShowClientPreview(client)}
                      onClick={() => handleUpdateClient(client)}
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

          <div className="cli-previa-ctn"></div>

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
                    <label htmlFor="nome">Nome:</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      ref={nameRef as LegacyRef<HTMLInputElement> | undefined}
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="cpf"></label>
                    <div className="form-buttons">
                      <button
                        type="button"
                        className="btn btn-flex"
                        id="create-client"
                        onClick={() => {
                          if (canEditClient) {
                            const client = (clients || []).filter((client) => {
                              return client.code === clientCode;
                            })[0];

                            handleUpdateClient(client);

                            const data = getClientData(clientRefs);
                            console.log({ data, name: nameRef.current!.value });

                            updateClientMutation.mutate(
                              ClientService.mapClientDTO({
                                code: clientCode,
                                ...data,
                              })
                            );
                          } else {
                            handleCreateClient();
                          }
                        }}
                      >
                        <i className="ph-bold ph-file"></i>
                        <h5>SALVAR</h5>
                      </button>

                      <button type="button" className="btn" id="remove-client">
                        <i className="ph-bold ph-file"></i>
                        <h5>EXCLUIR</h5>
                      </button>

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
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      ref={cpfRef as LegacyRef<HTMLInputElement> | undefined}
                    />
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
                      name="telefonePrincipal"
                      ref={
                        primaryPhoneRef as
                          | LegacyRef<HTMLInputElement>
                          | undefined
                      }
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="telefoneSecundario">
                      Telefone Secundário:
                    </label>
                    <input
                      type="text"
                      id="telefoneSecundario"
                      name="telefoneSecundario"
                      ref={
                        secondaryPhoneRef as
                          | LegacyRef<HTMLInputElement>
                          | undefined
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="endereco">Endereço:</label>
                    <input
                      type="text"
                      id="endereco"
                      name="endereco"
                      ref={
                        addressRef as LegacyRef<HTMLInputElement> | undefined
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <label htmlFor="observacoes">Observações:</label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      ref={obsRef as LegacyRef<HTMLTextAreaElement>}
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
};

export default Clients;
