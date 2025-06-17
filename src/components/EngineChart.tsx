import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface Props {
  powerOriginal: number;
  powerTuned: number;
  torqueOriginal: number;
  torqueTuned: number;
}

const EngineChart: React.FC<Props> = ({
  powerOriginal,
  powerTuned,
  torqueOriginal,
  torqueTuned,
}) => {
  const data = [
    {
      name: "Power (HP)",
      Standard: powerOriginal,
      Tuned: powerTuned,
    },
    {
      name: "Torque (Nm)",
      Standard: torqueOriginal,
      Tuned: torqueTuned,
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">📊 Tuning Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap={30}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Standard" fill="#3b82f6" name="Standard">
            <LabelList dataKey="Standard" position="top" />
          </Bar>
          <Bar dataKey="Tuned" fill="#ef4444" name="Tuned">
            <LabelList dataKey="Tuned" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngineChart;
