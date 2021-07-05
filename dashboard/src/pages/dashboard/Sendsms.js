import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';

const choices = [
    {
      value: 'Transactional sms-99446',
      label: 'Transactional sms-99446',
    },
    {
        value: 'Transactional sms-99445',
        label: 'Transactional sms-99445',
    },
    {
        value: 'Transactional sms-99444',
        label: 'Transactional sms-99444',
    },
  ];

  const language = [
    {
      value: 'English',
      label: 'English',
    },
    {
        value: 'German',
        label: 'German',
    },
    {
        value: 'Hindi',
        label: 'Hindi',
    },
  ];

export default function Sendsms() {

    const [choice, setChoice] = React.useState('Transactional sms-99446');

    const handleChange = (event) => {
        setChoice(event.target.value);
    };

    const [lang, setLang] = React.useState('English');

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

    return (
        <div>
            <TextField
                id="standard-select-sms"
                fullWidth
                select
                label="Select"
                value={choice}
                onChange={handleChange}
            >
            {choices.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
            </TextField>
            <h1 style={{marginTop: "20px"}}>Sender ID</h1>
            <TextField id="outlined-basic" variant="outlined" fullWidth/>
            <h1 style={{marginTop: "20px"}}>Mobile number</h1>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={10}
                defaultValue="Type your message here"
                variant="outlined"
                fullWidth
            />
            <div style={{margin: "20px 0 20px 0"}}>
                <h1 style={{display: "inline-block"}}>Description</h1>
                <div style={{float: 'right'}}>
                    <TextField
                        id="standard-select-language"
                        select
                        value={lang}
                        onChange={handleChange2}
                    >
                    {language.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={handleCheck}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    }
                    label={<h2>Flash On</h2>}
                    style={{float: 'right', paddingTop: "10px"}}
                />
            </div>

            <TextField
                id="outlined-multiline-static"
                multiline
                rows={10}
                defaultValue="Type your message here"
                variant="outlined"
                fullWidth
            />

            <span>
            <TextField
                defaultValue="Your Signature"
                variant="outlined"
                fullWidth
                style={{width: "91%"}}
            />
            <Button variant="outlined" style={{height: "55px", width: "107px",}}>Save</Button>
            </span>
            
            <div style={{marginTop: "20px"}}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked2}
                        onChange={handleCheck2}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                }
                label={<h1>Signature Enable</h1>}
            />
            <div style={{display: "inline-block", float: 'right'}}>
                <Button variant="outlined" style={{height: "45px", width: "107px",}}>Save</Button>
                <span style={{fontSize: "25px", marginLeft: "5px"}}>0/0</span>
            </div>
            </div>
            
            
            <div style={{marginTop: "20px"}}>
                <Button variant="contained" color="primary" style={{height: "45px", width: "107px",}}>
                Send Now
                </Button>
                <Button variant="contained" color="secondary" style={{height: "45px", width: "107px",marginLeft: "10px"}}>
                Schedule
                </Button>
            </div>
        </div>
    )
}