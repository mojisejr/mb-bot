import { PuppeteerLifeCycleEvent } from "puppeteer";

export const config = {
  //   cronPattern: "* * * * *",
  cronPattern: "*/10 * * * * *",
  url: "https://www.maxbit.com/trade?orderSide=buy&orderType=quick&coinBase=USDT&coinQuote=THB",
  waitUntil: "networkidle2" as PuppeteerLifeCycleEvent,
  hiAlert: 0.1,
  lowAlert: -0.1,
};
