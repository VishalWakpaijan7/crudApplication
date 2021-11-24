let model = document.getElementById("model");
let modelOpen = document.getElementById("modelOpen_btn");
let modelClose = document.getElementById("modelClose_btn");

modelOpen.addEventListener("click", () => {
  model.classList.add("open_model");
});

modelClose.addEventListener("click", () => {
  model.classList.remove("open_model");
});
