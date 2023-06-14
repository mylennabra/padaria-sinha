import api from "axios";
import { baseUrl } from "../config/api";
import { Auth } from "../entities/Auth.type";

export interface LoginData {
  readonly email: string;
  readonly password: string;
}

export class AuthService {
  public static login({ email, password }: LoginData): Promise<void> {
    return api
      .post(`${baseUrl}/login`, { email, password })
      .then(({ data }) => data);
  }

  public static me(): Promise<Auth> {
    return api.get(`${baseUrl}/me`).then(({ data }) => data);
  }
}
