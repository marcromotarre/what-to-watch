import { Slider } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ImdbSliderComponent = (slider) => <ImdbSlider {...slider} />

const ImdbSlider = styled(Slider)({
  color: "#F6C700",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#F6C700",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-mark": {
    height: 0,
    width: 0,
  },

  "& .MuiSlider-rail": {
    color: "#000",
    opacity: 1,
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 16,
    fontWeight: 900,
    color: "#000",
    background: "unset",
    padding: 0,
    width: 38,
    height: 25,
    borderRadius: "3px",
    backgroundColor: "#F6C700",
  },
});

export default ImdbSlider;
