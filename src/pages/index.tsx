import user_widgets from "../data/widgets.json";
import WidgetCarousel from "@/components/widgets/widget-carousel";
import { userWidgetsState } from "@/states/user-state";
import { Box } from "@mui/material";
import { useRecoilValue } from "recoil";

export default function Home() {
  const userWidgets = useRecoilValue(userWidgetsState)
  const widget_keys = Object.keys(userWidgets)
  return (
    <Box
      sx={{
        backgroundColor: "#3D3D3D",
        display: "grid",
        gridTemplateColumns: "100%",
        rowGap: 4,
        paddingTop: 7,
      }}
    >
      {widget_keys.map((widget_key: string) => (
        <WidgetCarousel key={widget_key} {...userWidgets[widget_key].data} />
      ))}
    </Box>
  );
}
