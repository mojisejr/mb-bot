import puppeteer from "puppeteer";
import { config } from "../config";

export async function loadPageContent(url: string) {
  try {
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

    await browser.close();

    return pageContent;
  } catch (error: any) {
    console.log(error);
  }
}
