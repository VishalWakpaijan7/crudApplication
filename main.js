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

// Adding Employees

function addEmployee() {
  let name = document.getElementById("employeeName").value;
  let email = document.getElementById("employeeEmail").value;
  let position = document.getElementById("position").value;
  let table = document.getElementById("data");

  if ((name, email, position !== "--Select value--")) {
    console.log(name, email, position);
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
}

document.getElementById("employeeform").addEventListener("submit", addEmployee);
