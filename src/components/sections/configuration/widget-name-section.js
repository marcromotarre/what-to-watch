import { Box, Input } from "@mui/material";
import ConfigSection from "../config-section";
import { inter_medium } from "@/fonts/inter";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";

const WidgetNameSection = ({ widget_id }) => {
  const [userWidgets, setUserWidgets] = useRecoilState(userWidgetsState);
  const name = userWidgets[widget_id]?.data?.name;

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
