import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="bg-white rounded-lg shadow-md px-10 pt-5 pb-10 my mx-auto max-w-4xl mt-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step Item */}
            <div className="flex items-center relative">
              {/* Icon/Number */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all
                  ${
                    currentStep === step.number
                      ? "border-indigo-600 text-indigo-600 font-bold"
                      : currentStep > step.number
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "border-gray-300 text-gray-500"
                  }
                `}
              >
                {currentStep > step.number ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <span className="text-sm">{step.number}</span>
                )}
              </div>

              {/* Show name ONLY on current step */}
              {currentStep === step.number && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-indigo-600">
                  {step.name}
                </div>
              )}
            </div>

            {/* Separator Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 mx-4 h-0.5 ${
                  currentStep > step.number ? "bg-indigo-600" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
