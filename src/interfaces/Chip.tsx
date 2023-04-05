import { ReactJSXElementClass } from "@emotion/react/types/jsx-namespace";

export default interface Chip {
  name: string;
  component: Function;
  tags: Array<string>;
}
