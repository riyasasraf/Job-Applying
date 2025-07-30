import React from "react";
import ListView from "./Components/ListView/ListView";
import Navbar from "./Components/Navbar/Navbar";
import DashBoard from "./Components/SettingsPage/DashBoard";

const App = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        {" "}
        <Navbar />
        {/* <ListView /> */}
        <DashBoard />
      </div>
    </>
  );
};

export default App;
