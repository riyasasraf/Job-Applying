import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function AddressSection({ personalInfo, onChange }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label
          htmlFor="personalInfo.country"
          className="block text-sm font-medium text-gray-900"
        >
          Country
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="personalInfo.country"
            name="personalInfo.country"
            value={personalInfo.country}
            onChange={onChange}
            autoComplete="country-name"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
            <option>India</option>
          </select>
          <ChevronDownIcon
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="personalInfo.streetAddress"
          className="block text-sm font-medium text-gray-900"
        >
          Street address
        </label>
        <div className="mt-2">
          <input
            id="personalInfo.streetAddress"
            name="personalInfo.streetAddress"
            type="text"
            value={personalInfo.streetAddress}
            onChange={onChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-2 sm:col-start-1">
        <label
          htmlFor="personalInfo.city"
          className="block text-sm font-medium text-gray-900"
        >
          City
        </label>
        <div className="mt-2">
          <input
            id="personalInfo.city"
            name="personalInfo.city"
            type="text"
            value={personalInfo.city}
            onChange={onChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="personalInfo.region"
          className="block text-sm font-medium text-gray-900"
        >
          State / Province
        </label>
        <div className="mt-2">
          <input
            id="personalInfo.region"
            name="personalInfo.region"
            type="text"
            value={personalInfo.region}
            onChange={onChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="personalInfo.postalCode"
          className="block text-sm font-medium text-gray-900"
        >
          ZIP / Postal code
        </label>
        <div className="mt-2">
          <input
            id="personalInfo.postalCode"
            name="personalInfo.postalCode"
            type="text"
            value={personalInfo.postalCode}
            onChange={onChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
