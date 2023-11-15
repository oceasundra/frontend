import React from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Banner from "../components/Banner";
import About from "../components/About";
import Services from "../components/Services";
import Work from "../components/Work";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <div className="bg-site bg-no-repeat bg-cover overflow-hidden">
      <Nav />
      <Header />
      <Banner />
      <About />
      <Services />
      <Work />
      <Contact />
    </div>
  );
};

export default Home;
