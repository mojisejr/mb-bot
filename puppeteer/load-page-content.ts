import puppeteer from "puppeteer";
import { config } from "../config";

export async function loadPageContent(url: string) {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: config.waitUntil, timeout: 0 });

    const pageContent = await page.content();

    await browser.close();

    return pageContent;
  } catch (error: any) {
    console.log(error);
    // console.log("loadPaegContent: Error", error.message);
    return null;
  }
}
