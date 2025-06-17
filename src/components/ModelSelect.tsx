import React from "react";

interface Model {
  id: number;
  name: string;
}

interface Props {
  models: Model[];
  selectedModelId: number | null;
  onChange: (id: number) => void;
}

const ModelSelect: React.FC<Props> = ({
  models,
  selectedModelId,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">Model:</label>
    <select
      value={selectedModelId ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">-- Select Model --</option>
      {Array.isArray(models) &&
        models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
    </select>
  </div>
);

export default ModelSelect;
