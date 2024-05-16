import React, { useEffect } from "react";
import LinkTreeCard from "./LinkTreeCard";

const LinkTree = ({ data }) => {
  const { name, avatar, bio, links } = data;
  return (
    <>
      <div className="relative px-4 py-16 pb-1 ">
        <img
          className=" w-24 absolute rounded-full left-1/2 -translate-x-1/2"
          src={avatar}
          alt=""
        />
        <h2 className="text-center text-lg font-bold pt-28">
          {name ? name : "No Username"}
        </h2>
        <p className="text-center pt-3 text-lg pb-5">{bio}</p>
        <div className="flex flex-col justify-center max-w-7xl m-auto md:my-5 w-full md:w-1/2 ">
          {links.map((link, index) => (
            <div key={index}>
              <LinkTreeCard title={link.title} url={link.url} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LinkTree;
