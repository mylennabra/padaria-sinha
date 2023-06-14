import { useState } from "react";
import { Link } from "react-router-dom";
import { FeedStock } from "../../entities/FeedStock.type";
import { openModal } from "../../utils";
import { useRecipes } from "./useRecipes";

export interface RecipesState {
  readonly feedStocks: FeedStock[];
  readonly currentFeedStock?: FeedStock;
}

const Recipes = () => {
  const [state, setState] = useState<RecipesState>({
    feedStocks: [{ name: "", unit: "", amount: "" }],
    currentFeedStock: undefined,
  });

  const { feedStocks } = state;
  const { refetchRecipes, resetFields, reset, recipes, formData } =
    useRecipes();

  const validFeedStock = (feedStock: FeedStock): boolean => {
    return (
      feedStock.name.trim().length > 0 &&
      feedStock.amount.trim().length > 0 &&
      feedStock.unit.trim().length > 0
    );
  };

  const handleAddFeedStock = () => {
    const lastFeedStock = feedStocks[feedStocks.length - 1];

    if (feedStocks.length > 1 && !validFeedStock(lastFeedStock)) {
      return;
    }

    setState((oldState) => {
      return {
        feedStocks: [
          ...oldState.feedStocks.filter(validFeedStock),
          formData.feedStocks[formData.feedStocks.length - 1],
        ],
        currentFeedStock: undefined,
      } as RecipesState;
    });
  };

  console.log({ feedStocks });
  return (
    <div className="content">
      <div className="header">
        <Link to="/">
          <button type="button" className="icon">
            <i className="ph-bold ph-arrow-left"></i>
          </button>
        </Link>

        <button type="button" className="icon-filled">
          <i className="ph-bold ph-cooking-pot"></i>
        </button>
        <h2 className="header-txt">RECEITAS</h2>
      </div>

      <div className="pro">
        <div className="pro-pesquisa-ctn">
          <div className="pro-pesquisa-ctn-header">
            <div>
              <label htmlFor="cod">CÓDIGO:</label>
              <input type="text" id="recipe-code-filter" />
            </div>
            <div>
              <label htmlFor="cod">NOME:</label>
              <input type="text" id="recipe-name-filter" />
            </div>
            <button type="button" className="btn">
              <i className="ph-bold ph-magnifying-glass"></i>
              <h5 onClick={() => refetchRecipes()}>PESQUISAR</h5>
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
                  <th>NOME</th>
                </tr>
              </thead>
              <tbody>
                {(recipes || []).map((recipe) => (
                  <tr
                    key={recipe.code}
                    onClick={() => {
                      reset(recipe);
                      openModal();
                    }}
                  >
                    <td>{recipe.code}</td>
                    <td>{recipe.name}</td>
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
                  <label htmlFor="cpf">NOME DA RECEITA:</label>
                  <input type="text" id="nomeReceita" name="nomeReceita" />
                </div>

                <div className="form-item">
                  <label htmlFor="cpf"> </label>
                  <div className="form-buttons">
                    <button type="button" className="btn">
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

              <div className="form-row">
                <div className="form-item">
                  <label
                    htmlFor="cpf"
                    style={{
                      textAlign: "start",
                      paddingLeft: "3.5rem",
                    }}
                  >
                    NOME DO PRODUTO FINAL:
                  </label>
                  <input type="text" id="nomeReceita" name="nomeReceita" />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="form-item" style={{ marginBottom: "1rem" }}>
                  <h3>INSUMOS:</h3>
                </div>

                {feedStocks.map(({ name, amount, unit }) => (
                  <div
                    key={`feed-stock(${name}${amount}${unit})`}
                    style={{ display: "flex", marginBottom: "1rem" }}
                  >
                    <div className="form-item">
                      <label htmlFor="cpf">NOME:</label>
                      <input
                        type="text"
                        id="nomeReceita"
                        name="nomeReceita"
                        value={name ? name : undefined}
                      />
                    </div>

                    <div className="form-item">
                      <label htmlFor="cpf">UN:</label>
                      <input
                        type="text"
                        id="nomeReceita"
                        name="nomeReceita"
                        value={unit ? unit : undefined}
                      />
                    </div>

                    <div className="form-item">
                      <label htmlFor="cpf">QUANTIDADE:</label>
                      <input
                        type="text"
                        id="nomeReceita"
                        name="nomeReceita"
                        value={amount ? amount : undefined}
                      />
                    </div>

                    <button
                      type="button"
                      className="btn-unfilled"
                      onClick={handleAddFeedStock}
                    >
                      <i className="ph-bold ph-plus-circle"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="">
                <div className="pro-table-container">
                  <table className="pro-table">
                    <thead>
                      <tr>
                        <th>CÓD</th>
                        <th>NOME</th>
                        <th>UN</th>
                        <th>QUANTIDADE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
