import { set_widget_filter } from "@/utils/widget/configuration";
import FILMAFFINITY_APP_ICON from "../../src/images/ranking-platforms/filmaffinity/filmaffinity-app-icon.png";
import IMDB_APP_ICON from "../../src/images/ranking-platforms/imdb/imdb-app-icon.png";
import ROTTEN_TOMATOES_APP_ICON from "../../src/images/ranking-platforms/rotten-tomatoes/rotten-tomatoes-app-icon.png";
import { FilmaffinitySliderComponent } from "../components/sliders/filmaffinity-slider";
import { ImdbSliderComponent } from "../components/sliders/imdb-slider";
import _default from "immutability-helper";

const FILMAFFINITY = "FILMAFFINITY";
const IMDB = "IMDB";
const ROTTEN_TOMATOES = "ROTTEN_TOMATOES";

const RATING_PLATFORMS = [
  {
    name: FILMAFFINITY,
    appIcon: FILMAFFINITY_APP_ICON,
    minimumRating: 0,
    minimumVotes: 0,
  },
  { name: IMDB, appIcon: IMDB_APP_ICON },
  {
    name: ROTTEN_TOMATOES,
    appIcon: ROTTEN_TOMATOES_APP_ICON,
  },
];

type SlidersParams = {
  filmaffinity_minimum_rating?: number;
  imdb_minimum_rating?: number;
  filmaffinity_minimum_num_votes?: number;
  imdb_minimum_num_votes?: number;
};

const SLIDER_DEFAULT_PARAMS = {
  filmaffinity_minimum_rating: 5,
  imdb_minimum_rating: 6,
  filmaffinity_minimum_num_votes: 1000,
  imdb_minimum_num_votes: 3000,
};

export const RATING_PLATFORMS_SLIDERS = ({
  widget_id,
  params,
}: {
  widget_id: string;
  params: SlidersParams;
}) => {
  const _params = { ...SLIDER_DEFAULT_PARAMS, ...params };

  console.log("_params", _params)
  return {
    FILMAFFINITY: [
      {
        component: (slider: any) => FilmaffinitySliderComponent(slider),
        subtitle: "No quiero ver peliculas que tengan menos de una nota de ...",
        min: 0,
        max: 10,
        step: 0.1,
        defaultValue: _params.filmaffinity_minimum_rating,
        saveValue: (value: number) => {
          set_widget_filter({
            widget_id,
            filter_type: "rating",
            filter_data: {
              platform: FILMAFFINITY,
              filmaffinity_minimum_rating: value,
            },
            update: true
          });
        },
        valueLabelFormat: (value: number) => {
          return value;
        },
        marks: [
          {
            value: 0,
          },
          {
            value: 1,
          },
          {
            value: 2,
          },
          {
            value: 3,
          },
          {
            value: 4,
          },
          {
            value: 6,
          },
          {
            value: 6,
          },
          {
            value: 7,
          },
          {
            value: 8,
          },
          {
            value: 9,
          },
          {
            value: 10,
          },
        ],
      },
      {
        component: (slider: any) => FilmaffinitySliderComponent(slider),
        subtitle:
          "No quiero ver peliculas que tengan menos de este numero de votos ...",
        step: 100,
        min: 0,
        max: 10000,
        step: null,
        defaultValue: _params.filmaffinity_minimum_num_votes,
        valueLabelFormat: (value: number) => {
          return value;
        },
        saveValue: (value: number) => {
          set_widget_filter({
            widget_id,
            filter_type: "num_votes",
            filter_data: {
              platform: FILMAFFINITY,
              filmaffinity_minimum_num_votes: value,
            },
            update: true
          });
        },
        marks: [
          {
            value: 0,
          },
          {
            value: 50,
          },
          {
            value: 100,
          },
          {
            value: 200,
          },
          {
            value: 300,
          },
          {
            value: 400,
          },
          {
            value: 500,
          },
          {
            value: 750,
          },
          {
            value: 1000,
          },
          {
            value: 1500,
          },
          {
            value: 2000,
          },
          {
            value: 3000,
          },
          {
            value: 4000,
          },
          {
            value: 5000,
          },
          {
            value: 6000,
          },
          {
            value: 7000,
          },
          {
            value: 8000,
          },
          {
            value: 9000,
          },
          {
            value: 10000,
          },
        ],
      },
    ],
    IMDB: [
      {
        component: (slider: any) => ImdbSliderComponent(slider),
        subtitle: "No quiero ver peliculas que tengan menos de una nota de ...",
        min: 0,
        max: 10,
        step: 0.1,
        defaultValue: _params.imdb_minimum_rating,
        valueLabelFormat: (value: number) => {
          return value;
        },
        saveValue: (value: number) => {
          set_widget_filter({
            widget_id,
            filter_type: "rating",
            filter_data: {
              platform: IMDB,
              imdb_minimum_rating: value,
            },
            update: true
          });
        },
        marks: [
          {
            value: 0,
          },
          {
            value: 1,
          },
          {
            value: 2,
          },
          {
            value: 3,
          },
          {
            value: 4,
          },
          {
            value: 6,
          },
          {
            value: 6,
          },
          {
            value: 7,
          },
          {
            value: 8,
          },
          {
            value: 9,
          },
          {
            value: 10,
          },
        ],
      },
      {
        component: (slider: any) => ImdbSliderComponent(slider),
        subtitle:
          "No quiero ver peliculas que tengan menos de este numero de votos ...",
        step: 100,
        min: 0,
        max: 10000,
        step: null,
        defaultValue: _params.imdb_minimum_num_votes,
        valueLabelFormat: (value: number) => {
          return value;
        },
        saveValue: (value: number) => {
          set_widget_filter({
            widget_id,
            filter_type: "rating",
            filter_data: {
              platform: IMDB,
              imdb_minimum_num_votes: value,
            },
            update: true
          });
        },
        marks: [
          {
            value: 0,
          },
          {
            value: 50,
          },
          {
            value: 100,
          },
          {
            value: 200,
          },
          {
            value: 300,
          },
          {
            value: 400,
          },
          {
            value: 500,
          },
          {
            value: 750,
          },
          {
            value: 1000,
          },
          {
            value: 1500,
          },
          {
            value: 2000,
          },
          {
            value: 3000,
          },
          {
            value: 5000,
          },
          {
            value: 10000,
          },
        ],
      },
    ],
    ROTTEN_TOMATOES: [],
  };
};
export default RATING_PLATFORMS;
