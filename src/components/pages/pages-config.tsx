const pages_config: PagesConfig = {
  "/": {
    applyMargin: false,
    showBottomMenu: true,
  },
};

export const get_page_config = (route: string): PageConfig => {
  const pg: PageConfig = pages_config[route];
  return pg ? { ...DEFAULT_PAGE_CONFIG, ...pg } : DEFAULT_PAGE_CONFIG;
};

type PagesConfig = {
  [key: string]: PageConfig;
};

type PageConfig = {
  applyMargin?: boolean;
  showBottomMenu?: boolean;
};

const DEFAULT_PAGE_CONFIG: PageConfig = {
  applyMargin: true,
  showBottomMenu: true,
};
