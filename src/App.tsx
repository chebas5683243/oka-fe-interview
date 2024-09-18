import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { type Ubigeo } from "./types/ubigeo";
import { getRegions } from "./lib/api/getRegions";
import { getProvinces } from "./lib/api/getProvinces";
import { getDistricts } from "./lib/api/getDistricts";
import { LocationsList } from "./components/LocationsList";

function App() {
  const [regions, setRegions] = useState<Ubigeo[]>();
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState<string>("");

  const [provinces, setProvinces] = useState<Ubigeo[]>();
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");

  const [districts, setDistricts] = useState<Ubigeo[]>();
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("");

  const [address, setAddress] = useState<string>();

  useEffect(() => {
    async function fetchRegions() {
      setLoadingRegions(true);
      const response = await getRegions();
      setRegions(response);
      setLoadingRegions(false);
    }

    if (!regions) fetchRegions();
  }, [regions]);

  async function fetchProvinces(regionId: string) {
    setLoadingProvinces(true);
    const response = await getProvinces(regionId);
    setProvinces(response);
    setLoadingProvinces(false);
  }

  async function fetchDistricts(provinceId: string) {
    setLoadingDistricts(true);
    setDistricts(undefined);
    const response = await getDistricts(provinceId);
    setDistricts(response);
    setLoadingDistricts(false);
  }

  function onSelectRegion(regionId: string) {
    setSelectedRegionId(regionId);
    setSelectedProvinceId("");
    setSelectedDistrictId("");

    setAddress(undefined);

    setProvinces(undefined);
    setDistricts(undefined);

    fetchProvinces(regionId);
  }

  function onSelectProvince(provinceId: string) {
    setSelectedProvinceId(provinceId);
    setSelectedDistrictId("");

    setAddress(undefined);

    setDistricts(undefined);

    fetchDistricts(provinceId);
  }

  function onSelectDistrict(districtId: string) {
    setSelectedDistrictId(districtId);

    setAddress(undefined);
  }

  function submitAddress() {
    const selectedRegion = regions?.find(
      (reg) => reg.id_ubigeo === selectedRegionId
    );
    const selectedProvince = provinces?.find(
      (prov) => prov.id_ubigeo === selectedProvinceId
    );
    const selectedDistrict = districts?.find(
      (dist) => dist.id_ubigeo === selectedDistrictId
    );
    setAddress(
      `${selectedDistrict?.nombre_ubigeo}, ${selectedProvince?.nombre_ubigeo}, ${selectedRegion?.nombre_ubigeo}`
    );
  }

  function resetAddress() {
    setSelectedDistrictId("");
    setSelectedProvinceId("");
    setSelectedRegionId("");

    setProvinces(undefined);
    setDistricts(undefined);

    setAddress(undefined);
  }

  return (
    <main className="flex flex-col gap-8 max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center">Where are you from?</h1>
      <section className="flex flex-col gap-4 w-full">
        <h2>Select your region, province and district:</h2>

        <div className="grid grid-cols-3 gap-10 border-2 rounded-xl p-5 bg-gray-100">
          <LocationsList
            title="Regions"
            locations={regions}
            value={selectedRegionId}
            onChange={onSelectRegion}
            loading={loadingRegions}
          />
          <LocationsList
            title="Provinces"
            locations={provinces}
            value={selectedProvinceId}
            onChange={onSelectProvince}
            placeholder="Select a region first"
            loading={loadingProvinces}
          />
          <LocationsList
            title="Districts"
            locations={districts}
            value={selectedDistrictId}
            onChange={onSelectDistrict}
            placeholder="Select a province first"
            loading={loadingDistricts}
          />
        </div>
      </section>
      <div className="flex gap-4 self-center">
        <Button disabled={!selectedDistrictId} onClick={submitAddress}>
          Submit
        </Button>
        <Button
          disabled={!selectedRegionId}
          className="w-fit self-center bg-white text-primary border border-primary hover:bg-primary/10"
          onClick={resetAddress}
        >
          Reset
        </Button>
      </div>
      {!!address && <p className="text-center">Given address: {address}</p>}
    </main>
  );
}

export default App;
