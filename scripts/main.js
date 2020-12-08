const from = document.querySelector(".currencies-from");
const to = document.querySelector(".currencies-to");
const amount = document.querySelector(".amount");
const result = document.querySelector(".result");
const swap = document.querySelector(".swap");

const url_currencies = "https://api.frankfurter.app/currencies";
const url_conversion = "https://api.frankfurter.app/latest";

const cunrrencies = async () => {
  const response = await fetch(url_currencies);
  const data = await response.json();
  const currencies = Object.entries(data);
  return currencies;
};

const conversion = async () => {
  if (from.value === to.value) {
    result.textContent = amount.value;
  } else if (amount.value.length !== 0 && from.value.length !== 0 && to.value.length !== 0) {
    const response = await fetch(url_conversion + `?amount=${amount.value}&from=${from.value}&to=${to.value}`);
    const data = await response.json();
    const conversion = Object.values(data.rates);
    result.textContent = parseFloat(conversion).toFixed(2);
  }
};

cunrrencies().then((currencies) => {
  const option = currencies.map((currency) => `<option value="${currency[0]}">${currency[0]} - ${currency[1]}</option>`).join("\n");
  from.innerHTML = option;
  to.innerHTML = option;
  from.value = "EUR";
  to.value = "DKK";
  amount.value = 1;
  conversion();
});

const swapCurrencies = () => {
  temp = from.value;
  from.value = to.value;
  to.value = temp;
  conversion();
};

from.addEventListener("change", conversion);
to.addEventListener("change", conversion);
amount.addEventListener("change", conversion);
amount.addEventListener("keyup", conversion);
swap.addEventListener("click", swapCurrencies);
