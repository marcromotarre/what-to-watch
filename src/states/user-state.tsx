import { atom } from "recoil";
import WIDGETS from "../data/widgets.json";

const PLATFORMS = [
    { id: "netflix", name: "Netflix", has: true },
    { id: "netflix-basic-with-ads", name: "Netflix Basic with ADS", has: false },
    { id: "disney", name: "Disney", has: true },
    { id: "filmin", name: "Filmin", has: true },
    { id: "filmin-plus", name: "Filmin +", has: true },
    { id: "movistar-plus", name: "Movistar +", has: true },
    { id: "skyshowtime", name: "Skyshowtime", has: true },
    { id: "apple-tv-plus", name: "Apple TV +", has: true },
    { id: "hbo-max", name: "hbo max", has: true },
    { id: "amazon-prime-video", name: "Amazon Prime Video", has: true },
    { id: "atres-player", name: "Atres Player", has: true },
]

let userWidgets: string | null = "{}";
let userPlatforms: string | null = "{}";
if (typeof window !== "undefined") {
  userWidgets = localStorage.getItem("userWidgets");
  if (!userWidgets) {
    localStorage.setItem("userWidgets", JSON.stringify(WIDGETS));
    userWidgets = JSON.stringify(WIDGETS);
  }

  userPlatforms = localStorage.getItem("userPlatforms");
  if (!userPlatforms) {
    localStorage.setItem("userPlatforms", JSON.stringify(PLATFORMS));
    userPlatforms = JSON.stringify(PLATFORMS);
  }
} else {
  console.log("window is not defined");
}

export const userPlatformsState = atom({
  key: "userPlatforms",
  default: JSON.parse(userPlatforms),
});


export const userWidgetsState = atom({
  key: "userWidgets",
  default: JSON.parse(userWidgets),
});
