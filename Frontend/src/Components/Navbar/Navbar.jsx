import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  UserIcon,
  ArrowLeftEndOnRectangleIcon
} from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Navbar() {
  return (
    <div className="lg:flex lg:items-center lg:justify-between px-6 py-3">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Job Seeker
        </h2>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        {/* <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <UserIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
            Profile
          </button>
        </span> */}

        {/* Dropdown */}
        <Menu as="div" className="relative ml-3">
          <MenuButton className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <UserIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
            Profile
          </MenuButton>

          <MenuItems
            transition
            className="absolute left-0 z-10 mt-2 -mr-1 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                Edit
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="inline-flex items-center  px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                Logout
                <ArrowLeftEndOnRectangleIcon
                  aria-hidden="true"
                  className="size-5"
                />
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
