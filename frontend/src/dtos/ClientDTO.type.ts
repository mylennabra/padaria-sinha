export type ClientDTO = {
  readonly code: string;
  readonly name: string;
  readonly cpf: string;
  readonly address?: string;
  readonly primary_phone: string;
  readonly secondary_phone?: string;
  readonly obs?: string;
};
