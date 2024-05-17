import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      aria-label="Site-footer"
      className="fixed bottom-3 left-1/2 -translate-x-1/2"
    >
      <Link className="flex flex-row items-center" target="_blank" href={"/"}>
        <img
          className="h-8 hover:rotate-45 transition-all duration-400 rounded-full pr-4"
          src="/images/logo.png"
        />
        <h5 className="text-indigo-400 pl-4 font-bold hover:text-indigo-300 transition-all duration-400">
          Create your own virtual id dd
        </h5>
      </Link>
    </footer>
  );
};

export default Footer;
