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
        table.innerHTML += `
        <tr>
          <td>${client.code}</td>
          <td>${client.name}</td>
          <td>${client.primaryPhone}</td>
          <td>${client.address}</td>
        </tr>
      `;
      });
  }

  clients = initialClients.filter((client) => {
    const filters = [];

    if (data?.name) {
      filters.push(client.name.toLowerCase() === data.name.toLowerCase());
    }

    if (data?.code) {
      filters.push(
        client.code.toString().toLowerCase() === data.code.toLowerCase()
      );
    }

    if (data?.cpf) {
      filters.push(client.cpf.toLowerCase() === data.cpf.toLowerCase());
    }

    return filters.every((filter) => filter === true);
  });

  clients
    .sort((a, b) => a.code > b.code)
    .forEach((client) => {
      table.innerHTML += `
      <tr>
        <td>${client.code}</td>
        <td>${client.name}</td>
        <td>${client.primaryPhone}</td>
        <td>${client.address}</td>
      </tr>
    `;
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
  if (!clientNameInput.value.length) {
    return alert("nome é obrigatório");
  }

  if (!clientCpfInput.value.length) {
    return alert("cpf é obrigatório");
  }

  if (!clientPrimaryPhoneInput.value.length) {
    return alert("telefone principal é obrigatório");
  }

  initialClients.push({
    code: initialClients[initialClients.length - 1].code + 1,
    name: clientNameInput.value,
    cpf: clientCpfInput.value,
    address: clientAddressInput.value,
    primaryPhone: clientPrimaryPhoneInput.value,
    secondaryPhone: clientSecondaryPhoneInput.value,
    obs: clientObsInput.value,
  });

  closeModal();
  displayClients({ clients: initialClients, isInitialRender: false });
});
