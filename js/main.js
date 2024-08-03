document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("input-bill");
  const customTipInput = document.getElementById("custom-percentage-button");
  const numPeopleInput = document.getElementById("input-people");
  const tipButtons = document.querySelectorAll(".percentage-button");
  const tipAmountDisplay = document.getElementById("tip-amount");
  const totalDisplay = document.getElementById("total");
  const resetButton = document.getElementById("reset-button");
  const errorMessage =
    numPeopleInput.parentNode.querySelector(".error-message");

  let bill = 0;
  let tipPercentage = 0;
  let numPeople = 0;

  function initializeResetButton() {
    resetButton.classList.add("initial");
  }

  function removeInitialClass() {
    resetButton.classList.remove("initial");
    resetButton.classList.add("active");
  }
  initializeResetButton();

  function calculateTip() {
    if (numPeople === 0) {
      errorMessage.style.display = "block";
      numPeopleInput.classList.add("input-invalid");
      tipAmountDisplay.textContent = "0";
      totalDisplay.textContent = "0";
      return;
    }
    // else {
    //   errorMessage.style.display = "none";
    //   numPeopleInput.classList.remove("input-invalid");
    // }

    const tipAmount = (bill * tipPercentage) / 100 / numPeople;
    const totalAmount = bill / numPeople + tipAmount;

    tipAmountDisplay.textContent = tipAmount.toFixed(2);
    totalDisplay.textContent = totalAmount.toFixed(2);
  }

  billInput.addEventListener("input", (e) => {
    bill = parseFloat(e.target.value) || 0;
    calculateTip();
  });

  billInput.addEventListener("click", () => {
    removeInitialClass();
  });

  customTipInput.addEventListener("input", (e) => {
    tipPercentage = parseFloat(e.target.value) || 0;
    tipButtons.forEach((btn) => btn.classList.remove("btn-active"));
    calculateTip();
  });

  customTipInput.addEventListener("click", () => {
    tipButtons.forEach((btn) => btn.classList.remove("btn-active"));
  });

  tipButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (numPeople === 0) {
        errorMessage.style.display = "block";
        numPeopleInput.classList.add("input-invalid");
        return;
      }

      tipPercentage = parseFloat(e.target.value);
      customTipInput.value = "";
      tipButtons.forEach((btn) => btn.classList.remove("btn-active"));
      e.target.classList.add("btn-active");
      calculateTip();
    });
  });

  numPeopleInput.addEventListener("click", () => {
    removeInitialClass();
  });

  numPeopleInput.addEventListener("input", (e) => {
    numPeople = parseFloat(e.target.value) || 0;
    if (numPeople !== 0) {
      errorMessage.style.display = "none";
      numPeopleInput.classList.remove("input-invalid");
    }
    calculateTip();
  });

  resetButton.addEventListener("click", () => {
    billInput.value = "";
    customTipInput.value = "";
    numPeopleInput.value = "";
    tipAmountDisplay.textContent = "0.00";
    totalDisplay.textContent = "0.00";
    tipButtons.forEach((btn) => btn.classList.remove("btn-active"));
    bill = 0;
    tipPercentage = 0;
    numPeople = 0;
    errorMessage.style.display = "none";
    numPeopleInput.classList.remove("input-invalid");
    // initializeResetButton();
    removeInitialClass();
    function removeInitialClass() {
      resetButton.classList.remove("active");
      resetButton.classList.add("initial");
    }
  });
});
