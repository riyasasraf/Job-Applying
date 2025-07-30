import React from "react";
import {
  Home,
  Folder,
  CalendarToday,
  Description,
  Assessment,
} from "@mui/icons-material";
import Person2Icon from "@mui/icons-material/Person2";// Using Material Icons for simplicity
import Avatar from "@mui/material/Avatar"; // Material-UI Avatar component
import Profile from "./ProfileSettings/Profile";
import AppliedJobs from "./AppliedJobsList/AppliedJobs";
import ResumeBuilder from "./ResumeFormatter/ResumeBuilder";

const DashBoard = () => {
  return (
    <div className="flex flex-1 bg-gray-100 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col rounded-lg m-4">
        <div className="p-4 flex items-center border-b border-gray-200">
          {/* Placeholder for logo/brand */}
          <svg
            className="w-8 h-8 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
          <span className="ml-2 text-xl font-bold text-gray-800">Your App</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            <Home className="h-5 w-5 mr-3" />
            Job Preference
          </a>
          <a
            href="#"
            className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Person2Icon className="h-5 w-5 mr-3" />
            My Profile
          </a>
          <a
            href="#"
            className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Folder className="h-5 w-5 mr-3" />
            Applied Jobs
          </a>
          {/* <a
            href="#"
            className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <CalendarToday className="h-5 w-5 mr-3" />
          </a> */}
          <a
            href="#"
            className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Description className="h-5 w-5 mr-3" />
            Resume Formatter
          </a>
          {/* <a
            href="#"
            className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Assessment className="h-5 w-5 mr-3" />
            Reports
          </a> */}
        </nav>

        {/* <div className="p-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Your teams
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: "0.75rem",
                    bgcolor: "#E0F2F1",
                    color: "#00796B",
                  }}
                  variant="rounded"
                >
                  H
                </Avatar>
                <span className="ml-3">Heroicons</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: "0.75rem",
                    bgcolor: "#E3F2FD",
                    color: "#1976D2",
                  }}
                  variant="rounded"
                >
                  T
                </Avatar>
                <span className="ml-3">Tailwind Labs</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: "0.75rem",
                    bgcolor: "#F3E5F5",
                    color: "#8E24AA",
                  }}
                  variant="rounded"
                >
                  W
                </Avatar>
                <span className="ml-3">Workcation</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="p-4 border-t border-gray-200 mt-auto flex items-center">
          <Avatar
            alt="Tom Cook"
            src="https://placehold.co/100x100/A78BFA/ffffff?text=TC"
            sx={{ width: 32, height: 32 }}
          />
          <span className="ml-3 text-gray-800 font-medium">Tom Cook</span>
        </div> */}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-auto">
        <div className="bg-white rounded-lg shadow-lg py-10 p-6 border-2 border-gray-300 flex items-center justify-center text-gray-400 text-2xl">
          {/* <Profile/> */}
          {/* <AppliedJobs/> */}
          <ResumeBuilder/>
        </div>
      </main>

      {/* Third Column (Placeholder)
      <div className="hidden lg:block w-80 bg-white shadow-lg flex-shrink-0 rounded-lg m-4 p-6 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xl overflow-auto">
        Third Column (Placeholder)
      </div> */}
    </div>
  );
};

export default DashBoard;
