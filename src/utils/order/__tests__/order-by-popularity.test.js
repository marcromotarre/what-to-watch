import "@testing-library/jest-dom";
import { order_by_popularity } from "../order-by-popularity";
import movie_generator from "../../../fixtures/movies/ranking-platforms/imdb/movie-with-popularity-x";

describe("order-by-popularity", () => {
  it("order movies by imdb", () => {
    const movie_with_popularity_2 = movie_generator(2);
    const movie_with_popularity_5 = movie_generator(5);
    const movie_with_popularity_3 = movie_generator(3);
    const movie_with_popularity_10 = movie_generator(10);
    const movie_with_popularity_1 = movie_generator(1);
    const movies = [
      movie_with_popularity_2,
      movie_with_popularity_5,
      movie_with_popularity_3,
      movie_with_popularity_10,
      movie_with_popularity_1,
    ];
    const results = order_by_popularity(movies);
    expect(results.length).toBe(5);
    expect(results[0].id).toBe(movie_with_popularity_1.id);
    expect(results[1].id).toBe(movie_with_popularity_2.id);
    expect(results[2].id).toBe(movie_with_popularity_3.id);
    expect(results[3].id).toBe(movie_with_popularity_5.id);
    expect(results[4].id).toBe(movie_with_popularity_10.id);
  });
});
