import React from "react";

type GreetProps = {
  name?: string;
};

const Greet = (props: GreetProps) => {
  return <div>Hello {props.name ? props.name : null}</div>;
};

export default Greet;
