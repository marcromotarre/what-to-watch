import { Box, Input } from "@mui/material";
import ConfigSection from "../config-section";
import get_chips_by_tag from "@/utils/chip/get-chips-by-tag";
import { Widget } from "@/interfaces/Widget";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import { get_widget_index, set_widget_chip } from "@/utils/widget/configuration";
import POSTERS from "@/data/posters";
import { MOVIE_EXAMPLE } from "@/data/movie-example";
import get_chip_by_name from "@/utils/chip/get-chip-by-name";
const POSTER_WIDTH = 150;

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
      <Box
        sx={{
          backgroundColor: "#3D3D3D",
          display: "grid",
          gridTemplateColumns: "100%",
          rowGap: 4,
        }}
      >
        <Box sx={{ backgroundColor: "#3D3D3D" }}>
          <Box
            sx={{
              display: "grid",
              gridGap: "16px",
              padding: "16px",
              gridTemplateColumns: `repeat(auto-fill,minmax(${POSTER_WIDTH}px,1fr))`,
              gridAutoFlow: "column",
              gridAutoColumns: ` minmax(${POSTER_WIDTH}px,1fr)`,
              overflowX: "auto",
              maxWidth: "100vw"
            }}
          >


            {
              get_chips_by_tag(user_rating_platform).map((chip, index) => {
                const chip_data = get_chip_by_name(chip.name);
                return (
                  <Box onClick={() => updateChip(chip.name)}>
                    {chip_data &&
                      chip_data.component({
                        styles: { width: "auto", height: "auto" },
                        poster: POSTERS.find((poster) => poster.name === user_poster_type),
                        image: MOVIE_EXAMPLE.image,
                        name: MOVIE_EXAMPLE.name,
                        rating: MOVIE_EXAMPLE.platforms.filmaffinityMovie.rating,
                        votes: MOVIE_EXAMPLE.platforms.filmaffinityMovie.votes,
                      })}
                  </Box>
                )
              }
              )}
          </Box>
        </Box>
      </Box>
    </ConfigSection>
  );
};

export default WidgetChipSection;

type ComponentProps = {
  widget_id: string;
};
