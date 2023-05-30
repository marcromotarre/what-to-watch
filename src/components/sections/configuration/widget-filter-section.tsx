import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { inter_light, inter_medium } from "@/fonts/inter";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useState } from "react";
import { Option } from "@/components/common/option";

const WidgetFilterSection = ({
  name,
  options,
  widget_id,
  widgets,
  set_widgets,
  rendered_component,
  extra_data
}: any) => {
  const [expanded, setExpanded] = useState(false);
  const number_filters_selected = 0
  /*const number_filters_selected = options.filter(
    ({ selected }: any) => selected
  ).length;*/
  return (
    <Accordion
      sx={{ backgroundColor: "#3D3D3D" }}
      expanded={expanded}
      onChange={() => {
        setExpanded(!expanded);
      }}
    >
      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "30px auto",
            columnGap: "8px",
            rowGap: 1,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#E2E2E2",
              width: "25px",
              height: "25px",
              borderRadius: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LiveTvIcon
              sx={{ width: "15px", height: "auto", color: "#3D3D3D" }}
            ></LiveTvIcon>
          </Box>
          <Typography variant="body1">
            {name}
          </Typography>
          <Box></Box>
          <Typography variant="body2">
            {number_filters_selected === 0
              ? "No tienes filtros seleccionados"
              : `Tienes ${number_filters_selected} Filtros seleccionados`}
          </Typography>
        </Box>{" "}
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "30px auto",
            columnGap: "8px",
            rowGap: 1,
            alignItems: "center",
          }}
          title={"Hora de configurar los filtros"}
        >
          <Box></Box>
          <Box sx={{ display: "grid", rowGap: 1, paddingLeft: 1 }}>
            
                {rendered_component({ options, widget_id, widgets, set_widgets, extra_data })}
           
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default WidgetFilterSection;
