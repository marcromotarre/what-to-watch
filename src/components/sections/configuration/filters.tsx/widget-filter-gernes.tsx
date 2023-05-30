import { Option } from "@/components/common/option";
import { Box } from "@mui/material";

const WidgetFilterGenres = ({ options, widget_id, widgets, set_widgets }: any) => {
    return (
        <Box>
            {options.map((option: any, index: number) => (
                <Box key={index}>
                    <Option
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
                    </Box>))}
        </Box>)
}

export default WidgetFilterGenres;