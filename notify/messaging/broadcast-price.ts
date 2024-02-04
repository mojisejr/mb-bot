import { lineClient } from ".";
import { PriceData } from "../../interfaces/price-data";
import { config } from "../../config";

export async function broadcastPriceAlert(
  priceData: PriceData,
  up: boolean,
  oldPrice: number,
  nextLow: number,
  nextHi: number
) {
  const upMsg = `🟢 +${config.hiAlert}% [${priceData.currency1}/${priceData.currency2}] from ${oldPrice} to ${priceData.exchangeRate} THB on Maxbit`;
  const downMsg = `🔴 ${config.lowAlert}% [${priceData.currency1}/${priceData.currency2}] from ${oldPrice} to ${priceData.exchangeRate} THB on Maxbit`;

  await lineClient.broadcast({
    messages: [
      {
        type: "text",
        text: up ? upMsg : downMsg,
      },
    ],
  });
}
