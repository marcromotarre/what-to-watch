import { atom } from "recoil";
import WIDGETS from "../data/widgets.json";

export const userPlatformsState = atom({
  key: "userPlatforms",
  default: {
    NETFLIX: false,
    HBO: false,
    AMAZON_PRIME_VIDEO: false,
    DISNEY: false,
    APPLE: false,
    FILMIN: false,
  },
});


export const userWidgetsState = atom({
  key: "userWidgets",
  default: WIDGETS,
});
