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

export function getRecipeFiltersInputs(): HTMLInputElement[] {
  const nameFilter = document.getElementById(
    "recipe-name-filter"
  ) as HTMLInputElement;

  const codeFilter = document.getElementById(
    "recipe-code-filter"
  ) as HTMLInputElement;

  return [nameFilter, codeFilter];
}

export function getRecipeFilters(): {
  name: string;
  code: string;
} {
  const [nameFilter, codeFilter] = getRecipeFiltersInputs();

  return {
    name: nameFilter?.value || "",
    code: codeFilter?.value || "",
  };
}

export function getSettingsFiltersInputs(): HTMLInputElement[] {
  const nameFilter = document.getElementById(
    "settings-name-filter"
  ) as HTMLInputElement;

  const loginFilter = document.getElementById(
    "settings-login-filter"
  ) as HTMLInputElement;

  return [nameFilter, loginFilter];
}

export function getSettingsFilters(): {
  name: string;
  email: string;
} {
  const [nameFilter, emailFilter] = getSettingsFiltersInputs();

  return {
    name: nameFilter?.value || "",
    email: emailFilter?.value || "",
  };
}
