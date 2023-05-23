import WidgetCarousel from "@/components/widgets/widget-carousel";
import { Widget } from "@/interfaces/Widget";
import { userWidgetsState } from "@/states/user-state";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function HomePageComponent() {
  const userWidgets = useRecoilValue(userWidgetsState);
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    setWidgets(userWidgets);
  }, [userWidgets]);
  return (
    <Box
      sx={{
        backgroundColor: "#3D3D3D",
        display: "grid",
        gridTemplateColumns: "100%",
        rowGap: 4,
      }}
    >
      {widgets.map((widget: Widget) => (
        <WidgetCarousel key={widget.id} {...widget.data} />
      ))}
    </Box>
  );
}
