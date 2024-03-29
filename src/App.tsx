import { FlyToInterpolator } from "@deck.gl/core/typed";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { IconLayer } from "@deck.gl/layers/typed";
import DeckGL from "@deck.gl/react/typed";
import { useRef, useState } from "react";
import Map from "react-map-gl";
import { useQuery, useQueryClient } from "react-query";
import About from "./components/About";
import Controls from "./components/Controls";
import HistogramAxis from "./components/HisogramAxis";
import HistogramPicker from "./components/HistogramPicker";
import InfoModal from "./components/InfoModal";
import Legend from "./components/Legend";
import PriceInput from "./components/PriceInput";
import Search from "./components/Search";
import Settings from "./components/Settings";
import { data } from "./data/histogram";
import { getRgb } from "./utils/colors";
import { getResults, Result } from "./utils/geocoding";
import useDebounce from "./utils/useDebounce";
import { useGetBins } from "./utils/useGetBins";
import useOnClickOutside from "./utils/useOnClickOutside";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const initialViewState = {
  longitude: -73.645,
  latitude: 45.56,
  zoom: 11,
  pitch: 0,
  bearing: -57.2,
};

interface Info {
  address: string;
  id: string;
  area: string;
  layerName: string;
  price: number;
  psqft: number;
}

export interface ModalInfo {
  coordinates: [long: number, lat: number];
  info: Info;
}

function App() {
  const queryClient = useQueryClient();
  const [viewState, setViewState] = useState<any>(initialViewState);
  const mapStyle = {
    light: "mapbox://styles/mapbox/light-v10",
    dark: "mapbox://styles/mapbox/dark-v10",
  };
  const [price, setPrice] = useState<number>(320000);
  const [target, setTarget] = useState<number>(320000);
  const range: [number, number, number] = [0.05, 0.15, 0.3];
  const { bins } = useGetBins({ target: target, range: range });
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLInputElement>(null);
  const svgRef = useRef();
  const [modalInfo, setModalInfo] = useState<ModalInfo>();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedSearchParams = useDebounce(inputValue, 300);
  const { data: results, isLoading } = useQuery(
    ["addresses", debouncedSearchParams],
    () =>
      getResults({
        search: debouncedSearchParams,
        token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      }),
    { enabled: Boolean(debouncedSearchParams) }
  );
  const [showResutls, setShowResults] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleHideResults = () => {
    setShowResults(false);
  };

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const queryString = event.currentTarget.value;
    setInputValue(queryString);
    if (queryString === "") {
      setSearchResult([]);
    }
  };

  const handleOnSelected = (result: Result) => {
    setShowResults(false);
    setSearchResult([
      {
        coordinates: result.center,
      },
    ]);
    const [long, lat] = result.center;
    const newViewState = {
      longitude: long,
      latitude: lat,
      zoom: 20,
      pitch: 0,
      bearing: -57.2,
    };

    setViewState({
      ...newViewState,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const handleClose = () => setIsOpen(false);

  const handleZoomOut = () => {
    setViewState({
      ...initialViewState,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  useOnClickOutside(settingsRef, () => setSettingsOpen(false));

  const handleSetSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSetTarget = (event: any) => {
    const value = event.currentTarget.value;
    setTarget(value);
    window.scrollTo(0, 0);
    console.log(range);
  };

  const handleUpdatePrice = (value: number) => {
    setPrice(value);
  };
  const handleUpdateTarget = (value: number) => {
    setTarget(value);
  };

  const layers = [
    new MVTLayer({
      id: "values",
      data: `https://a.tiles.mapbox.com/v4/mappingmtl.anlfff5k/{z}/{x}/{y}.vector.pbf?access_token=${
        import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
      }`,
      getFillColor: (d: any) => getRgb(d.properties.price, bins),
      getLineWidth: 1,
      lineWidthUnits: "pixels",
      pickable: true,
      autoHighlight: true,
      uniqueIdProperty: "id",
      onClick: (info: any) => {
        setModalInfo({
          coordinates: info.coordinate,
          info: info.object.properties,
        });
        setIsOpen(true);
      },
      updateTriggers: {
        getFillColor: { bins },
      },
    }),
    new IconLayer({
      id: "icon-layer",
      data: searchResult,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      iconAtlas:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
      iconMapping: ICON_MAPPING,
      getIcon: () => "marker",
      sizeScale: 15,
      getPosition: (d: any) => d.coordinates,
      getSize: () => 6,
      getColor: () => [255, 99, 71],
    }),
  ];
  return (
    <div className="h-screen w-screen">
      <InfoModal
        modalInfo={modalInfo}
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <Legend
        target={target}
        range={range}
        handleSetSettingsOpen={handleSetSettingsOpen}
      />
      <Settings isSettingsOpen={isSettingsOpen} ref={settingsRef}>
        <PriceInput target={target} handleSetTarget={handleSetTarget} />
        <HistogramPicker
          svgRef={svgRef}
          width={232}
          height={118}
          data={data}
          color="#475569"
          highlightColor="coral"
          muteColor="coral"
          strokeColor="#475569"
          fillColor="#94a3b8"
          initialValue={target}
          handleUpdatePrice={handleUpdatePrice}
          handleUpdateTarget={handleUpdateTarget}
        />
        <HistogramAxis values={["$0", "$300K", "$600K", "$900K", "$1.2M"]} />
      </Settings>
      <About />
      <Search
        results={results}
        handleOnChange={handleOnChange}
        handleHideResults={handleHideResults}
        handleShowResults={handleShowResults}
        showResults={showResutls}
        handleOnSelected={handleOnSelected}
        inputValue={inputValue}
      />
      <Controls handleZoomOut={handleZoomOut} />
      <DeckGL
        layers={layers as any}
        initialViewState={viewState}
        controller={true}
      >
        <Map
          mapStyle={mapStyle.light}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </div>
  );
}

export default App;
