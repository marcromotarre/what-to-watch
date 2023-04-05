import "@testing-library/jest-dom";
import { order_by_year } from "../order-by-year";
import movie_genarator from "../../../fixtures/movies/movie-with-year-x";

describe("order-by-popularity", () => {
  it("order movies by imdb", () => {
    const movie_with_year_2019 = movie_genarator(2019);
    const movie_with_year_2020 = movie_genarator(2020);
    const movie_with_year_1995 = movie_genarator(1995);
    const movie_with_year_2021 = movie_genarator(2021);
    const movie_with_year_1927 = movie_genarator(1927);
    const movie_with_year_2023 = movie_genarator(2023);
    const movie_with_year_2015 = movie_genarator(2015);
    const movies = [
      movie_with_year_2019,
      movie_with_year_2020,
      movie_with_year_1995,
      movie_with_year_2021,
      movie_with_year_1927,
      movie_with_year_2023,
      movie_with_year_2015,
    ];
    const results = order_by_year(movies);
    expect(results.length).toBe(7);
    expect(results[0].id).toBe(movie_with_year_1927.id);
    expect(results[1].id).toBe(movie_with_year_1995.id);
    expect(results[2].id).toBe(movie_with_year_2015.id);
    expect(results[3].id).toBe(movie_with_year_2019.id);
    expect(results[4].id).toBe(movie_with_year_2020.id);
    expect(results[5].id).toBe(movie_with_year_2021.id);
    expect(results[6].id).toBe(movie_with_year_2023.id);
  });
});
