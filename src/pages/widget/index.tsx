import { Box, Button, Card, Typography } from "@mui/material";

import { userPlatformsState, userWidgetsState } from "../../states/user-state";
import { useRecoilState, useRecoilValue } from "recoil";

import { inter_medium } from "@/fonts/inter";
import { DragableList } from "@/components/draggable/DragableList";
import { useRouter } from "next/router";
import DraggableWidgetCard from "@/components/draggable/dragable-widget-card";
import { useEffect, useState } from "react";
import ConfigSection from "@/components/sections/config-section";
import DraggablePlatformCard from "@/components/draggable/dragable-platform-card";
import { set_platforms_order } from "@/utils/platform/configuration";

export default function WidgetConfiguration() {
  const userWidgets = useRecoilValue(userWidgetsState);
  const [userPlatforms, setUserPlatforms] = useRecoilState(userPlatformsState);

  const [elements, setElements] = useState<any>([]);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    setElements(
      Object.keys(userWidgets).map((widget_id, index) => ({
        id: index + 1,
        name: userWidgets[widget_id].data.name,
        data: { widget_id },
      }))
    );
  }, [userWidgets]);

  useEffect(() => {
    setPlatforms(
      userPlatforms.map(({ id, name, has }: any, index: number) => ({
        id: index + 1,
        name: name,
        data: { id, has },
      }))
    );
  }, [userPlatforms]);

  const create_new_widget = () => {
    console.log("create_new_widget");
  };

  const savePlatformsOrder = (platforms_order: any) => {
    const current_order = userPlatforms.map(({ id }: any) => id);
    const transformed_order = platforms_order.map(({ data }: any) => data.id);
    if (JSON.stringify(transformed_order) !== JSON.stringify(current_order)) {
      set_platforms_order({
        platforms: userPlatforms,
        platforms_order: transformed_order,
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#3D3D3D",
        display: "grid",
        rowGap: 2,
        padding: "0px 30px",
      }}
    >
      <ConfigSection
        title={"Vamos a configurar tus widgets"}
        subtitle={
          "Pulsa para activar o desactivar.\nArrastra para ordenarlas. La odenación se usa para que sepas de forma rápida en que plataforma puedes ver la pelicula."
        }
      >
        <Box sx={{ display: "grid", rowGap: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto",
              rowGap: 3,
              width: "calc(100%)",
            }}
          >
            {
              <DragableList onChange={() => {}} elements={elements}>
                <DraggableWidgetCard />
              </DragableList>
            }
          </Box>
          <Box
            sx={{
              backgroundColor: "#646464",
              borderRadius: "5px",
              width: "fit-content",
              padding: 1,
              justifySelf: "center",
            }}
            onClick={() => create_new_widget()}
          >
            <Typography
              sx={{ color: "#3D3D3D" }}
              variant="body2"
              className={inter_medium.className}
            >
              Crea un nuevo widget
            </Typography>
          </Box>
        </Box>
      </ConfigSection>
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
    </Box>
  );
}
