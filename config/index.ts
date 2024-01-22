import { PuppeteerLifeCycleEvent } from "puppeteer";

export const config = {
  //   cronPattern: "* * * * *",
  cronPattern: "*/10 * * * * *",
  url: "https://www.maxbit.com/trade?orderSide=buy&orderType=quick&coinBase=USDT&coinQuote=THB",
  waitUntil: "networkidle2" as PuppeteerLifeCycleEvent,
  hiAlert: 0.03,
  lowAlert: -0.03,
  alertDelay: 2,
  maxBroadcast: 55,
  rateLimitDelay: 3600,
};
