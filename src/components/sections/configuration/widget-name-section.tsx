import { Box, Input } from "@mui/material";
import ConfigSection from "../config-section";
import { inter_medium } from "@/fonts/inter";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import {
  get_widget_index,
  set_widget_name,
} from "@/utils/widget/configuration";
import { Widget } from "@/interfaces/Widget";

const WidgetNameSection = ({ widget_id }: ComponentProps) => {
  const [widgets, setWidgets] = useRecoilState(userWidgetsState);
  const widget: Widget = widgets[get_widget_index({ widgets, widget_id })]; //userWidgets[widget_id]?.data?.name;
  const name = widget.data.name;
  const updateName = (value: string) => {
    const modified_widgets = set_widget_name({
      widget_id,
      widget_name: value,
    });
    setWidgets(modified_widgets);
  };
  return (
    <ConfigSection
      title={"Nombre del Widget"}
      subtitle={
        "El nombre que le pongas a tu widget es el que aparecerá en la pantalla principal"
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto",
          columnGap: "8px",
        }}
      >
        <Input
          id="input"
          onChange={(event) => updateName(event.target.value)}
          sx={{
            padding: 1,
            backgroundColor: "#232323",
            borderRadius: "5px",
            color: "white",
            width: "100%",
          }}
          value={name}
        ></Input>
      </Box>
    </ConfigSection>
  );
};

export default WidgetNameSection;

type ComponentProps = {
  widget_id: string;
};
