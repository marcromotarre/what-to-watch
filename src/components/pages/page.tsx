import { ReactElement, useEffect } from "react";
import { Box } from "@mui/material";
import BottomMenu from "../menu/bottom-menu";
import { useRouter } from "next/router";
import { get_page_config } from "./pages-config";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
export default function PageComponent({ children }: ComponentProps) {
  const router = useRouter();
  const page_config = get_page_config(router.route);

  useEffect(() => {
    if(!window.matchMedia("standalone").matches) {
      router.push("/install");

    }
  }, []);

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
      {page_config.paddingTop && (
        <>
          <Box
            sx={{
              width: "100%",
              height: "50px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              position: "fixed",
              zIndex: "100",
              top: 0,
              backgroundColor: "#3D3D3D",
            }}
          >
            {page_config.back && (
              <ArrowBackIosRoundedIcon
                onClick={() => {
                  const page_back: string = page_config.back
                    ? page_config.back
                    : "";
                  router.push(page_back);
                }}
                sx={{ marginLeft: 1, color: "white" }}
              />
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "50px",
              backgroundColor: "#3D3D3D",
            }}
          />
        </>
      )}
      <Box
        sx={{
          backgroundColor: "#3D3D3D",
          width: "100%",
          height: "100vh",
          position: "absolute",
          zIndex: -1,
        }}
      ></Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: page_config.sidePadding ? "calc(100% - 30px)" : "100%",
            height: "fit-content",
            position: "relative",
          }}
        >
          {children}
        </Box>
      </Box>
      <Box sx={{ height: "70px", width: "100%", position: "relative" }}></Box>
      {page_config.showBottomMenu && <BottomMenu />}
    </Box>
  );
}

type ComponentProps = {
  children: ReactElement;
};
