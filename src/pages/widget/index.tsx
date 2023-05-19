import { Box, CardMedia, Input, Typography } from "@mui/material";
import ConfigSection from "../../components/sections/config-section";
import RANKING_PLATFORMS, {
  RANKING_PLATFORMS_SLIDERS,
} from "../../data/ranking-platforms";
import { userWidgetsState } from "../../states/user-state";
import { useRecoilValue } from "recoil";
import RankingPlatformList from "@/components/platforms/ranking-platform-list";
import RankingPlatformSection from "@/components/sections/configuration/ranking-platform-section";
import WidgetNameSection from "@/components/sections/configuration/widget-name-section";
import WidgetOrderSection from "@/components/sections/configuration/widget-order-section";
import WidgetFiltersSection from "@/components/sections/configuration/widget-filters-section";
import WidgetChipSection from "@/components/sections/configuration/widget-chip-section";

export default function WidgetConfiguration() {
  const userWidgets = useRecoilValue(userWidgetsState);
  const widget_keys = Object.keys(userWidgets);
  return (
    <Box sx={{ backgroundColor: "#3D3D3D" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto",
          rowGap: 3,
           width: "calc(100% - 60px)",
          marginLeft: "30px",
        }}
      >
        <WidgetNameSection widget_id={widget_keys[0]} />
        <RankingPlatformSection widget_id={widget_keys[0]} />
        <WidgetOrderSection widget_id={widget_keys[0]} />
        <WidgetFiltersSection widget_id={widget_keys[0]} />
        <WidgetChipSection widget_id={widget_keys[0]} />
      </Box>
    </Box>
  );
}
