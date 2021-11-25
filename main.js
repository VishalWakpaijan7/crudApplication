let model = document.getElementById("model");
let modelOpen = document.getElementById("modelOpen_btn");
let modelClose = document.getElementById("modelClose_btn");
let modelOverlay = document.getElementById("modelOverlay");

modelOpen.addEventListener("click", () => {
  model.classList.add("open_model");
  modelOverlay.classList.add("overlay_active");
});

modelClose.addEventListener("click", () => {
  model.classList.remove("open_model");
  modelOverlay.classList.remove("overlay_active");
});

function initialData() {
  let employee = localStorage.getItem("person");
  employee = JSON.parse(employee);

  let table = document.getElementById("data");
  if (employee) {
    employee.forEach(({ id, name, email, position }) => {
      table.innerHTML += `<tr>
      <td>${id}</td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${position}</td>
      <td>
        <button class="btn btn-delete" onclick="removeHandler(${id})">Remove</button>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-view-profile">View Profile</button>
      </td>
    </tr>`;
    });
  } else {
    table.innerHTML = `<h2>No Data</h2>`;
  }
}
initialData();

function removeHandler(id) {
  let employee = localStorage.getItem("person");
  employee = JSON.parse(employee);
  let currentIndex = id;

  employee.filter((id) => {
    console.log(id !== currentIndex);
  });
}

// Store Data

function storeData(newEmployee) {
  let person = localStorage.getItem("person");
  person = JSON.parse(person);

  if (!(person && Array.isArray(person))) {
    person = [];
  }

  person.push(newEmployee);
  localStorage.setItem("person", JSON.stringify(person));

  return person.length;
}

// Adding Employees

function addEmployee(e) {
  e.preventDefault();
  let name = document.getElementById("employeeName").value;
  let email = document.getElementById("employeeEmail").value;
  let position = document.getElementById("position").value;
  let id = Math.floor(Math.random() * 100 + 1);

  let table = document.getElementById("data");

  if ((id, name, email, position !== "--Select value--")) {
    storeData({
      id,
      name,
      email,
      position,
    });
    table.innerHTML += `<tr>
    <td>${id}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${position}</td>
    <td>
      <button class="btn btn-delete">Remove</button>
      <button class="btn btn-edit">Edit</button>
      <button class="btn btn-view-profile" >View Profile</button>
    </td>
  </tr>`;
  } else {
    let pop = document.createElement("p");
    let node = document.createTextNode("* Select Value *");
    pop.appendChild(node);

    let para = document.getElementById("pop");
    para.appendChild(pop);

    setTimeout(() => {
      para.removeChild(pop);
    }, 2000);
  }

  document.getElementById("employeeName").value = null;
  document.getElementById("employeeEmail").value = null;
  document.getElementById("position").value = `--Select value--`;
  model.classList.remove("open_model");
  modelOverlay.classList.remove("overlay_active");
}

document.getElementById("employeeform").addEventListener("submit", addEmployee);
