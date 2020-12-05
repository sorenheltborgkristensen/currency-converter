let selectFrom = document.querySelector(".currencies-from");
let selectTo = document.querySelector(".currencies-to");
let amount = document.querySelector(".amount");

async function getCurrencies() {
  const response = await fetch("https://api.frankfurter.app/currencies");
  const data = await response.json();
  const currencies = Object.entries(data);
  let option = currencies.map((currency) => `<option value="${currency[0]}">${currency[1]}</option>`).join("\n");
  selectFrom.innerHTML = option;
  selectTo.innerHTML = option;
  selectFrom.value = "EUR";
  selectTo.value = "DKK";
}

async function convertCurrency() {
  const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount.value}&from=${selectFrom.value}&to=${selectTo.value}`);
  const data = await response.json();
}

document.addEventListener("change", (event) => {
  if (
    event.target !== selectFrom &&
    event.target !== selectTo &&
    event.target !== amount
  ) {
    return;
  }
  convertCurrency();
});

getCurrencies();
