interface QueryParams {
  /** URI Encoded search string */
  encodedSearch: string;
  /** Mapbox API Token */
  token: string;
}

const queryUrl = ({ encodedSearch, token }: QueryParams) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSearch}.json?country=ca&types=address&access_token=${token}`;

type Coordinates = [long: number, lat: number];

interface Geometry {
  type: string;
  coordinates: Coordinates;
}

interface Context {
  id: string;
  wikidata: string;
  short_code: string;
  text: string;
}

export interface Result {
  id: string;
  /** Street name */
  text: string;
  /** Full adress */
  place_name: string;
  center: Coordinates;
  geometry: Geometry;
  /** Street number */
  address: string;
  context: Context[];
}

interface Query {
  search: string | undefined;
  /** Mapbox API Token */
  token: string;
}

export const getResults = async ({ search, token }: Query) => {
  if (!search) return;
  const encodedSearch = encodeURIComponent(search);
  const response = await fetch(queryUrl({ encodedSearch, token }));
  const json = await response.json();
  const features = json.features as Result[];
  return features;
};
