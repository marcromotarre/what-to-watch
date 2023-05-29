import { Box, Input } from "@mui/material";
import ConfigSection from "../config-section";
import get_chips_by_tag from "@/utils/chip/get-chips-by-tag";
import { Widget } from "@/interfaces/Widget";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import { get_widget_index, set_widget_chip } from "@/utils/widget/configuration";
import POSTERS from "@/data/posters";
import { MOVIE_EXAMPLE } from "@/data/movie-example";

const WidgetChipSection = ({ widget_id }: ComponentProps) => {

  const [widgets, setWidgets] = useRecoilState(userWidgetsState);
  const widget: Widget = widgets[get_widget_index({ widgets, widget_id })];
  const user_chip_name = widget.data.movie_poster.chip_name;
  const user_poster_type = widget.data.movie_poster.poster_type;
  const user_rating_platform = widget.data.rating_platform;
  const updateChip = (widget_chip_name: string) => {
    const modified_widgets = set_widget_chip({
      widget_id,
      widget_chip_name,
    });
    setWidgets(modified_widgets);
  };

  return (
    <ConfigSection title={"Configura tu chip"}>
      {/*<Box
        sx={{
          display: "flex",
          width: "100%",
          height: "calc(40vw / 0.666 + 20px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "calc(40vw / 0.666 + 20px)",
            overflowX: "scroll",
          }}
        >
          {
            get_chips_by_tag(user_rating_platform).map((chip) => (
              <Box
                key={chip.key}
                sx={{ opacity: user_chip_name === chip.name ? 1 : 0.1 }}
                onClick={() => {
                  updateChip(chip.name)
                }}
              >
                {chip.component({
                  styles: { width: "40vw", height: "auto", marginLeft: "10px" },
                  poster: POSTERS.find((poster) => poster.name === user_poster_type),
                  image: MOVIE_EXAMPLE.image,
                  name: MOVIE_EXAMPLE.name,
                  rating: 8,
                  votes: 1300,
                })}
              </Box>
            ))}
        </Box>
              </Box>*/}
    </ConfigSection>
  );
};

export default WidgetChipSection;

type ComponentProps = {
  widget_id: string;
};
