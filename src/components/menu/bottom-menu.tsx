import { Box } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
export default function BottomMenu() {
  return (
    <Box
      sx={{
        height: "60px",
        bottom: "0",
        width: "100%",
        position: "fixed",
        backgroundColor: "#3D3D3D",
        boxShadow:
          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;",
        borderTop: "1px solid black",
        paddingTop: "5px",
        display: "flex",
        justifyContent: "space-around"
      }}
    >
      <HomeRoundedIcon
        sx={{ height: "30px", width: "auto", color: "#DADADA" }}
      />
     
      <HomeRoundedIcon
        sx={{ height: "30px", width: "auto", color: "#DADADA" }}
      />
      <HomeRoundedIcon
        sx={{ height: "30px", width: "auto", color: "#DADADA" }}
      />
      <HomeRoundedIcon
        sx={{ height: "30px", width: "auto", color: "#DADADA" }}
      />
    </Box>
  );
}
