import { PuppeteerLifeCycleEvent } from "puppeteer";

export const config = {
  // cronPattern: "* * * * *",
  // cronPattern: "*/10 * * * * *",
  cronPattern: "*/5 * * * *", //every 5 min
  // url: "https://www.maxbit.com/trade?orderSide=buy&orderType=quick&coinBase=USDT&coinQuote=THB",
  url: "https://www.maxbit.com/trade/USDT-THB",
  waitUntil: "networkidle2" as PuppeteerLifeCycleEvent,
  hiAlert: 0.5,
  lowAlert: -0.5,
  alertDelay: 2,
  maxBroadcast: 55,
  rateLimitDelay: 3600,
};
