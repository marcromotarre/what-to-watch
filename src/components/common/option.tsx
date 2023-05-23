import { inter_light } from "@/fonts/inter";
import DoneIcon from "@mui/icons-material/Done";

import { Box, Button, Typography } from "@mui/material";
import React from "react";

export const Option = ({ text, isSelected, onClick }: ComponentProps) => {
  const backgroundColor = isSelected ? "#D9D9D9" : "#3D3D3D";

  return (
    <Box
      sx={{ display: "grid", gridTemplateColumns: "28px auto", columnGap: 1, padding: 2, border: "1px solid black" }}
      onClick={() => onClick()}
    >
      <Box
        sx={{
          width: "14px",
          height: "14px",
          borderRadius: "3px",
          border: "1px solid #CCC1C1",
          backgroundColor,
        }}
      >
        {isSelected && (
          <DoneIcon
            sx={{
              width: "12px",
              height: "auto",
              color: "#3D3D3D",
              position: "absolute",
            }}
          />
        )}
      </Box>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

type ComponentProps = {
  text: string;
  isSelected: boolean;
  onClick: Function;
};
