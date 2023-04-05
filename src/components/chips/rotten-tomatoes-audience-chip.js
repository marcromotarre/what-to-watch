import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Inter } from "@next/font/google";
import Image from "next/image";
import GOOD_POPCORN_CHIP_ICON from "../../images/ranking-platforms/rotten-tomatoes/goog-popcorn-chip-icon.png";
import BAD_POPCORN_CHIP_ICON from "../../images/ranking-platforms/rotten-tomatoes/bad-popcorn-chip-icon.png";

const inter = Inter({
  weight: "900",
});
const RottenTomatoesAudienceChip = ({
  allAudiencePercentatge,
  tomatometerTopCriticsPrositiveReviewPercentatge,
}) => {
  return (
    <Box
      sx={{
        width: "60px",
        height: "60px",
        position: "absolute",
        left: "calc(50% - 30px)",
        bottom: allAudiencePercentatge > 60 ? "-10px" : "-20px",
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
  );
};

export default RottenTomatoesAudienceChip;
