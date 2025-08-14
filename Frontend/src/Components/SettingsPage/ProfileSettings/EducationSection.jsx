import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";

export default function EducationSection({
  education,
  onChange,
  addItem,
  removeItem,
}) {
  return (
    <div className="mt-10 space-y-8">
      {education.map((edu, index) => (
        <div
          key={edu.id}
          className="p-4 rounded-md relative "
        >
          <h3 className="text-lg font-semibold mb-3">Education {index + 1}</h3>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            aria-label="Remove education"
          >
            <TrashIcon className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Degree/Program
              </label>
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => onChange(index, e)}
                className="mt-1 block w-full p-1.5 rounded-md border border-gray-500 shadow-sm sm:text-sm"
              />
            </div>

            <div className="sm:col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Branch/Field of Study
              </label>
              <input
                type="text"
                name="branch"
                value={edu.branch}
                onChange={(e) => onChange(index, e)}
                className="mt-1 block w-full p-1.5 rounded-md border border-gray-500 shadow-sm sm:text-sm"
              />
            </div>

            <div className="sm:col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => onChange(index, e)}
                className="mt-1 block w-full p-1.5 rounded-md border border-gray-500 shadow-sm sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Graduation Date
              </label>
              <input
                type="month"
                name="graduationDate"
                value={edu.graduationDate}
                onChange={(e) => onChange(index, e)}
                className="mt-1 block w-full p-1.5 rounded-md border border-gray-500 shadow-sm sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                GPA (Optional)
              </label>
              <input
                type="text"
                name="gpa"
                value={edu.gpa}
                onChange={(e) => onChange(index, e)}
                className="mt-1 block w-full p-1.5 rounded-md border border-gray-500 shadow-sm sm:text-sm"
                placeholder="e.g., 3.8/4.0"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          addItem({
            id: Date.now(),
            degree: "",
            branch: "",
            institution: "",
            graduationDate: "",
            gpa: "",
          })
        }
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Add Education
      </button>
    </div>
  );
}
