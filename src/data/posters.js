import BorderPoster from "../components/posters/border-poster";
import RoundedPoster from "../components/posters/rounded-poster";

const POSTERS = [
  {
    name: "RECTANGULAR_WITH_WHITE_BORDER",
    component: ({ name, image, styles }) => (
      <BorderPoster name={name} image={image} styles={styles}></BorderPoster>
    ),
  },
  {
    name: "ROUNDED",
    component: ({ name, image, styles }) => (
      <RoundedPoster name={name} image={image} styles={styles}></RoundedPoster>
    ),
  },
];


export default POSTERS;
