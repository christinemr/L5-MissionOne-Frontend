import React from "react";

export default function PredictionResult({ label, confidence }) {
  return (
    <div className="font-mono text-slate-300">
      <h3 className="text-lg font-bold text-lime-400">Prediction Result:</h3>
      <p>Type of vehicle: {label}</p>
      {confidence && <p>Accuracy: {confidence}%</p>}
    </div>
  );
}
