import React from "react";

export const Message = ({ msg }) => {
  console.log(msg);
  return <div className="Message">{msg}</div>;
};

export default Message;
