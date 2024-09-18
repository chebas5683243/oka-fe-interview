import { type ChangeEvent, useMemo, useState } from "react";
import { cn } from "../lib/utils/cn";
import { type Ubigeo } from "../types/ubigeo";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface LocationsListProps {
  title: string;
  locations: Ubigeo[] | undefined;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading: boolean;
}

export function LocationsList({
  title,
  locations,
  value,
  onChange,
  placeholder,
  loading,
}: LocationsListProps) {
  const [querySearch, setQuerySearch] = useState<string>("");

  const locationsToRender = useMemo(() => {
    if (!querySearch || !locations) return locations;
    return locations.filter((loc) =>
      loc.nombre_ubigeo.toLowerCase().includes(querySearch.toLowerCase())
    );
  }, [locations, querySearch]);

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setQuerySearch(value);
  }

  function onRadioSelect(value: string) {
    setQuerySearch("");
    onChange(value);
  }

  return (
    <div className="flex flex-col gap-1">
      <h3>{title}:</h3>
      <div
        className={cn(
          "flex flex-col p-5 h-96 bg-white rounded-xl",
          !locations && "bg-transparent"
        )}
      >
        {!locationsToRender && (
          <div className="flex justify-center items-center size-full">
            {!loading && placeholder}
            {loading && `Loading ${title.toLowerCase()}...`}
          </div>
        )}
        {locationsToRender && (
          <div className="flex flex-col gap-4 flex-1">
            <Input
              placeholder="Search..."
              value={querySearch}
              onChange={onInputChange}
            />
            {!locationsToRender.length && (
              <p className="text-center">No {title.toLowerCase()} match</p>
            )}
            {!!locationsToRender.length && (
              <RadioGroup
                className="flex flex-col h-72 overflow-scroll px-2"
                value={value}
                onValueChange={onRadioSelect}
              >
                {locationsToRender.map((reg) => (
                  <div
                    key={reg.id_ubigeo}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={reg.id_ubigeo} id={reg.id_ubigeo} />
                    <Label htmlFor={reg.id_ubigeo}>{reg.nombre_ubigeo}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
