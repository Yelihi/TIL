import React from "react";

const NameList = ({ names }) => {
  return (
    <ul>
      {names.map((name, i) => {
        return <li key={i}>{name}</li>;
      })}
    </ul>
  );
};

export default NameList;
