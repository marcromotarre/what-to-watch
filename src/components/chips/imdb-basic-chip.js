import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import IMDB_CHIP_ICON from "../../images/ranking-platforms/imdb/imdb-chip-icon.png";
import { inter_bold } from "@/fonts/inter";



const ImdbBasicChip = ({ rating }) => {
   
  return (
    <Box
      sx={{
        width: "94px",
        height: "30px",
        position: "absolute",
        left: "calc(50% - 47px)",
        bottom: "-5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "60px",
          height: "30px",
          backgroundColor: "#F6C700",
          height: "100%",
          borderRadius: "5px",
          zIndex: "1",
          position: "relative",
        }}
      >
        <Image
          component="img"
          src={IMDB_CHIP_ICON}
          alt="IMDB RANK"
          layout="fill"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#000",
          height: "100%",
          width: "100%",
          borderRadius: "5px",
          position: "absolute",
          right: "0px",
        }}
      ></Box>
      <Typography
        className={inter_bold.className}
        sx={{
          color: "#F6C700",
          height: "fit-content",
          width: "fit-content",
          right: "4px",
          position: "absolute",
        }}
      >
        {rating}
      </Typography>
    </Box>
  );
};

export default ImdbBasicChip;
