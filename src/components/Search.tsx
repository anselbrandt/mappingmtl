import { useRef } from "react";
import { Result } from "../utils/geocoding";
import useOnClickOutside from "../utils/useOnClickOutside";

interface SearchProps {
  handleOnChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handleHideResults: () => void;
  handleShowResults: () => void;
  handleOnSelected: (result: Result) => void;
  showResults: boolean;
  inputValue: string | undefined;
  results: Result[] | undefined;
}

const Search: React.FC<SearchProps> = ({
  handleOnChange,
  handleHideResults,
  handleShowResults,
  handleOnSelected,
  showResults,
  inputValue,
  results,
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => handleHideResults());

  return (
    <div
      ref={ref}
      className="absolute z-10 top-0 left-1/2 p-2 m-4 rounded-lg text-center"
    >
      <input
        onChange={handleOnChange}
        onFocus={handleShowResults}
        value={inputValue}
        placeholder="search"
      />
      <div className="bg-white">
        {showResults &&
          results &&
          results.length !== 0 &&
          results.map((result) => (
            <div
              key={result.id}
              className="hover:cursor-pointer hover:text-orange-500"
              onClick={() => handleOnSelected(result)}
            >
              {result.place_name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
