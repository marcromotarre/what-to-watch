import { Box } from "@mui/material";
import ConfigSection from "../sections/config-section";
import { DragableList } from "../draggable/DragableList";
import DraggablePlatformCard from "../draggable/dragable-platform-card";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userPlatformsState } from "@/states/user-state";
import { set_platforms_order } from "@/utils/platform/configuration";
import PlatformsUserSelection from "../platforms/platforms-user-selection";

export default function PlatformsPageComponent() {
  return (
    <>
      <PlatformsUserSelection />
      <PlatformsUserSelection />
    </>
  );
}
