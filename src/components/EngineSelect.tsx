import React from "react";

interface Engine {
  id: number;
  name: string;
}

interface Props {
  engines: Engine[];
  selectedEngineId: number | null;
  onChange: (id: number) => void;
}

const EngineSelect: React.FC<Props> = ({
  engines,
  selectedEngineId,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">Engine:</label>
    <select
      value={selectedEngineId ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">-- Select Engine --</option>
      {Array.isArray(engines) &&
        engines.map((engine) => (
          <option key={engine.id} value={engine.id}>
            {engine.name}
          </option>
        ))}
    </select>
  </div>
);

export default EngineSelect;
