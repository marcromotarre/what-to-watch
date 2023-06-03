import { useAddToHomescreenPrompt } from "@/hooks/useAddToHomeScreenPrompt";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function InstallPageComponent() {
    const [prompt, promptToInstall] = useAddToHomescreenPrompt();
    const [isVisible, setVisibleState] = useState(false);
    const hide = () => setVisibleState(false);



    const onClickInstall = () => {
    promptToInstall()
    console.log("install wpa");
  };
  return (
    <Box
      sx={{
        backgroundColor: "#3D3D3D",
        display: "grid",
        gridTemplateColumns: "100%",
        rowGap: 4,
      }}
    >
      <Typography>Install</Typography>
      <Button
        sx={{ border: "1px solid black" }}
        onClick={() => {
          onClickInstall();
        }}
      >
        {" "}
        <Typography>Install</Typography>
      </Button>
    </Box>
  );
}
