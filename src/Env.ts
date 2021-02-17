declare const process: {
  env: {
    [key: string]: string;
  };
};

export const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
