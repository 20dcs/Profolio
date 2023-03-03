import React from "react";
import data from "../../data.json"
const GitHubProfile = ({ marginBottom }) => {
  return (
    <div className={`w-8 h-8 ${marginBottom}`}>
      <a
        href= {`${data.Contact.Github}`}
        target="_blank"
        rel="noreferrer"
      >
        <svg
          className="dark:text-white text-dark transition-all duration-300 ease-in-out transform translate-y-0 dark:opacity-50 fill-current dark:hover:opacity-100 hover:-translate-y-1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 6a6 6 0 00-1.896 11.693c.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615A5.782 5.782 0 0112 8.901c.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288A6 6 0 0012 6z" />
        </svg>
      </a>
    </div>
  );
};

export default GitHubProfile;
