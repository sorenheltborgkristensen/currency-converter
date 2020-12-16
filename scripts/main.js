"use strict";

const currencyFrom = document.querySelector(".from");
const currencyTo = document.querySelector(".to");
const amount = document.querySelector(".amount");
const result = document.querySelector(".result");
const swap = document.querySelector(".swap");

async function currencies() {
  try {
    const response = await fetch("https://api.frankfurter.app/currencies");
    const data = await response.json();
    const currencies = Object.entries(data);
    populateSelectOptions(currencies);
  } catch (error) {
    console.log(error);
  }
}

async function conversion() {
  try {
    if (currencyFrom.value === currencyTo.value) {
      result.textContent = amount.value;
    } else if (amount.value.length !== 0 && currencyFrom.value.length !== 0 && currencyTo.value.length !== 0) {
      const response = await fetch(
        "https://api.frankfurter.app/latest?" +
          new URLSearchParams({
            amount: amount.value,
            from: currencyFrom.value,
            to: currencyTo.value,
          })
      );
      const data = await response.json();
      const conversionResult = parseFloat(Object.values(data.rates)).toFixed(2);
      displayConversionResult(conversionResult);
    }
  } catch (error) {
    console.log(error);
  }
}

function populateSelectOptions(currencies) {
  const option = currencies.map((currency) => `<option value="${currency[0]}">${currency[0]} - ${currency[1]}</option>`).join("\n");
  currencyFrom.innerHTML = option;
  currencyTo.innerHTML = option;
}

function displayConversionResult(conversionResult) {
  result.textContent = conversionResult;
}

function setValues() {
  currencyFrom.value = "EUR";
  currencyTo.value = "DKK";
  amount.value = 1;
}

function swapFromTo() {
  const temp = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value = temp;
  conversion();
}

async function setup() {
  await currencies();
  setValues();
  await conversion();
}

setup();

currencyFrom.addEventListener("change", conversion);
currencyTo.addEventListener("change", conversion);
amount.addEventListener("change", conversion);
amount.addEventListener("keyup", conversion);
swap.addEventListener("click", swapFromTo);
