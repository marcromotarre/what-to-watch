import "@testing-library/jest-dom";
import { filter_by_rating } from "../filter-by-rating";
import movie_generator from "../../../fixtures/movies/ranking-platforms/movie-with-rating-x";

const movie_1 = movie_generator({ rating_filmaffinity: 3, rating_imdb: 5 });
const movie_2 = movie_generator({ rating_filmaffinity: 6, rating_imdb: 7 });
const movie_3 = movie_generator({
  rating_filmaffinity: 5.2,
  rating_imdb: 5.8,
});
const movie_4 = movie_generator({
  rating_filmaffinity: 2,
  rating_imdb: 3.5,
});
const movie_5 = movie_generator({
  rating_filmaffinity: 8.0,
  rating_imdb: 7.2,
});
const movie_6 = movie_generator({
  rating_filmaffinity: 4.3,
  rating_imdb: 4.3,
});
const movie_7 = movie_generator({ rating_filmaffinity: 4.3, rating_imdb: 5 });
const movie_8 = movie_generator({
  rating_filmaffinity: 7.9,
  rating_imdb: 6.5,
});
const movies = [
  movie_1,
  movie_2,
  movie_3,
  movie_4,
  movie_5,
  movie_6,
  movie_7,
  movie_8,
];

describe("filter by rating", () => {
  it("filter with rating of 5 in filmaffinity", () => {
    const results = filter_by_rating({
      movies,
      minimum_rating: 5,
      platform: "filmaffinity",
    });
    expect(results.length).toBe(4);
    expect(results[0].id).toBe(movie_2.id);
    expect(results[1].id).toBe(movie_3.id);
    expect(results[2].id).toBe(movie_5.id);
    expect(results[3].id).toBe(movie_8.id);
  });

  it("filter with rating of 4.3 in filmaffinity", () => {
    const results = filter_by_rating({
      movies,
      minimum_rating: 4.3,
      platform: "filmaffinity",
    });
    expect(results.length).toBe(6);
    expect(results[0].id).toBe(movie_2.id);
    expect(results[1].id).toBe(movie_3.id);
    expect(results[2].id).toBe(movie_5.id);
    expect(results[3].id).toBe(movie_6.id);
    expect(results[4].id).toBe(movie_7.id);
    expect(results[5].id).toBe(movie_8.id);
  });

  it("filter with rating of 5 in imdb", () => {
    const results = filter_by_rating({
      movies,
      minimum_rating: 5,
      platform: "imdb",
    });
    expect(results.length).toBe(6);
    expect(results[0].id).toBe(movie_1.id);
    expect(results[1].id).toBe(movie_2.id);
    expect(results[2].id).toBe(movie_3.id);
    expect(results[3].id).toBe(movie_5.id);
    expect(results[4].id).toBe(movie_7.id);
    expect(results[5].id).toBe(movie_8.id);
  });

  it("filter with rating of 4.3 in imdb", () => {
    const results = filter_by_rating({
      movies,
      minimum_rating: 4.3,
      platform: "imdb",
    });
    expect(results.length).toBe(7);
    expect(results[0].id).toBe(movie_1.id);
    expect(results[1].id).toBe(movie_2.id);
    expect(results[2].id).toBe(movie_3.id);
    expect(results[3].id).toBe(movie_5.id);
    expect(results[4].id).toBe(movie_6.id);
    expect(results[5].id).toBe(movie_7.id);
    expect(results[6].id).toBe(movie_8.id);
  });
});
