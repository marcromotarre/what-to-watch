import { Box, Checkbox, Input, Typography } from "@mui/material";
import ConfigSection from "../config-section";
import { inter_light, inter_medium } from "@/fonts/inter";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { FILTERS_BY_GENRE, get_filters } from "@/data/filters";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";
const WidgetFilterSection = ({
  name,
  options,
  widget_id,
  widgets,
  set_widgets,
}) => {
  const number_filters_selected = options.filter(
    ({ selected }) => selected
  ).length;
  return (
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
      <Box></Box>
      <Box sx={{ display: "grid", rowGap: 1, paddingLeft: 1 }}>
        {options.map((option) => (
          <Box
            onClick={() => {
              option.click({
                widget_id,
                widgets,
                set_widgets,
                options,
                option,
              });
            }}
            sx={{
              display: "grid",
              gridTemplateColumns: "20px auto",
              columnGap: "4px",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={option.selected}
              sx={{ color: "white" }}
            ></Checkbox>
            <Typography className={inter_light.className} variant="body2">
              {option.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
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
