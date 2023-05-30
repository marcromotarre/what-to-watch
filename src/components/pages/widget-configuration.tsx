import { Box } from "@mui/material";
import PlatformsUserSelection from "../platforms/platforms-user-selection";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import WidgetNameSection from "../sections/configuration/widget-name-section";
import WidgetOrderSection from "../sections/configuration/widget-order-section";
import { get_widget_index } from "@/utils/widget/configuration";
import WidgetRatingPlatformSection from "../sections/configuration/widget-rating-platform-section";
import WidgetPosterSection from "../sections/configuration/widget-poster-section";
import WidgetChipSection from "../sections/configuration/widget-chip-section";
import { WidgetFiltersSectionComponent } from "../sections/configuration/widget-filters-section";

export default function WidgetConfigurationComponent() {
  const router = useRouter();
  const widget_id = router.query?.id ? router.query.id.toString() : "";
  return (
    <Box sx={{ backgroundColor: "#3D3D3D" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto",
          rowGap: 3,
        }}
      >
        {widget_id && (
          <>
            <WidgetNameSection widget_id={widget_id} />
            <WidgetPosterSection widget_id={widget_id} />
            <WidgetRatingPlatformSection widget_id={widget_id} />
            <WidgetChipSection widget_id={widget_id} />
            <WidgetOrderSection widget_id={widget_id} />
            <WidgetFiltersSectionComponent widget_id={widget_id} />
          </>
        )}
      </Box>
    </Box>
  );
}
