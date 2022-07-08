interface Geometry {
  type: string;
  coordinates: [long: number, lat: number];
}

export interface Feature {
  type: "FeatureCollection";
  features: [
    {
      type: "Feature";
      id: number;
      geometry: Geometry;
      properties: {
        address: string;
        id: string;
        area: string;
        price: number;
        psqft: number;
      };
    }
  ];
}

export const empty = { type: "FeatureCollection", features: [] };

export const getTile = (lon: string, lat: string, token: string) =>
  `https://api.mapbox.com/v4/mappingmtl.anlfff5k/tilequery/${lon},${lat}.json?access_token=${token}`;
