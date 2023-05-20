import { Box, Card, Typography } from "@mui/material";
import ConfigSection from "../config-section";

import { DragableList } from "@/components/draggable/DragableList";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { inter_medium, inter_regular } from "@/fonts/inter";
import { userWidgetsState } from "@/states/user-state";
import { useRecoilState } from "recoil";
import { ORDER } from "@/data/order";
import { set_widget_order } from "@/utils/widget/configuration";

const OrderElementComponent = ({
  text = "",
  isDragging = false,
  dragDropRef = () => {},
}) => {
  const extraStylesOnDragging = isDragging
    ? { boxShadow: "0px 0px 42px -3px rgba(0,0,0,0.77);" }
    : { boxShadow: "0" };

  return (
    <Card
      sx={{
        display: "grid",
        gridTemplateColumns: "20px auto",
        width: "100%",
        columnGap: 1,
        backgroundColor: "#3D3D3D",
        padding: 1,
        borderRadius: "5px",
        alignItems: "center",
        ...extraStylesOnDragging,
      }}
    >
      <DragIndicatorIcon ref={dragDropRef} sx={{ color: "white" }} />

      <Typography variant="body2" className={inter_medium.className}>
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </Typography>
    </Card>
  );
};

const WidgetNameSection = ({ widget_id }: ComponentProps) => {
  // get actual order
  const [userWidgets, setUserWidgets] = useRecoilState(userWidgetsState);
  const order = userWidgets[widget_id]?.data?.order
    ? userWidgets[widget_id].data.order.map(
        (order_value) =>
          ORDER.find(({ identity }) => identity === order_value).name
      )
    : ORDER.map(({ name }) => name);

  const saveOrder = (order) => {
    const current_order = userWidgets[widget_id].data.order;
    const transformed_order = order.map(
      ({ name: order_name }) =>
        ORDER.find(({ name }) => name === order_name)?.identity
    );
    if (JSON.stringify(transformed_order) !== JSON.stringify(current_order)) {
      set_widget_order({
        widgets: userWidgets,
        widget_id,
        order: transformed_order,
      });
    }
  };

  return (
    <ConfigSection title={"¿Como quieres ordenar las peliculas?"}>
      <DragableList
        onChange={saveOrder}
        elements={order.map((text, index) => ({ id: index + 1, name: text }))}
      >
        <OrderElementComponent />
      </DragableList>
    </ConfigSection>
  );
};

type ComponentProps = {
  widget_id: string;
};

export default WidgetNameSection;
