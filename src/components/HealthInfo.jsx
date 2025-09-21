import React, {
  useContext,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { AppContext } from "../main.jsx";
import { Minus, Plus, File } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const HealthInfo = forwardRef((props, ref) => {
  const { darkMode } = useContext(AppContext);
  const { form, handleChange, healthInfoRef } = useOutletContext();

  const [units, setUnits] = useState({ weight: "kg", height: "cm" });
  const [showResults, setShowResults] = useState(false);
  const [bmiDetails, setBmiDetails] = useState({
    bmi: "",
    category: "",
    healthyRange: "",
    healthyWeightRange: "",
    bmiPrime: "",
    ponderalIndex: "",
  });

  const [conditions, setConditions] = useState(
    form.healthInfo.medicalConditions?.length
      ? form.healthInfo.medicalConditions
      : [{ id: Date.now(), name: "", suggestion: "", file: null }]
  );

  const disableBlocks = conditions.length >= 10; // example max 10 conditions

  // Expose validation to parent via ref
  useImperativeHandle(ref, () => ({
    validateStep: () => {
      if (!form.healthInfo.weight || !form.healthInfo.height)
        return "Please enter weight and height.";
      if (form.healthInfo.hasConditions === "yes") {
        if (conditions.some((c) => !c.name.trim()))
          return "Please fill out all medical condition names.";
      }
      return null;
    },
  }));

  const syncConditionsToForm = (updatedConditions) => {
    handleChange("healthInfo")({
      target: { name: "medicalConditions", value: updatedConditions },
    });
  };

  const calculateBMI = () => {
    let weightKg = parseFloat(form.healthInfo.weight) || 0;
    let heightM = parseFloat(form.healthInfo.height) || 0;

    if (units.weight === "lbs") weightKg *= 0.453592;
    if (units.height === "cm") heightM /= 100;
    else if (units.height === "in") heightM *= 0.0254;
    else if (units.height === "ft") heightM *= 0.3048;

    if (weightKg > 0 && heightM > 0) {
      const bmi = weightKg / (heightM * heightM);
      const bmiRounded = bmi.toFixed(2);
      const category =
        bmi < 18.5
          ? "Underweight"
          : bmi < 25
          ? "Normal"
          : bmi < 30
          ? "Overweight"
          : "Obese";

      const minKg = 18.5 * heightM * heightM;
      const maxKg = 25 * heightM * heightM;
      const weightRange =
        units.weight === "lbs"
          ? `${(minKg * 2.20462).toFixed(1)} lbs - ${(maxKg * 2.20462).toFixed(
              1
            )} lbs`
          : `${minKg.toFixed(1)} kg - ${maxKg.toFixed(1)} kg`;

      const bmiPrime = (bmi / 25).toFixed(2);
      const ponderalIndex = (weightKg / Math.pow(heightM, 3)).toFixed(1);

      setBmiDetails({
        bmi: bmiRounded,
        category,
        healthyRange: "18.5 – 25 kg/m²",
        healthyWeightRange: weightRange,
        bmiPrime,
        ponderalIndex: `${ponderalIndex} kg/m³`,
      });

      handleChange("healthInfo")({
        target: { name: "bmi", value: bmiRounded },
      });
    } else {
      setBmiDetails({
        bmi: "",
        category: "",
        healthyRange: "",
        healthyWeightRange: "",
        bmiPrime: "",
        ponderalIndex: "",
      });
      handleChange("healthInfo")({ target: { name: "bmi", value: "" } });
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [form.healthInfo.weight, form.healthInfo.height, units]);

  const addCondition = () => {
    if (disableBlocks) return;
    const newCond = { id: Date.now(), name: "", suggestion: "", file: null };
    const updated = [...conditions, newCond];
    setConditions(updated);
    syncConditionsToForm(updated);
  };

  const deleteCondition = (id) => {
    if (conditions.length <= 1) return;
    const updated = conditions.filter((c) => c.id !== id);
    setConditions(updated);
    syncConditionsToForm(updated);
  };

  const updateCondition = (id, field, value) => {
    const updated = conditions.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    setConditions(updated);
    syncConditionsToForm(updated);
  };

  const handleMedicalConditionToggle = (value) => {
    handleChange("healthInfo")({ target: { name: "hasConditions", value } });
    if (value === "yes") {
      const newCond = [
        { id: Date.now(), name: "", suggestion: "", file: null },
      ];
      setConditions(newCond);
      syncConditionsToForm(newCond);
    } else {
      setConditions([]);
      syncConditionsToForm([]);
    }
  };

  return (
    <div
      className={`relative  min-h-[300px]  w-[clamp(320px,90%,500px)] rounded-xl p-6 z-10 transition-all ${
        darkMode
          ? "bg-softblack text-white shadow-[4px_4px_15px_#111111,-4px_-4px_15px_#2a2a2a]"
          : "bg-mustard-light text-softblack shadow-blk"
      }`}
    >
      {/* Weight & Height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="flex gap-2 flex-1">
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={form.healthInfo.weight || ""}
            onChange={handleChange("healthInfo")}
            className={`px-4 py-2 rounded-lg border w-full ${
              darkMode
                ? "bg-mustard-dark text-white border-mustard-dark"
                : "bg-white text-softblack border-softblack"
            }`}
            required
          />
          <select
            value={units.weight}
            onChange={(e) => setUnits({ ...units, weight: e.target.value })}
            className={`px-2 py-2 rounded-lg border text-sm ${
              darkMode
                ? "bg-mustard-dark text-white border-mustard-dark"
                : "bg-white text-softblack border-softblack"
            }`}
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>

        <div className="flex gap-2 flex-1">
          <input
            type="number"
            name="height"
            placeholder="Height"
            value={form.healthInfo.height || ""}
            onChange={handleChange("healthInfo")}
            className={`px-4 py-2 rounded-lg border w-full ${
              darkMode
                ? "bg-mustard-dark text-white border-mustard-dark"
                : "bg-white text-softblack border-softblack"
            }`}
            required
          />
          <select
            value={units.height}
            onChange={(e) => setUnits({ ...units, height: e.target.value })}
            className={`px-2 py-2 rounded-lg border text-sm ${
              darkMode
                ? "bg-mustard-dark text-white border-mustard-dark"
                : "bg-white text-softblack border-softblack"
            }`}
          >
            <option value="cm">cm</option>
            <option value="m">m</option>
            <option value="in">in</option>
            <option value="ft">ft</option>
          </select>
        </div>

        <input
          type="text"
          name="bmi"
          placeholder="BMI"
          value={form.healthInfo.bmi || ""}
          readOnly
          className={`px-4 py-2 rounded-lg border w-full ${
            darkMode
              ? "bg-mustard-dark text-white border-mustard-dark"
              : "bg-white text-softblack border-softblack"
          }`}
        />
      </div>

      {/* Toggle BMI Results */}
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => setShowResults(!showResults)}
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            darkMode
              ? "bg-mustard-dark text-white hover:bg-mustard-light"
              : "bg-softblack text-white hover:bg-mustard-dark"
          }`}
        >
          {showResults ? "Hide Results" : "See Results"}
        </button>
      </div>

      {showResults && (
        <div
          className={`rounded-lg border px-4 py-3 mb-6 h-[120px] overflow-y-auto text-sm ${
            darkMode
              ? "bg-mustard-dark text-white border-mustard-light"
              : "bg-white text-softblack border-softblack"
          }`}
        >
          {bmiDetails.bmi ? (
            <div>
              <p>
                <strong>Status:</strong> {bmiDetails.category}
              </p>
              <p>
                <strong>Healthy BMI range:</strong> {bmiDetails.healthyRange}
              </p>
              <p>
                <strong>Healthy weight for height:</strong>{" "}
                {bmiDetails.healthyWeightRange}
              </p>
              <p>
                <strong>BMI Prime:</strong> {bmiDetails.bmiPrime}
              </p>
              <p>
                <strong>Ponderal Index:</strong> {bmiDetails.ponderalIndex}
              </p>
            </div>
          ) : (
            <p className="opacity-70 italic">
              Enter weight & height to see BMI details…
            </p>
          )}
        </div>
      )}

      {/* Medical Condition Question */}
      <div className="mb-4">
        <p className="font-semibold text-sm sm:text-base mb-2">
          Do you have existing medical conditions?
        </p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="hasConditions"
              value="yes"
              checked={form.healthInfo.hasConditions === "yes"}
              onChange={() => handleMedicalConditionToggle("yes")}
              className="accent-mustard-dark w-5 h-5"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="hasConditions"
              value="no"
              checked={form.healthInfo.hasConditions === "no"}
              onChange={() => handleMedicalConditionToggle("no")}
              className="accent-mustard-dark w-5 h-5"
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {/* Conditions Container */}
      {form.healthInfo.hasConditions === "yes" && (
        <div className="blocks-container max-h-[50vh] overflow-y-auto w-full">
          {conditions.map((cond) => (
            <div
              key={cond.id}
              className={`relative rounded-lg p-4 mb-4 border ${
                darkMode
                  ? "bg-softblack text-white border-mustard-light"
                  : "bg-white text-softblack border-softblack"
              }`}
            >
              {/* Delete button */}
              <button
                type="button"
                onClick={() => deleteCondition(cond.id)}
                disabled={conditions.length === 1}
                className={`absolute top-2 right-2 rounded-lg transition ${
                  conditions.length === 1
                    ? "opacity-50 cursor-not-allowed"
                    : darkMode
                    ? "hover:bg-mustard-light text-white"
                    : "hover:bg-mustard-light text-softblack"
                }`}
              >
                <Minus className="w-6 h-6" />
              </button>

              {/* Condition Name */}
              <input
                type="text"
                placeholder="Condition Name"
                value={cond.name}
                onChange={(e) =>
                  updateCondition(cond.id, "name", e.target.value)
                }
                className={`mt-3 mb-3 px-3 py-2 rounded-lg border w-full ${
                  darkMode
                    ? "bg-softblack text-white border-mustard-light"
                    : "bg-white text-softblack border-softblack"
                }`}
                required
              />

              {/* Suggestions */}
              <textarea
                placeholder="Suggestions / Notes"
                value={cond.suggestion}
                onChange={(e) =>
                  updateCondition(cond.id, "suggestion", e.target.value)
                }
                rows={3}
                className={`mb-3 px-3 py-2 rounded-lg border w-full resize-none ${
                  darkMode
                    ? "bg-softblack text-white border-mustard-light"
                    : "bg-white text-softblack border-softblack"
                }`}
              />

              {/* File Upload */}
              <div className="flex items-center gap-2">
                <File />
                <input
                  type="file"
                  onChange={(e) =>
                    updateCondition(cond.id, "file", e.target.files[0])
                  }
                  className={`w-full text-sm cursor-pointer hover:text-mustard-dark ${
                    darkMode ? "text-white" : "text-softblack"
                  }`}
                />
              </div>
            </div>
          ))}

          {/* Add More Button */}
          <div className="flex justify-end mb-2">
            <button
              type="button"
              onClick={addCondition}
              disabled={disableBlocks}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                disableBlocks
                  ? "opacity-50 cursor-not-allowed"
                  : darkMode
                  ? "bg-mustard-dark text-white hover:bg-mustard-light"
                  : "bg-softblack text-white hover:bg-mustard-dark"
              }`}
            >
              <Plus className="w-5 h-5" /> Add More
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default HealthInfo;
