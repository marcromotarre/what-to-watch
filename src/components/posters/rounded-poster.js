import { CardMedia } from "@mui/material";

const RoundedPoster = ({ image, name, styles }) => {
  return (
    <CardMedia
      component="img"
      sx={{
        width: "100%",
        borderRadius: "15px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        ...styles,
      }}
      image={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${image}`}
      alt={name}
    />
  );
};

export default RoundedPoster;
