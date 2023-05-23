import { ReactElement } from "react";
import { Box } from "@mui/material";
import BottomMenu from "../menu/bottom-menu";
import { useRouter } from "next/router";
import { get_page_config } from "./pages-config";

export default function PageComponent({ children }: ComponentProps) {
  const router = useRouter();
  const page_config = get_page_config(router.route);
  return (
    <Box
      sx={{
        backgroundColor: "#3D3D3D",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#3D3D3D",
          width: "100%",
          height: "100vh",
          position: "absolute",
          zIndex: -1,
        }}
      ></Box>
      <Box
        sx={{
          width: page_config.applyMargin ? "calc(100% - 20px)" : "100%",
          height: "fit-content",
          position: "relative",
        }}
      >
        {children}
      </Box>
      <Box sx={{ height: "70px", width: "100%", position: "relative" }}></Box>
      {page_config.showBottomMenu && <BottomMenu />}
    </Box>
  );
}

type ComponentProps = {
  children: ReactElement;
};
