import { Box, Input } from "@mui/material";
import ConfigSection from "../config-section";
import { inter_medium } from "@/fonts/inter";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import { set_widget_name } from "@/utils/widget/configuration";

const WidgetNameSection = ({ widget_id }) => {
  const [userWidgets, setUserWidgets] = useRecoilState(userWidgetsState);
  const name = userWidgets[widget_id]?.data?.name;

  const updateName = (value) => {
    const modified_widgets = set_widget_name({
      widgets: userWidgets,
      widget_id,
      widget_name: value,
    });
    setUserWidgets(modified_widgets);
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
          className={inter_medium.className}
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
