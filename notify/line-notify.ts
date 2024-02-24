/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";
import qs from "qs";
import { PriceData } from "../interfaces/price-data";
import { config } from "../config";

export async function errorNotify(message: string) {
  try {
    const token = process.env.notify_key as string;
    const response = await axios.post(
      process.env.line_uri as string,
      qs.stringify({
        message: message,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: "application/x-www-form-urlencoded",
        },
      }
    );
    // console.log("notification response", response);
    return true;
  } catch (error) {
    console.log("notification error: ", error);
  }
}

export async function hiPriceNotify(priceData: PriceData, oldPrice: number) {
  try {
    const token = process.env.notify_key as string;
    const response = await axios.post(
      process.env.line_uri as string,
      qs.stringify({
        message: `🟢 +${config.hiAlert}% [${priceData.currency1}/${priceData.currency2}] from ${oldPrice} to ${priceData.exchangeRate} Baht`,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: "application/x-www-form-urlencoded",
        },
      }
    );
    // console.log("notification response", response);
    return true;
  } catch (error) {
    console.log("notification error: ", error);
  }
}

export async function lowPriceNotify(priceData: PriceData, oldPrice: number) {
  try {
    const token = process.env.notify_key as string;
    const response = await axios.post(
      process.env.line_uri as string,
      qs.stringify({
        message: `🔴 ${config.lowAlert}% [${priceData.currency1}/${priceData.currency2}] from ${oldPrice} to ${priceData.exchangeRate} Baht`,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: "application/x-www-form-urlencoded",
        },
      }
    );
    // console.log("notification response", response);
    return true;
  } catch (error) {
    console.log("notification error: ", error);
  }
}
