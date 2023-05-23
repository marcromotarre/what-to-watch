import { Box } from "@mui/material";
import PlatformsUserSelection from "../platforms/platforms-user-selection";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import WidgetNameSection from "../sections/configuration/widget-name-section";
import RankingPlatformSection from "../sections/configuration/ranking-platform-section";
import WidgetFiltersSection from "../sections/configuration/widget-filters-section";
import WidgetChipSection from "../sections/configuration/widget-chip-section";
import WidgetOrderSection from "../sections/configuration/widget-order-section";

export default function WidgetConfigurationComponent() {
    const router = useRouter();
    const widget_id = router.query?.id ? router.query.id.toString() : "";
    const userWidgets = useRecoilValue(userWidgetsState);
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
      </Box>)
}
