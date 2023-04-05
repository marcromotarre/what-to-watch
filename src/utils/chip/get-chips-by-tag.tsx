import CHIPS from "@/components/chips/chips";
import Chip from "@/interfaces/Chip";

const get_chips_by_tag = (tag: string): Array<Chip> => {
  return CHIPS.filter((chip) => chip.tags.includes(tag));
};

export default get_chips_by_tag;
