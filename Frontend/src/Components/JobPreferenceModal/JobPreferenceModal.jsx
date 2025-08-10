import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowLeftEndOnRectangleIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getJobdetails } from "../../api/jobApi";
import JobPreferenceModal from "../JobPreferenceModal/JobPreferenceModal";

// Navbar now accepts setJobData as a prop
export default function Navbar({ setJobData }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const issignupOrLogin = ["signup", "login", "dashboard"].some((route) =>
    location.pathname.includes(route)
  ); // The handleSearch function now uses the setJobData prop

  const handleSearch = async (preferences) => {
    try {
      const jobResults = await getJobdetails(preferences);
      console.log("Jobs:", jobResults);
      setJobData(jobResults); // Update the jobData state in App.jsx
    } catch (error) {
      alert("Failed to fetch job listings", error);
    }
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-between px-6 py-3 border-b border-gray-200">
      {" "}
      <div className="min-w-0 flex-1">
        {" "}
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {" "}
          <Link to="/" className="block">
            <span className="cursor-pointer">Job Seeker</span>{" "}
          </Link>{" "}
        </h2>{" "}
      </div>{" "}
      <div className="mt-5 flex lg:mt-0 lg:ml-4 items-center space-x-4">
        {/* Added items-center and space-x-4 */} {/* Search Bar */}{" "}
        <div className="relative flex items-center">
          {" "}
          <MagnifyingGlassIcon
            className="absolute right-3 h-6 w-6 text-gray-400 cursor-pointer"
            aria-hidden="true"
            onClick={() => setIsModalOpen(true)}
          />{" "}
        </div>
        {/* Dropdown */}{" "}
        {!issignupOrLogin && (
          <Menu as="div" className="relative ml-3">
            {" "}
            <MenuButton className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {" "}
              <UserIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
              Profile{" "}
            </MenuButton>{" "}
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              {" "}
              <MenuItem>
                {" "}
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                  Dashboard{" "}
                </Link>{" "}
              </MenuItem>{" "}
              <MenuItem>
                {" "}
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden w-full"
                >
                  Logout{" "}
                  <ArrowLeftEndOnRectangleIcon
                    aria-hidden="true"
                    className="ml-auto size-5"
                  />{" "}
                </a>{" "}
              </MenuItem>{" "}
            </MenuItems>{" "}
          </Menu>
        )}{" "}
      </div>{" "}
      <JobPreferenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleSearch}
      />{" "}
    </div>
  );
}
