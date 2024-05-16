import Link from "next/link";
import React from "react";

const SocialTree = ({ social }) => {
  const { facebook, twitter, instagram, youtube, linkedin, github } = social;
  return (
    <div className="appearancepic">
      <div className="social flex flex-row justify-center my-4">
        {facebook && (
          <Link
            className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
            target="_blank"
            href={`https://facebook.com/${facebook}`}
          >
            <img className="w-6" src="/svg/fb.svg" />
          </Link>
        )}
        {instagram && (
          <Link
            className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
            target="_blank"
            href={`https://instagram.com/${instagram}`}
          >
            <img className="w-6" src="/svg/ig.svg" />
          </Link>
        )}
        {youtube && (
          <Link
            className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
            target="_blank"
            href={`https://youtube.com/${youtube}`}
          >
            <img className="w-6" src="/svg/yt.svg" />
          </Link>
        )}
        {linkedin && (
          <Link
            className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
            target="_blank"
            href={`https://linkedin.com/${linkedin}`}
          >
            <img className="w-6" src="/svg/lnkd.svg" />
          </Link>
        )}
        {github && (
          <Link
            className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
            target="_blank"
            href={`https://github.com/${github}`}
          >
            <img className="w-6" src="/svg/github.svg" />
          </Link>
        )}
        {twitter && (
          <Link
            className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"
            target="_blank"
            href={`https://twitter.com/${twitter}`}
          >
            <img className="w-6" src="/svg/twt.svg" />
          </Link>
        )}
      </div>
      <div className="flex justify-center mb-4 mt-16">
        <div className="Links-container-bottom">
          <a
            className="Link-item-bottom Link-item1-bottom"
            target="_blank"
            href={"/"}
          >
            <img
              className="h-8 hover:rotate-45 transition-all duration-400 rounded-full pr-4"
              src="/images/logo.png"
            />
            <h6 className="block text-md font-semibold">
              Create your virtual id
            </h6>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialTree;
