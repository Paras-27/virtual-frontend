import React from "react";

const LinkTreeCard = ({ title, url }) => {
  return (
    <>
      <span className="w-full">
        <div className="Links-container">
          <a className="Link-item Link-item1" target="_blank" href={`${url}`}>
            {title}
          </a>
        </div>
      </span>
    </>
  );
};

export default LinkTreeCard;
