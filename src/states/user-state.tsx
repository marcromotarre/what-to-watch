import { atom } from "recoil";
import WIDGETS from "../data/widgets.json";

let userWidgets: string | null = "{}";
if (typeof window !== "undefined") {
  userWidgets = localStorage.getItem("userWidgets");
  if (!userWidgets) {
    localStorage.setItem("userWidgets", JSON.stringify(WIDGETS));
    userWidgets = JSON.stringify(WIDGETS);
  }
} else {
  console.log("window is not defined");
}

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

console.log("recoil", JSON.parse(userWidgets));
export const userWidgetsState = atom({
  key: "userWidgets",
  default: JSON.parse(userWidgets),
});
