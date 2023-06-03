const pages_config: PagesConfig = {
  "/": {
    sidePadding: false,
    paddingTop: false,
  },
  "/widget/[id]": {
    back: "/widget",
  },
  "/platforms": {
    back: "/configuracion",
  },
  "/widget": {
    back: "/configuracion",
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
  sidePadding?: boolean;
  showBottomMenu?: boolean;
  paddingTop?: boolean;
  back?: string;
};

const DEFAULT_PAGE_CONFIG: PageConfig = {
  sidePadding: true,
  showBottomMenu: true,
  paddingTop: true,
};
