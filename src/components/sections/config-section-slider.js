import { Box } from "@mui/material";
import ConfigSection from "./config-section";

const ConfigSectionSlider = ({ slider }) => {
  return (
    <ConfigSection title={slider.title} subtitle={slider.subtitle}>
      <Box sx={{ width: "100%", height: "10px" }}></Box>
      {slider.component({
        defaultValue: slider.defaultValue,
        step: slider.step,
        min: slider.min,
        max: slider.max,
        valueLabelFormat: slider.valueLabelFormat,
        marks: slider.marks,
        valueLabelDisplay: "on",
        saveValue: slider.saveValue,
      })}
    </ConfigSection>
  );
};

export default ConfigSectionSlider;
