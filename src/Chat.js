import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ clickcon, socket }) {
  const [message, setMessage] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/message")
      .then(function (response) {
        var doneTasks = response.data.filter(function (task) {
          return task.cid === clickcon;
        });
        setMessage(doneTasks);
        setMessageList("");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [clickcon]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: "conversation",
        author: localStorage.getItem("id"),
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      setMessageList((list) => [...list, messageData]);
      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };
  const handleClose = () => {
    socket.emit("forceDisconnect");
  };
  return (
    <Box
      sx={{
        width: 500,
        height: 500,
        backgroundColor: "red",
        overflowY: "auto",
      }}
    >
      <Typography onChange={handleClose}>{clickcon}</Typography>
      <ScrollToBottom className="message-container">
        {Array.from(message.concat(messageList)).map((con, i) => (
          <Box key={i}>{con.content}</Box>
        ))}
        {Array.from(messageList).map((messageContent, i) => (
          <div key={i}>
            {messageContent.message} + {messageContent.author}
          </div>
        ))}
      </ScrollToBottom>

      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </Box>
  );
}

export default Chat;
