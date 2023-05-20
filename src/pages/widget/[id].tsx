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
import { useRouter } from "next/router";

export default function WidgetConfiguration() {
  const router = useRouter();
  const widget_id = router.query?.id ? router.query.id.toString() : "";
  const userWidgets = useRecoilValue(userWidgetsState);
  const widget_keys = Object.keys(userWidgets);

  const is_widget_created = userWidgets.hasOwnProperty(widget_id);
  return (
    <Box sx={{ backgroundColor: "#3D3D3D" }}>
      {is_widget_created && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto",
            rowGap: 3,
            width: "calc(100% - 60px)",
            marginLeft: "30px",
          }}
        >
          <WidgetNameSection widget_id={widget_id} />
          <RankingPlatformSection widget_id={widget_id} />
          <WidgetOrderSection widget_id={widget_id} />
          <WidgetFiltersSection widget_id={widget_id} />
          <WidgetChipSection widget_id={widget_id} />
        </Box>
      )}
    </Box>
  );
}
