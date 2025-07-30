// SectionRenderer.js
import React, { useState } from "react";

const SectionRenderer = ({
  section,
  onContentChange,
  onListChange,
  onTitleChange,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(section.title);

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setTempTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    onTitleChange(section.id, tempTitle);
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new line in input
      handleTitleBlur();
    }
  };

  const renderContent = () => {
    switch (section.type) {
      case "personal":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={section.content.name || ""}
                onChange={(e) =>
                  onContentChange(section.id, {
                    ...section.content,
                    name: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={section.content.email || ""}
                onChange={(e) =>
                  onContentChange(section.id, {
                    ...section.content,
                    email: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {/* Add more fields for personal info like phone, linkedin */}
          </div>
        );
      case "textarea":
        return (
          <textarea
            value={section.content || ""}
            onChange={(e) => onContentChange(section.id, e.target.value)}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={`Enter your ${section.title.toLowerCase()}...`}
          />
        );
      case "list": // For Work Experience, Education, Projects
        return (
          <div className="space-y-4">
            {section.items.map((item, itemIndex) => (
              <div
                key={item.id}
                className="border p-3 rounded-md bg-white relative"
              >
                <button
                  onClick={() => {
                    const newItems = section.items.filter(
                      (_, i) => i !== itemIndex
                    );
                    onListChange(section.id, newItems);
                  }}
                  className="absolute top-1 right-1 text-red-400 hover:text-red-600 text-xs"
                >
                  &times;
                </button>
                {/* Example fields for a list item (e.g., job entry) */}
                <div>
                  <label className="block text-xs font-medium text-gray-600">
                    Title
                  </label>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => {
                      const newItems = [...section.items];
                      newItems[itemIndex] = { ...item, title: e.target.value };
                      onListChange(section.id, newItems);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mt-2">
                    Company/Institution
                  </label>
                  <input
                    type="text"
                    value={item.company || item.institution || ""}
                    onChange={(e) => {
                      const newItems = [...section.items];
                      if (item.company !== undefined) {
                        newItems[itemIndex] = {
                          ...item,
                          company: e.target.value,
                        };
                      } else if (item.institution !== undefined) {
                        newItems[itemIndex] = {
                          ...item,
                          institution: e.target.value,
                        };
                      }
                      onListChange(section.id, newItems);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., Google"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mt-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={item.duration || ""}
                    onChange={(e) => {
                      const newItems = [...section.items];
                      newItems[itemIndex] = {
                        ...item,
                        duration: e.target.value,
                      };
                      onListChange(section.id, newItems);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., Jan 2022 - Present"
                  />
                </div>
                {/* Add description/bullet points for experience/projects */}
                {section.id === "experience" || section.id === "projects" ? (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mt-2">
                      Description (one per line)
                    </label>
                    <textarea
                      value={(item.description || []).join("\n")}
                      onChange={(e) => {
                        const newItems = [...section.items];
                        newItems[itemIndex] = {
                          ...item,
                          description: e.target.value.split("\n"),
                        };
                        onListChange(section.id, newItems);
                      }}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="e.g., Developed X feature&#10;Achieved Y result"
                    />
                  </div>
                ) : null}
              </div>
            ))}
            <button
              onClick={() => {
                const newItemId = `${section.id}-${Date.now()}`; // Unique ID for new item
                const newItem = {
                  id: newItemId,
                  title: "",
                  ...(section.id === "experience"
                    ? { company: "", duration: "", description: [] }
                    : {}),
                  ...(section.id === "education"
                    ? { institution: "", duration: "" }
                    : {}),
                  ...(section.id === "projects"
                    ? { link: "", description: [] }
                    : {}),
                };
                onListChange(section.id, [...section.items, newItem]);
              }}
              className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add New {section.title.slice(0, -1) || "Item"}
            </button>
          </div>
        );
      case "tags": // For Skills
        return (
          <div>
            <input
              type="text"
              value={(section.content || []).join(", ")} // Display as comma-separated
              onChange={(e) =>
                onContentChange(
                  section.id,
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., React, JavaScript, Node.js"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate skills with commas.
            </p>
          </div>
        );
      default:
        return <p>Unknown section type: {section.type}</p>;
    }
  };

  return (
    <div>
      {isEditingTitle ? (
        <input
          type="text"
          value={tempTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
          className="w-full text-xl font-bold mb-4 bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          autoFocus
        />
      ) : (
        <h3
          onDoubleClick={handleTitleDoubleClick}
          className="text-xl font-bold mb-4 cursor-pointer hover:text-gray-700"
        >
          {section.title}
        </h3>
      )}

      {renderContent()}
    </div>
  );
};

export default SectionRenderer;
