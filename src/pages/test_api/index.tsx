import { Box } from "@mui/material";
import movies from "../../scrap/own/results/own-movies.json";

export default function Home() {
  const order_by_popularity = ({ movies }) => {
    return movies.sort((movie_a, movie_b) =>
      has_decimals(movie_a.popularity) >= has_decimals(movie_b.popularity)
        ? -1
        : 1
    );
  };

  const order_by_year = ({ movies }) => {
    return movies.sort((movie_a, movie_b) =>
      movie_a.release_date.year >= movie_b.release_date.year ? 1 : -1
    );
  };

  const ORDER_FUNCTIONS = {
    popularity: order_by_popularity,
    score: order_by_popularity, //order_by_score,
    num_votes: order_by_popularity, //order_by_num_votes,
    year: order_by_year,
  };

  function has_decimals(n) {
    let result = n - Math.floor(n) !== 0;
    return result ? n * 1000 : n;
  }

  const page = 0;
  const limit = 20;
  const genres = [];
  const order = ["popularity", "num_votes", "score", "year"];

  const movies_array = Object.keys(movies).map((movie_id) => movies[movie_id]);

  let ordered_movies = [...movies_array];
  order.reverse().forEach((order_criteria) => {
    ordered_movies = [
      ...ORDER_FUNCTIONS[order_criteria]({ movies: ordered_movies }),
    ];
  });
  let filtered_movies = [...ordered_movies];
  if (genres.length > 0) {
    filtered_movies = ordered_movies.filter((movie) => {
      return movie.genres.includes(parseInt(genres[0]));
    });
  }

  const total_results = Object.keys(filtered_movies).length;

  const is_next_page = (page + 1) * limit < total_results;
  const is_previous_page = page > 0;

  const paginated_results = filtered_movies.filter(
    (_, index) => index >= page * limit && index < (page + 1) * limit
  );

  console.log({
    total: filtered_movies.length,
    previous: is_previous_page
      ? `http://localhost:3000/api/movies?page=${
          page - 1
        }&limit=${limit}&genres=${genres}`
      : null,
    next: is_next_page
      ? `http://localhost:3000/api/movies?page=${
          page + 1
        }&limit=${limit}&genres=${genres}`
      : null,
    results: paginated_results,
  });

  return <Box></Box>;
}
