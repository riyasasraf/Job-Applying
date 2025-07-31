
import {
  Home,
  Folder,
  CalendarToday,
  Description,
  Assessment,
} from "@mui/icons-material";
import Person2Icon from "@mui/icons-material/Person2";
// No need to import Profile, AppliedJobs, ResumeBuilder here directly anymore,
// as they will be rendered by the <Outlet /> based on the route.
import { Link, Outlet, useLocation } from "react-router-dom"; // Import Link, Outlet, and useLocation

const DashBoard = () => {
  const location = useLocation(); // Hook to get the current URL location

  // Function to determine if a link is active for styling
  const isActiveLink = (path) => location.pathname === path;

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
          {/* Use Link components for navigation */}
          <Link
            to="/dashboard/job-preference" // Updated path
            className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
              isActiveLink("/dashboard/job-preference")
                ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home className="h-5 w-5 mr-3" />
            Job Preference
          </Link>
          <Link
            to="/dashboard/profile" // Updated path
            className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
              isActiveLink("/dashboard/profile")
                ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Person2Icon className="h-5 w-5 mr-3" />
            My Profile
          </Link>
          <Link
            to="/dashboard/applied-jobs" // Updated path
            className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
              isActiveLink("/dashboard/applied-jobs")
                ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Folder className="h-5 w-5 mr-3" />
            Applied Jobs
          </Link>
          <Link
            to="/dashboard/resume-formatter" // Updated path
            className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
              isActiveLink("/dashboard/resume-formatter")
                ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Description className="h-5 w-5 mr-3" />
            Resume Formatter
          </Link>
        </nav>
      </aside>

      {/* Main content area where nested routes will render */}
      <main className="flex-1 p-4 overflow-auto">
        <div className="bg-white rounded-lg shadow-lg py-10 p-6 border-2 border-gray-300 flex items-center justify-center text-gray-400 text-2xl">
          {/* This is where the nested route component (Profile, AppliedJobs, etc.) will be rendered */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
