import { Box } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useRouter } from "next/router";
export default function BottomMenu() {
  const router = useRouter();

  const go_to_home = () => {
    if (router.route !== "/") {
      router.push(`/`);
    }
  };
  
  const go_to_configuration = () => {
    if (router.route !== "/configuracion") {
      router.push(`/configuracion`);
    }
  };

  return (
    <Box
      sx={{
        height: "40px",
        bottom: "0",
        width: "100%",
        position: "fixed",
        backgroundColor: "#3D3D3D",
        boxShadow:
          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;",
        borderTop: "1px solid black",
        paddingTop: "5px",
        display: "flex",
        justifyContent: "space-around",
        zIndex: 1000,
        marginBottom: 4,
      }}
    >
      <HomeRoundedIcon
        onClick={() => go_to_home()}
        sx={{ height: "30px", width: "auto", color: "#DADADA" }}
      />

      <HomeRoundedIcon
        onClick={() => go_to_configuration()}
        sx={{ height: "30px", width: "auto", color: "#DADADA" }}
      />
    </Box>
  );
}
