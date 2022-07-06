import React from "react";

const Header = () => {
  return (
    <>
      <div
        style={{
          color: "dark",
          marginBottom: 30,
          fontFamily: "Myriad Pro Regular",
          border: "1px solid rgba(0, 0, 0, 10)",
        }}
        className="font-weight-light display-1 text-center"
      >
        Sc
        <i
          style={{
            color: "linear-gradient(red, yellow, green)",
            fontSize: "50px",
          }}
          class="fa-solid fa-magnifying-glass"
        ></i>
        ped
      </div>
    </>
  );
};

export default Header;
