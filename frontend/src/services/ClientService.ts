import api from "axios";
import { baseUrl } from "../config/api";
import { ClientDTO } from "../dtos";
import { Client } from "../entities";
import { ApiResponse } from "../entities/ApiResponse.type";

export interface ClientFilters {
  readonly code: string;
  readonly name: string;
  readonly cpf: string;
}

export default class ClientService {
  public static mapClientDTO(data: ClientDTO): Client {
    return {
      code: data.code,
      name: data.name,
      cpf: data.cpf,
      address: data.address,
      primaryPhone: data.primary_phone,
      secondaryPhone: data.secondary_phone,
      obs: data.obs,
    };
  }

  public static async getAll({
    name,
    code,
    cpf,
  }: ClientFilters): Promise<Client[]> {
    const url = `${baseUrl}/clients?code=${code}&name=${name}&${cpf}`;
    return api
      .get<ApiResponse<ClientDTO[]>>(url)
      .then(({ data: response }) => response.data.map(this.mapClientDTO));
  }

  public static async create(data: Omit<ClientDTO, "code">): Promise<Client> {
    return api
      .post<ApiResponse<ClientDTO>>(`${baseUrl}/clients`, data)
      .then(({ data: response }) => this.mapClientDTO(response.data));
  }

  public static async update({ code, ...data }: Client): Promise<Client> {
    const body: ClientDTO = {
      code: code,
      name: data.name,
      cpf: data.cpf,
      address: data.address,
      primary_phone: data.primaryPhone,
      secondary_phone: data.secondaryPhone,
      obs: data.obs,
    };

    return api
      .put<ApiResponse<ClientDTO>>(`${baseUrl}/clients/${code}`, body)
      .then(({ data: response }) => this.mapClientDTO(response.data));
  }
}
