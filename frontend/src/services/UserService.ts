import api from "axios";
import { baseUrl } from "../config/api";
import { UserDTO } from "../dtos";
import { User } from "../entities";
import { ApiResponse } from "../entities/ApiResponse.type";

export interface UserFilters {
  readonly name: string;
  readonly email: string;
}

export default class UserService {
  public static mapUserDTO(data: UserDTO): User {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      context: data.context,
    };
  }

  public static async getAll({ name, email }: UserFilters): Promise<User[]> {
    const url = `${baseUrl}/users?name=${name}&email=${email}`;
    return api
      .get<ApiResponse<UserDTO[]>>(url)
      .then(({ data: response }) => response.data.map(this.mapUserDTO));
  }

  public static async create(data: User): Promise<User> {
    const body = this.parseBody(data);
    return api
      .post<ApiResponse<UserDTO>>(`${baseUrl}/users`, body)
      .then(({ data: response }) => this.mapUserDTO(response.data));
  }

  public static async update({ id, ...data }: User): Promise<User> {
    const body = this.parseBody(data as User);
    return api
      .put<ApiResponse<UserDTO>>(`${baseUrl}/users/${id}`, body)
      .then(({ data: response }) => this.mapUserDTO(response.data));
  }

  public static async delete(id: string): Promise<User> {
    return api
      .delete(`${baseUrl}/users/${id}`)
      .then(({ data: response }) => response);
  }

  private static parseBody(data: User): UserDTO {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
      context: data.context,
    } as UserDTO;
  }
}
