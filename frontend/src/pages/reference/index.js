import React from "react";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import Service from "../../components/Services";
import TitleText from "../../components/TitleText";
import HalfPageContent from "../../components/HalfPageContent";
import Cards from "../../components/Cards";
import ImageBlock from "../../components/ImageBlock";
const index = () => {
  return (
    <Layout>
      <Hero />
      <Service />
      <TitleText />
      <HalfPageContent />
      <Cards />
      <ImageBlock />
    </Layout>
  );
};

export default index;
