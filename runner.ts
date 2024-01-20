import { loadPageContent } from "./puppeteer/load-page-content";
import { scrapeData } from "./scrapper/scrape-data";
import { config } from "./config";
import { priceAlert } from "./notify/alert";

export async function run() {
  console.log("running ..");
  const pageContent = await loadPageContent(config.url);
  if (pageContent == null) return;
  const data = await scrapeData(pageContent);
  if (data == null) return;
  priceAlert(data);

  console.log(data);
}
