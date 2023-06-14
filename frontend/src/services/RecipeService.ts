import api from "axios";
import { baseUrl } from "../config/api";
import { RecipeDTO } from "../dtos";
import { Recipe } from "../entities";
import { ApiResponse } from "../entities/ApiResponse.type";

export interface RecipeFilters {
  readonly code: string;
  readonly name: string;
}

export default class RecipeService {
  public static mapRecipeDTO(data: RecipeDTO): Recipe {
    return {
      code: data.code,
      name: data.name,
      amount: data.amount,
      unit: data.unit,
    };
  }

  public static async getAll({ name, code }: RecipeFilters): Promise<Recipe[]> {
    const url = `${baseUrl}/recipes?code=${code}&name=${name}`;
    return api
      .get<ApiResponse<RecipeDTO[]>>(url)
      .then(({ data: response }) => response.data.map(this.mapRecipeDTO));
  }

  public static async create(data: Recipe): Promise<Recipe> {
    const body = this.parseBody(data);
    return api
      .post<ApiResponse<RecipeDTO>>(`${baseUrl}/recipes`, body)
      .then(({ data: response }) => this.mapRecipeDTO(response.data));
  }

  public static async update({ code, ...data }: Recipe): Promise<Recipe> {
    const body = this.parseBody(data as Recipe);
    return api
      .put<ApiResponse<RecipeDTO>>(`${baseUrl}/recipes/${code}`, body)
      .then(({ data: response }) => this.mapRecipeDTO(response.data));
  }

  public static async delete(code: string): Promise<Recipe> {
    return api
      .delete(`${baseUrl}/recipes/${code}`)
      .then(({ data: response }) => response);
  }

  private static parseBody(data: Recipe): RecipeDTO {
    return {
      name: data.name,
      amount: data.amount,
      unit: data.unit,
    } as RecipeDTO;
  }
}
