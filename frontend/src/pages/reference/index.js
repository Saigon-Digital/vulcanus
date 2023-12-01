import React from "react";
import Layout from "../../components/Layout";
import Service from "../../components/Services";
import TitleText from "../../components/TitleText";
import HalfPageContent from "../../components/HalfPageContent";
const index = () => {
  return (
    <Layout>
      <Service />
      <TitleText />
      <HalfPageContent />
    </Layout>
  );
};

export default index;
