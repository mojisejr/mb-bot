import * as cheerio from "cheerio";
import { parseContent } from "../helper/content-parser";
import { PriceData } from "../interfaces/price-data";

export async function scrapeData(
  pageContent: string
): Promise<PriceData | null> {
  try {
    const $ = cheerio.load(pageContent);

    const content = $(".price").text();

    console.log("content: ", content);

    const parsedContent = parseContent(content);

    return parsedContent;
  } catch (error: any) {
    console.log("scrapeData: Error ", error.message);
    return null;
  }
}
