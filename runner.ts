import { loadPageContent } from "./puppeteer/load-page-content";
import { scrapeData } from "./scrapper/scrape-data";
import { config } from "./config";
import { priceAlertV2 } from "./notify/alert-v2";
import { errorNotify } from "./notify/line-notify";

export async function run() {
  try {
    console.log("running ..");
    const pageContent = await loadPageContent(config.url);
    if (pageContent == null) return;
    const data = await scrapeData(pageContent);
    if (data == null) return;
    // decimalAlert(data);
    // priceAlert(data);
    await priceAlertV2(data);
  } catch (error: any) {
    console.log("global error: ");
    errorNotify(`🤮 Maxbit-bot: [ERROR]: ${error.message}`);
    console.log(error);
  }
  // console.log(data.exchangeRate);
}
