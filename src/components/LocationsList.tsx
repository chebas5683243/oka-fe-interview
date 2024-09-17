import { cn } from "../lib/utils/cn";
import { Ubigeo } from "../types/ubigeo";
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
  return (
    <div className="flex flex-col gap-1">
      <h3>{title}:</h3>
      <div
        className={cn(
          "flex items-start p-5 h-96 overflow-scroll bg-white rounded-xl",
          !locations && "bg-transparent"
        )}
      >
        {!locations && (
          <div className="self-center flex justify-center items-center w-full">
            {!loading && placeholder}
            {loading && `Loading ${title.toLowerCase()}...`}
          </div>
        )}
        <RadioGroup value={value} onValueChange={onChange}>
          {locations?.map((reg) => (
            <div key={reg.id_ubigeo} className="flex items-center space-x-2">
              <RadioGroupItem value={reg.id_ubigeo} id={reg.id_ubigeo} />
              <Label htmlFor={reg.id_ubigeo}>{reg.nombre_ubigeo}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
