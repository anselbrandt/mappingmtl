import { FlyToInterpolator } from "@deck.gl/core/typed";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import DeckGL from "@deck.gl/react/typed";
import { useRef, useState } from "react";
import Map from "react-map-gl";
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
import { useGetBins } from "./utils/useGetBins";
import useOnClickOutside from "./utils/useOnClickOutside";

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
    } as any),
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
          width={600}
          height={400}
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
      <Search />
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
