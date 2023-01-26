import React, { useEffect } from "react";
import Timeline from "../../components/Timeline";
import Sidebar from "../../components/Aside/Sidebar";

const HomePage = () => {
  useEffect(() => {
    document.title = "Instagram qwasar";
  }, []);

  return (
    <div className="bg-gray-background mt-10">
      <div className="flex space-x-8 justify-between mx-auto max-w-screen-lg ">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
