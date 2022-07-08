# MappingMTL

Interactive map showing property values in Montreal

Created with Vite, React, Deck.gl, and D3.js

Requires a Mapbox API Access Token for access to map tileset

```
yarn
&
yarn dev
```

Property assessment values were scraped from the City of Montreal website.

Geographic data came from Montreal's [open data site](https://donnees.montreal.ca/ville-de-montreal/unites-evaluation-fonciere).

Property data and geographic data were merged into a vector tileset with [mapbox
/
tippecanoe](https://github.com/mapbox/tippecanoe).
