import { Box, Typography } from "@mui/material";

export default function HoritzontalPageComponent() {
  return (
    <Box
      sx={{
        backgroundColor: "#3D3D3D",
        display: "grid",
        gridTemplateColumns: "100%",
        rowGap: 4,
      }}
    >
      <Typography>Horitzontal</Typography>
    </Box>
  );
}
