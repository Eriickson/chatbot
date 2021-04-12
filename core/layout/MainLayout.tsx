import React from "react";

import { Header } from "../components/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex items-center flex-col h-screen">
      <Header />
      <div className="bg-purple-500 w-full flex-1 pt-10">
        <div className="container h-full">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
