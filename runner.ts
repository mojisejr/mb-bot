import { loadPageContent } from "./puppeteer/load-page-content";
import { scrapeData } from "./scrapper/scrape-data";
import { config } from "./config";
import { decimalAlert, priceAlert } from "./notify/alert";

export async function run() {
  console.log("running ..");
  const pageContent = await loadPageContent(config.url);
  if (pageContent == null) return;
  const data = await scrapeData(pageContent);
  if (data == null) return;
  decimalAlert(data);
  priceAlert(data);

  console.log(data);
}
