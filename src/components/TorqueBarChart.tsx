import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  original: number;
  tuned: number;
}

const TorqueBarChart: React.FC<Props> = ({ original, tuned }) => {
  const data = [
    { name: "Original", value: original },
    { name: "Stage 1", value: tuned },
  ];

  const colors = {
    Original: "#1f2937", // gray-800
    "Stage 1": "#ef4444", // red-500
  };

  return (
    <div className="border rounded-lg shadow p-4">
      <h2 className="font-semibold text-lg mb-2">Torque (HP)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[entry.name as keyof typeof colors]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm">
        <p>
          Original: <strong>{original} hp</strong>
        </p>
        <p className="text-red-600">
          Tuned: <strong>{tuned} hp</strong>
        </p>
        <p>
          Difference: <strong>{tuned - original} hp</strong>
        </p>
      </div>
    </div>
  );
};

export default TorqueBarChart;
