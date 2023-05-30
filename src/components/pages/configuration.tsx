import { Box, Card, Typography } from "@mui/material";
import WIDGETS from "../../data/widgets.json";
import PLATFORMS from "../../data/platforms";
import { useRouter } from "next/router";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { userWidgetsState } from "@/states/user-state";

export default function ConfigurationPageComponent() {
  const router = useRouter();
  const setUserWidgets = useSetRecoilState(userWidgetsState);
  const setUserPlatforms = useSetRecoilState(userWidgetsState);

  const configuration_button = [
    {
      name: "Tus Plataformas de Streaming",
      onClick: () => {
        router.push(`/platforms`);
      },
    },
    {
      name: "Tus Widgets",
      onClick: () => {
        router.push(`/widget`);
      },
    },
    {
      name: "Borrar Datos",
      onClick: () => {
        setUserWidgets(WIDGETS);
        setUserPlatforms(PLATFORMS);
        localStorage.setItem("userWidgets", JSON.stringify(WIDGETS));
        localStorage.setItem("userPlatforms", JSON.stringify(PLATFORMS));
      },
    },
  ];
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "auto", rowGap: 2 }}>
      {configuration_button.map(({ name, onClick }) => (
        <Box
          key={name}
          onClick={() => {
            onClick();
          }}
          sx={{
            backgroundColor: "#343333",
            padding: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;",
          }}
        >
          <Typography variant="body1">{name}</Typography>
        </Box>
      ))}
    </Box>
  );
}
