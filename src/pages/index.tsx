import user_widgets from "../data/widgets.json";
import WidgetCarousel from "@/components/widgets/widget-carousel";
import { Box } from "@mui/material";

export default function Home() {

  return (
    <Box
      sx={{
        backgroundColor: "#3D3D3D",
        display: "grid",
        gridTemplateColumns: "100%",
        rowGap: 4,
        paddingTop: 7
      }}
    >
      {user_widgets.map(({ data }, index) => (
        <WidgetCarousel key={index} {...data} />
      ))}
    </Box>
  );
}
