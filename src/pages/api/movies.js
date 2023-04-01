import movies from "../../scrap/own/results/own-movies.json";

export default function handler(req, res) {
  const query = req.query;
  let { page = 0, limit = 40, genres = [] } = query;
  page = parseInt(page);
  limit = parseInt(limit);
  genres = genres.split(",");

  const movies_ids = Object.keys(movies);
  const total_results = movies_ids.length;

  const is_next_page = (page + 1) * limit < total_results;
  const is_previous_page = page > 0;

  const filtered_movies = movies_ids.filter((movie_id) => {
    return movies[movie_id].genres.includes(parseInt(genres[0]))
  }
   
  );

  const paginated_results = filtered_movies
    .filter((_, index) => index >= page * limit && index < (page + 1) * limit)
    .map((movie_id) => {
      const { id, filmaffinity, poster_path, title } = movies[movie_id];
      return { id, filmaffinity, poster_path, title };
    });

  res.status(200).json({
    total: filtered_movies.length,
    previous: is_previous_page
      ? `http://localhost:3000/api/movies?page=${page - 1}&limit=${limit}&genres=${genres}`
      : null,
    next: is_next_page
      ? `http://localhost:3000/api/movies?page=${page + 1}&limit=${limit}&genres=${genres}`
      : null,
    results: paginated_results,
  });
}
