import type { Ubigeo } from "../../types/ubigeo";
import { sleep } from "../utils/sleep";
import provincesData from "../data/provinces.json";

export async function getProvinces(regionId: string): Promise<Ubigeo[]> {
  await sleep();
  return (provincesData as Record<string, Ubigeo[]>)[regionId];
}
