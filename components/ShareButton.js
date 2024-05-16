import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const ShareButton = () => {
  const router = useRouter();
  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://virtualid.vercel.app/${router.query.handle}`
    );
    toast("Copied to Clipboard");
  };
  return (
    <div
      className="absolute cursor-pointer top-10 right-8 md:right-80 bg-gray-250 hover:bg-gray-200 p-4 rounded-full z-10 shadow-md border-2 border-gray-300"
      onClick={copyLink}
    >
      <img className="w-4" src="/svg/share.svg" />
    </div>
  );
};

export default ShareButton;
