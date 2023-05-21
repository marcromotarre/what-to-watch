import genres from "@/scrap/own/results/own-genres.json";
import { Widget, WidgetFilter } from "@/interfaces/Widget";
import { set_widget_filter } from "@/utils/widget/configuration";

export const FILTERS_BY_GENRE = genres;

const apply_filter_genre = ({
  widget_id,
  widgets,
  set_widgets,
  options,
  option,
}) => {
  const clicked_option = options.find(({ id }) => option.id === id);
  clicked_option.selected = !clicked_option.selected;
  const modified_widgets = set_widget_filter({
    widget_id,
    widgets,
    filter_type: "genres",
    filter_data: {
      genres: options
        .filter(({ selected }) => selected)
        .map(({ id }) => parseInt(id)),
      filter_type: "SOME",
    },
  });
  set_widgets(modified_widgets);
};

export const get_filters = (widgetFilters: Array<WidgetFilter>) => {
  return [
    {
      name: "Filtrar por genero",
      options: Object.keys(genres).map((genre_key) => ({
        id: genre_key,
        name: genres[genre_key],
        selected: widgetFilters
          .map(
            ({ type, data }) =>
              type === "genres" && data.genres.includes(parseInt(genre_key))
          )
          .some((a) => a),
        click: ({ widget_id, widgets, set_widgets, options, option }) => {
          apply_filter_genre({
            widget_id,
            widgets,
            set_widgets,
            options,
            option,
          });
        },
      })),
    },
    {
      name: "Filtrar por Año",
      options: [
        "Peliculas de la decada de los 50",
        "Peliculas de la decada de los 60",
        "Peliculas de la decada de los 70",
        "Peliculas de la decada de los 80",
        "Peliculas de la decada de los 90",
        "Peliculas de los 2000",
        "Peliculas de esta decada",
        "Peliculas del año pasado",
        "Peliculas de este año"
      ].map(value => ({})),
      click: ({ widget_id, widgets, set_widgets, options, option }) => {
        apply_filter_genre({
          widget_id,
          widgets,
          set_widgets,
          options,
          option,
        });
      },
    },
  ];
};
