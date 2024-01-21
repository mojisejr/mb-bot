import { PriceData } from "../interfaces/price-data";
import { config } from "../config";
// import { hiPriceNotify, lowPriceNotify } from "./line-notify";
import { broadcastPriceAlert } from "./messaging/broadcast-price";

let hiAlreadyAlerted = 0;
let lowAlreadyAlerted = 0;
let prevLowPrice = 0;
let prevHiPrice = 0;
let highAlerted = false;
let lowAlerted = false;

export function priceAlert(data: PriceData) {
  if (
    data.percentage > 0 &&
    data.percentage >= config.hiAlert &&
    prevHiPrice != data.exchangeRate &&
    !highAlerted
  ) {
    console.log("hi alert at", data.percentage);
    highAlerted = true;
    hiAlreadyAlerted = 1;
    broadcastPriceAlert(data, true);
    prevHiPrice = data.exchangeRate;
    // hiPriceNotify(data);
  }
  if (highAlerted) {
    hiAlreadyAlerted += 1;
    console.log("already hi alert", hiAlreadyAlerted);
  }

  if (
    data.percentage <= 0 &&
    data.percentage <= config.lowAlert &&
    prevLowPrice != data.exchangeRate &&
    !lowAlerted
  ) {
    console.log("low alert at", data.percentage);
    lowAlerted = true;
    lowAlreadyAlerted = 1;
    broadcastPriceAlert(data, false);
    prevLowPrice = data.exchangeRate;
  }

  if (lowAlerted) {
    lowAlreadyAlerted += 1;
    console.log("already low  alert", lowAlreadyAlerted);
  }

  if (lowAlreadyAlerted >= config.alertDelay) {
    console.log("reset low count");
    lowAlreadyAlerted = 0;
    lowAlerted = false;
  }

  if (hiAlreadyAlerted >= config.alertDelay) {
    console.log("reset hi count");
    hiAlreadyAlerted = 0;
    highAlerted = false;
  }
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
