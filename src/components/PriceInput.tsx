import { FC } from "react";

interface PriceInputProps {
  target: number;
  handleSetTarget: (event: any) => void;
}

const PriceInput: FC<PriceInputProps> = ({ target, handleSetTarget }) => {
  return (
    <div className="m-2">
      <div className="ml-2">Target Price</div>
      <span>
        $
        <input
          className="text-black"
          type="number"
          step="10000"
          value={target}
          onChange={handleSetTarget}
        ></input>
      </span>
    </div>
  );
};

export default PriceInput;
