import React, { useContext, forwardRef, useImperativeHandle } from "react";
import { AppContext } from "../main.jsx";
import { Minus, Plus } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const GeneralInfo = forwardRef((props, ref) => {
  const { darkMode } = useContext(AppContext);
  const { form, handleChange } = useOutletContext();

  // If empty, fall back to one default relative
  const relatives =
    form.generalInfo?.contacts?.length > 0
      ? form.generalInfo.contacts
      : [
          {
            id: Date.now(),
            name: "",
            relationship: "",
            address: "",
            phone: "",
          },
        ];

  // Expose validation method to parent
  useImperativeHandle(ref, () => ({
    validateStep: () => {
      const filledRelatives = relatives.filter(
        (r) =>
          r.name.trim() ||
          r.relationship.trim() ||
          r.address.trim() ||
          r.phone.trim()
      );
      if (filledRelatives.length === 0) {
        return "Please provide at least one guardian/contact.";
      }
      return null;
    },
  }));

  // Update parent form.generalInfo.contacts
  const updateContacts = (newContacts) => {
    handleChange("generalInfo")({
      target: { name: "contacts", value: newContacts },
    });
  };

  const addRelative = () => {
    updateContacts([
      ...relatives,
      { id: Date.now(), name: "", relationship: "", address: "", phone: "" },
    ]);
  };

  const deleteRelative = (id) => {
    if (relatives.length > 1) {
      updateContacts(relatives.filter((rel) => rel.id !== id));
    }
  };

  const updateRelative = (id, field, value) => {
    updateContacts(
      relatives.map((rel) => (rel.id === id ? { ...rel, [field]: value } : rel))
    );
  };

  return (
    <div
      className={`relative min-h-[300px] w-[clamp(320px,90%,650px)] rounded-xl p-6 z-10 transition-all overflow-auto
        ${
          darkMode
            ? "bg-softblack text-white shadow-[4px_4px_15px_#111111,-4px_-4px_15px_#2a2a2a]"
            : "bg-mustard-light text-softblack shadow-blk"
        }`}
    >
      {/* Header */}
      <h2 className="text-lg font-bold mb-4">
        Please input your guardian or emergency contact information
      </h2>

      {/* Relatives container */}
      <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 mb-6">
        {relatives.map((rel) => (
          <div
            key={rel.id}
            className={`relative rounded-lg p-4 pr-12 border ${
              darkMode
                ? "bg-softblack border-mustard-light"
                : "bg-white border-softblack"
            }`}
          >
            {/* Delete button */}
            <button
              type="button"
              onClick={() => deleteRelative(rel.id)}
              disabled={relatives.length === 1}
              className={`absolute top-2 right-2 rounded-lg transition 
                ${
                  relatives.length === 1
                    ? "opacity-40 cursor-not-allowed"
                    : darkMode
                    ? "hover:bg-mustard-light text-white"
                    : "hover:bg-mustard-light text-softblack"
                }`}
            >
              <Minus className="w-5 h-5" />
            </button>

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={rel.name}
              onChange={(e) => updateRelative(rel.id, "name", e.target.value)}
              className={`mb-3 px-3 py-2 rounded-lg border w-full ${
                darkMode
                  ? "bg-softblack text-white border-mustard-light"
                  : "bg-white text-softblack border-softblack"
              }`}
            />

            {/* Relationship */}
            <input
              type="text"
              placeholder="Relationship (e.g. Guardian, Brother, Aunt)"
              value={rel.relationship}
              onChange={(e) =>
                updateRelative(rel.id, "relationship", e.target.value)
              }
              className={`mb-3 px-3 py-2 rounded-lg border w-full ${
                darkMode
                  ? "bg-softblack text-white border-mustard-light"
                  : "bg-white text-softblack border-softblack"
              }`}
            />

            {/* Address */}
            <textarea
              placeholder="Address"
              value={rel.address}
              onChange={(e) =>
                updateRelative(rel.id, "address", e.target.value)
              }
              rows={2}
              className={`mb-3 px-3 py-2 rounded-lg border w-full resize-none ${
                darkMode
                  ? "bg-softblack text-white border-mustard-light"
                  : "bg-white text-softblack border-softblack"
              }`}
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone Number"
              value={rel.phone}
              onChange={(e) => updateRelative(rel.id, "phone", e.target.value)}
              className={`px-3 py-2 rounded-lg border w-full ${
                darkMode
                  ? "bg-softblack text-white border-mustard-light"
                  : "bg-white text-softblack border-softblack"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Add more button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addRelative}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition
            ${
              darkMode
                ? "bg-mustard-dark text-white hover:bg-mustard-light"
                : "bg-white text-softblack border border-softblack hover:bg-mustard-light"
            }`}
        >
          <Plus className="w-5 h-5" /> Add More
        </button>
      </div>
    </div>
  );
});

export default GeneralInfo;
