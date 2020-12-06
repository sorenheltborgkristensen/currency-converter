let from = document.querySelector(".currencies-from");
let to = document.querySelector(".currencies-to");
let amount = document.querySelector(".amount");
let result = document.querySelector(".result");

const getCurrencies = async () => {
  const response = await fetch("https://api.frankfurter.app/currencies");
  const data = await response.json();
  const currencies = Object.entries(data);
  let option = currencies.map((currency) => `<option value="${currency[0]}">${currency[1]}</option>`).join("\n");
  from.innerHTML = option;
  to.innerHTML = option;
  from.value = "EUR";
  to.value = "DKK";
}

const convertCurrency = async () => {
  const fromValue = from.value;
  const toValue = to.value;
  const amountValue = amount.value;

  if (fromValue === toValue) {
    result.textContent = amountValue;
  } else {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amountValue}&from=${fromValue}&to=${toValue}`);
    const data = await response.json();
    const conversionResult = Object.values(data.rates);
    result.textContent = parseFloat(conversionResult).toFixed(2);
  }
}

document.addEventListener("change", (event) => {
  if (event.target !== from && event.target !== to && event.target !== amount) {
    return;
  } else {
    convertCurrency();
  }
});

getCurrencies();
convertCurrency();
