import React from "react";
import { IoIosArrowDropright } from "react-icons/io";

const ButtonPrimary = ({ title, loading }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full min-h-6 inline-flex rounded-lg h-8 md:h-12 p-5 justify-center items-center gap-2 text-center bg-buttonPrimary hover:bg-buttonHover text-base font-semibold"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <>
            {" "}
            {title} <IoIosArrowDropright />
          </>
        )}
      </button>
    </div>
  );
};

export default ButtonPrimary;
