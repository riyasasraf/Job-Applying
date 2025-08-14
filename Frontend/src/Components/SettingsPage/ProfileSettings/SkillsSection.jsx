import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function SkillsSection({ skills, onChange, onRemove }) {
  return (
    <div className="mt-10">
      <label
        htmlFor="skills-input"
        className="block text-sm font-medium text-gray-700"
      >
        Skills (Comma separated, e.g., React, JavaScript, Agile)
      </label>
      <input
        type="text"
        id="skills-input"
        value={skills.join(", ")}
        onChange={(e) =>
          onChange(e.target.value.split(",").map((s) => s.trim()))
        }
        className="mt-1 block w-full rounded-md px-3 py-3 border border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="e.g., Python, SQL, Project Management, Communication"
      />

      <div className="mt-2 flex flex-wrap gap-2">
        {skills
          .filter((s) => s)
          .map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="ml-2 -mr-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Remove skill</span>
                <TrashIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
      </div>
    </div>
  );
}
