import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Inter } from "@next/font/google";
import Image from "next/image";
import PLATFORM_CHIP_ICON from "../../images/platforms/disney-plus/disney-plus-app-icon.png"

const inter = Inter({
  weight: "600",
  subsets: ['latin']
});
const PlatformBasicChip = ({ rating }) => {
  return (
    <Box
      sx={{
        width: "35px",
        height: "35px",
        position: "absolute",
        left: "calc(00% - 0px)",
        bottom: "0px",
        display: "flex",
        borderRadius: "25px",
        alignItems: "center",
        zIndex: 20,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      
        <Image
        style={{borderRadius: "0px 0px 0px 5px",
        boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    }}
          component="img"
          src={PLATFORM_CHIP_ICON}
          alt="PLATFORM"
          layout="fill"
        />
    </Box>
  );
};

export default PlatformBasicChip;
