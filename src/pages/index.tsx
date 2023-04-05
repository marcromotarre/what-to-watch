import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import user_widgets from "../data/widgets.json";
import WidgetCarousel from "@/components/widgets/widget-carousel";
import { Box } from "@mui/material";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        display: "grid",
        gridTemplateColumns: "100%",
        rowGap: 4,
      }}
    >
      {user_widgets.map(({ data }, index) => (
        <WidgetCarousel key={index} {...data} />
      ))}
    </Box>
  );
}
