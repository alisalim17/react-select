import React, { useEffect, useState } from "react";

interface ISelectOption {
  value?: string;
  label?: string;
}

interface ISelectProps {
  value?: ISelectOption;
  options: ISelectOption[];
  onChange: (value: ISelectOption | undefined) => void;
}

const Select: React.FC<ISelectProps> = ({ onChange, options, value }) => {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const handleClear = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    onChange(undefined);
  };

  const handleSelect = (option) => {
    onChange(option);
  };

  const isOptionSelected = (option) => option === value?.label;
  const isOptionHighlighted = (index) => index === highlightedIndex;

  const handleMouseEnter = (index: number) => setHighlightedIndex(index);

  // setting highlighted index every time when menu is closed
  useEffect(() => {
    setHighlightedIndex(0);
  }, [open]);

  return (
    <div
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
      tabIndex={0}
      className="relative w-80 min-h-[1.5em] border border-gray-[#777] flex items-center gap-2 p-2 outline-none rounded-sm focus:border-blue-500"
    >
      <span className="flex-grow">{value?.label}</span>
      <button
        onClick={handleClear}
        className="hover:focus:text-red-500 outline-none"
      >
        &times;
      </button>
      <div className="bg-[#777]/60 self-stretch w-[1px]"></div>
      <div className="caret"></div>
      <ul
        className={`options ${
          open
            ? `overflow-y-auto overflow-x-hidden max-h-[15em] absolute w-full left-0 z-50 top-[calc(100%_+_1rem)] border p-2`
            : "hidden"
        }`}
      >
        {options.map((option, i) => (
          <li
            onClick={() => handleSelect(option)}
            className={`${isOptionSelected(option.label) ? "bg-red-500" : ""} 
            ${isOptionHighlighted(i) ? "bg-blue-500" : ""}
              p-2`}
            onMouseEnter={() => handleMouseEnter(i)}
            key={`${option.value}-${i}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
