import React from "react";

const Logo = () => {
  return (
    <div className="relative w-8 h-8 overflow-visible">
      <svg
        width="32"
        height="32"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 group-hover:scale-110 w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <path
          d="M256 0L0 460H135L175 385H128L256 145L384 385H337L377 460H512L256 0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default Logo;