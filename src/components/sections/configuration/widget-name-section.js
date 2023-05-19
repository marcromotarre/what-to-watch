import { Box, Input } from "@mui/material";
import ConfigSection from "../config-section";

const WidgetNameSection = ({ widget_id }) => {
  return (
    <ConfigSection title={"Nombre del Widget"}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          columnGap: "8px",
        }}
      >
        <Input></Input>
        <Box
          sx={{ width: "40px", height: "40px", backgroundColor: "red" }}
        ></Box>
      </Box>
    </ConfigSection>
  );
};

export default WidgetNameSection;
