export type Widget = {
  type: string;
  data: WidgetData;
};

export type WidgetData = {
  name: string;
  icon?: string;
  movie_poster: WidgetMoviePoster;
  rating_platform: string;
  filters: Array<WidgetFilter>;
};

export type WidgetMoviePoster = {
  chip_name: string;
  poster_type: string;
};

export type WidgetFilter = {
  type: string;
  data: WidgetFilterRatingData;
};

export type WidgetFilterRatingData = {
  platform: string;
  minimum_rating: string;
};
