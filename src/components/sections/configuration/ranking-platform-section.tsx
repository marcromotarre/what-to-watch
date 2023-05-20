import RANKING_PLATFORMS, { RANKING_PLATFORMS_SLIDERS } from "@/data/ranking-platforms";
import { Box, CardMedia } from "@mui/material";
import { Widget } from "@/interfaces/Widget";
import ConfigSection from "../config-section";
import { set_widget_ranking_platform } from "@/utils/widget/configuration";
import { useRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";

const RankingPlatformSection = ({ widget_id }: ComponentProps) => {
  const [userWidgets, setUserWidgets] = useRecoilState(userWidgetsState);
  const handleRankingPlatformClick = (ranking_platform: string) => {
    const modified_widgets = set_widget_ranking_platform({
      widgets: userWidgets,
      widget_id,
      ranking_platform,
    });
    setUserWidgets(modified_widgets);
  };

  const widget = userWidgets[widget_id];
  return (
    <ConfigSection title={"¿Cual es tu motor de puntuación favorito?"}
    subtitle={"Usaremos la plataforma que elijas para filtrar y ordenar por puntuación"}>
      <Box>
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
            {RANKING_PLATFORMS.map((rankingPlantform, index) => (
              <CardMedia
                key={rankingPlantform.name}
                component="img"
                onClick={() => {
                  handleRankingPlatformClick(rankingPlantform.name);
                }}
                sx={{
                  width: "100%",
                  borderRadius: "15px",
                  boxShadow:
                    widget.data.rating_platform === rankingPlantform.name
                      ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                      : "",
                  opacity:
                    widget.data.rating_platform === rankingPlantform.name
                      ? 1
                      : 0.1,
                }}
                image={rankingPlantform.appIcon.src}
                alt={rankingPlantform.name}
              ></CardMedia>
            ))}
          </Box>
        </Box>
      </Box>
          {/*RANKING_PLATFORMS_SLIDERS({
            userRankingPlatforms,
            ()=> {},
          })[userRankingPlatforms.ranking_platform].map((slider, index) => {
            return <ConfigSectionSlider key={index} slider={slider} />;
          })*/}
    </ConfigSection>
  );
};

type ComponentProps = {
  widget_id: string;
};

export default RankingPlatformSection;
