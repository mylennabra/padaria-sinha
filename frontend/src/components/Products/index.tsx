import { Link } from "react-router-dom";
import { openModal } from "../../utils";
import { useProducts } from "./useProducts";

const Products = () => {
  const {
    products,
    groups,
    reset,
    register,
    handleSubmit,
    deleteProductMutation,
    formData,
    isUpdating,
    onSubmit,
    refetchProducts,
    resetFields,
  } = useProducts();

  return (
    <div className="content">
      <div className="header">
        <Link to="/">
          <button type="button" className="icon">
            <i className="ph-bold ph-arrow-left"></i>
          </button>
        </Link>

        <button type="button" className="icon-filled">
          <i className="ph-bold ph-package"></i>
        </button>
        <h2 className="header-txt">PRODUTOS</h2>
      </div>
      <div className="pro">
        <div className="pro-pesquisa-ctn">
          <div className="pro-pesquisa-ctn-header">
            <div>
              <label htmlFor="cod">CÓDIGO:</label>
              <input type="text" id="product-code-filter" />
            </div>
            <div>
              <label htmlFor="cod">DESCRIÇÃO:</label>
              <input type="text" id="product-description-filter" />
            </div>
            <div>
              <label htmlFor="cod">GRUPO:</label>
              <select name="select" id="product-group-filter">
                <option value=""></option>
                {(groups || []).map((group, index) => (
                  <option key={`${group}-${index}`} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="btn"
              onClick={() => refetchProducts()}
            >
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
                  <th>DESCRIÇÃO</th>
                  <th>PREÇO</th>
                  <th>OBSERVAÇÕES</th>
                  <th>ESTOQUE</th>
                  <th>UN</th>
                </tr>
              </thead>
              <tbody>
                {(products || []).map((product) => (
                  <tr
                    key={product.code}
                    onClick={() => {
                      reset(product);
                      openModal();
                    }}
                  >
                    <td>{product.code}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.obs}</td>
                    <td>{product.stock}</td>
                    <td>{product.unit}</td>
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
                  <label htmlFor="name">Descrição:</label>
                  <input type="text" id="nome" {...register("description")} />
                </div>
                <div className="form-item">
                  <label htmlFor="cpf"></label>
                  <div className="form-buttons">
                    <button
                      type="button"
                      className="btn btn-flex"
                      id="create-product"
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
                          deleteProductMutation.mutate(formData.code)
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
                  <label htmlFor="price">Preço</label>
                  <input type="text" id="price" {...register("price")} />
                </div>

                <div className="form-item">
                  <label htmlFor="group">Grupo</label>
                  <input type="text" id="gorup" {...register("group")} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-item">
                  <label htmlFor="stock">Quantidade em estoque</label>
                  <input type="text" id="stock" {...register("stock")} />
                </div>
                <div className="form-item">
                  <label htmlFor="unit">Unidade</label>
                  <input
                    type="text"
                    id="unit"
                    {...register("unit", { required: false })}
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
        {/* 


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
                  <label htmlFor="codigo">:</label>
                  <input type="text" id="codigo" name="codigo" />
                </div>

                <div className="form-item">
                  <label htmlFor="description">:</label>
                  <input type="text" id="description" name="description" />
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
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Products;
