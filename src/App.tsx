import React, { useEffect, useState } from "react";
import axios from "axios";
import BrandSelect from "./components/BrandSelect";
import ModelSelect from "./components/ModelSelect";
import GenerationSelect from "./components/GenerationSelect";
import EngineSelect from "./components/EngineSelect";
import EngineSpecs from "./components/EngineSpecs";
import EngineChart from "./components/EngineChart";
import DynoCurveChart from "./components/DynoCurveChart";

interface Brand {
  id: number;
  name: string;
  models: Model[];
}

interface Model {
  id: number;
  name: string;
  brand_ID: number;
}

interface Generation {
  id: number;
  name: string;
}

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

const App: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [engines, setEngines] = useState<Engine[]>([]);

  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [selectedGenerationId, setSelectedGenerationId] = useState<
    number | null
  >(null);
  const [selectedEngineId, setSelectedEngineId] = useState<number | null>(null);

  const [selectedEngine, setSelectedEngine] = useState<Engine | null>(null);

  // Load brands on mount
  useEffect(() => {
    axios.get("/brands").then((res) => {
      setBrands(res.data);
      console.log("📦 Brands:", res.data);
    });
  }, []);

  // Get models from selected brand
  useEffect(() => {
    const brand = brands.find((b) => b.id === selectedBrandId);
    setModels(brand?.models || []);
    setSelectedModelId(null);
    setGenerations([]);
    setEngines([]);
    setSelectedGenerationId(null);
    setSelectedEngineId(null);
    setSelectedEngine(null);
  }, [selectedBrandId, brands]);

  // Fetch generations from API based on model
  useEffect(() => {
    if (selectedModelId) {
      axios.get(`/generations/${selectedModelId}`).then((res) => {
        setGenerations(res.data);
        console.log("📦 Generations:", res.data);
        setSelectedGenerationId(null);
        setEngines([]);
        setSelectedEngineId(null);
        setSelectedEngine(null);
      });
    }
  }, [selectedModelId]);

  // Fetch engines from API based on generation
  useEffect(() => {
    if (selectedGenerationId) {
      axios.get(`/engines/generation/${selectedGenerationId}`).then((res) => {
        setEngines(res.data);
        console.log("📦 Engines:", res.data);
        setSelectedEngineId(null);
        setSelectedEngine(null);
      });
    }
  }, [selectedGenerationId]);

  // Select engine
  useEffect(() => {
    const engine = engines.find((e) => e.id === selectedEngineId) || null;
    setSelectedEngine(engine);
  }, [selectedEngineId, engines]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🚗 Car Tuning Configurator</h1>

      <BrandSelect
        brands={brands}
        selectedBrandId={selectedBrandId}
        onChange={setSelectedBrandId}
      />

      {models.length > 0 && (
        <ModelSelect
          models={models}
          selectedModelId={selectedModelId}
          onChange={setSelectedModelId}
        />
      )}

      {generations.length > 0 && (
        <GenerationSelect
          generations={generations}
          selectedGenerationId={selectedGenerationId}
          onChange={setSelectedGenerationId}
        />
      )}

      {engines.length > 0 && (
        <EngineSelect
          engines={engines}
          selectedEngineId={selectedEngineId}
          onChange={setSelectedEngineId}
        />
      )}

      {selectedEngine && (
        <>
          <EngineSpecs engine={selectedEngine} />
          <EngineChart
            powerOriginal={selectedEngine.power_Original}
            powerTuned={selectedEngine.power_Tuned}
            torqueOriginal={selectedEngine.torque_Original}
            torqueTuned={selectedEngine.torque_Tuned}
          />
          <DynoCurveChart
            powerOriginal={selectedEngine.power_Original}
            powerTuned={selectedEngine.power_Tuned}
            torqueOriginal={selectedEngine.torque_Original}
            torqueTuned={selectedEngine.torque_Tuned}
          />
        </>
      )}
    </div>
  );
};

export default App;
