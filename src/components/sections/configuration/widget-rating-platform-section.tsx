import RATING_PLATFORMS, {
  RATING_PLATFORMS_SLIDERS,
} from "@/data/rating-platforms";
import { Box, CardMedia } from "@mui/material";
import { Widget } from "@/interfaces/Widget";
import ConfigSection from "../config-section";
import {
  get_widget_by_id,
  get_widget_filter,
  set_widget_rating_platform,
} from "@/utils/widget/configuration";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import ConfigSectionSlider from "@/components/sections/config-section-slider";

const WidgetRatingPlatformSection = ({ widget_id }: ComponentProps) => {
  const [widgets, setWidgets] = useRecoilState(userWidgetsState);

  const handleRankingPlatformClick = (rating_platform: string) => {
    const modified_widgets = set_widget_rating_platform({
      widget_id,
      rating_platform,
    });
    setWidgets(modified_widgets);
  };

  const widget = get_widget_by_id({ widgets, widget_id });

  const rating_filter = get_widget_filter({ widget_id, filter_type: "rating" })
    ?.data;
  const num_votes_filter = get_widget_filter({ widget_id, filter_type: "num_votes" })
    ?.data;
  const rantingPlatformsSliders: any = RATING_PLATFORMS_SLIDERS({
    widget_id,
    params: { ...rating_filter, ...num_votes_filter },
  });
  return (
    <ConfigSection
      title={"¿Cual es tu motor de puntuación favorito?"}
      subtitle={
        "Usaremos la plataforma que elijas para filtrar y ordenar por puntuación"
      }
    >
      <Box sx={{ display: "grid", rowGap: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              columnGap: "40px",
              rowGap: "40px",
              width: "80%",
            }}
          >
            {RATING_PLATFORMS.map((rantingPlantform, index) => (
              <CardMedia
                key={rantingPlantform.name}
                component="img"
                onClick={() => {
                  handleRankingPlatformClick(rantingPlantform.name);
                }}
                sx={{
                  width: "100%",
                  borderRadius: "15px",
                  boxShadow:
                    widget.data.rating_platform === rantingPlantform.name
                      ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                      : "",
                  opacity:
                    widget.data.rating_platform === rantingPlantform.name
                      ? 1
                      : 0.1,
                }}
                image={rantingPlantform.appIcon.src}
                alt={rantingPlantform.name}
              ></CardMedia>
            ))}
          </Box>
        </Box>
        {rantingPlatformsSliders[widget.data.rating_platform].map(
          (slider: Function, index: number) => {
            return <ConfigSectionSlider key={index} slider={slider} />;
          }
        )}
      </Box>
    </ConfigSection>
  );
};

type ComponentProps = {
  widget_id: string;
};

export default WidgetRatingPlatformSection;
