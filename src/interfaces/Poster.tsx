import { ReactJSXElementClass } from "@emotion/react/types/jsx-namespace";

export default interface Poster {
  name: string;
  component: Function;
  tags: Array<string>;
}
