import { Box, CardMedia } from "@mui/material";

const RankingPlatformList = ({ styles = {} }) => {
  const ranking_platforms = ["filmaffinity", "imdb", "rotten-tomatoes"];
  return (
    <Box>
      {ranking_platforms.map((ranking_platform) => (
        <CardMedia
          component="img"
          image={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${image}`}
          alt={name}
        />
      ))}
    </Box>
  );
};

export default RankingPlatformList;
