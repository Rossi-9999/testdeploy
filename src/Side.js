import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function Side({ setClickcon, socket }) {
  const [conversation, setConversation] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/conversation")
      .then(function (response) {
        setConversation(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleClick = (e) => {
    socket.emit("join_room", e.cid);
    setClickcon(e.cid);
  };
  return (
    <Box sx={{ width: 350, height: 500, backgroundColor: "lightgray" }}>
      {Array.from(conversation).map((con, i) => (
        <Box key={i} sx={{ marginTop: 2 }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => handleClick(con)}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {con.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default Side;
