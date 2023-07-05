import React from "react";

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
}) => {
  const steps = [
    "Basic Details",
    "Address",
    "File Upload",
    "Multi File Upload",
    "Status",
  ];

  return (
    <div className="w-full bg-gray-200 rounded-md">
      <div className="flex h-2 bg-blue-500 rounded-md">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex-1 ${
              index < currentStep ? "bg-blue-500" : "bg-white"
            }`}
          ></div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm">
        {steps.map((step, index) => (
          <div key={step} className="flex-1 text-center">
            <span
              className={`${
                index === currentStep ? "font-semibold" : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
