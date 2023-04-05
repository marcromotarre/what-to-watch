import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Inter } from "@next/font/google";
import Image from "next/image";
import GOOD_POPCORN_CHIP_ICON from "../../images/ranking-platforms/rotten-tomatoes/goog-popcorn-chip-icon.png";
import BAD_POPCORN_CHIP_ICON from "../../images/ranking-platforms/rotten-tomatoes/bad-popcorn-chip-icon.png";
import CERTIFIED_FRESH_CHIP_ICON from "../../images/ranking-platforms/rotten-tomatoes/certified-fresh-chip-icon.png";
import TOMATO_CHIP_ICON from "../../images/ranking-platforms/rotten-tomatoes/tomato-chip-icon.png";
import SPLASHED_CHIP_ICON from "../../images/ranking-platforms/rotten-tomatoes/splashed-tomato-chip-icon.png";

const inter = Inter({
  weight: "900",
});
const RottenTomatoesBasicChip = ({
  allAudiencePercentatge,
  tomatometerTopCriticsPrositiveReviewPercentatge,
}) => {

  const getBottomPosition = () => {
    if (tomatometerTopCriticsPrositiveReviewPercentatge < 40) {
      return "-10px";
    } else if (tomatometerTopCriticsPrositiveReviewPercentatge < 60) {
      return "-5px";
    }
    return "-10px";
  };

  const getIcon = () => {
    console.log(tomatometerTopCriticsPrositiveReviewPercentatge)
    if (tomatometerTopCriticsPrositiveReviewPercentatge < 40) {
      return SPLASHED_CHIP_ICON;
    } else if (tomatometerTopCriticsPrositiveReviewPercentatge < 60) {
      return TOMATO_CHIP_ICON;
    } else {
      return CERTIFIED_FRESH_CHIP_ICON;
    }
  };

  const getSize = () => {
    if (tomatometerTopCriticsPrositiveReviewPercentatge < 40) {
      return 30;
    } else if (tomatometerTopCriticsPrositiveReviewPercentatge < 60) {
      return 35;
    }
    return 40;
  };

  return (
    <>
       <Box
      sx={{
        width: getSize(),
        height: getSize(),
        position: "absolute",
        left: `calc(25% - ${getSize() / 2}px)`,
        bottom: getBottomPosition(),
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        component="img"
        src={getIcon()}
        alt="ALL-AUDIENCE-POPCORN"
        layout="fill"
      />
    </Box>

      <Box
        sx={{
          width: "40px",
          height: "40px",
          position: "absolute",
          left: "calc(75% - 20px)",
          bottom: allAudiencePercentatge > 60 ? "-5px" : "-12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          component="img"
          src={
            allAudiencePercentatge > 60
              ? GOOD_POPCORN_CHIP_ICON
              : BAD_POPCORN_CHIP_ICON
          }
          alt="ALL-AUDIENCE-POPCORN"
          layout="fill"
        />
      </Box>
    </>
  );
};

export default RottenTomatoesBasicChip;
