import { inter_black, inter_extra_light, inter_light, inter_medium } from "@/fonts/inter";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";

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
          <Typography className={inter_medium.className} variant="body1">
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography className={inter_light.className} variant="body2">
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
          <Box sx={{ width: "calc(100%)" }}>{children}</Box>
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
