import "../styles.css";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// added after deployment
import { Divider } from '@mui/material'; 
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// added after deployment ends here
import { useState } from "react";
import uniqueid from "uniqueid";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
});
export default function OxygenLevel() {
  const [value, setValue] = useState(null);
  const [session, setSession] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [bpmValue, setBpmValue] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setSession(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const postOxygenData = (oxygenObj) => {
    axios
      .post("https://suoxappbackend.herokuapp.com/api/oxygen", {
        //id: uniqueid(),
        oxygen_level: oxygenObj.oxygen_level,
        month: oxygenObj.oxygen_taken_month,
        date: oxygenObj.oxygen_taken_date,
        time: oxygenObj.oxygen_taken_time,
        bpm: oxygenObj.bpm_value,
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSave = (event) => {
    var sessionValue = "";
    if (session === 10) {
      sessionValue = "Morning";
    } else if (session === 20) {
      sessionValue = "Afternoon";
    } else if (session === 30) {
      sessionValue = "Evening";
    } else if (session === 40) {
      sessionValue = "Night";
    } else {
      sessionValue = "";
    }
    var oxygenObject = {
      oxygen_level: oxygenLevel,
      oxygen_taken_month: value.getUTCMonth() + 1,
      oxygen_taken_date: value.getDate(),
      oxygen_taken_time: sessionValue,
      bpm_value: bpmValue
    };
    //console.log(value);

    console.log(oxygenObject);
    postOxygenData(oxygenObject);
    setOpen(true);
  };

  return (
    <div className="App">
      <h3>Patient Oxygen Daily Values</h3>
      <Divider/>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Test Date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div>
        <TextField
          id="standard-basic"
          label="Oxygen Level"
          value={oxygenLevel}
          onChange={(event) => {
            setOxygenLevel(event.target.value);
          }}
          variant="standard"
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="BPM"
          value={bpmValue}
          onChange={(event) => {
            setBpmValue(event.target.value);
          }}
          variant="standard"
        />
      </div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Session</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={session}
          label="Session"
          onChange={handleChange}
        >
          <MenuItem value={10}>Morning (6 AM - 12 PM)</MenuItem>
          <MenuItem value={20}>Afternoon(12 PM - 4 PM)</MenuItem>
          <MenuItem value={30}>Evening (4 PM - 8 PM)</MenuItem>
          <MenuItem value={40}>Night (8 PM - 11 PM)</MenuItem>
        </Select>
      </FormControl>
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="contained" onClick={onSave}>
        Save
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Oxygen Data Saved Successfully !
        </Alert>
      </Snackbar>
      {/* <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
      {/* <div>
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </div> */}
    </div>
  );
}
