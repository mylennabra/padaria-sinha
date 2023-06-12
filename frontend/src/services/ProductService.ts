import api from "axios";
import { baseUrl } from "../config/api";
import { ProductDTO } from "../dtos";
import { Product } from "../entities";
import { ApiResponse } from "../entities/ApiResponse.type";

export interface ProductFilters {
  readonly description: string;
  readonly code: string;
  readonly group: string;
}

export default class ProductService {
  public static mapProductDTO(data: ProductDTO): Product {
    return {
      code: data.code,
      description: data.description,
      price: data.price.toString(),
      stock: data.stock,
      unit: data.unit,
      group: data.group,
      obs: data.obs,
    };
  }

  public static async getAll({
    description,
    group,
    code,
  }: ProductFilters): Promise<{ products: Product[]; groups: string[] }> {
    const url = `${baseUrl}/products?code=${code}&description=${description}&group=${group}`;
    return api
      .get<ApiResponse<{ products: ProductDTO[]; groups: string[] }>>(url)
      .then(({ data: response }) => ({
        products: response.data.products.map(this.mapProductDTO),
        groups: response.data.groups,
      }));
  }

  public static async create(data: Product): Promise<Product> {
    const body = this.parseBody(data);
    console.log({ body });
    return api
      .post<ApiResponse<ProductDTO>>(`${baseUrl}/products`, body)
      .then(({ data: response }) => this.mapProductDTO(response.data));
  }

  public static async update({ code, ...data }: Product): Promise<Product> {
    const body = this.parseBody(data as Product);
    return api
      .put<ApiResponse<ProductDTO>>(`${baseUrl}/products/${code}`, body)
      .then(({ data: response }) => this.mapProductDTO(response.data));
  }

  public static async delete(code: string): Promise<Product> {
    return api
      .delete(`${baseUrl}/products/${code}`)
      .then(({ data: response }) => response);
  }

  private static parseBody(data: Product): ProductDTO {
    return {
      ...data,
      price: Number(data.price.replace(/,/g, ".")),
    };
  }
}
