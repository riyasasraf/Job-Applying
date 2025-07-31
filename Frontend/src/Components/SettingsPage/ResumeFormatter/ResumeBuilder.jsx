// ResumeBuilder.js
import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import SectionRenderer from "./SectionRenderer"; // Component to render different section types

// Initial data for active resume sections
const initialResumeSections = [
  {
    id: "personalInfo",
    title: "Personal Information",
    type: "personal",
    content: { name: "John Doe", email: "john.doe@example.com" },
  },
  {
    id: "summary",
    title: "Summary",
    type: "textarea",
    content: "Passionate developer...",
  },
  {
    id: "experience",
    title: "Work Experience",
    type: "list",
    items: [{ id: "job1", title: "Developer", company: "ABC Inc." }],
  },
  {
    id: "education",
    title: "Education",
    type: "list",
    items: [{ id: "edu1", title: "University XYZ" }],
  },
];

// Available sections to be added
const availableSections = [
  { id: "skills", title: "Skills", type: "tags" },
  { id: "projects", title: "Projects", type: "list" },
  { id: "awards", title: "Awards", type: "textarea" },
  { id: "certifications", title: "Certifications", type: "list" },
];

const ResumeBuilder = () => {
  const [sections, setSections] = useState(initialResumeSections);
  const [available, setAvailable] = useState(availableSections);

  // Helper function to reorder array after drag and drop
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Handles drag and drop events
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Reordering within the active sections list
    if (
      source.droppableId === "active-sections" &&
      destination.droppableId === "active-sections"
    ) {
      const reorderedSections = reorder(
        sections,
        source.index,
        destination.index
      );
      setSections(reorderedSections);
    }
    // Adding a new section from available to active
    else if (
      source.droppableId === "available-sections" &&
      destination.droppableId === "active-sections"
    ) {
      const newSectionToAdd = available.find((sec) => sec.id === draggableId);
      if (newSectionToAdd) {
        // Remove from available and add to active
        const newAvailable = available.filter((sec) => sec.id !== draggableId);
        const newSections = [...sections];
        newSections.splice(destination.index, 0, {
          ...newSectionToAdd,
          content: newSectionToAdd.type === "list" ? [] : "",
        }); // Initialize content
        setAvailable(newAvailable);
        setSections(newSections);
      }
    }
    // Removing a section from active and putting it back to available (optional)
    else if (
      source.droppableId === "active-sections" &&
      destination.droppableId === "available-sections"
    ) {
      const sectionToRemove = sections.find((sec) => sec.id === draggableId);
      if (sectionToRemove) {
        const newSections = sections.filter((sec) => sec.id !== draggableId);
        const newAvailable = [...available];
        newAvailable.splice(destination.index, 0, {
          ...sectionToRemove,
          content: undefined,
          items: undefined,
        }); // Clean content for available list
        setSections(newSections);
        setAvailable(newAvailable);
      }
    }
  };

  // Function to remove a section (e.g., using a delete button)
  const removeSection = (idToRemove) => {
    const sectionToReturn = sections.find((sec) => sec.id === idToRemove);
    setSections(sections.filter((section) => section.id !== idToRemove));
    if (sectionToReturn && !available.some((s) => s.id === idToRemove)) {
      // Prevent duplicates in available
      setAvailable([
        ...available,
        {
          id: sectionToReturn.id,
          title: sectionToReturn.title,
          type: sectionToReturn.type,
        },
      ]);
    }
  };

  // Function to handle content changes within a section
  const handleSectionContentChange = (id, newContent) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  // Function to add/update items within a list type section (e.g., experience, education)
  const handleSectionListChange = (sectionId, newItems) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, items: newItems } : section
      )
    );
  };

  // Function to update a section's title (if editable)
  const handleSectionTitleChange = (id, newTitle) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    );
  };

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 h-full w-full">
          {" "}
          {/* Use h-full to make it take up available space */}
          {/* Available Sections Sidebar */}
          <div className="w-52 bg-white p-4 rounded-lg shadow-lg flex-shrink-0 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Available Sections</h3>
            <Droppable droppableId="available-sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {available.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm cursor-grab hover:bg-gray-100 transition-colors"
                        >
                          {section.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          {/* Main Resume Canvas */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Resume</h2>
            <Droppable droppableId="active-sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-8" // Add spacing between sections
                >
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="absolute top-2 right-2 cursor-grab text-gray-400 hover:text-gray-600"
                          >
                            {/* Drag handle icon (e.g., three dots or bars) */}
                            &#x22EE; {/* Vertical ellipsis for drag handle */}
                          </div>
                          <button
                            onClick={() => removeSection(section.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                          >
                            &times; {/* Close/remove button */}
                          </button>
                          <SectionRenderer
                            section={section}
                            onContentChange={handleSectionContentChange}
                            onListChange={handleSectionListChange}
                            onTitleChange={handleSectionTitleChange}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
      <div className="mt-6 flex items-center justify-end gap-x-6 p-4">
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            // Logic to send `sections` data to your Java backend
            console.log("Sending resume data to backend:", sections);
            // Example:
            // fetch('/api/generate-resume', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(sections)
            // })
            // .then(response => response.blob()) // or .json() for a link to PDF
            // .then(blob => {
            //   const url = window.URL.createObjectURL(new Blob([blob]));
            //   const link = document.createElement('a');
            //   link.href = url;
            //   link.setAttribute('download', 'resume.pdf');
            //   document.body.appendChild(link);
            //   link.click();
            //   link.parentNode.removeChild(link);
            // })
            // .catch(error => console.error('Error generating resume:', error));
          }}
        >
          Generate Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilder;
