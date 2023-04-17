import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SnackBarInterface from "../../interface/SnackBarInterface";

interface Subject {
  name: string;
  code: string;
  credit: number;
}

const AddSubject = () => {
  const [subject, setSubject] = useState<Subject>({
    name: "",
    code: "",
    credit: 0,
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
        <h3>Add Subject</h3>
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e: any) => {
            setSubject({ ...subject, name: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Code"
          variant="outlined"
          onChange={(e: any) => {
            setSubject({ ...subject, code: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Credits"
          variant="outlined"
          onChange={(e: any) => {
            setSubject({ ...subject, credit: Number(e.target.value) });
          }}
        />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Button
          onClick={() => {
            axios
              .post("/admin/addSubject", subject, {
                headers: { authorization: `${localStorage.getItem("token")}` },
              })
              .then((res) => {
                setSnackBar({
                  open: true,
                  message: "Subject Added Successfully",
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
          sx={{
            backgroundColor: "#58287F",
            "&:hover": {
              backgroundColor: "#58287F",
            },
          }}
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

export default AddSubject;
