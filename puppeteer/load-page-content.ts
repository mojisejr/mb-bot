import puppeteer from "puppeteer";
import { config } from "../config";

export async function loadPageContent(url: string) {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: config.waitUntil });

    const pageContent = await page.content();

    await browser.close();

    return pageContent;
  } catch (error: any) {
    console.log("loadPaegContent: Error", error.message);
    return null;
  }
}
