import user_widgets from "../data/widgets.json";
import WidgetCarousel from "@/components/widgets/widget-carousel";
import { Box } from "@mui/material";

export default function Home() {
  const widget_keys = Object.keys(user_widgets);
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
        <WidgetCarousel key={widget_key} {...user_widgets[widget_key].data} />
      ))}
    </Box>
  );
}
