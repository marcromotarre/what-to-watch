import WidgetCarousel from "@/components/widgets/widget-carousel";
import { userWidgetsState } from "@/states/user-state";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function HomePageComponent() {
  const [userWidgets, setUserWidgets] = useRecoilState(userWidgetsState);
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    setWidgets(userWidgets)
  }, [userWidgets]);

  const widget_keys = Object.keys(widgets);
  return (
    <Box
      sx={{
        backgroundColor: "#3D3D3D",
        display: "grid",
        gridTemplateColumns: "100%",
        rowGap: 4,
      }}
    >
      {widget_keys.map((widget_key: string) => (
        <WidgetCarousel key={widget_key} {...userWidgets[widget_key].data} />
      ))}
    </Box>
  );
}
