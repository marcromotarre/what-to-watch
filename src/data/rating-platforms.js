import { get_widget_filter, set_widget_filter } from "@/utils/widget/configuration";
import FILMAFFINITY_APP_ICON from "../../src/images/ranking-platforms/filmaffinity/filmaffinity-app-icon.png";
import IMDB_APP_ICON from "../../src/images/ranking-platforms/imdb/imdb-app-icon.png";
import ROTTEN_TOMATOES_APP_ICON from "../../src/images/ranking-platforms/rotten-tomatoes/rotten-tomatoes-app-icon.png";
import FilmaffinitySlider, {
  FilmaffinitySliderComponent,
} from "../components/sliders/filmaffinity-slider";
import ImdbSlider, {
  ImdbSliderComponent,
} from "../components/sliders/imdb-slider";
import { BASE_URL } from "../states/user-state";

const FILMAFFINITY = "FILMAFFINITY"
const IMDB = "IMDB"
const ROTTEN_TOMATOES = "ROTTEN_TOMATOES"

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




export const RATING_PLATFORMS_SLIDERS = ({ widget_id, default_values = {default_rating: default_rating} }) => {
  return {
    FILMAFFINITY: [
      {
        component: (slider) => FilmaffinitySliderComponent(slider),
        subtitle: "No quiero ver peliculas que tengan menos de una nota de ...",
        min: 0,
        max: 10,
        step: 0.1,
        defaultValue: default_values.default_rating? default_values.default_rating : 5,
        saveValue: (value) => {
          set_widget_filter({
            widget_id,
            filter_type: "rating",
            filter_data: {
              platform: FILMAFFINITY,
              minimum_rating: value,
            },
          });
        },
        valueLabelFormat: (value) => {
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
        component: (slider) => FilmaffinitySliderComponent(slider),
        subtitle:
          "No quiero ver peliculas que tengan menos de este numero de votos ...",
        step: 100,
        min: 0,
        max: 10000,
        step: null,
        defaultValue: 5,
        valueLabelFormat: (value) => {
          return value;
        },
        saveValue: (value) => {
          console.log("change value", widget_id, value);
          /*const USER_PARAMS_URL = `${BASE_URL}api/user-params`;
          setUserRankingPlatforms({
            ...userRankingPlatforms,
            FILMAFFINITY: {
              ...userRankingPlatforms.FILMAFFINITY,
              minimum_votes_value: value,
            },
          });
          axios.post(
            USER_PARAMS_URL,
            {
              filmaffinityMinimumVotesValue: value,
            },
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );*/
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
        component: (slider) => ImdbSliderComponent(slider),
        subtitle: "No quiero ver peliculas que tengan menos de una nota de ...",
        min: 0,
        max: 10,
        step: 0.1,
        defaultValue: 0,
        valueLabelFormat: (value) => {
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
        component: (slider) => ImdbSliderComponent(slider),
        subtitle:
          "No quiero ver peliculas que tengan menos de este numero de votos ...",
        step: 100,
        min: 0,
        max: 10000,
        step: null,
        defaultValue: 0,
        valueLabelFormat: (value) => {
          return value;
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
