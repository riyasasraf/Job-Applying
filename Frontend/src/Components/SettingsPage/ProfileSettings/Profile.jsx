import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"; // Added PlusIcon and TrashIcon

export default function Profile() {
  // Master state for all profile data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    about: "",
    profilePhoto: null, // For file objects
    coverPhoto: null, // For file objects
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "", // Added phone number
      linkedin: "", // Added LinkedIn
      portfolio: "", // Added portfolio/website
      country: "United States", // Default
      streetAddress: "",
      city: "",
      region: "",
      postalCode: "",
    },
    workExperience: [
      // Example initial entry
      {
        id: Date.now(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      // Example initial entry
      {
        id: Date.now() + 1,
        degree: "",
        major: "",
        institution: "",
        graduationDate: "",
        gpa: "",
      },
    ],
    skills: [], // Array of strings or objects {name: 'React', level: 'Expert'}
    projects: [], // Array of project objects
    // ... add more sections as needed based on resume requirements
    notifications: {
      email: {
        comments: true,
        candidates: false,
        offers: true,
      },
      push: "everything", // "everything", "same-as-email", "nothing"
    },
  });
   
   // Generic handler for nested state updates
   const handleChange = (e) => {
     const { name, value, type, checked } = e.target;
     const keys = name.split("."); // Split name by dot for nested properties

     setFormData((prevData) => {
       let newData = { ...prevData };
       let currentLevel = newData;

       for (let i = 0; i < keys.length - 1; i++) {
         const key = keys[i];
         if (!currentLevel[key]) {
           currentLevel[key] = {}; // Initialize if not exists
         }
         currentLevel = currentLevel[key];
       }

       // Handle different input types
       if (type === "checkbox") {
         currentLevel[keys[keys.length - 1]] = checked;
       } else if (type === "radio") {
         currentLevel[keys[keys.length - 1]] = value;
       } else {
         currentLevel[keys[keys.length - 1]] = value;
       }
       return newData;
     });
   };

   // Handler for file inputs
   const handleFileChange = (e) => {
     const { name, files } = e.target;
     if (files && files[0]) {
       setFormData((prevData) => ({
         ...prevData,
         [name]: files[0], // Store the File object
       }));
     } else {
       setFormData((prevData) => ({
         ...prevData,
         [name]: null,
       }));
     }
   };

   // Handler for array type fields (e.g., workExperience, education)
   const handleArrayChange = (arrayName, index, event) => {
     const { name, value } = event.target;
     setFormData((prevData) => {
       const newArray = [...prevData[arrayName]];
       newArray[index] = { ...newArray[index], [name]: value };
       return { ...prevData, [arrayName]: newArray };
     });
   };

   // Function to add a new item to an array (e.g., new job, new education)
   const addItem = (arrayName, newItem) => {
     setFormData((prevData) => ({
       ...prevData,
       [arrayName]: [...prevData[arrayName], newItem],
     }));
   };

   // Function to remove an item from an array
   const removeItem = (arrayName, indexToRemove) => {
     setFormData((prevData) => ({
       ...prevData,
       [arrayName]: prevData[arrayName].filter(
         (_, index) => index !== indexToRemove
       ),
     }));
   };

   // Function to remove an item from a simple array (like skills)
   const removeItemFromArray = (arrayName, indexToRemove) => {
     setFormData((prevData) => ({
       ...prevData,
       [arrayName]: prevData[arrayName].filter(
         (_, index) => index !== indexToRemove
       ),
     }));
   };

   const handleNext = () => {
     setCurrentPage((prev) => Math.min(prev + 1, formPages.length - 1));
   };

   const handlePrevious = () => {
     setCurrentPage((prev) => Math.max(prev - 1, 0));
   };

   const handleSubmit = (e) => {
     e.preventDefault();
     console.log("Form Data Submitted:", formData);
     // Here you would send formData to your Java Spring backend
     // You'll need to decide how to handle file uploads (e.g., send as FormData, or upload separately)

     // Example fetch to backend:
     // fetch('/api/save-profile', {
     //   method: 'POST',
     //   headers: {
     //     'Content-Type': 'application/json', // Adjust if sending FormData for files
     //   },
     //   body: JSON.stringify(formData),
     // })
     // .then(response => response.json())
     // .then(data => {
     //   console.log('Success:', data);
     //   alert('Profile saved successfully!');
     // })
     // .catch((error) => {
     //   console.error('Error:', error);
     //   alert('Failed to save profile.');
     // });
   };


  const [currentPage, setCurrentPage] = useState(0); // 0-indexed page

  // Define your form sections/pages
  const formPages = [
    {
      name: "Basic Information",
      description: "Provide your fundamental profile details.",
      fields: [
        {
          label: "First Name",
          name: "firstName",
          type: "text",
          path: "personalInfo.firstName",
          placeholder: "Ram",
        },
        {
          label: "Last Name",
          name: "lastName",
          type: "text",
          path: "personalInfo.lastName",
          placeholder: "A",
        },
        {
          label: "Email Address",
          name: "email",
          type: "email",
          path: "personalInfo.email",
        },
        {
          label: "Phone Number",
          name: "phone",
          type: "tel",
          path: "personalInfo.phone",
          placeholder: "+91 98765 43210",
        },
        {
          label: "LinkedIn Profile URL",
          name: "linkedin",
          type: "url",
          path: "personalInfo.linkedin",
          placeholder: "https://linkedin.com/in/yourprofile",
        },
        {
          label: "Portfolio/Website URL",
          name: "portfolio",
          type: "url",
          path: "personalInfo.portfolio",
          placeholder: "https://yourportfolio.com",
        },
      ],
      component: (
        // Render personal info and about section together
        <>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="personalInfo.firstName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.firstName"
                  name="personalInfo.firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.personalInfo.firstName}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="personalInfo.lastName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.lastName"
                  name="personalInfo.lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.personalInfo.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="personalInfo.email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.email"
                  name="personalInfo.email"
                  type="email"
                  autoComplete="email"
                  value={formData.personalInfo.email}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              {" "}
              {/* New Phone field */}
              <label
                htmlFor="personalInfo.phone"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.phone"
                  name="personalInfo.phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.personalInfo.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              {" "}
              {/* New LinkedIn field */}
              <label
                htmlFor="personalInfo.linkedin"
                className="block text-sm/6 font-medium text-gray-900"
              >
                LinkedIn Profile URL
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.linkedin"
                  name="personalInfo.linkedin"
                  type="url"
                  value={formData.personalInfo.linkedin}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              {" "}
              {/* New Portfolio field */}
              <label
                htmlFor="personalInfo.portfolio"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Portfolio/Website URL
              </label>
              <div className="mt-2">
                <input
                  id="personalInfo.portfolio"
                  name="personalInfo.portfolio"
                  type="url"
                  value={formData.personalInfo.portfolio}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                About (Professional Summary)
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={formData.about}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Write a few sentences about your professional background and goals."
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                This will serve as your professional summary on the resume.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      name: "Address Information",
      description: "Provide your current mailing address.",
      fields: [], // Fields are rendered directly in the component
      component: (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="personalInfo.country"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Country
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="personalInfo.country"
                name="personalInfo.country"
                autoComplete="country-name"
                value={formData.personalInfo.country}
                onChange={handleChange}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
                <option>India</option> {/* Added India */}
                {/* Add more countries as needed */}
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="personalInfo.streetAddress"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                id="personalInfo.streetAddress"
                name="personalInfo.streetAddress"
                type="text"
                autoComplete="street-address"
                value={formData.personalInfo.streetAddress}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="personalInfo.city"
              className="block text-sm/6 font-medium text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                id="personalInfo.city"
                name="personalInfo.city"
                type="text"
                autoComplete="address-level2"
                value={formData.personalInfo.city}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="personalInfo.region"
              className="block text-sm/6 font-medium text-gray-900"
            >
              State / Province
            </label>
            <div className="mt-2">
              <input
                id="personalInfo.region"
                name="personalInfo.region"
                type="text"
                autoComplete="address-level1"
                value={formData.personalInfo.region}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="personalInfo.postalCode"
              className="block text-sm/6 font-medium text-gray-900"
            >
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                id="personalInfo.postalCode"
                name="personalInfo.postalCode"
                type="text"
                autoComplete="postal-code"
                value={formData.personalInfo.postalCode}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Work Experience",
      description:
        "List your relevant work experience, starting with the most recent.",
      component: (
        <div className="mt-10 space-y-8">
          {formData.workExperience.map((job, index) => (
            <div
              key={job.id}
              className="p-4 border border-gray-200 rounded-md relative bg-gray-50"
            >
              <h3 className="text-lg font-semibold mb-3">Job {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeItem("workExperience", index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                aria-label="Remove job"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`workExperience-${index}-title`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id={`workExperience-${index}-title`}
                    name="title"
                    value={job.title}
                    onChange={(e) =>
                      handleArrayChange("workExperience", index, e)
                    }
                    className="mt-1 block w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`workExperience-${index}-company`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id={`workExperience-${index}-company`}
                    name="company"
                    value={job.company}
                    onChange={(e) =>
                      handleArrayChange("workExperience", index, e)
                    }
                    className="mt-1 block w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`workExperience-${index}-startDate`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    type="month" // Changed to month for easier date input
                    id={`workExperience-${index}-startDate`}
                    name="startDate"
                    value={job.startDate}
                    onChange={(e) =>
                      handleArrayChange("workExperience", index, e)
                    }
                    className="mt-1 block w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`workExperience-${index}-endDate`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date (or "Present")
                  </label>
                  <input
                    type="month" // Changed to month
                    id={`workExperience-${index}-endDate`}
                    name="endDate"
                    value={job.endDate}
                    onChange={(e) =>
                      handleArrayChange("workExperience", index, e)
                    }
                    className="mt-1 block w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor={`workExperience-${index}-description`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Responsibilities & Achievements (bullet points, one per
                    line)
                  </label>
                  <textarea
                    id={`workExperience-${index}-description`}
                    name="description"
                    rows={4}
                    value={job.description}
                    onChange={(e) =>
                      handleArrayChange("workExperience", index, e)
                    }
                    className="mt-1 block w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addItem("workExperience", {
                id: Date.now(),
                title: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
              })
            }
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Work Experience
          </button>
        </div>
      ),
    },
    {
      name: "Education",
      description:
        "List your educational background, starting with your highest degree.",
      component: (
        <div className="mt-10 space-y-8">
          {formData.education.map((edu, index) => (
            <div
              key={edu.id}
              className="p-4 border border-gray-200 rounded-md relative bg-gray-50"
            >
              <h3 className="text-lg font-semibold mb-3">
                Education {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeItem("education", index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                aria-label="Remove education"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <label
                    htmlFor={`education-${index}-degree`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Degree/Program
                  </label>
                  <input
                    type="text"
                    id={`education-${index}-degree`}
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleArrayChange("education", index, e)}
                    className="mt-1 block w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor={`education-${index}-major`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Major/Field of Study
                  </label>
                  <input
                    type="text"
                    id={`education-${index}-major`}
                    name="major"
                    value={edu.major}
                    onChange={(e) => handleArrayChange("education", index, e)}
                    className="mt-1 block w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-full">
                  <label
                    htmlFor={`education-${index}-institution`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    University/Institution
                  </label>
                  <input
                    type="text"
                    id={`education-${index}-institution`}
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleArrayChange("education", index, e)}
                    className="mt-1 block w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`education-${index}-graduationDate`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Graduation Date (Month, Year)
                  </label>
                  <input
                    type="month"
                    id={`education-${index}-graduationDate`}
                    name="graduationDate"
                    value={edu.graduationDate}
                    onChange={(e) => handleArrayChange("education", index, e)}
                    className="mt-1 block w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor={`education-${index}-gpa`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    id={`education-${index}-gpa`}
                    name="gpa"
                    value={edu.gpa}
                    onChange={(e) => handleArrayChange("education", index, e)}
                    className="mt-1 block w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., 3.8/4.0"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addItem("education", {
                id: Date.now(),
                degree: "",
                major: "",
                institution: "",
                graduationDate: "",
                gpa: "",
              })
            }
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Education
          </button>
        </div>
      ),
    },
    {
      name: "Skills",
      description: "List your key skills (technical, soft, languages, etc.).",
      component: (
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
            value={formData.skills.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                skills: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="mt-1 block w-full rounded-md px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., Python, SQL, Project Management, Communication"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills
              .filter((s) => s)
              .map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeItemFromArray("skills", index)}
                    className="ml-2 -mr-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">Remove skill</span>
                    <TrashIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
          </div>
        </div>
      ),
    },
    {
      name: "Profile Photo & Cover Photo",
      description: "Upload your profile picture and a cover photo.",
      component: (
        <div className="mt-10 space-y-8">
          <div className="col-span-full">
            <label
              htmlFor="profilePhoto"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Profile Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              {formData.profilePhoto ? (
                <img
                  src={URL.createObjectURL(formData.profilePhoto)}
                  alt="Profile"
                  className="size-12 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon
                  aria-hidden="true"
                  className="size-12 text-gray-300"
                />
              )}
              <input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                className="hidden" // Hide default input, use label as trigger
                onChange={handleFileChange}
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
          <div className="col-span-full">
            <label
              htmlFor="coverPhoto"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Cover Photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {formData.coverPhoto ? (
                  <img
                    src={URL.createObjectURL(formData.coverPhoto)}
                    alt="Cover"
                    className="mx-auto h-24 w-auto object-cover rounded-md"
                  />
                ) : (
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-300"
                  />
                )}
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="coverPhoto"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="coverPhoto"
                      name="coverPhoto"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Notifications",
      description: "Manage your notification preferences.",
      component: (
        <div className="mt-10 space-y-10">
          <fieldset>
            <legend className="text-sm/6 font-semibold text-gray-900">
              By email
            </legend>
            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="notifications.email.comments"
                    type="checkbox"
                    checked={formData.notifications.email.comments}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm/6 leading-6">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-900"
                  >
                    Comments
                  </label>
                  <p className="text-gray-500">
                    Get notified when someone posts a comment on a posting.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="candidates"
                    name="notifications.email.candidates"
                    type="checkbox"
                    checked={formData.notifications.email.candidates}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm/6 leading-6">
                  <label
                    htmlFor="candidates"
                    className="font-medium text-gray-900"
                  >
                    Candidates
                  </label>
                  <p className="text-gray-500">
                    Get notified when a candidate applies for a job.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="offers"
                    name="notifications.email.offers"
                    type="checkbox"
                    checked={formData.notifications.email.offers}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm/6 leading-6">
                  <label htmlFor="offers" className="font-medium text-gray-900">
                    Offers
                  </label>
                  <p className="text-gray-500">
                    Get notified when a candidate accepts or rejects an offer.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm/6 font-semibold text-gray-900">
              Push notifications
            </legend>
            <p className="mt-1 text-sm/6 text-gray-600">
              These are delivered via SMS to your mobile phone.
            </p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="push-everything"
                  name="notifications.push"
                  type="radio"
                  value="everything"
                  checked={formData.notifications.push === "everything"}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-everything"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Everything
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-email"
                  name="notifications.push"
                  type="radio"
                  value="same-as-email"
                  checked={formData.notifications.push === "same-as-email"}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Same as email
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-nothing"
                  name="notifications.push"
                  type="radio"
                  value="nothing"
                  checked={formData.notifications.push === "nothing"}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-nothing"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  No push notifications
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      ),
    },
  ];
  const currentPageData = formPages[currentPage];


 
  return (
    <form onSubmit={handleSubmit} >
      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            {currentPageData.name}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {currentPageData.description}
          </p>

          <div className="mt-10">{currentPageData.component}</div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        {currentPage > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
          >
            Previous
          </button>
        )}
        {currentPage < formPages.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ml-auto"
          >
            Save Profile
          </button>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Page {currentPage + 1} of {formPages.length}
      </div>
    </form>
  );
}
