const config = {
  apiUrl: "http://localhost:8000/api",
};

// TODO: get clients from api
let clients = [
  {
    code: 1,
    name: "Thiago",
    cpf: "24123",
    primaryPhone: "99999132234",
    secondaryPhone: "99999132234",
    address: "Rua XV de novembro, 1422",
  },
  {
    code: 2,
    name: "Mylenna",
    cpf: "321423",
    primaryPhone: "23142134",
    secondaryPhone: "23141235k",
    address: "Condominio princesa",
  },
  {
    code: 3,
    name: "Emily",
    cpf: "54321",
    primaryPhone: "99999334455",
    secondaryPhone: "99999334455",
    address: "456 Elm Avenue",
  },
  {
    code: 4,
    name: "Alex",
    cpf: "13579",
    primaryPhone: "99999445566",
    secondaryPhone: "99999445566",
    address: "789 Oak Lane",
  },
  {
    code: 5,
    name: "Sophia",
    cpf: "98765",
    primaryPhone: "99999556677",
    secondaryPhone: "99999556677",
    address: "321 Pine Road",
  },
  {
    code: 6,
    name: "Emma",
    cpf: "24680",
    primaryPhone: "99999667788",
    secondaryPhone: "99999667788",
    address: "987 Maple Street",
  },
  {
    code: 7,
    name: "Liam",
    cpf: "13579",
    primaryPhone: "99999778899",
    secondaryPhone: "99999778899",
    address: "654 Cherry Avenue",
  },
  {
    code: 8,
    name: "Olivia",
    cpf: "02468",
    primaryPhone: "99999889900",
    secondaryPhone: "99999889900",
    address: "321 Elm Street",
  },
  {
    code: 9,
    name: "Noah",
    cpf: "97531",
    primaryPhone: "99999900112",
    secondaryPhone: "99999900112",
    address: "456 Oak Avenue",
  },
  {
    code: 10,
    name: "Ava",
    cpf: "86420",
    primaryPhone: "99999112233",
    secondaryPhone: "99999112233",
    address: "789 Pine Lane",
  },
  {
    code: 11,
    name: "Isabella",
    cpf: "11111",
    primaryPhone: "99999123456",
    secondaryPhone: "99999123456",
    address: "123 Apple Street",
  },
  {
    code: 12,
    name: "Mason",
    cpf: "22222",
    primaryPhone: "99999234567",
    secondaryPhone: "99999234567",
    address: "456 Banana Avenue",
  },
  {
    code: 13,
    name: "Sophia",
    cpf: "33333",
    primaryPhone: "99999345678",
    secondaryPhone: "99999345678",
    address: "789 Cherry Lane",
  },
  {
    code: 14,
    name: "Logan",
    cpf: "44444",
    primaryPhone: "99999456789",
    secondaryPhone: "99999456789",
    address: "987 Orange Road",
  },
  {
    code: 15,
    name: "Charlotte",
    cpf: "55555",
    primaryPhone: "99999567890",
    secondaryPhone: "99999567890",
    address: "654 Grape Avenue",
  },
];

const initialClients = clients;

function assert(condition, message) {
  if (!condition) {
    throw Error(message || "Assertion failed");
  }
}

class Api {
  static async get(url, options) {
    assert(typeof url === "string", "url must be a string");
    return await fetch(url, options);
  }
}

const modal = document.getElementById("modal");
const btn = document.getElementById("openModalBtn");
const closeBtns = document.querySelectorAll(".close");
const clientNameInput = document.getElementById("nome");
const clientCpfInput = document.getElementById("cpf");
const clientAddressInput = document.getElementById("endereco");
const clientPrimaryPhoneInput = document.getElementById("telefonePrincipal");
const clientSecondaryPhoneInput = document.getElementById("telefoneSecundario");
const clientObsInput = document.getElementById("observacoes");
const removeClientButton = document.getElementById("remove-client");

const cpfCnpjMask = IMask(clientCpfInput, {
  mask: [
    {
      mask: "000.000.000-00",
      maxLength: 14,
    },
    {
      mask: "00.000.000/0000-00",
      maxLength: 18,
    },
  ],
});

const clientInputs = [
  clientNameInput,
  clientCpfInput,
  clientAddressInput,
  clientPrimaryPhoneInput,
  clientSecondaryPhoneInput,
  clientObsInput,
];

function resetClientInputs() {
  clientInputs.forEach((input) => (input.value = ""));
}

function closeModal(btn) {
  removeClientButton.style.display = "none";

  if (btn) {
    btn.closest(".modal").style.display = "none";
  } else {
    document.getElementById("modal").style.display = "none";
  }

  resetClientInputs();
}

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn));
});

btn.onclick = () => {
  modal.style.display = "block";
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const table = document.getElementById("table");

const nameFilter = document.getElementById("name-input");
const codeFilter = document.getElementById("code-input");
const cpfFilter = document.getElementById("cpf-input");

const cpfCnpjMaskFilter = IMask(cpfFilter, {
  mask: [
    {
      mask: "000.000.000-00",
      maxLength: 14,
    },
    {
      mask: "00.000.000/0000-00",
      maxLength: 18,
    },
  ],
});

function validateCnpj(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

  if (cnpj.length !== 14 || /^(.)\1+$/.test(cnpj)) {
    return false;
  }

  var tamanho = cnpj.length - 2;
  var numeros = cnpj.substring(0, tamanho);
  var digitos = cnpj.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;

  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== parseInt(digitos.charAt(0))) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== parseInt(digitos.charAt(1))) {
    return false;
  }

  return true;
}

function validateCpf(cpf) {
  assert(typeof cpf === "string");

  cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (var i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

function searchClients() {
  const name = nameFilter.value;
  const code = codeFilter.value;
  const cpf = cpfFilter.value;

  if (!name.length && !code.length && !cpf.length) {
    displayClients({
      clients,
      isInitialRender: true,
      data: { name, code, cpf },
    });
    return;
  }

  displayClients({
    clients: initialClients,
    isInitialRender: false,
    data: { name, code, cpf },
  });

  // TODO: make a http get request to filter clients
}

function handleFilterEnterKey(key) {
  if (key === "Enter") {
    searchClients();
  }
}

nameFilter.addEventListener("keypress", (event) => {
  handleFilterEnterKey(event.key);
});

codeFilter.addEventListener("keypress", (event) => {
  handleFilterEnterKey(event.key);
});

cpfFilter.addEventListener("keypress", (event) => {
  handleFilterEnterKey(event.key);
});

function displayClients({ clients, isInitialRender, data }) {
  assert(Array.isArray(clients), "clients must be an array");
  assert(
    typeof isInitialRender === "boolean",
    "isInitialRender must be a boolean"
  );

  table.innerHTML = `
    <thead>
      <tr>
        <th>CÓD</th>
        <th>NOME</th>
        <th>TELEFONE</th>
        <th>ENDEREÇO</th>
      </tr>
    </thead>
  `;

  if (isInitialRender) {
    return initialClients
      .sort((a, b) => a.code > b.code)
      .forEach((client) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${client.code}</td>
          <td>${client.name}</td>
          <td>${client.primaryPhone}</td>
          <td>${client.address}</td>
        `;

        row.addEventListener("mouseover", () => {
          const cliPreviewCtn = document.querySelector(".cli-previa-ctn");
          cliPreviewCtn.innerHTML = `
            <div class="cli-preview">
              <div class="cli-preview-1">
                <h4>Nome:</h4>
                <p>${client.name}</p>
              </div>
              <div class="cli-preview-2">
                <h4>Telefones:</h4>
                <p>${client.primaryPhone}</p>
                <p>${client.secondaryPhone}</p>
              </div>
              ${
                client.obs !== undefined
                  ? `
                <div class="cli-preview-3">
                  <h4>Observações:</h4>
                  <p>${client.obs}</p>
                </div>
              `
                  : ""
              }
            </div>
          `;
        });

        table.appendChild(row);
      });
  }

  const newClients = clients.filter((client) => {
    const filters = [];

    if (data?.name) {
      filters.push(client.name.toLowerCase().includes(data.name.toLowerCase()));
    }

    if (data?.code) {
      filters.push(
        client.code.toString().toLowerCase() === data.code.toLowerCase()
      );
    }

    if (data?.cpf) {
      filters.push(
        client.cpf
          .toLowerCase()
          .slice(0, data.cpf.length)
          .includes(data.cpf.toLowerCase())
      );
    }

    return filters.every((filter) => filter === true);
  });

  newClients
    .sort((a, b) => a.code > b.code)
    .forEach((client) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${client.code}</td>
        <td>${client.name}</td>
        <td>${client.primaryPhone}</td>
        <td>${client.address}</td>
      `;

      row.addEventListener("mouseover", () => {
        const cliPreviewCtn = document.querySelector(".cli-previa-ctn");
        cliPreviewCtn.innerHTML = `
          <div class="cli-preview">
            <div class="cli-preview-1">
              <h4>Nome:</h4>
              <p>${client.name}</p>
            </div>
            <div class="cli-preview-2">
              <h4>Telefones:</h4>
              <p>${client.primaryPhone}</p>
              <p>${client.secondaryPhone}</p>
            </div>
            ${
              client.obs !== undefined
                ? `
              <div class="cli-preview-3">
                <h4>Observações:</h4>
                <p>${client.obs}</p>
              </div>
            `
                : ""
            }
          </div>
        `;
      });

      table.appendChild(row);
    });
}

window.addEventListener("load", () => {
  nameFilter.value = "";
  codeFilter.value = "";
  cpfFilter.value = "";

  displayClients({ clients, isInitialRender: true });
});

document
  .getElementById("search-clients")
  .addEventListener("click", () => searchClients());

document.getElementById("create-client").addEventListener("click", () => {
  const isCpf = () => {
    return clientCpfInput.value.replace(/[^\d]+/g, "").length === 11;
  };

  const isCnpj = () => {
    return clientCpfInput.value.replace(/[^\d]+/g, "").length === 14;
  };

  if (!clientNameInput.value.length) {
    return alert("nome é obrigatório");
  }

  if (!isCpf() && !isCnpj()) {
    return alert("Insira um CPF ou CNPJ válido");
  }

  if (isCpf() && !validateCpf(clientCpfInput.value || "")) {
    return alert(`cpf ${clientCpfInput.value} inválido`);
  }

  if (isCnpj() && !validateCnpj(clientCpfInput.value || "")) {
    return alert(`cnpj ${clientCpfInput.value} inválido`);
  }

  if (!clientPrimaryPhoneInput.value.length) {
    return alert("telefone principal é obrigatório");
  }

  if (modal.dataset.mode !== "edit") {
    const newClient = {
      code: initialClients[initialClients.length - 1].code + 1,
      name: clientNameInput.value,
      cpf: clientCpfInput.value,
      address: clientAddressInput.value,
      primaryPhone: clientPrimaryPhoneInput.value,
      secondaryPhone: clientSecondaryPhoneInput.value,
      obs: clientObsInput.value,
    };

    initialClients.push(newClient);
  } else if (modal.dataset.mode === "edit") {
    const code = parseInt(modal.dataset.code);
    const clientIndex = initialClients.findIndex((c) => c.code === code);
    if (clientIndex !== -1) {
      initialClients[clientIndex].name = clientNameInput.value;
      initialClients[clientIndex].cpf = clientCpfInput.value;
      initialClients[clientIndex].address = clientAddressInput.value;
      initialClients[clientIndex].primaryPhone = clientPrimaryPhoneInput.value;
      initialClients[clientIndex].secondaryPhone =
        clientSecondaryPhoneInput.value;
      initialClients[clientIndex].obs = clientObsInput.value;
    }
  }

  closeModal();
  displayClients({ clients: initialClients, isInitialRender: false });
});

let client;

table.addEventListener("click", (event) => {
  const row = event.target.closest("tr");

  if (row) {
    const code = parseInt(row.cells[0].textContent);

    client = initialClients.find((c) => c.code === code);

    if (client) {
      openModal(client);
    }
  }
});

function openModal(client) {
  modal.style.display = "block";
  clientNameInput.value = client.name;
  clientCpfInput.value = client.cpf;
  clientAddressInput.value = client.address;
  clientPrimaryPhoneInput.value = client.primaryPhone;
  clientSecondaryPhoneInput.value = client.secondaryPhone;

  if (client.obs !== undefined) {
    clientObsInput.value = client.obs;
  }

  modal.dataset.mode = "edit";
  modal.dataset.code = client.code;

  removeClientButton.style.display = "flex";
}

removeClientButton.addEventListener("click", (event) => {
  event.preventDefault();

  const newClients = clients.filter(({ code }) => code !== client.code);
  displayClients({ clients: newClients, isInitialRender: false });

  modal.style.display = "none";
});
