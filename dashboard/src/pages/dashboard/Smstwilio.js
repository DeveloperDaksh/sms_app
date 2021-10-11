import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import axios from "axios";

const choices = [
  {
    value: "Transactional sms-99446",
    label: "Transactional sms-99446",
  },
  {
    value: "Transactional sms-99445",
    label: "Transactional sms-99445",
  },
  {
    value: "Transactional sms-99444",
    label: "Transactional sms-99444",
  },
];

const language = [
  {
    value: "English",
    label: "English",
  },
  {
    value: "German",
    label: "German",
  },
  {
    value: "Hindi",
    label: "Hindi",
  },
];

export default function Smstwilio() {
  const [choice, setChoice] = React.useState("Transactional sms-99446");
  const [mob, setMob] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [scheduledDate, setScheduledDate] = useState("2021-08-09");
  const [format, setFormat] = useState("");
  const [scheduledTime, setScheduledTime] = useState("12:00");
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const [lang, setLang] = React.useState("English");

  const handleChange2 = (event) => {
    setLang(event.target.value);
  };

  const [checked, setChecked] = React.useState(true);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const [checked2, setChecked2] = React.useState(false);

  const handleCheck2 = (event) => {
    setChecked2(event.target.checked);
  };

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  async function scheduleSMS() {
    let call = `http://smspanel.sainfotechnologies.in/rest/services/sendSMS/sendGroupSms?AUTH_KEY=16de534cf94e560a76121a780f42e39&message=${msg}&senderId=HOMEBS&routeId=1&mobileNos=${mob}&smsContentType=english&scheduleddate=${format} ${scheduledTime}`;

    try {
      await axios
        .get(call)
        .then((res) => {
          console.log(res);
          setMob("");
          setMsg("");
          setMessage("Message Scheduled");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const formatDateFunc = (e) => {
    setScheduledDate(e.target.value);
    const formatedDate = e.target.value.split("-");
    setFormat(`${formatedDate[2]}/${formatedDate[1]}/${formatedDate[0]}`);
  };

  async function handleClick() {
    let call = `http://smspanel.sainfotechnologies.in/rest/services/sendSMS/sendGroupSms?AUTH_KEY=16de534cf94e560a76121a780f42e39&message=${msg}&senderId=HOMEBS&routeId=1&mobileNos=${mob}&smsContentType=english`;
    try {
      await axios
        .get(call)
        .then((res) => {
          console.log(res);
          setMob("");
          setMsg("");
          setMessage("Message Sent");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    try {
      await axios
        .post("http://localhost:5000/message/save", {
          message: msg,
          phoneNumber: mob,
          name: "",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
        <h1 style={{ marginBottom: '20px' }}>
            Twilio SMS Send
        </h1>
        <TextField
          placeholder="Phone Number"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <TextField
            id="outlined-multiline-static"
            multiline
            rows={10}
            placeholder="Type your message here"
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px' }}
        />
      <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ height: "45px", width: "107px" }}
        >
          Send Now
        </Button>
    </div>
  );
}
