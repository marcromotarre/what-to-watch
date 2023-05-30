import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import { add_widget, set_widgets_order } from "@/utils/widget/configuration";
import DraggableWidgetCard from "@/components/draggable/dragable-widget-card";
import ConfigSection from "@/components/sections/config-section";
import { DragableList } from "@/components/draggable/DragableList";
import { Widget } from "@/interfaces/Widget";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_ORDER } from "@/data/order";

export default function WidgetsSection() {
  const [userWidgets, setUserWidgets] = useRecoilState(userWidgetsState);
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    setWidgets(
      userWidgets.map(({ id, data }: any, index: number) => ({
        id: index + 1,
        name: data.name,
        data: { widget_id: id },
      }))
    );
  }, [userWidgets]);

  const create_new_widget = () => {
    const widget: Widget = {
      id: uuidv4(),
      type: "carousel",
      data: {
        filters: [],
        order: DEFAULT_ORDER,
        rating_platform: "FILMAFFINITY",
        movie_poster: {
          chip_name: "NO_CHIP",
          poster_type: "RECTANGULAR_WITH_WHITE_BORDER",
        },
        name: "Widget creado",
      },
    };
    add_widget({widget})
    setUserWidgets([...userWidgets, widget]);
  };

  const saveWidgetsOrder = (widgets_order: any) => {
    const current_order = userWidgets.map(({ id }: any) => id);
    const transformed_order = widgets_order.map(({ data }: any) => data.id);
    if (JSON.stringify(transformed_order) !== JSON.stringify(current_order)) {
      set_widgets_order({
        widgets_order: transformed_order,
      });
    }
  };
  return (
    <ConfigSection
      title={"Vamos a configurar tus widgets"}
      subtitle={[
        "Arrastra para ordenarlas. La odenación se usa para que sepas de forma rápida en que plataforma puedes ver la pelicula.",
        "Pulsa para activar o desactivar.",
      ]}
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
            <DragableList onChange={saveWidgetsOrder} elements={widgets}>
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
          <Typography sx={{ color: "#3D3D3D" }} variant="body2">
            Crea un nuevo widget
          </Typography>
        </Box>
      </Box>
    </ConfigSection>
  );
}
