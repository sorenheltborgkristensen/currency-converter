const currencyFrom = document.querySelector(".from");
const currencyTo = document.querySelector(".to");
const amount = document.querySelector(".amount");
const result = document.querySelector(".result");
const swap = document.querySelector(".swap");

const currencies = async () => {
  const response = await fetch("https://api.frankfurter.app/currencies");
  const data = await response.json();
  const currencies = data;
  populateSelectOptions(currencies);
  return currencies;
};

const conversion = async () => {
  if (currencyFrom.value === currencyTo.value) {
    result.textContent = amount.value;
  } else if (amount.value.length !== 0 && currencyFrom.value.length !== 0 && currencyTo.value.length !== 0) {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount.value}&from=${currencyFrom.value}&to=${currencyTo.value}`);
    const data = await response.json();
    const valuta = data.rates;
    result.textContent = parseFloat(Object.values(valuta)).toFixed(2);
  }
};

const populateSelectOptions = (currencies) => {
  const option = Object.entries(currencies)
    .map((currency) => `<option value="${currency[0]}">${currency[0]} - ${currency[1]}</option>`)
    .join("\n");
  currencyFrom.innerHTML = option;
  currencyTo.innerHTML = option;
};

const setStartValues = () => {
  currencyFrom.value = "EUR";
  currencyTo.value = "DKK";
  amount.value = 1;
};

const swapFromTo = () => {
  temp = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value = temp;
  conversion();
};

const setup = async () => {
  await currencies();
  setStartValues();
  await conversion();
};

setup();

currencyFrom.addEventListener("change", conversion);
currencyTo.addEventListener("change", conversion);
amount.addEventListener("change", conversion);
amount.addEventListener("keyup", conversion);
swap.addEventListener("click", swapFromTo);
