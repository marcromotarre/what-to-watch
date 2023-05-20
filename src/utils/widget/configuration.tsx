import { Widgets } from "@/interfaces/Widget";

export const copy_widgets = (widgets: Widgets): Widgets => {
  return JSON.parse(JSON.stringify(widgets));
};

export const save_widgets_to_local_storage = (widgets: Widgets): void => {
  localStorage.setItem("userWidgets", JSON.stringify(widgets));
};

export const set_widget_name = ({
  widgets,
  widget_id,
  widget_name,
}: {
  widgets: Widgets;
  widget_id: string;
  widget_name: string;
}): Widgets => {
  const _widgets = copy_widgets(widgets);
  _widgets[widget_id].data.name = widget_name;
  save_widgets_to_local_storage(_widgets);
  return _widgets;
};

export const set_widget_ranking_platform = ({
  widgets,
  widget_id,
  ranking_platform,
}: {
  widgets: Widgets;
  widget_id: string;
  ranking_platform: string;
}) => {
  const _widgets = copy_widgets(widgets);
  _widgets[widget_id].data.rating_platform = ranking_platform;
  save_widgets_to_local_storage(_widgets);
  return _widgets;
};

export const set_widget_order = ({
  widgets,
  widget_id,
  order,
}: {
  widgets: Widgets;
  widget_id: string;
  order: Array<string>;
}) => {
  const _widgets = copy_widgets(widgets);
  _widgets[widget_id].data.order = order;
  save_widgets_to_local_storage(_widgets);
  return _widgets;
};


export const set_widget_filter = ({
  widgets,
  widget_id,
  filter_type,
  filter_data
}: {
  widgets: Widgets;
  widget_id: string;
  order: Array<string>;
}) => {
  const _widgets = copy_widgets(widgets);

  // check if filter already exist
  const filter = _widgets[widget_id].data.filters.find(({type}) => type === filter_type)
  if(!filter) {
    _widgets[widget_id].data.filters.push({type: filter_type, data: filter_data})
  } else {
    filter.data = filter_data
  }
  save_widgets_to_local_storage(_widgets);
  return _widgets;
};
