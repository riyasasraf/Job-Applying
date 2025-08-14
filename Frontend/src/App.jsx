import { Navigate, Route, Routes } from "react-router-dom"; // Import Navigate
import ListView from "./Components/ListView/ListView";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import AppliedJobs from "./Components/SettingsPage/AppliedJobsList/AppliedJobs"; // Path to your AppliedJobs component
import DashBoard from "./Components/SettingsPage/DashBoard"; // Path to your Dashboard component
import Profile from "./Components/SettingsPage/ProfileSettings/Profile"; // Path to your Profile component
import ResumeBuilder from "./Components/SettingsPage/ResumeFormatter/ResumeBuilder"; // Path to your ResumeBuilder component
import { useState } from "react";

const App = () => {

const [reloadJobs, setReloadJobs] = useState(false);
   const issignupOrLogin = ["signup", "login"].some((route) =>
     location.pathname.includes(route)
  );
  
  return (
    <>
      <div className="flex flex-col h-screen">
        {!issignupOrLogin && (
          <Navbar onJobsUpdated={() => setReloadJobs((prev) => !prev)} />
        )}
        <Routes>
          <Route path="/" element={<ListView reloadTrigger={reloadJobs} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />

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
