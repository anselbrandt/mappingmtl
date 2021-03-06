import React from "react";
import MapGL from "react-map-gl";
import { DeckGL, MVTLayer } from "deck.gl";
import getAccessToken from "./getAccessToken.js";
import getColor from "./getColor.js";

export default function Map({
  width,
  height,
  viewState,
  onViewStateChange,
  bins,
  handleSetPopupOpen,
}) {
  const layers = [
    new MVTLayer({
      id: "values",
      data: `https://a.tiles.mapbox.com/v4/mappingmtl.anlfff5k/{z}/{x}/{y}.vector.pbf?access_token=${getAccessToken()}`,
      getFillColor: (d) =>
        getColor(d.properties.price, bins)
          .replace("rgb(", "")
          .replace(")", "")
          .split(",")
          .map((value) => +value),
      getLineWidth: 1,
      lineWidthUnits: "pixels",
      pickable: true,
      autoHighlight: true,
      uniqueIdProperty: "id",
      onClick: (info) => handleSetPopupOpen(info.object.properties),
      updateTriggers: {
        getFillColor: { bins },
      },
    }),
  ];

  return (
    <div>
      <MapGL
        width={width}
        height={height}
        viewState={viewState}
        onViewStateChange={onViewStateChange}
      >
        <DeckGL
          viewState={viewState}
          layers={layers}
          getTooltip={({ object }) =>
            object && {
              html: `<div>
              <div >${
                object.properties.address
              }</div><div>$${object.properties.price.toLocaleString()}</div>
              </div>`,
              style: {
                backgroundColor: "#333",
                color: "gainsboro",
                fontSize: "1rem",
                borderRadius: ".25em",
              },
            }
          }
        />
      </MapGL>
    </div>
  );
}
