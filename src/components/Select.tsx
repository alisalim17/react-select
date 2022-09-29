import React, { useEffect, useRef, useState } from "react";

interface ISelectOption {
  value?: string;
  label?: string;
}

interface IMultiSelectProps {
  multiple: true;
  value?: ISelectOption[];
  onChange: (value: ISelectOption[] | undefined) => void;
}

interface ISingleSelectProps {
  multiple?: false;
  value?: ISelectOption;
  onChange: (value: ISelectOption | undefined) => void;
}

type ISelectProps = {
  options: ISelectOption[];
} & (IMultiSelectProps | ISingleSelectProps);

const Select: React.FC<ISelectProps> = ({
  multiple,
  onChange,
  options,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>();
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  const handleClear = (e) => {
    // e.preventDefault();
    e.stopPropagation();

    onChange(multiple ? [] : undefined);
  };

  const handleSelect = (option) => {
    // preventing changing same option over and over
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (value !== option) onChange(option);
    }
  };

  const isOptionSelected = (option) => option === value?.label;
  const isOptionHighlighted = (index) => index === highlightedIndex;

  const handleMouseEnter = (index: number) => setHighlightedIndex(index);

  // setting highlighted index every time when menu is closed
  useEffect(() => {
    setHighlightedIndex(0);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      console.log(e.code);
      switch (e.code) {
        case "Space":
          setOpen((prev) => !prev);
          break;
        case "ArrowUp":
          // if (highlightedIndex === 0) return;
          setHighlightedIndex((prev) => prev - 1);
          console.log(highlightedIndex);
        // executeScroll();
        case "ArrowDown":
          // if (highlightedIndex === options?.length - 1) return;
          setHighlightedIndex(5);
          console.log(highlightedIndex);
        // executeScroll();

        default:
          break;
      }
    };
    containerRef?.current.addEventListener("keydown", handler);
    return () => containerRef?.current?.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
      tabIndex={0}
      className="relative w-80 min-h-[1.5em] border border-gray-[#777] flex items-center gap-2 p-2 outline-none rounded-sm focus:border-blue-500"
    >
      <span className="flex-grow flex flex-wrap space-x-2 ">
        {multiple
          ? value.map(({ label }) => (
              <button className="bg-[#777] text-white rounded-lg p-1">
                {label}
              </button>
            ))
          : value?.label}
      </span>
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
            ref={i == highlightedIndex ? myRef : null}
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
