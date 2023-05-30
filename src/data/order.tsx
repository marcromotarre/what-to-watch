export const ORDER: ORDER_TYPE = [
  { identity: "popularity", name: "popularidad" },
  { identity: "rating", name: "nota" },
  { identity: "num_votes", name: "numero de votos" },
  { identity: "year", name: "año" },
];

type ORDER_TYPE = Array<any>;

export const DEFAULT_ORDER = ["year", "popularity", "num_votes", "rating"];
