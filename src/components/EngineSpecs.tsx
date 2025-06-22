import React from "react";

interface Props {
  engine: {
    cylinderCapacity: string;
    compression: string;
    typeECU: string;
    boreXStroke: string;
    engineCode: string;
  };
}

const EngineSpecs: React.FC<Props> = ({ engine }) => (
  <div className="border rounded-lg shadow p-4">
    <h2 className="bg-red-600 text-white text-lg font-bold p-2">
      Engine specifications
    </h2>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <strong>Displacement</strong>
        <br />
        {engine.cylinderCapacity}
      </div>
      <div>
        <strong>Compression ratio</strong>
        <br />
        {engine.compression}
      </div>
      <div>
        <strong>ECU</strong>
        <br />
        {engine.typeECU}
      </div>
      <div>
        <strong>Bore x Stroke</strong>
        <br />
        {engine.boreXStroke}
      </div>
      <div>
        <strong>Engine code</strong>
        <br />
        {engine.engineCode}
      </div>
    </div>
  </div>
);

export default EngineSpecs;
