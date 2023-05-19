import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";
import { RecoilRoot } from "recoil";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <DndProvider backend={TouchBackend}>
          <Component {...pageProps} />
        </DndProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}
