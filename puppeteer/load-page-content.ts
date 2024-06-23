import puppeteer, { Browser } from "puppeteer";
import { config } from "../config";

export async function loadPageContent(url: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      //new
      "--disable-dev-shm-usage",
      "--single-process",
      "--no-zygote",
    ],
    timeout: 0,
  });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: config.waitUntil, timeout: 0 });

  const pageContent = await page.content();

  // await browser.close();
  // await page.close();

  return pageContent;
}
