const currencyFrom = document.querySelector(".currency-from");
const currencyTo = document.querySelector(".currency-to");
const amount = document.querySelector(".amount");
const result = document.querySelector(".result");
const swapCurrencies = document.querySelector(".swap-currency");

const url_currencies = "https://api.frankfurter.app/currencies";
const url_conversion = "https://api.frankfurter.app/latest";

const cunrrencies = async () => {
  const response = await fetch(url_currencies);
  const data = await response.json();
  const currencies = Object.entries(data);
  return currencies;
};

const conversion = async () => {
  if (currencyFrom.value === currencyTo.value) {
    result.textContent = amount.value;
  } else if (amount.value.length !== 0 && currencyFrom.value.length !== 0 && currencyTo.value.length !== 0) {
    const response = await fetch(url_conversion + `?amount=${amount.value}&from=${currencyFrom.value}&to=${currencyTo.value}`);
    const data = await response.json();
    const conversion = Object.values(data.rates);
    result.textContent = parseFloat(conversion).toFixed(2);
  }
};

cunrrencies().then((currencies) => {
  const option = currencies.map((currency) => `<option value="${currency[0]}">${currency[0]} - ${currency[1]}</option>`).join("\n");
  currencyFrom.innerHTML = option;
  currencyTo.innerHTML = option;
  currencyFrom.value = "EUR";
  currencyTo.value = "DKK";
  amount.value = 1;
  conversion();
});

const swap = () => {
  temp = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value = temp;
  conversion();
};

currencyFrom.addEventListener("change", conversion);
currencyTo.addEventListener("change", conversion);
amount.addEventListener("change", conversion);
amount.addEventListener("keyup", conversion);
swapCurrencies.addEventListener("click", swap);
