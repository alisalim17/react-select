import { useState } from "react";
import Select from "../components/Select";

const OPTIONS = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
  { label: "Sixth", value: 6 },
  { label: "Sixth", value: 6 },
  { label: "Sixth", value: 6 },
  { label: "Sixth", value: 6 },
  { label: "Sixth", value: 6 },
  { label: "Sixth", value: 6 },
  { label: "Sixth", value: 6 },
  { label: "Sixth", value: 6 },
  { label: "Sixth", value: 6 },
  { label: "Sixth", value: 6 },
  { label: "Sixth", value: 6 },
];

export default function Home() {
  const [value, setValue] = useState(OPTIONS[0]);
  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <Select
        options={OPTIONS}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
}
