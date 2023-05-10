document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});

const addBtn = document.querySelector("#add-name-btn");
addBtn.onclick = function () {
  const nameInput = document.querySelector("#name-input");
  const name = nameInput.value;
  nameInput.value = "";
  fetch("http://localhost:5000/insert", {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({ name: name }),
  })
    .then((response) => response.json())
    .then((data) => insertRowIntoTable(data["data"]));
};

function insertRowIntoTable(data) {}

function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");
  //let tableHtml='';
  if (data.length === 0) {
    table.innerHTML = '<tr><td class="no-data" colspan="5">No Data</td></tr>';
    return;
  }
  let tableHtml = "";
  data.forEach(function ({ id, name, date_added }) {
    tableHtml += `<tr><td>${id}</td><td>${name}</td><td>${new Date(date_added).toLocaleDateString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
    tableHtml += `</tr>`;
  });
  table.innerHTML = tableHtml;
}
