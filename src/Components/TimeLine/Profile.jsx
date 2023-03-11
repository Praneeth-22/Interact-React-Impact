import React from 'react'
import { Typography } from '@mui/material'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//
function Profile(props) {
    const { name,email } = props;
    console.log("in profile:",name);
  return (
    <div>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Profile editing section {name}
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Name"
            variant="outlined"
            defaultValue={name}
          />

          <TextField
            id="outlined-multiline-static"
            label="Email"
            variant="outlined"
            defaultValue={email}
          />
        </div>
        <div>
          <Button variant="contained" color="success">
            Success
          </Button>
          <Button variant="outlined" color="error">
            Error
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Profile
