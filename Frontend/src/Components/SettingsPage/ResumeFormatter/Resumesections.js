// Example data structure for an active resume
export const initialResumeSections = [
  {
    id: "personalInfo",
    title: "Personal Information",
    type: "personal", // To determine which component to render
    content: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      linkedin: "linkedin.com/in/johndoe",
    },
    // You might add validation rules or other metadata
  },
  {
    id: "summary",
    title: "Summary",
    type: "textarea",
    content: "Experienced software engineer with a strong background...",
  },
  {
    id: "experience",
    title: "Work Experience",
    type: "list", // A list of items (e.g., jobs)
    items: [
      {
        id: "job1",
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "Jan 2022 - Present",
        description: [
          "Developed and maintained web applications.",
          "Collaborated with cross-functional teams.",
        ],
      },
      {
        id: "job2",
        title: "Software Developer",
        company: "Innovate Co.",
        duration: "Jul 2019 - Dec 2021",
        description: ["Implemented new features and fixed bugs."],
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    type: "list",
    items: [
      {
        id: "edu1",
        title: "Master of Science in Computer Science",
        institution: "University of XYZ",
        duration: "2021",
      },
    ],
  },
  // ... other sections like skills, projects, awards
];

// Example data structure for available sections to add
export const availableSections = [
  { id: "skills", title: "Skills", type: "tags" },
  { id: "projects", title: "Projects", type: "list" },
  { id: "awards", title: "Awards", type: "textarea" },
  // ...
];
