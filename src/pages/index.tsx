import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import user_widgets from "../data/widgets.json";
import WidgetCarousel from "@/components/widgets/widget-carousel";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return user_widgets.map(({ data }, index) => (
    <WidgetCarousel key={index} {...data} />
  ));
}
