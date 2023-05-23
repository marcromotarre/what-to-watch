import { Box } from "@mui/material";
import ConfigSection from "../sections/config-section";
import { DragableList } from "../draggable/DragableList";
import DraggablePlatformCard from "../draggable/dragable-platform-card";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userPlatformsState } from "@/states/user-state";
import { set_platforms_order } from "@/utils/platform/configuration";

export default function PlatformsUserSelection() {
  const [userPlatforms, setUserPlatforms] = useRecoilState(userPlatformsState);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    setPlatforms(
      userPlatforms.map(({ id, name, has }: any, index: number) => ({
        id: index + 1,
        name: name,
        data: { id, has },
      }))
    );
  }, [userPlatforms]);

  const savePlatformsOrder = (platforms_order: any) => {
    const current_order = userPlatforms.map(({ id }: any) => id);
    const transformed_order = platforms_order.map(({ data }: any) => data.id);
    if (JSON.stringify(transformed_order) !== JSON.stringify(current_order)) {
      set_platforms_order({
        platforms_order: transformed_order,
      });
    }
  };
  return (
    <ConfigSection
      title={"¿Que platafotmas tienes?"}
      subtitle={[
        "Arrastra para ordenarlas. La odenación se usa para que sepas de forma rápida en que plataforma puedes ver la pelicula.",
        "Pulsa para activar o desactivar.",
      ]}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto",
          rowGap: 3,
          width: "calc(100%)",
        }}
      >
        {
          <DragableList onChange={savePlatformsOrder} elements={platforms}>
            <DraggablePlatformCard />
          </DragableList>
        }
      </Box>
    </ConfigSection>
  );
}
