import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Input,
  Typography,
} from "@mui/material";
import ConfigSection from "../config-section";
import { inter_light, inter_medium } from "@/fonts/inter";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { FILTERS_BY_GENRE, get_filters } from "@/data/filters";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import { Check } from "@/components/common/check";
const WidgetFilterSection = ({
  name,
  options,
  widget_id,
  widgets,
  set_widgets,
}) => {
  const [expanded, setExpanded] = useState(false);
  const number_filters_selected = options.filter(
    ({ selected }) => selected
  ).length;
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
          <Typography className={inter_medium.className} variant="body1">
            {name}
          </Typography>
          <Box></Box>
          <Typography className={inter_light.className} variant="body2">
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
            {options.map((option) => (
              <Check
                onClick={() => {
                  option.click({
                    widget_id,
                    widgets,
                    set_widgets,
                    options,
                    option,
                  });
                }}
                isSelected={option.selected}
                text={option.name}
              />
            ))}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

const WidgetFiltersSection = ({ widget_id }) => {
  const [userWidgets, setUserWidgets] = useRecoilState(userWidgetsState);
  const [filters, setFilters] = useState(
    get_filters(userWidgets[widget_id].data.filters)
  );
  return (
    <ConfigSection title={"Hora de configurar los filtros"}>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto", rowGap: 2 }}>
        {filters.map(({ name, options }) => (
          <WidgetFilterSection
            key={name}
            name={name}
            options={options}
            widget_id={widget_id}
            widgets={userWidgets}
            set_widgets={setUserWidgets}
          />
        ))}
      </Box>
    </ConfigSection>
  );
};

export default WidgetFiltersSection;
