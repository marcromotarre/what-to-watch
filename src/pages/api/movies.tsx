import Movie from "@/interfaces/Movie";
import movies from "../../scrap/own/results/own-movies.json";
import { order_by_year, order_by_popularity } from "../../utils/order";

export default function handler(req, res) {
  const query = req.query;
  let {
    page = 0,
    limit = 40,
    genres = [],
    order = ["popularity", "num_votes", "score", "year"],
  } = query;
  page = parseInt(page);
  limit = parseInt(limit);
  genres = genres.split(",");

  const movies_array = Object.keys(movies).map((movie_id) => movies[movie_id]);

  let ordered_movies = [...movies_array];
  order.reverse().forEach((order_criteria) => {
    ordered_movies = [...ORDER_FUNCTIONS[order_criteria](ordered_movies)];
  });

  let filtered_movies = [...ordered_movies];
  /*if (genres.length > 0) {
    filtered_movies = ordered_movies.filter((movie) => {
      return movie.genres.includes(parseInt(genres[0]));
    });
  }*/
  const total_results = filtered_movies.length;

  const is_next_page = (page + 1) * limit < total_results;
  const is_previous_page = page > 0;

  const paginated_results = filtered_movies.filter(
    (_, index) => index >= page * limit && index < (page + 1) * limit
  );

  res.status(200).json({
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
}



const ORDER_FUNCTIONS = {
  popularity: order_by_popularity,
  score: order_by_popularity, //order_by_score,
  num_votes: order_by_popularity, //order_by_num_votes,
  year: order_by_year,
};

