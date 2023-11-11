import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const Revenue = () => {
  const [currentMenu, setCurrentMenu] = useState("Home");

  return (
    <div className="flex gap-6">
      <div className="w-full sm:w-72">
        <Sidebar />
      </div>
      <div className="w-full ">
        <h1>Hello</h1>
      </div>
    </div>
  );
};

export default Revenue;
