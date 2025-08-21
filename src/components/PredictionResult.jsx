import React from "react";

export default function PredictionResult({ label, confidence }) {
  return (
    <div>
      <h3>Prediction Result:</h3>
      <p> Type of vehicle: {label}</p>
      {confidence && <p>Accuracy: {confidence}%</p>}
    </div>
  );
}
