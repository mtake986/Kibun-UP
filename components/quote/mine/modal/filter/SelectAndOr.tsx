
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AND_OR } from "@/data/CONSTANTS";
import { TypeAndOr, TypeAndOrLabel } from "@/types/type";

type Props = {
  andOr: TypeAndOr;
  handleAndOr: (value: TypeAndOrLabel) => void;
};
const SelectAndOr = ({ andOr, handleAndOr }: Props) => {
  return (
    <Select
      onValueChange={(value: TypeAndOrLabel) => {
        handleAndOr(value);
      }}
      value={andOr.label}
      defaultValue={andOr.label}
    >
      <SelectTrigger className="w-full text-xs xs:max-w-[200px]">
        <SelectValue placeholder="Select And/Or" />
      </SelectTrigger>
      <SelectContent>
        {AND_OR.map((ele) => (
          <SelectItem key={ele.label} value={ele.label}>
            {ele.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectAndOr;
