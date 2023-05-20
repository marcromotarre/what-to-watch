import { Box, Card, Typography } from "@mui/material";

import { userWidgetsState } from "../../states/user-state";
import { useRecoilValue } from "recoil";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { inter_medium } from "@/fonts/inter";
import { DragableList } from "@/components/draggable/DragableList";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

const DragableWidgetCard = ({
  text = "",
  isDragging = false,
  dragDropRef = () => {},
  data = {},
}) => {
  const router = useRouter();

  const { widget_id } = data;
  const extraStylesOnDragging = isDragging
    ? { boxShadow: "0px 0px 42px -3px rgba(0,0,0,0.77);" }
    : { boxShadow: "0" };

  const editWidget = () => {
    router.push(`/widget/${widget_id}`)
  };

  return (
    <Card
      ref={dragDropRef}
      sx={{
        display: "grid",
        gridTemplateColumns: "20px auto 20px",
        width: "100%",
        columnGap: 1,
        backgroundColor: "#3D3D3D",
        padding: 1,
        borderRadius: "5px",
        alignItems: "center",
        ...extraStylesOnDragging,
      }}
    >
      <DragIndicatorIcon sx={{ color: "white" }} />

      <Typography variant="body2" className={inter_medium.className}>
        {text}
      </Typography>

      <Box>
        <EditIcon
          onClick={() => editWidget()}
          sx={{ width: "80%", height: "auto", color: "white" }}
        />
      </Box>
    </Card>
  );
};

export default function WidgetConfiguration() {
  const userWidgets = useRecoilValue(userWidgetsState);
  const widget_keys = Object.keys(userWidgets);

  return (
    <Box sx={{ backgroundColor: "#3D3D3D" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto",
          rowGap: 3,
          width: "calc(100% - 60px)",
          marginLeft: "30px",
        }}
      >
        <DragableList
          onChange={() => {}}
          elements={widget_keys.map((widget_key, index) => ({
            id: index + 1,
            data: { widget_id: widget_key },
            name: userWidgets[widget_key].data.name,
          }))}
        >
          <DragableWidgetCard />
        </DragableList>
      </Box>
    </Box>
  );
}
