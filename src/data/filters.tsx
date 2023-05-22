import genres from "@/scrap/own/results/own-genres.json";
import { Widget, WidgetFilter, Widgets } from "@/interfaces/Widget";
import { set_widget_filter } from "@/utils/widget/configuration";
type GENRES_TYPE = {
    [key: string]: string
}
export const FILTERS_BY_GENRE = genres;

const apply_filter_genre = ({
  widget_id,
  widgets,
  set_widgets,
  options,
  option,
}: {
  widget_id: string;
  widgets: Widgets;
  set_widgets: any;
  options: any;
  option: any;
}) => {
  const clicked_option = options.find(({ id }: any) => option.id === id);
  clicked_option.selected = !clicked_option.selected;
  const modified_widgets = set_widget_filter({
    widgets,
    widget_id,
    filter_type: "genres",
    order: [],
    filter_data: {
      genres: options
        .filter(({ selected }: any) => selected)
        .map(({ id }: any) => parseInt(id)),
      filter_type: "SOME",
    },
  });
  set_widgets(modified_widgets);
};

export const get_filters = (widgetFilters: Array<WidgetFilter>) => {
  const _genres: GENRES_TYPE = genres
  return [
    {
      name: "Filtrar por genero",
      options: Object.keys(genres).map((genre_key: string) => {
        const genre = _genres[genre_key];
        return {
          id: genre_key,
          name: genre,
          selected: widgetFilters
            .map(
              ({ type, data }: any) =>
                type === "genres" && data.genres.includes(parseInt(genre_key))
            )
            .some((a) => a),
          click: ({
            widget_id,
            widgets,
            set_widgets,
            options,
            option,
          }: any) => {
            apply_filter_genre({
              widget_id,
              widgets,
              set_widgets,
              options,
              option,
            });
          },
        };
      }),
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
        "Peliculas de este año",
      ].map((value) => ({})),
      click: ({ widget_id, widgets, set_widgets, options, option }: any) => {
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
