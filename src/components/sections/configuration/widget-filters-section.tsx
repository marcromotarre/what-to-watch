import {
  Box,
} from "@mui/material";
import ConfigSection from "../config-section";
import { get_filters } from "@/data/filters";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import { get_widget_by_id } from "@/utils/widget/configuration";
import WidgetFilterSection from "./widget-filter-section";


export const WidgetFiltersSectionComponent = ({ widget_id }: any) => {
  const [userWidgets, setUserWidgets] = useRecoilState(userWidgetsState);
  const widget = get_widget_by_id({widget_id})
  const [filters, setFilters] = useState(
    get_filters(widget.data.filters)
  );
  return (
    <ConfigSection title={"Hora de configurar los filtros"}>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto", rowGap: 2 }}>
        {filters.map(({ name, options, rendered_component }) => (
          <WidgetFilterSection
            key={name}
            name={name}
            rendered_component={rendered_component}
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

