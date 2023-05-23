import { Box, Card, Typography } from "@mui/material";
import { useRouter } from "next/router";

import EditIcon from "@mui/icons-material/Edit";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { inter_medium } from "@/fonts/inter";
import {
  click_on_platform,
  get_platform_index,
} from "@/utils/platform/configuration";
import { useRecoilState, useRecoilValue } from "recoil";
import { userPlatformsState } from "@/states/user-state";
import { useState } from "react";
const DraggablePlatformCard = ({
  text = "",
  isDragging = false,
  dragDropRef = () => {},
  data = {},
}: any) => {
  const userPlatforms = useRecoilValue(userPlatformsState);
  const { has, id } = data;
  const [userHas, setUserHas] = useState(has);
  const extraStylesOnDragging = isDragging
    ? { boxShadow: "0px 0px 42px -3px rgba(0,0,0,0.77);" }
    : { boxShadow: "0" };

  const clickOnPlatform = () => {
    const platforms = click_on_platform({
      platforms: userPlatforms,
      platform_id: id,
    });
    const index = get_platform_index({
      platforms: userPlatforms,
      platform_id: id,
    });
    setUserHas(platforms[index].has);
    // setUserPlatforms(modified_platforms);
  };

  // change order

  return (
    <Card
      sx={{
        display: "grid",
        gridTemplateColumns: "20px auto 120px",
        width: "100%",
        columnGap: 1,
        backgroundColor: "#3D3D3D",
        padding: 1,
        borderRadius: "5px",
        alignItems: "center",
        ...extraStylesOnDragging,
      }}
      onClick={() => clickOnPlatform()}
    >
      <DragIndicatorIcon sx={{ color: "white", opacity: userHas ? 1 : 0.1 }} />

      <Typography
        ref={dragDropRef}
        sx={{ opacity: userHas ? 1 : 0.1 }}
        variant="subtitle2"
      >
        {text}
      </Typography>
    </Card>
  );
};

export default DraggablePlatformCard;
