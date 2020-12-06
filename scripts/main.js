const from = document.querySelector(".currencies-from");
const to = document.querySelector(".currencies-to");
const amount = document.querySelector(".amount");
const result = document.querySelector(".result");

async function getCurrencies() {
  const response = await fetch("https://api.frankfurter.app/currencies");
  const data = await response.json();
  const currencies = Object.entries(data);
  const option = currencies.map((currency) => `<option value="${currency[0]}">${currency[1]}</option>`).join("\n");
  from.innerHTML = option;
  to.innerHTML = option;
  from.value = "EUR";
  to.value = "DKK";
}

async function convertCurrency() {
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

document.addEventListener("change", (e) => {
  if (e.target !== from && e.target !== to && e.target !== amount) {
    return;
  }

  convertCurrency();
});

document.addEventListener("keyup", (e) => {
  if (e.target !== amount) {
    return;
  }

  convertCurrency();
});

getCurrencies();
convertCurrency();
