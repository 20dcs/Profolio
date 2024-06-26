import React from "react";
import data from "../data.json"
// const BColor= data.Color;

const Button = ({BColor,Color, link, text, icon, square }) => {
  return (
    <a href={link} className="text-white" target="_blank" rel="noreferrer">
      <button
        className={`inline-flex items-center self-start mt-2 mr-2 transition-all duration-200 ease-in-out transform translate-y-0 dark:bg-white rounded-md no-text group dark:bg-opacity-5 dark:hover:bg-opacity-10 hover:-translate-y-1 ${
          square ? "w-12 btn-sm-no-text" : "btn-sm"
        }`}
        style={{backgroundColor:BColor}}
      >
        {icon}
        {text ? (
          <span
            className={`font-semibold dark:opacity-50 opacity-70 group-hover:opacity-100`}
          >
            {text}
          </span>
        ) : null}
      </button>
    </a>
  );
};

export default Button;
