import { loadPageContent } from "./puppeteer/load-page-content";
import { scrapeData } from "./scrapper/scrape-data";
import { config } from "./config";
import { decimalAlert, priceAlert } from "./notify/alert";
import { priceAlertV2 } from "./notify/alert-v2";

export async function run() {
  console.log("running ..");
  const pageContent = await loadPageContent(config.url);
  if (pageContent == null) return;
  const data = await scrapeData(pageContent);
  if (data == null) return;
  // decimalAlert(data);
  // priceAlert(data);
  await priceAlertV2(data);

  // console.log(data.exchangeRate);
}
