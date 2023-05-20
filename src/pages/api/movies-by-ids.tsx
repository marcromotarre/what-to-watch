import Movie from "@/interfaces/Movie";
import movies from "../../scrap/own/results/own-movies.json";
import { filter_by_rating } from "@/utils/filter/filter-by-rating";
import { filter_by_year } from "@/utils/filter/filter-by-year";
import { filter_by_cast } from "@/utils/filter/filter-by-cast";
import { filter_by_genre } from "@/utils/filter/filter-by-genre";
import { filter_by_num_votes } from "@/utils/filter/filter-by-num-votes";
import { order_by_popularity } from "@/utils/order/order-by-popularity";
import { order_by_year } from "@/utils/order/order-by-year";
import { order_by_rating } from "@/utils/order/order-by-rating";
import { order_by_num_votes } from "@/utils/order/order-by-num-votes";

export default function handler(req, res) {
  const {
    ids = [],
    order = ["popularity", "num_votes", "rating", "year"],
    page = 0,
    limit = 40,
  } = req.body;

  const movies_array = Object.keys(movies).map((movie_id) => movies[movie_id]);

  // apply filters
  let filtered_movies = [...movies_array.filter(({ id }) => ids.includes(id))];
  let ordered_movies = ids.map((id: number) =>
    filtered_movies.find((movie) => movie.id === id)
  );

  /*
  let ordered_movies = [...filtered_movies];
  const reversed_order = [...order].reverse();
  */
  /*reversed_order.forEach((order_criteria) => {
    ordered_movies = [...ORDER_FUNCTIONS[order_criteria](ordered_movies)];
  });*/

  const total_results = ordered_movies.length;
  const is_next_page = (page + 1) * limit < total_results;
  const is_previous_page = page > 0;

  const paginated_results = ordered_movies.filter(
    (_, index) => index >= page * limit && index < (page + 1) * limit
  );

  res.status(200).json({
    total: ordered_movies.length,
    previous: is_previous_page ? { ...req.body, page: page - 1 } : null,
    next: is_next_page ? { ...req.body, page: page + 1 } : null,
    results: paginated_results,
  });
}

const ORDER_FUNCTIONS = {
  popularity: order_by_popularity,
  rating: order_by_rating,
  num_votes: order_by_num_votes, //order_by_num_votes,
  year: order_by_year,
};

const FILTER_FUNCTIONS = {
  num_votes: filter_by_num_votes,
  rating: filter_by_rating,
  year: filter_by_year,
  cast: filter_by_cast,
  genres: filter_by_genre,
};