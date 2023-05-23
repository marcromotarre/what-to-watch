import { ReactElement } from "react";
import { Box } from "@mui/material";
import BottomMenu from "../menu/bottom-menu";

export default function PageComponent({ children }: ComponentProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#3D3D3D",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        position: "relative",
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
      <Box sx={{ width: "calc(100% - 20px)", height: "fit-content" }}>
        {children}
      </Box>
      <BottomMenu />

    </Box>
  );
}

type ComponentProps = {
  children: ReactElement;
};
