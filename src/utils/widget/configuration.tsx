import { Widget, WidgetFilter, Widgets } from "@/interfaces/Widget";

export const copy_widgets = (widgets: Widgets): Widgets => {
  return JSON.parse(JSON.stringify(widgets));
};

export const save_widgets_to_local_storage = (widgets: Widgets): void => {
  localStorage.setItem("userWidgets", JSON.stringify(widgets));
};

export const get_widgets = (widgets?: Widgets): Widgets => {
  if (widgets) return widgets;
  const _widgets = localStorage.getItem("userWidgets");
  if (_widgets) {
    return JSON.parse(_widgets);
  } else {
    return [];
  }
};

export const get_widget_index = ({
  widgets,
  widget_id,
}: {
  widgets?: Widgets;
  widget_id: string;
}) => {
  const _widgets = get_widgets(widgets);
  return _widgets.map(({ id }) => id).indexOf(widget_id);
};

export const get_widget_by_id = ({
  widgets,
  widget_id,
}: {
  widgets?: Widgets;
  widget_id: string;
}): Widget => {
  return get_widgets(widgets)[get_widget_index({ widgets, widget_id })];
};

export const set_widget_name = ({
  widget_id,
  widget_name,
}: {
  widget_id: string;
  widget_name: string;
}): Widgets => {
  const widgets = get_widgets();
  const widget_index = get_widget_index({ widget_id });
  widgets[widget_index].data.name = widget_name;
  save_widgets_to_local_storage(widgets);
  return widgets;
};

export const set_widget_poster_type = ({
  widget_id,
  widget_poster_type,
}: {
  widget_id: string;
  widget_poster_type: string;
}): Widgets => {
  const widgets = get_widgets();
  const widget_index = get_widget_index({ widget_id });
  widgets[widget_index].data.movie_poster.poster_type = widget_poster_type;
  save_widgets_to_local_storage(widgets);
  return widgets;
};



export const set_widget_chip = ({
  widget_id,
  widget_chip_name,
}: {
  widget_id: string;
  widget_chip_name: string;
}): Widgets => {
  const widgets = get_widgets();
  const widget_index = get_widget_index({ widget_id });
  widgets[widget_index].data.movie_poster.chip_name = widget_chip_name;
  save_widgets_to_local_storage(widgets);
  return widgets;
};


export const set_widget_rating_platform = ({
  widget_id,
  rating_platform,
}: {
  widget_id: string;
  rating_platform: string;
}) => {
  const widgets = get_widgets();
  const widget_index = get_widget_index({ widget_id });
  widgets[widget_index].data.rating_platform = rating_platform;
  save_widgets_to_local_storage(widgets);
  set_widget_filter({
    widget_id,
    filter_type: "rating",
    filter_data: {
      platform: rating_platform,
    },
    update: true
  });
  set_widget_filter({
    widget_id,
    filter_type: "num_votes",
    filter_data: {
      platform: rating_platform,
    },
    update: true
  });
  return widgets;
};

export const set_widget_order = ({
  widget_id,
  order,
}: {
  widget_id: string;
  order: Array<string>;
}) => {
  const widgets = get_widgets();
  const widget_index = get_widget_index({ widget_id });
  widgets[widget_index].data.order = order;
  save_widgets_to_local_storage(widgets);
  return widgets;
};

export const get_widget_filter = ({
  widget_id,
  filter_type,
}: {
  widget_id: string;
  filter_type: string;
}): WidgetFilter | undefined => {
  const widgets = get_widgets();
  const widget_index = get_widget_index({ widget_id });
  const filter = widgets[widget_index].data.filters.find(
    ({ type }) => type === filter_type
  );
  return filter;
};

export const set_widget_filter = ({
  widget_id,
  filter_type,
  filter_data,
  update = false
}: {
  widget_id: string;
  filter_type: string;
  filter_data: any;
  update?: boolean
}) => {
  const widgets = get_widgets();
  const widget_index = get_widget_index({ widget_id });
  const filter = widgets[widget_index].data.filters.find(
    ({ type }) => type === filter_type
  );
  if (!filter) {
    widgets[widget_index].data.filters.push({
      type: filter_type,
      data: filter_data,
    });
  } else {
    if (update) {
      filter.data = { ...filter.data, ...filter_data }
    } else {
      filter.data = filter_data;
    }
  }
  save_widgets_to_local_storage(widgets);
  return widgets;
};

export const set_widgets_order = ({
  widgets_order,
}: {
  widgets_order: Array<string>;
}): Widgets => {
  const widgets = get_widgets();
  const ordered_widgets: Widgets = [];
  widgets_order.forEach((widget_id) => {
    const widget_index = get_widget_index({ widget_id });
    ordered_widgets.push(widgets[widget_index]);
  });
  save_widgets_to_local_storage(ordered_widgets);
  return ordered_widgets;
};
