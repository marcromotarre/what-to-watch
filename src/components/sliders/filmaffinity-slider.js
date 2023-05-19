import { Slider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { jwtState, userRankingPlatformsState } from "../../states/user-state";

export const FilmaffinitySliderComponent = (slider) => {
  const jwt = useRecoilValue(jwtState);
  const [userRankingPlatforms, setUserRankingPlatforms] = useRecoilState(
    userRankingPlatformsState
  );
  return (
    <FilmaffinitySlider
      onChangeCommitted={(e, value) => {
        slider.saveValue({
          value,
          jwt,
          userRankingPlatforms,
          setUserRankingPlatforms,
        });
      }}
      {...slider}
    />
  );
};

const FilmaffinitySlider = styled(Slider)({
  color: "#4682B4",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#4682B4",
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
    color: "white",
    opacity: 1,
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 52,
    height: 32,
    borderRadius: "3px",
    backgroundColor: "#4682B4",
  },
});

export default FilmaffinitySlider;
