const usersDiv = document.getElementById("users-list");
let users = [];

getUsers();

function refreshUsersGrid() {
  users.forEach((user) => {
    usersDiv.innerHTML += `
        <div class="col-4">
            <div class="card">
            <div class="card-header">
                ${user.name} ${user.surname}
            </div>
            <div class="card-body">
                <p class="card-text">
                <strong>Data Nasc.:</strong> ${user.birthDate}
                </p>
                <p class="card-text">
                <strong>Profissão:</strong> ${user.profession}
                </p>
                <p class="card-text">
                <strong>CPF:</strong> ${user.documentNumber}
                </p>
                <p class="card-text">
                <strong>E-mail:</strong> ${user.email}
                </p>
                <p class="card-text">
                <strong>Telefone:</strong> ${user.phone}
                </p>
                <p class="card-text">
                <strong>Endereço:</strong> ${user.address}
                </p>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <a href="#" class="btn btn-primary">
                Editar
                </a>
                <a href="#" class="btn btn-danger">
                Excluir
                </a>
            </div>
            </div>
        </div>
    `;
  });
}

function getUsers() {
  //   users = JSON.parse(localStorage.getItem("USERS") || "[]");

  const request = indexedDB.open("database", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;

    const transaction = db.transaction(["users"], "readonly");
    const objectStore = transaction.objectStore("users");

    const requestGetAll = objectStore.getAll();

    requestGetAll.onsuccess = function (event) {
      users = event.target.result;
      refreshUsersGrid();
    };

    requestGetAll.onerror = function () {
      console.log("Houve um erro!", event.target.error);
    };
  };

  request.onerror = function (event) {};
}
