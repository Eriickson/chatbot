import React from "react";

import { NextPage } from "next";
import MainLayout from "../core/layout/MainLayout";
import { HomeTemplate } from "../core";

// Chakra

const HomePage: NextPage = () => {
  return (
    <MainLayout>
      <HomeTemplate />
    </MainLayout>
  );
};

export default HomePage;
