import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SnackBarInterface from "../../interface/SnackBarInterface";

export interface Teacher {
  name: string;
  email: string;
  employeementId: string;
  subject: string;
  phoneNumber: string;
}

const AddTeacher = () => {
  const [teacher, setTeacher] = useState<Teacher>({
    name: "",
    email: "",
    employeementId: "",
    subject: "",
    phoneNumber: "",
  });

  const [snackBar, setSnackBar] = useState<SnackBarInterface>({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ ...snackBar, open: false });
  };

  return (
    <div style={{ margin: "1rem auto 0 auto" }}>
      <div style={{ textAlign: "center" }}>
        <h3>Add Teacher</h3>
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e: any) => {
            setTeacher({ ...teacher, name: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e: any) => {
            setTeacher({ ...teacher, email: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Employement Id"
          variant="outlined"
          onChange={(e: any) => {
            setTeacher({ ...teacher, employeementId: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Subject"
          variant="outlined"
          onChange={(e: any) => {
            setTeacher({ ...teacher, subject: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          onChange={(e: any) => {
            setTeacher({ ...teacher, phoneNumber: e.target.value });
          }}
        />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Button
          onClick={() => {
            axios
              .post("/admin/registerTeacher", teacher, {
                headers: { authorization: `${localStorage.getItem("token")}` },
              })
              .then((res) => {
                setSnackBar({
                  open: true,
                  message: "Teacher Added Successfully",
                  severity: "success",
                });
                navigate("/teachers");
              })
              .catch((err) => {
                console.log(err);
                setSnackBar({
                  open: true,
                  message: err.response.data.error,
                  severity: "error",
                });
              });
          }}
          variant="outlined"
        >
          Save
        </Button>
      </div>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBar.severity}
          sx={{ width: "100%" }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddTeacher;
