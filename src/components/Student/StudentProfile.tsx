import { Alert, Box, Snackbar } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import SnackBarInterface from "../../interface/SnackBarInterface";
import Student from "../../interface/Student";

function CustomTextField(props: any) {
  return (
    <Box sx={{ width: "100px", margin: "0.5rem" }}>
      <p style={{ margin: 0, color: "grey", fontSize: "0.8rem" }}>
        {props?.label}
      </p>
      <p style={{ margin: 0 }}>{props?.data || "Not Available"}</p>
    </Box>
  );
}

const StudentProfile = () => {
  const [studentData, setStudentData] = useState<Student | null>(null);

  const [snackBar, setSnackBar] = useState<SnackBarInterface>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ ...snackBar, open: false });
  };

  useEffect(() => {
    axios
      .get("/student/getProfile", {
        headers: { authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setStudentData(res.data.data);
      })
      .catch((err) => {
        setSnackBar({
          open: true,
          message: "Error Fetching Details",
          severity: "error",
        });
      });
  }, []);

  if (!studentData) return <></>;
  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "1rem 15rem 0 0" }}>
        <CustomTextField label="Id" data={studentData?._id} />
        <CustomTextField label="Email" data={studentData?.email} />
        <CustomTextField label="Name" data={studentData?.name} />
        <CustomTextField label="Roll Number" data={studentData?.rollNumber} />
        <CustomTextField label="Year" data={studentData?.year} />
        <CustomTextField label="Semester" data={studentData?.semester} />
      </div>
      <div style={{ margin: "1rem 10rem 10rem 0" }}>
        <CustomTextField label="Phone Number" data={studentData?.phoneNumber} />
        <CustomTextField
          label="Created At"
          data={moment(studentData?.createdAt).format("LLL")}
        />
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

export default StudentProfile;
