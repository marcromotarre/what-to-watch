import NETFLIX_APP_ICON from "../../src/images/platforms/netflix/netflix-app-icon.png";
import HBO_MAX_APP_ICON from "../../src/images/platforms/hbo-max/hbo-max-app-icon.png";
import AMAZON_PRIME_VIDEO_APP_ICON from "../../src/images/platforms/amazon-prime-video/amazon-prime-video-app-icon.png";
import APPLE_TV_APP_ICON from "../../src/images/platforms/apple-tv/apple-tv-app-icon.png";
import DISNEY_PLUS_APP_ICON from "../../src/images/platforms/disney-plus/disney-plus-app-icon.png";
import FILMIN_APP_ICON from "../../src/images/platforms/filmin/filmin-app-icon.png";

const PLATFORMS = [
  { name: "NETFLIX", appIcon: NETFLIX_APP_ICON, selected: true },
  { name: "HBO", appIcon: HBO_MAX_APP_ICON, selected: false },
  {
    name: "AMAZON_PRIME_VIDEO",
    appIcon: AMAZON_PRIME_VIDEO_APP_ICON,
    selected: false,
  },
  {
    name: "DISNEY",
    appIcon: DISNEY_PLUS_APP_ICON,
    selected: false,
  },
  { name: "APPLE", appIcon: APPLE_TV_APP_ICON, selected: false },
  { name: "FILMIN", appIcon: FILMIN_APP_ICON, selected: false },
];

export default PLATFORMS;
