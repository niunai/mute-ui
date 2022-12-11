import React, { useEffect, useState } from "react";
import {} from "react-bootstrap";
import { Alert, Box, Container, FormGroup, FormControlLabel, Switch } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

import setting from "./setting.json";

function App() {
  const [isMute, setMute] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const apiServerUrl = setting.apiServerUrl;

  useEffect(() => {
    document.title = "Mute";
    fetch(apiServerUrl)
      .then((res) => res.json())
      .then((data) => {
        setMute(JSON.parse(data.mute));
        setAlertMsg("mute is " + data.mute);
      })
      .catch((err) => {
        setAlertMsg(err.message);
      });
  }, [apiServerUrl]);

  const handleSwitchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      fetch(apiServerUrl + "/mute")
        .then((res) => res.json())
        .then((data) => {
          setMute(JSON.parse(data.mute));
          setAlertMsg("set mute to " + data.mute);
        })
        .catch((err) => {
          setAlertMsg(err.message);
        });
    } else {
      fetch(apiServerUrl + "/unmute")
        .then((res) => res.json())
        .then((data) => {
          setMute(JSON.parse(data.mute));
          setAlertMsg("set mute to " + data.mute);
        })
        .catch((err) => {
          setAlertMsg(err.message);
        });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <FormGroup>
          <FormControlLabel control={
            <Switch
              checked={isMute}
              onChange={handleSwitchChange}
            />} label="Mute" />
        </FormGroup>
        <Alert
          style={{ width: "100%" }}
          sx={{
            marginTop: 3,
          }}
          severity="info">
          {alertMsg}
        </Alert>
      </Box>
    </Container>
  );
}

export default App;
