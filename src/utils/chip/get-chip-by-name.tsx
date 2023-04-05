import CHIPS from "@/components/chips/chips";
import Chip from "@/interfaces/Chip";

const get_chip_by_name = (name: string): Chip | undefined => {
  return CHIPS.find((chip) => chip.name === name);
};

export default get_chip_by_name;
