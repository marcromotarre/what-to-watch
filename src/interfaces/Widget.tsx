export type Widgets = Array<Widget>;

export type Widget = {
  id: string;
  type: string;
  data: WidgetData;
};

export type WidgetData = {
  name: string;
  icon?: string;
  movie_poster: WidgetMoviePoster;
  rating_platform: string;
  filters: Array<WidgetFilter>;
  order: Array<string>
};

export type WidgetMoviePoster = {
  chip_name: string;
  poster_type: string;
};

export type WidgetFilter = (WidgetFilterYear | WidgetFilterRating | WidgetFilterNumVotes);

export type WidgetFilterRating = {
  type: string;
  data: WidgetFilterRatingData;
};


export type WidgetFilterNumVotes = {
  type: string;
  data: WidgetFilterNumVotesData;
};

export type WidgetFilterYear = {
  type: string;
  data: WidgetFilterYearData;
};

export type WidgetFilterData = (WidgetFilterYearData | WidgetFilterRatingData | WidgetFilterNumVotesData);

export type WidgetFilterRatingData = {
  filmaffinity_minimum_rating?: number;
  imdb_minimum_rating?: number;
};


export type WidgetFilterYearData = {
  year_init?: number;
  year_end?: number;
};


export type WidgetFilterNumVotesData = {
  filmaffinity_minimum_num_votes?: number;
  imdb_minimum_num_votes?: number;
};
