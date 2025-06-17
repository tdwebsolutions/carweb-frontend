import React from "react";

interface Brand {
  id: number;
  name: string;
}

interface Props {
  brands: Brand[];
  selectedBrandId: number | null;
  onChange: (id: number) => void;
}

const BrandSelect: React.FC<Props> = ({
  brands,
  selectedBrandId,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">Brand:</label>
    <select
      value={selectedBrandId ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">-- Select Brand --</option>
      {Array.isArray(brands) &&
        brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
    </select>
  </div>
);

export default BrandSelect;
