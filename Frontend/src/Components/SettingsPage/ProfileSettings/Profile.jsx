import { useEffect, useState } from "react";
import AddressSection from "./AddressSection";
import BasicInfoSection from "./BasicInfoSection";
import EducationSection from "./EducationSection";
import NotificationsSection from "./NotificationsSection";
import PhotoUploadSection from "./PhotoUploadSection";
import SkillsSection from "./SkillsSection";
import WorkExperienceSection from "./WorkExperienceSection";
import ProjectsSection from "./ProjectsSection";

export default function Profile() {
  // Master state for all profile data
  const LOCAL_STORAGE_KEY = "profile-form-data";
  const [formData, setFormData] = useState(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      // Return stored data if it exists, otherwise return the default state
      return storedData
        ? JSON.parse(storedData)
        : {
            about: "",
            profilePhoto: null,
            coverPhoto: null,
            personalInfo: {
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              linkedin: "",
              portfolio: "",
              country: "United States",
              streetAddress: "",
              city: "",
              region: "",
              postalCode: "",
            },
            workExperience: [
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
              {
                id: Date.now() + 1,
                degree: "",
                major: "",
                institution: "",
                graduationDate: "",
                gpa: "",
              },
            ],
            projects: [],
            skills: [],
            notifications: {
              comments: false,
              candidates: false,
              offers: false,
              pushNotification: "SAME_AS_EMAIL",
            },
          };
    } catch (error) {
      console.error("Failed to parse data from local storage:", error);
      return {
        // Fallback to default state on error
        about: "",
        profilePhoto: null,
        coverPhoto: null,
        personalInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          linkedin: "",
          portfolio: "",
          country: "United States",
          streetAddress: "",
          city: "",
          region: "",
          postalCode: "",
        },
        workExperience: [
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
          {
            id: Date.now() + 1,
            degree: "",
            major: "",
            institution: "",
            graduationDate: "",
            gpa: "",
          },
        ],
        projects: [],
        skills: [],
        notifications: {
          comments: false,
          candidates: false,
          offers: false,
          pushNotification: "SAME_AS_EMAIL",
        },
      };
    }
  });

  useEffect(() => {
    // Exclude file objects from being stored in local storage
    const dataToStore = { ...formData };
    delete dataToStore.profilePhoto;
    delete dataToStore.coverPhoto;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
  }, [formData]);

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
  // const removeItemFromArray = (arrayName, indexToRemove) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [arrayName]: prevData[arrayName].filter(
  //       (_, index) => index !== indexToRemove
  //     ),
  //   }));
  // };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, formPages.length - 1));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Profile data saved to local storage!");
  };

  const [currentPage, setCurrentPage] = useState(0); // 0-indexed page

  // Define your form sections/pages
  const formPages = [
    {
      name: "Basic Information",
      description: "Provide your fundamental profile details.",
      component: (
        <BasicInfoSection
          personalInfo={formData.personalInfo}
          about={formData.about}
          onChange={handleChange}
        />
      ),
    },
    {
      name: "Address Information",
      description: "Provide your current mailing address.",
      component: (
        <AddressSection
          personalInfo={formData.personalInfo}
          onChange={handleChange}
        />
      ),
    },
    {
      name: "Work Experience",
      description:
        "List your relevant work experience, starting with the most recent.",
      component: (
        <WorkExperienceSection
          workExperience={formData.workExperience}
          onChange={(index, e) => handleArrayChange("workExperience", index, e)}
          addItem={(item) => addItem("workExperience", item)}
          removeItem={(index) => removeItem("workExperience", index)}
        />
      ),
    },
    {
      name: "Education",
      description:
        "List your educational background, starting with your highest degree.",
      component: (
        <EducationSection
          education={formData.education}
          onChange={(index, e) => handleArrayChange("education", index, e)}
          addItem={(item) => addItem("education", item)}
          removeItem={(index) => removeItem("education", index)}
        />
      ),
    },
    {
      name: "Prjects",
      description:
        "List your relevant project experience, starting with the most recent.",
      component: (
        <ProjectsSection
          projects={formData.projects}
          onChange={(index, e) => handleArrayChange("projects", index, e)}
          addItem={(item) => addItem("projects", item)}
          removeItem={(index) => removeItem("projects", index)}
        />
      ),
    },
    {
      name: "Skills",
      description: "List your key skills (technical, soft, languages, etc.).",
      component: (
        <SkillsSection
          skills={formData.skills}
          onChange={(updatedSkills) =>
            setFormData((prev) => ({ ...prev, skills: updatedSkills }))
          }
          onRemove={(indexToRemove) => {
            setFormData((prevData) => ({
              ...prevData,
              skills: prevData.skills.filter(
                (_, index) => index !== indexToRemove
              ),
            }));
          }}
        />
      ),
    },
    {
      name: "Profile Photo & Cover Photo",
      description: "Upload your profile picture and a cover photo.",
      component: (
        <PhotoUploadSection
          profilePhoto={formData.profilePhoto}
          coverPhoto={formData.coverPhoto}
          onFileChange={handleFileChange}
        />
      ),
    },
    {
      name: "Notifications",
      description: "Manage your notification preferences.",
      component: (
        <NotificationsSection
          notifications={formData.notifications}
          onChange={handleChange}
        />
      ),
    },
  ];
  const currentPageData = formPages[currentPage];

  return (
    <form onSubmit={handleSubmit}>
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
