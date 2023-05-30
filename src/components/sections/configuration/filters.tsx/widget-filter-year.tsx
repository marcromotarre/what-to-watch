import { WidgetFilter, WidgetFilterYearData } from "@/interfaces/Widget";
import { userWidgetsState } from "@/states/user-state";
import { RESERVED_YEARS } from "@/utils/filter/filter-by-year";
import {
  get_widget_filter,
  set_widget_filter,
} from "@/utils/widget/configuration";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useRecoilState } from "recoil";

const WidgetFilterYear = ({ widget_id }: any) => {
  const [widgets, setWidgets] = useRecoilState(userWidgetsState);
  const filter: any = get_widget_filter({ widget_id, filter_type: "year" });

  const year_init = !isNaN(filter?.data?.year_init)
    ? filter.data.year_init
    : 2000;
  const year_end = !isNaN(filter?.data?.year_end) ? filter.data.year_end : 0;
  const get_all_years = () => {
    const year = new Date().getFullYear();
    return Array.from(new Array(150), (val, index) => year - index).map(
      (value) => ({ label: `${value}`, value })
    );
  };

  const OPTIONS_THIS_YEAR = { label: "Este año", value: RESERVED_YEARS.ACTUAL };
  const OPTIONS_LAST_YEAR = { label: "El año pasado", value:RESERVED_YEARS.LAST_YEAR };

  const options = [
    ...[OPTIONS_THIS_YEAR, OPTIONS_LAST_YEAR],
    ...get_all_years(),
  ];
  const is_year_end_valid = (year_init: number, year_end: number): boolean => {
    if (year_init > RESERVED_YEARS.LAST_YEAR) {
      if (year_end === 0 || year_end === RESERVED_YEARS.LAST_YEAR) return true;
      return year_end >= year_init;
    } else if (year_init === RESERVED_YEARS.ACTUAL) {
      if (year_end === 0) return true;
      return false;
    } else {
      if (year_end === RESERVED_YEARS.ACTUAL || year_end === RESERVED_YEARS.LAST_YEAR) return true;
      return false;
    }
  };

  const getOptionsAvailable = (): Array<any> => {
    return [
      ...[OPTIONS_THIS_YEAR, OPTIONS_LAST_YEAR],
      ...get_all_years(),
    ].filter(({ value }) => is_year_end_valid(year_init, value));
  };

  const onChangeValue = (type: string, value: number) => {
    let _year_init = year_init;
    let _year_end = year_end;
    if (type === "year_init") {
      _year_init = value;
      if (!is_year_end_valid(value, year_end)) {
        _year_end = value;
      }
    }
    if (type === "year_end") {
      _year_end = value;
    }
    const modified_widgets = set_widget_filter({
      widget_id,
      filter_type: "year",
      filter_data: {
        year_init: _year_init,
        year_end: _year_end,
      },
      update: true,
    });
    setWidgets(modified_widgets);
  };
  return (
    <Box
      sx={{ display: "grid", gridTemplateColumns: "auto auto", columnGap: 1 }}
    >
      <Box>
        <Typography sx={{ paddingBottom: "10px" }} variant="body2">
          Desde:
        </Typography>
        <Select
          sx={{ width: "100%", color: "white" }}
          value={year_init}
          onChange={(event) => onChangeValue("year_init", event.target.value)}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <Typography sx={{ paddingBottom: "10px" }} variant="body2">
          Hasta:{" "}
        </Typography>
        <Select
          sx={{ width: "100%", color: "white" }}
          value={year_end}
          onChange={(event) => onChangeValue("year_end", event.target.value)}
        >
          {getOptionsAvailable().map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default WidgetFilterYear;
