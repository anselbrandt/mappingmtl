# MappingMTL

Interactive map showing property values in Montreal

Live at [mappingmtl.anselbrandt.com](https://mappingmtl.anselbrandt.com/)

Created with Vite, React, Deck.gl, and D3.js

Requires a Mapbox API Access Token for access to map tileset, set as
`VITE_MAPBOX_ACCESS_TOKEN` (see `sample.env`)

```
yarn
&
yarn dev
```

Deployed to Cloudflare Pages from `master` by the pages-deploy timer on the
workstation; the production token is kept there, outside the repo.

Property assessment values were scraped from the City of Montreal website.

Geographic data came from Montreal's [open data site](https://donnees.montreal.ca/ville-de-montreal/unites-evaluation-fonciere).

Property data and geographic data were merged into a vector tileset with [mapbox
/
tippecanoe](https://github.com/mapbox/tippecanoe).
