import type { Ubigeo } from "../../types/ubigeo";
import { sleep } from "../utils/sleep";
import regionsData from "../data/regions.json";

export async function getRegions(): Promise<Ubigeo[]> {
  await sleep();
  return regionsData;
}
