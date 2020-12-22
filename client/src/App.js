import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./components/Chat";
import Message from "./components/Message";
import "./App.scss";

const ENDPOINT = "http://localhost:8000/";

const socket = io(ENDPOINT);

function App() {
  const [state, setState] = useState({
    response: "",
    message: "",
    chat: [],
  });

  const promptForUsername = () => {
    const username = prompt("Please enter a username");

    if (username) socket.emit("send-nickname", username);
  };

  const sendMessage = (message) => {
    socket.emit("chat-message", message);
    setState(Object.assign({}, state, { message: "" }));
    console.log(state.chat);
  };

  const updateMessages = (message) =>
    setState((prevState) => ({
      ...prevState,
      chat: [...prevState.chat, message],
    }));

  useEffect(() => {
    promptForUsername();

    socket.on("chat-message", (message) => {
      updateMessages(message);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="App">
      {state.chat.map((msg) => {
        return <Message msg={msg} />;
      })}
      <Chat
        setState={setState}
        message={state.message}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default App;
