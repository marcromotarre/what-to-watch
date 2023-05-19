import WidgetGPTCarousel from "@/components/chatgpt/widget-gpt-carousel";
import { Box } from "@mui/material";

export default function Home() {
  const widget_data = {
    type: "carousel",
    data: {
      name: "Peliculas estrenadas este año",
      movie_poster: {
        chip_name: "BASIC_CHIP_IMDB",
        poster_type: "RECTANGULAR_WITH_WHITE_BORDER",
      },
      rating_platform: "imdb",
      filters: [
      ],
    },
  };
  return (
    <Box
      sx={{
        backgroundColor: "#3D3D3D",
        display: "grid",
        gridTemplateColumns: "100%",
        rowGap: 4,
        paddingTop: 7,
      }}
    >
      <WidgetGPTCarousel ids={[2, 5, 6, 11, 16, 19, 22]} {...widget_data.data} />
    </Box>
  );
}
