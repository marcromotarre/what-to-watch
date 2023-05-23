import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userWidgetsState } from "@/states/user-state";
import { set_widgets_order } from "@/utils/widget/configuration";
import DraggableWidgetCard from "@/components/draggable/dragable-widget-card";
import ConfigSection from "@/components/sections/config-section";
import { DragableList } from "@/components/draggable/DragableList";

export default function WidgetsSection() {
  const userWidgets = useRecoilValue(userWidgetsState);
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
        {/*<Box
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
    </Box>*/}
      </Box>
    </ConfigSection>
  );
}
