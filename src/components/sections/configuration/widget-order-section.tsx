import { Box, Card, Typography } from "@mui/material";
import ConfigSection from "../config-section";

import { DragableList } from "@/components/draggable/DragableList";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { inter_medium } from "@/fonts/inter";
import { userWidgetsState } from "@/states/user-state";
import { useRecoilState } from "recoil";

export interface Item {
  id: number;
  text: string;
}

const OrderElementComponent = ({
  text = "",
  isDragging = false,
  dragDropRef = () => {},
}) => {
  const extraStylesOnDragging = isDragging
    ? { boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)" }
    : { boxShadow: "0" };

  return (
    <Card
    ref={dragDropRef}
      sx={{
        display: "grid",
        gridTemplateColumns: "20px auto",
        width: "100%",
        columnGap: 1,
        backgroundColor: "#3D3D3D",
        padding: 1,
        borderRadius: "5px",
        ...extraStylesOnDragging,
      }}
    >
      <Box >
        <DragIndicatorIcon sx={{ color: "white" }} />
      </Box>

      <Typography className={inter_medium.className}>{text}</Typography>
    </Card>
  );
};

const WidgetNameSection = ({ widget_id }: ComponentProps) => {
  // get actual order
  const [userWidgets, setUserWidgets] = useRecoilState(userWidgetsState);
  const order = userWidgets[widget_id]?.data?.order
    ? userWidgets[widget_id].data.order
    : ORDER;

  const saveOrder = (order) => {
    console.log("saveOrder", order)
  }

  return (
    <ConfigSection title={"¿Como quieres ordenar las peliculas?"}>
      <DragableList onChange={saveOrder} elements={order.map((text, index) => ({id: index+1, name: text}))}>
        <OrderElementComponent />
      </DragableList>
    </ConfigSection>
  );
};

type ComponentProps = {
  widget_id: string;
};

export default WidgetNameSection;
