import React, { useEffect, useState, useContext } from "react";
import LinkBox from "./LinkBox";
import NavBar from "@/components/Navbar";

const Analytics = ({ link }) => {
  return (
    <>
      <div className="">
        <NavBar />
        <main>
          <h1 className="flex justify-center text-4xl font-semibold text-gray-600 mb-5 mt-5">
            Dashboard
          </h1>
          <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mx-4">
            <LinkBox
              lbTitle="Links"
              lbNumber={link}
              lbSvg="url"
              lbTheme="red"
            />
            <LinkBox
              lbTitle="Growth"
              lbNumber="5%"
              lbSvg="growth"
              lbTheme="blue"
            />
            <LinkBox
              lbTitle="Links"
              lbNumber="12"
              lbSvg="email"
              lbTheme="red"
            />
            <LinkBox lbTitle="Growth" lbNumber="0%" lbSvg="ig" lbTheme="blue" />
          </section>
          <section></section>
        </main>
      </div>
    </>
  );
};

export default Analytics;
