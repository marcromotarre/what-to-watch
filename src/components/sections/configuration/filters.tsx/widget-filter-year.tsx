import { WidgetFilter, WidgetFilterYearData } from "@/interfaces/Widget";
import { userWidgetsState } from "@/states/user-state";
import { get_widget_filter, set_widget_filter } from "@/utils/widget/configuration";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useRecoilState } from "recoil";

const WidgetFilterYear = ({ widget_id }: any) => {
    const [widgets, setWidgets] = useRecoilState(userWidgetsState);
    const filter: any = get_widget_filter({ widget_id, filter_type: "year" })

    const year_init = filter?.data?.year_init ? filter.data.year_init : 1900
    const year_end = filter?.data?.year_end ? filter.data.year_end : 0

    const get_all_years = () => {
        const year = (new Date()).getFullYear();
        return Array.from(new Array(150), (val, index) => year - index).map(value => ({ label: `${value}`, value }));
    }

    const OPTIONS_THIS_YEAR = { label: "Este año", value: 0 }
    const OPTIONS_LAST_YEAR = { label: "El año pasado", value: -1 }

    const options = [
        ...[OPTIONS_THIS_YEAR, OPTIONS_LAST_YEAR], ...get_all_years()
    ]

    const is_year_end_valid = (year_init: number, year_end: number): boolean => {
        if (year_init > 0) {
            if (year_end === 0 || year_end === -1) return true
            return year_end >= year_init
        } else if (year_init === 0) {
            if (year_end === 0) return true
            return false
        }
        else {
            if (year_end === 0 || year_end === -1) return true
            return false
        }
    }


    const getOptionsAvailable = (): Array<any> => {
        return [...[OPTIONS_THIS_YEAR, OPTIONS_LAST_YEAR], ...get_all_years()].filter(({ value }) => is_year_end_valid(year_init, value))
    }

    const onChangeValue = (type: string, value: number) => {
        let _year_init = year_init
        let _year_end = year_end
        if (type === "year_init") {
            _year_init = value
            if (!is_year_end_valid(value, year_end)) {
                _year_end = value
            }
        }
        if (type === "year_end") {
            _year_end = value
        }
        const modified_widgets = set_widget_filter({
            widget_id,
            filter_type: "year",
            filter_data: {
                year_init: _year_init,
                year_end: _year_end
            },
            update: true
        });
        setWidgets(modified_widgets);
    }
    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "auto auto", columnGap: 1 }}>
            <Box>
                <Typography sx={{ paddingBottom: "10px" }} variant="body2">Desde:</Typography>
                <Select
                    sx={{ width: "100%", color: "white" }}
                    value={year_init}
                    onChange={(event) => onChangeValue("year_init", event.target.value)}
                >
                    {options.map((option, index) => (<MenuItem key={index} value={option.value}>{option.label}</MenuItem>))}
                </Select>
            </Box>
            <Box>
                <Typography sx={{ paddingBottom: "10px" }} variant="body2">Hasta: </Typography>
                <Select
                    sx={{ width: "100%", color: "white" }}
                    value={year_end}
                    onChange={(event) => onChangeValue("year_end", event.target.value)}
                >
                    {getOptionsAvailable().map((option, index) => (<MenuItem key={index} value={option.value}>{option.label}</MenuItem>))}
                </Select>
            </Box>
        </Box >)
}

export default WidgetFilterYear;