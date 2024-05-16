import React, { use, useEffect } from "react";

const LinkBox = ({ lbTitle, lbNumber, lbSvg, lbTheme }) => {
  useEffect(() => {
    console.log({ lbTitle, lbNumber, lbSvg, lbTheme });
  }, []);
  return (
    <div className="flex items-center p-6 md:p-8 bg-white shadow border rounded-lg">
      <div
        className={`${lbTheme} inline-flex flex-shrink-0 items-center justify-center h-16 w-16 rounded-full mr-6`}
      >
        <img src={`/svg/${lbSvg}.svg`} className="w-6" />
      </div>
      <div className="">
        <span className="inline-block text-2xl font-bold">{lbNumber}</span>
        <span className="block text-gray-500">{lbTitle}</span>
      </div>
    </div>
  );
};

export default LinkBox;