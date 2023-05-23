import { Box, Card, Typography } from "@mui/material";
import { useRouter } from "next/router";

import EditIcon from "@mui/icons-material/Edit";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
const DraggableWidgetCard = ({
  text = "",
  isDragging = false,
  dragDropRef = () => {},
  data = {},
}: any) => {
  const router = useRouter();

  const { widget_id } = data;
  const extraStylesOnDragging = isDragging
    ? { boxShadow: "0px 0px 42px -3px rgba(0,0,0,0.77);" }
    : { boxShadow: "0" };

  const editWidget = () => {
    router.push(`/widget/${widget_id}`);
  };

  return (
    <Card
      sx={{
        display: "grid",
        gridTemplateColumns: "20px auto 60px",
        width: "100%",
        columnGap: 1,
        backgroundColor: "#3D3D3D",
        padding: 1,
        borderRadius: "5px",
        alignItems: "center",
        height: "50px",
        ...extraStylesOnDragging,
      }}
    >
      <DragIndicatorIcon sx={{ color: "white" }} />

      <Typography ref={dragDropRef} variant="subtitle2">
        {text}
      </Typography>

      <Box sx={{ justifySelf: "flex-end" }}>
        <EditIcon
          onClick={() => editWidget()}
          sx={{ height: "20px", width: "auto", color: "white" }}
        />
      </Box>
    </Card>
  );
};

export default DraggableWidgetCard;
