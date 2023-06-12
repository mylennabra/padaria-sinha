import { ClientDTO } from "../dtos";

export const clientNameInput = document.getElementById(
  "nome"
) as HTMLInputElement;
export const clientCpfInput = document.getElementById(
  "cpf"
) as HTMLInputElement;
export const clientAddressInput = document.getElementById(
  "endereco"
) as HTMLInputElement;

export const clientPrimaryPhoneInput = document.getElementById(
  "telefonePrincipal"
) as HTMLInputElement;

export const clientSecondaryPhoneInput = document.getElementById(
  "telefoneSecundario"
) as HTMLInputElement;

export const clientObsInput = document.getElementById(
  "observacoes"
) as HTMLInputElement;

const clientInputs = [
  clientNameInput,
  clientCpfInput,
  clientAddressInput,
  clientPrimaryPhoneInput,
  clientSecondaryPhoneInput,
  clientObsInput,
];

export function resetClientInputs() {
  clientInputs.forEach((input) => {
    if (input) {
      input.value = "";
    }
  });
}

export function openModal() {
  document.getElementById("modal")!.style.display = "block";
}

export function closeModal(btn?: any) {
  if (btn) {
    btn.closest(".modal")!.style.display = "none";
  } else {
    document.getElementById("modal")!.style.display = "none";
  }

  resetClientInputs();
}

export function getClientData(refs: any): Omit<ClientDTO, "code"> {
  return {
    name: refs.nameRef.current.value,
    cpf: refs.cpfRef.current.value,
    primary_phone: refs.primaryPhoneRef.current.value,
    secondary_phone: refs.secondaryPhoneRef.current.value,
    address: refs.addressRef.current.value,
    obs: refs.obsRef.current.value,
  };
}

export function getClientFiltersInputs(): HTMLInputElement[] {
  const nameFilter = document.getElementById("name-input") as HTMLInputElement;
  const codeFilter = document.getElementById("code-input") as HTMLInputElement;
  const cpfFilter = document.getElementById("cpf-input") as HTMLInputElement;

  return [nameFilter, codeFilter, cpfFilter];
}

export function getClientFilters(): {
  name: string;
  code: string;
  cpf: string;
} {
  const [nameFilter, codeFilter, cpfFilter] = getClientFiltersInputs();

  return {
    name: nameFilter?.value || "",
    code: codeFilter?.value || "",
    cpf: cpfFilter?.value || "",
  };
}

export function mergeObjects(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): Record<string, any> {
  const merged = { ...obj1 };

  Object.keys(obj2).forEach((key) => {
    const value = obj2[key];

    if (value) {
      merged[key] = value;
    }
  });

  return merged;
}

export function getProductFiltersInputs(): HTMLInputElement[] {
  const descriptionFilter = document.getElementById(
    "product-description-filter"
  ) as HTMLInputElement;
  const codeFilter = document.getElementById(
    "product-code-filter"
  ) as HTMLInputElement;
  const groupFilter = document.getElementById(
    "product-group-filter"
  ) as HTMLInputElement;

  return [descriptionFilter, codeFilter, groupFilter];
}

export function getProductFilters(): {
  description: string;
  code: string;
  group: string;
} {
  const [descriptionFilter, codeFilter, groupFilter] =
    getProductFiltersInputs();

  return {
    description: descriptionFilter?.value || "",
    group: groupFilter?.value || "",
    code: codeFilter?.value || "",
  };
}
