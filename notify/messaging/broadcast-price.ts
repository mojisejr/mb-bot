import { lineClient } from ".";
import { PriceData } from "../../interfaces/price-data";

export async function broadcastPriceAlert(priceData: PriceData, up: boolean) {
  const upMsg = `🟢 Up [${priceData.currency1}/${priceData.currency2}] = ${priceData.percentage}% @ ${priceData.exchangeRate} Baht`;
  const downMsg = `🔴 Down [${priceData.currency1}/${priceData.currency2}] = ${priceData.percentage}% @ ${priceData.exchangeRate} Baht`;
  await lineClient.broadcast({
    messages: [
      {
        type: "text",
        text: up ? upMsg : downMsg,
      },
    ],
  });
}
