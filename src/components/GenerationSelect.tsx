import React from "react";

interface Generation {
  id: number;
  name: string;
}

interface Props {
  generations: Generation[];
  selectedGenerationId: number | null;
  onChange: (id: number) => void;
}

const GenerationSelect: React.FC<Props> = ({
  generations,
  selectedGenerationId,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">Generation:</label>
    <select
      value={selectedGenerationId ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">-- Select Generation --</option>
      {Array.isArray(generations) &&
        generations.map((gen) => (
          <option key={gen.id} value={gen.id}>
            {gen.name}
          </option>
        ))}
    </select>
  </div>
);

export default GenerationSelect;
