import { CronJob } from "cron";
import { run } from "./runner";
import { config } from "./config";
import * as dotenv from "dotenv";
dotenv.config();

// (async () => await run())();

const job = new CronJob(
  config.cronPattern,
  async () => await run(),
  null,
  true
);

console.log("Cron Start!");
job.start();
