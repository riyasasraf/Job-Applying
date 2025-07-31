import React from "react";
import ListView from "./Components/ListView/ListView";
import Navbar from "./Components/Navbar/Navbar";
import DashBoard from "./Components/SettingsPage/DashBoard"; // Path to your Dashboard component
import Profile from "./Components/SettingsPage/ProfileSettings/Profile"; // Path to your Profile component
import AppliedJobs from "./Components/SettingsPage/AppliedJobsList/AppliedJobs"; // Path to your AppliedJobs component
import ResumeBuilder from "./Components/SettingsPage/ResumeFormatter/ResumeBuilder"; // Path to your ResumeBuilder component
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate

const App = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/dashboard" element={<DashBoard />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
            <Route path="resume-formatter" element={<ResumeBuilder />} />
            <Route
              path="job-preference"
              element={
                <div className="p-4 text-center text-gray-600">
                  <h2>Job Preference Settings Coming Soon!</h2>
                  <p className="mt-2 text-sm">
                    This module will allow you to set your job search
                    preferences.
                  </p>
                </div>
              }
            />
          </Route>

          {/* Add other top-level routes as needed */}
        </Routes>
      </div>
    </>
  );
};

export default App;
