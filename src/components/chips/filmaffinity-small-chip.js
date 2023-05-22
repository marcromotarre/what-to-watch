import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import FILMAFFINITY_CHIP_ICON from "../../images/ranking-platforms/filmaffinity/filmaffinity-chip-icon.png";
import { inter_regular } from "@/fonts/inter";

const FilmaffinitySmallChip = ({ rating }) => {
  return (
    <Box
      sx={{
        width: "50px",
        height: "25px",
        position: "absolute",
        left: "calc(83% - 25px)",
        bottom: "0px",
        display: "flex",
        alignItems: "center",
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          width: "25px",
          height: "25px",
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
        className={inter_regular.className}
        sx={{
          color: "#FFF",
          height: "fit-content",
          width: "fit-content",
          right: "4px",
          fontSize: "0.8rem",
          zIndex: 2,
          position: "absolute",
        }}
      >
        {rating}
      </Typography>
    </Box>
  );
};

export default FilmaffinitySmallChip;
