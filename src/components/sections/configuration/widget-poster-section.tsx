import { Box, Input } from "@mui/material";
import ConfigSection from "../config-section";
import { MOVIE_EXAMPLE } from "@/data/movie-example";
import POSTERS from "@/data/posters";
import { Widget } from "@/interfaces/Widget";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import { get_widget_index, set_widget_poster_type } from "@/utils/widget/configuration";
const WidgetPosterSection = ({ widget_id }: ComponentProps) => {

  const [widgets, setWidgets] = useRecoilState(userWidgetsState);
  const widget: Widget = widgets[get_widget_index({ widgets, widget_id })];
  const poster_type = widget.data.movie_poster.poster_type;
  const updatePosterType = (widget_poster_type: string) => {
    const modified_widgets = set_widget_poster_type({
      widget_id,
      widget_poster_type,
    });
    setWidgets(modified_widgets);
  };

  return (
    <ConfigSection title={"Como quieres ver los posters de las peliculas"}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          columnGap: "30px",
        }}
      >
        {POSTERS.map((poster, posterIndex) => (
          <Box
            key={posterIndex}
            sx={{ opacity: poster_type === poster.name ? 1 : 0.1 }}
            onClick={() => {
              updatePosterType(poster.name)
            }}
          >
            {poster.component({
              name: MOVIE_EXAMPLE.name,
              image: MOVIE_EXAMPLE.image,
            })}
          </Box>
        ))}
      </Box>
    </ConfigSection>
  );
};

export default WidgetPosterSection;

type ComponentProps = {
  widget_id: string;
};
