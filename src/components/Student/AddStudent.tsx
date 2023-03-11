import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SnackBarInterface from "../../interface/SnackBarInterface";

export interface Student {
  name: string;
  email: string;
  rollNumber: string;
  year: number;
  semester: number;
  phoneNumber: string;
}

const AddStudent = () => {
  const [student, setStudent] = useState<Student>({
    name: "",
    email: "",
    rollNumber: "",
    year: 0,
    semester: 0,
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
        <h3>Add Student</h3>
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e: any) => {
            setStudent({ ...student, name: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e: any) => {
            setStudent({ ...student, email: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Roll No"
          variant="outlined"
          onChange={(e: any) => {
            setStudent({ ...student, rollNumber: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Year"
          variant="outlined"
          onChange={(e: any) => {
            setStudent({ ...student, year: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Semester"
          variant="outlined"
          onChange={(e: any) => {
            setStudent({ ...student, semester: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          onChange={(e: any) => {
            setStudent({ ...student, phoneNumber: e.target.value });
          }}
        />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Button
          onClick={() => {
            axios
              .post("/admin/registerStudent", student, {
                headers: { authorization: `${localStorage.getItem("token")}` },
              })
              .then((res) => {
                setSnackBar({
                  open: true,
                  message: "Student Added Successfully",
                  severity: "success",
                });
                navigate("/subjects");
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

export default AddStudent;
