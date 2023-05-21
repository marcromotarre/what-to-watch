import { Box, Card, Typography } from "@mui/material";
import { useRouter } from "next/router";

import EditIcon from "@mui/icons-material/Edit";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { inter_medium } from "@/fonts/inter";
import { click_on_platform } from "@/utils/platform/configuration";
import { useRecoilState, useRecoilValue } from "recoil";
import { userPlatformsState } from "@/states/user-state";
const DraggablePlatformCard = ({
  text = "",
  isDragging = false,
  dragDropRef = () => {},
  data = {},
}) => {
  const [userPlatforms, setUserPlatforms] = useRecoilState(userPlatformsState);

  const { has, id } = data;
  const extraStylesOnDragging = isDragging
    ? { boxShadow: "0px 0px 42px -3px rgba(0,0,0,0.77);" }
    : { boxShadow: "0" };

  const clickOnPlatform = () => {
    const modified_platforms = click_on_platform({ platforms: userPlatforms, platform_id: id });
    setUserPlatforms(modified_platforms);
  };

  // change order

  return (
    <Card
      ref={dragDropRef}
      sx={{
        display: "grid",
        gridTemplateColumns: "20px auto",
        width: "100%",
        columnGap: 1,
        backgroundColor: "#3D3D3D",
        padding: 1,
        borderRadius: "5px",
        alignItems: "center",
        opacity: has ? 1 : 0.1,
        ...extraStylesOnDragging,
      }}
      onClick={() => clickOnPlatform()}
    >
      <DragIndicatorIcon sx={{ color: "white" }} />

      <Typography variant="body2" className={inter_medium.className}>
        {text}
      </Typography>
    </Card>
  );
};

export default DraggablePlatformCard;
