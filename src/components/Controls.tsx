interface ControlsProps {
  handleZoomOut: () => void;
}

const Controls: React.FC<ControlsProps> = ({ handleZoomOut }) => {
  return (
    <div className="absolute z-10 top-0 right-0 p-2 m-2 rounded-lg text-center text-sm bg-slate-500 text-white">
      <button onClick={handleZoomOut}>Zoom Out</button>
    </div>
  );
};

export default Controls;
