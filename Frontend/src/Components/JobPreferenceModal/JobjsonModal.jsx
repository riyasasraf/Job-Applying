import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid"; // For the close icon


export default function Jobjsonmodal({ isOpen, onClose, onSearch }) {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [employmentType, setEmploymentType] = useState([]); // Can be multiple
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [keywords, setKeywords] = useState("");

  if (!isOpen) return null;

const handleSearchSubmit = (e) => {
  e.preventDefault();
  const preferences = {
    jobTitle: jobTitle.trim(),
    location: location.trim(),
    experienceLevel,
    employmentType,
    minSalary: minSalary ? parseInt(minSalary) : null,
    maxSalary: maxSalary ? parseInt(maxSalary) : null,
    keywords: keywords
      .split(",")
      .map((kw) => kw.trim())
      .filter(Boolean), // turns to array
  };

  onSearch(preferences);
  onClose();
};

  

  const handleEmploymentTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setEmploymentType((prev) => [...prev, value]);
    } else {
      setEmploymentType((prev) => prev.filter((type) => type !== value));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-4 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full p-1 transition-colors"
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Set Job Preferences
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Tell us what kind of jobs you're looking for to get personalized
          results.
        </p>

        <form onSubmit={handleSearchSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title / Role
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Software Engineer, Marketing Manager"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York, Remote, India"
              className="mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label
              htmlFor="experienceLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Experience Level
            </label>
            <select
              id="experienceLevel"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select an option</option>
              <option value="entry">Entry Level</option>
              <option value="associate">Associate</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="director">Director</option>
              <option value="executive">Executive</option>
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type
            </span>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="full-time"
                  checked={employmentType.includes("full-time")}
                  onChange={handleEmploymentTypeChange}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-900">Full-time</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="part-time"
                  checked={employmentType.includes("part-time")}
                  onChange={handleEmploymentTypeChange}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-900">Part-time</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="contract"
                  checked={employmentType.includes("contract")}
                  onChange={handleEmploymentTypeChange}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-900">Contract</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="internship"
                  checked={employmentType.includes("internship")}
                  onChange={handleEmploymentTypeChange}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-900">Internship</span>
              </label>
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary Range (Annual)
            </label>
            <div className="mt-1 flex space-x-4">
              <input
                type="number"
                id="minSalary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="Min Salary"
                className="block w-1/2 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                type="number"
                id="maxSalary"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                placeholder="Max Salary"
                className="block w-1/2 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label
              htmlFor="keywords"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Keywords
            </label>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., AI, Machine Learning, Remote"
              className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate multiple keywords with commas.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search Jobs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
