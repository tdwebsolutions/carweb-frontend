import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  powerOriginal: number;
  powerTuned: number;
  torqueOriginal: number;
  torqueTuned: number;
}

const DynoCurveChart: React.FC<Props> = ({
  powerOriginal,
  powerTuned,
  torqueOriginal,
  torqueTuned,
}) => {
  const rpmPoints = [
    1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000,
  ];

  const generateRealisticTorqueCurve = (maxTorque: number) =>
    rpmPoints.map((rpm) => {
      let factor = 0;
      if (rpm < 1500) factor = 0.5;
      else if (rpm < 2000) factor = 0.8;
      else if (rpm < 3000) factor = 1.0;
      else if (rpm < 4000) factor = 0.95;
      else if (rpm < 5000) factor = 0.85;
      else if (rpm < 5500) factor = 0.7;
      else factor = 0.5;

      return Math.round(maxTorque * factor);
    });

  const torqueOriginalCurve = generateRealisticTorqueCurve(torqueOriginal);
  const torqueTunedCurve = generateRealisticTorqueCurve(torqueTuned);

  const powerOriginalCurve = rpmPoints.map((rpm, i) =>
    Math.round((torqueOriginalCurve[i] * rpm) / 7127)
  );
  const powerTunedCurve = rpmPoints.map((rpm, i) =>
    Math.round((torqueTunedCurve[i] * rpm) / 7127)
  );

  const data = rpmPoints.map((rpm, i) => ({
    rpm,
    torqueOriginal: torqueOriginalCurve[i],
    torqueTuned: torqueTunedCurve[i],
    powerOriginal: powerOriginalCurve[i],
    powerTuned: powerTunedCurve[i],
  }));

  return (
    <div className="bg-white dark:bg-gray-900 p-4 mt-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        📈 Dyno Curve (Realistic Simulation)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="rpm" tick={{ fill: "#9CA3AF" }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="torqueOriginal"
            stroke="#60A5FA"
            name="Torque Original"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="torqueTuned"
            stroke="#EF4444"
            name="Torque Tuned"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="powerOriginal"
            stroke="#3B82F6"
            strokeDasharray="5 5"
            name="Power Original"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="powerTuned"
            stroke="#DC2626"
            strokeDasharray="5 5"
            name="Power Tuned"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default DynoCurveChart;
