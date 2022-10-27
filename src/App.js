import { dividerClasses, Stack } from "@mui/material";
import {  useState } from "react";
import Chat from "./Chat";
import Side from "./Side";
import io from "socket.io-client";
function App() {
  const [clickcon, setClickcon] = useState("");
  const socket = io.connect("https://chat-app-provip.herokuapp.com/");


  return (
    // <Stack
    //   direction="row"
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //   }}
    // >
    //   <Side setClickcon={setClickcon} socket={socket} />
    //   <Chat clickcon={clickcon} socket={socket} />
    // </Stack>
    <div>
      <h1>This code</h1>
    </div>
  );
}

export default App;
