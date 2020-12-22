import React from "react";
import style from "./style.module.scss";

export const Chat = ({ message, sendMessage, setState }) => {
  const onChange = (e) =>
    setState((prevState) => ({ ...prevState, message: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
  };

  return (
    <div className={style.Chat}>
      <form className={style.Form} onSubmit={onSubmit}>
        <input
          className={style.Message}
          type="text"
          name="message"
          value={message}
          onChange={onChange}
          placeholder="Start typing..."
        />
        <button className={style.Send} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
