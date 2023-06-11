export type Client = {
  readonly code: string;
  readonly name: string;
  readonly cpf: string;
  readonly address?: string;
  readonly primaryPhone: string;
  readonly secondaryPhone?: string;
  readonly obs?: string;
};
