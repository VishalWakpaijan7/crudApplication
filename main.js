// Add modal
let modal = document.getElementById("modal");
let modalOpen = document.getElementById("modalOpen_btn");
let modalClose = document.getElementById("modalClose_btn");
let modalOverlay = document.getElementById("modalOverlay");
let editModal = document.getElementById("editModalForm");
let editModalOverlay = document.getElementById("modalOverlay");

modalOpen.addEventListener("click", () => {
  modal.classList.add("open_modal");
  modalOverlay.classList.add("overlay_active");
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("open_modal");
  modalOverlay.classList.remove("overlay_active");
});

function initialData() {
  let employee = localStorage.getItem("person");
  employee = JSON.parse(employee);
  let table = document.getElementById("data");
  if (employee) {
    let i;
    let row = `<tr>
    <th>Name</th>
    <th>Email</th>
    <th>Position</th>
    <th>Actions</th>
  </tr>`;
    for (i = 0; i < employee.length; i++) {
      row += `
       <tr>
      <td>${employee[i].name}</td>
      <td>${employee[i].email}</td>
      <td>${employee[i].position}</td>
      <td>
        <button class="btn btn-delete"  onclick="removeHandler(${i})">Remove</button>
        <button class="btn btn-edit edit_btn" onclick="populateEdit('${employee[i].name}','${employee[i].email}','${employee[i].position}',${i})">Edit</button>
        <button class="btn btn-view-profile"  >View Profile</button>
      </td>
    </tr>`;
    }
    table.innerHTML = row;
  }
}
initialData();

// onclick="ViewProfile('${employee[i].name}','${employee[i].email}','${employee[i].position}',${i})"

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

function addEmployee() {
  let name = document.getElementById("employeeName").value;
  let email = document.getElementById("employeeEmail").value;
  let position = document.getElementById("position").value;

  let table = document.getElementById("data");

  if ((name, email, position !== "--Select value--")) {
    storeData({
      name,
      email,
      position,
    });
    table.innerHTML += `
    <tr>
    <td>${name}</td>
    <td>${email}</td>
    <td>${position}</td>
    <td>
        <button class="btn btn-delete">Remove</button>
        <button class="btn btn-edit" id="edit_btn">Edit</button>
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
  modal.classList.remove("open_modal");
  modalOverlay.classList.remove("overlay_active");
  initialData();
}

// Remove Handler

function removeHandler(index) {
  let employee = localStorage.getItem("person");
  employee = JSON.parse(employee);
  employee.splice(index, 1);
  localStorage.setItem("person", JSON.stringify(employee));
  initialData();
}

// Edit Employee

const populateEdit = (Ename, Eemail, Eposition, Eid) => {
  editModal.classList.add("open_modal");
  editModalOverlay.classList.add("overlay_active");

  document.getElementById("editName").value = Ename;
  document.getElementById("editEmail").value = Eemail;
  document.getElementById("editPosition").value = Eposition;

  document.getElementById("editForm").addEventListener("submit", () => {
    let id = Eid;
    let name = document.getElementById("editName").value;
    let email = document.getElementById("editEmail").value;
    let position = document.getElementById("editPosition").value;

    let employee = localStorage.getItem("person");
    employee = JSON.parse(employee);

    if (employee && Array.isArray(employee)) {
      employee[id] = { name, email, position };

      localStorage.setItem("person", JSON.stringify(employee));
    }

    document.getElementById("editName").value = null;
    document.getElementById("editEmail").value = null;
    document.getElementById("editPosition").value = null;
  });
};

let editedName = document.getElementById("editName").value;
let editedEmail = document.getElementById("editEmail").value;
let editedPosition = document.getElementById("editPosition").value;

document.getElementById("employeeform").addEventListener("submit", addEmployee);

document.getElementById("editModelClose").addEventListener("click", () => {
  editModal.classList.remove("open_modal");
  editModalOverlay.classList.remove("overlay_active");
});

//
