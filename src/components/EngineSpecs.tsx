import React from "react";

interface Engine {
  id: number;
  name: string;
  tunable: boolean;
  power_Original: number;
  power_Tuned: number;
  power_Increase: number;
  torque_Original: number;
  torque_Tuned: number;
  torque_Increase: number;
  cylinderCapacity: string;
  compression: string;
  typeECU: string;
  boreXStroke: string;
  engineCode: string;
}

interface Props {
  engine: Engine;
}

const EngineSpecs: React.FC<Props> = ({ engine }) => {
  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-xl font-bold mb-3">🔧 Engine Specs: {engine.name}</h3>
      <table className="w-full text-left border-collapse">
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="font-semibold">Engine Code</td>
            <td>{engine.engineCode || "—"}</td>
          </tr>
          <tr>
            <td className="font-semibold">Tunable</td>
            <td>{engine.tunable ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="font-semibold">Original Power</td>
            <td>{engine.power_Original} HP</td>
          </tr>
          <tr>
            <td className="font-semibold">Tuned Power</td>
            <td>
              {engine.power_Tuned} HP (+{engine.power_Increase})
            </td>
          </tr>
          <tr>
            <td className="font-semibold">Original Torque</td>
            <td>{engine.torque_Original} Nm</td>
          </tr>
          <tr>
            <td className="font-semibold">Tuned Torque</td>
            <td>
              {engine.torque_Tuned} Nm (+{engine.torque_Increase})
            </td>
          </tr>
          <tr>
            <td className="font-semibold">Displacement</td>
            <td>{engine.cylinderCapacity}</td>
          </tr>
          <tr>
            <td className="font-semibold">Compression</td>
            <td>{engine.compression}</td>
          </tr>
          <tr>
            <td className="font-semibold">ECU Type</td>
            <td>{engine.typeECU || "—"}</td>
          </tr>
          <tr>
            <td className="font-semibold">Bore x Stroke</td>
            <td>{engine.boreXStroke}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EngineSpecs;
