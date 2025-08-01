import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function PhotoUploadSection({ profilePhoto, coverPhoto, onFileChange }) {
  return (
    <div className="mt-10 space-y-8">
      {/* Profile Photo */}
      <div className="col-span-full">
        <label
          htmlFor="profilePhoto"
          className="block text-sm font-medium text-gray-900"
        >
          Profile Photo
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          {profilePhoto ? (
            <img
              src={URL.createObjectURL(profilePhoto)}
              alt="Profile"
              className="size-12 rounded-full object-cover"
            />
          ) : (
            <UserCircleIcon className="size-12 text-gray-300" />
          )}
          <input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            className="hidden"
            onChange={onFileChange}
            accept="image/*"
          />
          <label
            htmlFor="profilePhoto"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer"
          >
            Change
          </label>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="col-span-full">
        <label
          htmlFor="coverPhoto"
          className="block text-sm font-medium text-gray-900"
        >
          Cover Photo
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            {coverPhoto ? (
              <img
                src={URL.createObjectURL(coverPhoto)}
                alt="Cover"
                className="mx-auto h-24 w-auto object-cover rounded-md"
              />
            ) : (
              <PhotoIcon className="mx-auto size-12 text-gray-300" />
            )}
            <div className="mt-4 flex text-sm text-gray-600">
              <label
                htmlFor="coverPhoto"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="coverPhoto"
                  name="coverPhoto"
                  type="file"
                  className="sr-only"
                  onChange={onFileChange}
                  accept="image/*"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
