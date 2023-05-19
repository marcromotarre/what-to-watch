import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import {inter900, inter100} from "../../fonts/inter"

export default function ConfigSection({
  title,
  subtitle,
  children,
}: ComponentProps) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "auto", rowGap: "20px" }}>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "auto", rowGap: "10px" }}
      >
        {title && (
          <Typography className={inter100.className} variant="h6">
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography className={inter100.className} variant="body2">
            {subtitle}
          </Typography>
        )}
      </Box>

      {children && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "calc(100% - 20px)" }}>{children}</Box>
        </Box>
      )}
    </Box>
  );
}


type ComponentProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};
