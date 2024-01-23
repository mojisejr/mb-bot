import { PriceData } from "../interfaces/price-data";
import { config } from "../config";
import { broadcastPriceAlert } from "./messaging/broadcast-price";
import { hiPriceNotify, lowPriceNotify } from "./line-notify";
import dayjs = require("dayjs");

//Methods
//1. when open bot take current price (price == null ? price == currentPrice : alertedPrice )
//2. calculate current price if the current price is exceeds to the alert threshold
//3. if reach to the threshold alert and replace the currentPrice with alerted price

// let startDayPrice: number = 0;
let currentPrice: number | null = null;
let calculatedHiThresholdPrice: number = 0;
let calculatedLowThresholdPrice: number = 0;

let broadcastCount = 0;
let lastRatelimit: dayjs.Dayjs;

function canAlert() {
  if (broadcastCount <= 0) {
    lastRatelimit = dayjs(new Date());
  }
  const currentTime = dayjs(new Date());
  const diffHours = currentTime.diff(lastRatelimit, "s");
  console.log("Time Different: ", {
    ref: config.rateLimitDelay,
    actual: diffHours,
  });

  //exceed broadcasting limit before rate limit
  if (
    diffHours < config.rateLimitDelay &&
    broadcastCount >= config.maxBroadcast
  ) {
    console.log("rate limited");
    return false;
  }

  if (
    diffHours < config.rateLimitDelay &&
    broadcastCount < config.maxBroadcast
  ) {
    //update count
    console.log("broadcast available", broadcastCount);
    broadcastCount++;
    return true;
  }

  //rate limit time exceeded
  if (diffHours > config.rateLimitDelay) {
    console.log("broadcast & ratelimit reset");
    //reset broadcast count
    broadcastCount = 0;
    //update lastRateLimit
    lastRatelimit = dayjs(new Date());
    return true;
  }
}

function calculateThresholdPrice(price: number) {
  const rate = config.hiAlert;
  calculatedHiThresholdPrice = +(price + (price * rate) / 100).toFixed(2);
  calculatedLowThresholdPrice = +(price - (price * rate) / 100).toFixed(2);
}

async function checkPriceForHiAlert(priceData: PriceData) {
  const price = priceData.exchangeRate;
  if (price > currentPrice! && price >= calculatedHiThresholdPrice) {
    console.log(`alert UP @ ${price}`);
    if (canAlert()) {
      await broadcastPriceAlert(priceData, true, currentPrice!);
      // await hiPriceNotify(priceData, currentPrice!);
    }
    updateCurrentPrice(price);
  }
}

async function checkPriceForLowAlert(priceData: PriceData) {
  const price = priceData.exchangeRate;
  if (price < currentPrice! && price <= calculatedLowThresholdPrice) {
    console.log(`alert Down @ ${price}`);
    if (canAlert()) {
      await broadcastPriceAlert(priceData, false, currentPrice!);
      // await lowPriceNotify(priceData, currentPrice!);
    }
    updateCurrentPrice(price);
  }
}

function updateCurrentPrice(price: number) {
  currentPrice = price;
  calculateThresholdPrice(price);
}

// Memory Parameters
export async function priceAlertV2(data: PriceData) {
  if (currentPrice == null) {
    updateCurrentPrice(data.exchangeRate);
  }

  if (currentPrice != null) {
    await checkPriceForHiAlert(data);
    await checkPriceForLowAlert(data);
  }

  console.log({
    currentPrice,
    inputPrice: data.exchangeRate,
    calculatedHiThresholdPrice,
    calculatedLowThresholdPrice,
  });
}
