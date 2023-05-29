const pages_config: PagesConfig = {
  "/": {
    sidePadding: false,
  },
  "/widget/[id]":{
  } 

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
};

const DEFAULT_PAGE_CONFIG: PageConfig = {
  sidePadding: true,
  showBottomMenu: true,
  paddingTop: true,
};
