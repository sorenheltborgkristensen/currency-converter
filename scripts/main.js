const from = document.querySelector(".currencies-from");
const to = document.querySelector(".currencies-to");
const amount = document.querySelector(".amount");
const result = document.querySelector(".result");
const swap = document.querySelector(".swap");

const getCurrencyNames = async () => {
  const response = await fetch("https://api.frankfurter.app/currencies");
  const data = await response.json();
  const currencies = Object.entries(data);

  const option = currencies.map((currency) => `<option value="${currency[0]}">${currency[1]}</option>`).join("\n");

  from.innerHTML = option;
  to.innerHTML = option;

  from.value = "EUR";
  to.value = "DKK";
  amount.value = 1;

  convertCurrency();
};

const convertCurrency = async () => {
  if (from.value === to.value) {
    result.textContent = amount.value;
  } else {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount.value}&from=${from.value}&to=${to.value}`);
    const data = await response.json();
    const conversionResult = Object.values(data.rates);

    result.textContent = parseFloat(conversionResult).toFixed(2);
  }
};

const swapCurrency = () => {
  temp = from.value;
  from.value = to.value;
  to.value = temp;
  convertCurrency();
};

from.addEventListener("change", convertCurrency);
to.addEventListener("change", convertCurrency);
amount.addEventListener("change", convertCurrency);
amount.addEventListener("keyup", convertCurrency);
swap.addEventListener("click", swapCurrency);

getCurrencyNames();
convertCurrency();
