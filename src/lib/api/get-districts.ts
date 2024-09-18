import type { Ubigeo } from "../../types/ubigeo";
import { sleep } from "../utils/sleep";
import districts from "../data/districts.json";

export async function getDistricts(provinceId: string): Promise<Ubigeo[]> {
  await sleep();
  return (districts as Record<string, Ubigeo[]>)[provinceId];
}
