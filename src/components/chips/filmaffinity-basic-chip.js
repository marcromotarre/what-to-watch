import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Inter } from "@next/font/google";
import Image from "next/image";
import FILMAFFINITY_CHIP_ICON from "../../images/ranking-platforms/filmaffinity/filmaffinity-chip-icon.png"

const inter = Inter({
  weight: "600",
  subsets: ['latin']
});
const FilmaffinityBasicChip = ({ rating }) => {
  return (
    <Box
      sx={{
        width: "70px",
        height: "35px",
        position: "absolute",
        left: "calc(50% - 35px)",
        bottom: "-5px",
        display: "flex",
        alignItems: "center",
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          width: "35px",
          height: "35px",
          backgroundColor: "#4682B4",
          height: "100%",
          borderRadius: "5px",
          zIndex: "1",
          position: "relative",
        }}
      >
        <Image
          component="img"
          src={FILMAFFINITY_CHIP_ICON}
          alt="FILMAFFINITY RANK"
          layout="fill"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#4682B4",
          height: "100%",
          width: "100%",
          borderRadius: "5px",
          position: "absolute",
          right: "0px",
        }}
      ></Box>
      <Typography
        className={inter.className}
        sx={{
          color: "#FFF",
          height: "fit-content",
          width: "fit-content",
          right: "4px",
          fontSize: "1.2rem",
          zIndex: 2,
          position: "absolute",
        }}
      >
        {rating}
      </Typography>
    </Box>
  );
};

export default FilmaffinityBasicChip;
