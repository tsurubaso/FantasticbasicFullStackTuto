document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data['data']));
    const name = nameInput.value;
    nameInput.value = '';
  
});

const addBtn = document.querySelector("#add-name-btn");
addBtn.onclick = () => {
const nameInput = document.querySelector("#name-input");

}

function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");
  //let tableHtml='';
  if (data.length == 0) {
    //===
    table.innerHTML = '<tr><td class="no-data" colspan="5">No Data</td></tr>';
  }
}
