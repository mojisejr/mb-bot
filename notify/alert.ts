import { PriceData } from "../interfaces/price-data";
import { config } from "../config";
import { hiPriceNotify, lowPriceNotify } from "./line-notify";

let hiAlreadyAlerted = 0;
let lowAlreadyAlerted = 0;
let highAlerted = false;
let lowAlerted = false;

export function priceAlert(data: PriceData) {
  if (
    data.percentage > 0 &&
    data.percentage >= config.hiAlert &&
    !highAlerted
  ) {
    console.log("hi alert at", data.percentage);
    highAlerted = true;
    hiAlreadyAlerted = 1;
    hiPriceNotify(data);
  }
  if (highAlerted) {
    hiAlreadyAlerted += 1;
    console.log("already hi alert", hiAlreadyAlerted);
  }

  if (
    data.percentage <= 0 &&
    data.percentage <= config.lowAlert &&
    !lowAlerted
  ) {
    console.log("low alert at", data.percentage);
    lowAlerted = true;
    lowAlreadyAlerted = 1;
    lowPriceNotify(data);
  }

  if (lowAlerted) {
    lowAlreadyAlerted += 1;
    console.log("already low  alert", lowAlreadyAlerted);
  }

  if (lowAlreadyAlerted >= 10) {
    console.log("reset low count");
    lowAlreadyAlerted = 0;
    lowAlerted = false;
  }

  if (hiAlreadyAlerted >= 10) {
    console.log("reset hi count");
    hiAlreadyAlerted = 0;
    highAlerted = false;
  }
  //1. if price is more or less than 0.5% alert to notify
  //2. if already alerted check if price is now below 0.5 if not re-alert every 6 min
  //3. if price below 0.5 reset alerted flag
}

let previousPrice: number | null = null;
export function decimalAlert(priceData: PriceData) {
  // Extract the first decimal from the prices
  const previousDecimal =
    previousPrice !== null ? Math.floor((previousPrice % 1) * 10) : null;
  const currentDecimal = Math.floor((priceData.exchangeRate % 1) * 10);

  // Check for changes in the first decimal
  if (previousDecimal !== null && currentDecimal !== previousDecimal) {
    const changeDirection = currentDecimal > previousDecimal ? "up" : "down";
    console.log(
      `Price changed ${changeDirection} from ${previousPrice} to ${priceData.exchangeRate}`
    );
  }

  previousPrice = priceData.exchangeRate;
}
