const fishValues = {
  tiny: 5,
  small: 10,
  medium: 30,
  large: 50,
  huge: 100,

  "bf-tiny": 15,
  "bf-small": 60,
  "bf-medium": 105,
  "bf-large": 150,
  "bf-huge": 600,

  "gold-tiny": 15,
  "gold-small": 60,
  "gold-medium": 105,
  "gold-large": 150,
  "gold-huge": 600,

  "her-tiny": 10,
  "her-small": 40,
  "her-medium": 70,
  "her-large": 100,
  "her-huge": 300,

  "carp-tiny": 20,
  "carp-small": 80,
  "carp-medium": 140,
  "carp-large": 200,
  "carp-huge": 600,

  "hal-tiny": 20,
  "hal-small": 80,
  "hal-medium": 140,
  "hal-large": 200,
  "hal-huge": 600,

  "tuna-tiny": 40,
  "tuna-small": 160,
  "tuna-medium": 280,
  "tuna-large": 400,
  "tuna-huge": 1200,

  "king-tiny": 10,
  "king-small": 40,
  "king-medium": 70,
  "king-large": 100,
  "king-huge": 300,

  "ang-tiny": 30,
  "ang-small": 120,
  "ang-medium": 210,
  "ang-large": 300,
  "ang-huge": 900,

  "acid-tiny": 80,
  "acid-small": 320,
  "acid-medium": 560,
  "acid-large": 800,
  "acid-huge": 2400,

  "piran-tiny": 30,
  "piran-small": 120,
  "piran-medium": 210,
  "piran-large": 300,
  "piran-huge": 900,
};
const grandDisplay = document.getElementById("grandTotalDisplay");
const floatingGrandDisplay = document.getElementById("floatingGrandDisplay");
const floatingBar = document.getElementById("floatingBar");
const btnReset = document.getElementById("btnReset");
const btnResetFloating = document.getElementById("btnResetFloating");
function calculateAll() {
  let grandTotal = 0;
  const categories = [
    { class: ".dumb-input", display: "dumbTotalDisplay" },
    { class: ".bf-input", display: "bfTotalDisplay" },
    { class: ".gold-input", display: "goldTotalDisplay" },
    { class: ".her-input", display: "herTotalDisplay" },
    { class: ".carp-input", display: "carpTotalDisplay" },
    { class: ".hal-input", display: "halTotalDisplay" },
    { class: ".tuna-input", display: "tunaTotalDisplay" },
    { class: ".king-input", display: "kingTotalDisplay" },
    { class: ".ang-input", display: "angTotalDisplay" },
    { class: ".acid-input", display: "acidTotalDisplay" },
    { class: ".piran-input", display: "piranTotalDisplay" },
  ];
  categories.forEach((cat) => {
    let subTotal = 0;
    const inputs = document.querySelectorAll(cat.class);
    inputs.forEach((input) => {
      const value = parseInt(input.value) || 0;
      subTotal += value * (fishValues[input.id] || 0);
    });
    const displayElement = document.getElementById(cat.display);
    if (displayElement) {
      displayElement.textContent = subTotal.toLocaleString();
    }
    grandTotal += subTotal;
  });
  const formattedGrand = grandTotal.toLocaleString();
  if (grandDisplay) grandDisplay.textContent = formattedGrand;
  if (floatingGrandDisplay) floatingGrandDisplay.textContent = formattedGrand;
}
const allInputs = document.querySelectorAll('input[type="number"]');
allInputs.forEach((input) => {
  input.addEventListener("input", calculateAll);
});
window.addEventListener("scroll", () => {
  if (window.innerWidth > 768) {
    if (window.scrollY > 200) {
      floatingBar.classList.add("show");
    } else {
      floatingBar.classList.remove("show");
    }
  }
});
function resetForm() {
  document.getElementById("fishForm").reset();
  const allDisplays = document.querySelectorAll('[id$="TotalDisplay"]');
  allDisplays.forEach((d) => (d.textContent = "0"));
  if (floatingGrandDisplay) floatingGrandDisplay.textContent = "0";
}
btnReset.addEventListener("click", resetForm);
if (btnResetFloating) btnResetFloating.addEventListener("click", resetForm);
const burger = document.querySelector(".burger");
const drawer = document.querySelector(".nav-drawer");
const drawerLinks = document.querySelectorAll(".fish-jump-list a");
if (burger && drawer) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    drawer.classList.toggle("open");
  });
  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("open");
      drawer.classList.remove("open");
    });
  });
}
const header = document.getElementById("stickyHeader");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});
function saveAllData() {
  const inputs = document.querySelectorAll('input[type="number"]');
  const dataToSave = {};
  inputs.forEach((input) => {
    if (input.value !== "" && input.value !== "0") {
      dataToSave[input.id] = input.value;
    }
  });
  localStorage.setItem("pwFishData", JSON.stringify(dataToSave));
  console.log("Data saved automatically!");
}
function loadSavedData() {
  const savedData = localStorage.getItem("pwFishData");
  if (savedData) {
    const data = JSON.parse(savedData);
    for (const id in data) {
      const inputField = document.getElementById(id);
      if (inputField) {
        inputField.value = data[id];
      }
    }
    if (typeof calculateAll === "function") {
      calculateAll();
    }
  }
}
document.getElementById("fishForm").addEventListener("input", () => {
  saveAllData();
});
const resetButtons = [
  document.getElementById("btnReset"),
  document.getElementById("btnResetFloating"),
];
resetButtons.forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", () => {
      if (confirm("Reset semua data?")) {
        localStorage.removeItem("pwFishData");
      }
    });
  }
});
window.addEventListener("DOMContentLoaded", () => {
  loadSavedData();
});
