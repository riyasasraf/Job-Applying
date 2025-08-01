import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";

export default function WorkExperienceSection({
  workExperience,
  onChange,
  addItem,
  removeItem,
}) {
  return (
    <div className="mt-10 space-y-8">
      {workExperience.map((job, index) => (
        <div
          key={job.id}
          className="p-4 rounded-md relative"
        >
          <h3 className="text-lg font-semibold mb-3">Job {index + 1}</h3>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            aria-label="Remove job"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={job.jobTitle}
                onChange={(e) => onChange(index, e)}
                className="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={job.companyName}
                onChange={(e) => onChange(index, e)}
                className="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="month"
                name="startDate"
                value={job.startDate}
                onChange={(e) => onChange(index, e)}
                className="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="month"
                name="endDate"
                value={job.endDate}
                onChange={(e) => onChange(index, e)}
                className="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Achievements (one per line)
              </label>
              <textarea
                name="achievements"
                rows={4}
                value={job.achievements}
                onChange={(e) => onChange(index, e)}
                className="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm"
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
            jobTitle: "",
            companyName: "",
            startDate: "",
            endDate: "",
            achievements: "",
          })
        }
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Add Work Experience
      </button>
    </div>
  );
}
