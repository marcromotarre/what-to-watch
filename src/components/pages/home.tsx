import WidgetCarousel from "@/components/widgets/widget-carousel";
import { Widget } from "@/interfaces/Widget";
import { userWidgetsState } from "@/states/user-state";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function HomePageComponent() {
  const userWidgets = useRecoilValue(userWidgetsState);
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    setWidgets(userWidgets);
    a()
  }, [userWidgets]);

  const a = async () => {
    const data = await axios.post("api/hello");
    console.log(data)
  }
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
