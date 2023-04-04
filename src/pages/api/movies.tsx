import Movie from "@/interfaces/Movie";
import movies from "../../scrap/own/results/own-movies.json";
import { order_by_year, order_by_popularity } from "../../utils/order";

export default function handler(req, res) {
  const {
    filters = [],
    order = ["popularity", "num_votes", "score", "year"],
    page = 0,
    limit = 40,
  } = req.body;


  const movies_array = Object.keys(movies).map((movie_id) => movies[movie_id]);


  // apply filters
  let filtered_movies = [...movies_array];

  filters.forEach((filter) => {

  })

  let ordered_movies = [...filtered_movies];
  const reversed_order = [...order].reverse()
  reversed_order.forEach((order_criteria) => {
    ordered_movies = [...ORDER_FUNCTIONS[order_criteria](ordered_movies)];
  });

  /*if (genres.length > 0) {
    filtered_movies = ordered_movies.filter((movie) => {
      return movie.genres.includes(parseInt(genres[0]));
    });
  }*/
  const total_results = ordered_movies.length;

  const is_next_page = (page + 1) * limit < total_results;
  const is_previous_page = page > 0;

  const paginated_results = filtered_movies.filter(
    (_, index) => index >= page * limit && index < (page + 1) * limit
  );

  res.status(200).json({
    total: filtered_movies.length,
    previous: is_previous_page ? { ...req.body, page: page - 1 } : null,
    next: is_next_page ? { ...req.body, page: page + 1 } : null,
    results: paginated_results,
  });
}

const ORDER_FUNCTIONS = {
  popularity: order_by_popularity,
  score: order_by_popularity, //order_by_score,
  num_votes: order_by_popularity, //order_by_num_votes,
  year: order_by_year,
};


const FILTER_FUNCTIONS = {
  score: filter_by_score,
  year: filter_by_year, //order_by_score,
  cast: filter_by_cast, //order_by_num_votes,
};
