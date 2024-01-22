import { lineClient } from ".";
import { PriceData } from "../../interfaces/price-data";
import { config } from "../../config";

export async function broadcastPriceAlert(
  priceData: PriceData,
  up: boolean,
  oldPrice: number
) {
  const upMsg = `🟢 +${config.hiAlert}% [${priceData.currency1}/${priceData.currency2}] from ${oldPrice} to ${priceData.exchangeRate} Baht`;
  const downMsg = `🔴 -${config.lowAlert}% [${priceData.currency1}/${priceData.currency2}] from ${oldPrice} to ${priceData.exchangeRate} Baht`;
  await lineClient.broadcast({
    messages: [
      {
        type: "text",
        text: up ? upMsg : downMsg,
      },
    ],
  });
}
