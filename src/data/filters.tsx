import genres from "@/scrap/own/results/own-genres.json";
import { Widget, WidgetFilter, Widgets } from "@/interfaces/Widget";
import { set_widget_filter } from "@/utils/widget/configuration";
import { Option } from "@/components/common/option";
import WidgetFilterGenres from "@/components/sections/configuration/filters.tsx/widget-filter-gernes";
import WidgetFilterYear from "@/components/sections/configuration/filters.tsx/widget-filter-year";
type GENRES_TYPE = {
  [key: string]: string
}
export const FILTERS_BY_GENRE = genres;

/*const apply_filter_genre = ({
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
    widget_id,
    filter_type: "genres",
    filter_data: {
      genres: options
        .filter(({ selected }: any) => selected)
        .map(({ id }: any) => parseInt(id)),
      filter_type: "SOME",
    },
  });
  set_widgets(modified_widgets);
};

const getExtraData = (widgetFilters: any) => {
  const filter = widgetFilters
    .find(
      ({ type }: any) =>
        type === "year")

  if (!filter) return {
    from: 1900,
    to: 0
  }
  console.log(filter)
  return filter.data
}*/

export const get_filters = (widgetFilters: Array<WidgetFilter>) => {
  const _genres: GENRES_TYPE = genres
  return [
   /* {
      name: "Filtrar por genero",
      rendered_component: (data: any) => <WidgetFilterGenres {...data} />,
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
    },*/
    {
      name: "Filtrar por Año",
      rendered_component: ()=> <WidgetFilterYear widget_id={"9e79ae94-46f3-45c0-9b9b-879aff2b618a"} />,
      option: [],
    },
  ];
};
