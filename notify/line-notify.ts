/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";
import qs from "qs";
import { PriceData } from "../interfaces/price-data";

export async function hiPriceNotify(priceData: PriceData) {
  try {
    console.log("key ", process.env.notify_key);
    const token = process.env.notify_key as string;
    const response = await axios.post(
      process.env.line_uri as string,
      qs.stringify({
        message: `🟢 Up [${priceData.currency1}/${priceData.currency2}] = ${priceData.percentage}%`,
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

export async function lowPriceNotify(priceData: PriceData) {
  try {
    const token = process.env.notify_key as string;
    const response = await axios.post(
      process.env.line_uri as string,
      qs.stringify({
        message: `🔴 Down [${priceData.currency1}/${priceData.currency2}] = ${priceData.percentage} %`,
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
