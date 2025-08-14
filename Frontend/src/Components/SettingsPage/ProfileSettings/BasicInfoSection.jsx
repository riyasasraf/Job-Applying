import React from "react";

export default function BasicInfoSection({ personalInfo, about, onChange }) {

  return (
    
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label
          htmlFor="personalInfo.firstName"
          className="block text-sm font-medium text-gray-900"
        >
          First name
        </label>
        <div className="mt-2">
          <input
            id="personalInfo.firstName"
            name="personalInfo.firstName"
            type="text"
            value={personalInfo.firstName}
            onChange={onChange}
            className="block w-full rounded-md p-1.5 border border-gray-500 shadow-sm sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor="personalInfo.lastName"
          className="block text-sm font-medium text-gray-900"
        >
          Last name
        </label>
        <div className="mt-2">
          <input
            id="personalInfo.lastName"
            name="personalInfo.lastName"
            type="text"
            value={personalInfo.lastName}
            onChange={onChange}
            className="block w-full rounded-md p-1.5 border border-gray-500 shadow-sm sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-4">
        <label
          htmlFor="personalInfo.email"
          className="block text-sm font-medium text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="personalInfo.email"
            name="personalInfo.email"
            type="email"
            value={personalInfo.email}
            onChange={onChange}
            className="block w-full rounded-md p-1.5 border border-gray-500 shadow-sm sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="personalInfo.phone"
          className="block text-sm font-medium text-gray-900"
        >
          Phone Number
        </label>
        <div className="mt-2">
          <input
            id="personalInfo.phone"
            name="personalInfo.phone"
            type="tel"
            value={personalInfo.phone}
            onChange={onChange}
            className="block w-full rounded-md p-1.5 border border-gray-500 shadow-sm sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor="personalInfo.linkedin"
          className="block text-sm font-medium text-gray-900"
        >
          LinkedIn Profile URL
        </label>
        <div className="mt-2">
          <input
            id="personalInfo.linkedin"
            name="personalInfo.linkedin"
            type="url"
            value={personalInfo.linkedin}
            onChange={onChange}
            placeholder="https://linkedin.com/in/yourprofile"
            className="block w-full rounded-md p-1.5 border border-gray-500 shadow-sm sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor="personalInfo.portfolio"
          className="block text-sm font-medium text-gray-900"
        >
          Portfolio/Website URL
        </label>
        <div className="mt-2">
          <input
            id="personalInfo.portfolio"
            name="personalInfo.portfolio"
            type="url"
            value={personalInfo.portfolio}
            onChange={onChange}
            placeholder="https://yourportfolio.com"
            className="block w-full rounded-md p-1.5 border border-gray-500 shadow-sm sm:text-sm"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-900"
        >
          About (Professional Summary)
        </label>
        <div className="mt-2">
          <textarea
            id="about"
            name="about"
            rows={4}
            value={about}
            onChange={onChange}
            className="block w-full rounded-md p-1.5 border border-gray-500 shadow-sm sm:text-sm"
            placeholder="Write a few sentences about your professional background and goals."
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          This will serve as your professional summary on the resume.
        </p>
      </div>
    </div>
  );
}
