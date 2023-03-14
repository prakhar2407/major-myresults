import React, { useEffect, useState } from "react";
import "../../styles/ResultComponentStyle.css";
import resultData from "../../data/resultData";
import Result from "../../interface/Result";
import axios from "axios";
import SnackBarInterface from "../../interface/SnackBarInterface";
import { Snackbar, Alert } from "@mui/material";
import Student from "../../interface/Student";

const StudentResult = () => {
  const [result, setResult] = useState<Result[]>([]);
  const [profileData, setProfileData] = useState<Student | null>(null);

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
    //API Call for Result
    axios.get(`student/getResult?mentor=sameervashisht39@gmail.com`,{
      headers: { authorization: `${localStorage.getItem("token")}` },
    }).then((res) => {
      setResult(res.data.data);
    }).catch((err) => {
      setSnackBar({
        open: true,
        message: err.response.data.message,
        severity: "error",
      });
    })

    //API call for Profile
    axios
    .get("/student/getProfile", {
      headers: { authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => {
      setProfileData(res.data.data);
    })
    .catch((err) => {
      setSnackBar({
        open: true,
        message: "Error Fetching Details",
        severity: "error",
      });
    });
  },[])
  return (
    <div style={{ margin: "4rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <img style={{ width: "100px" }} src="/LogoNCU.jpg" alt="logo" />
          </div>
        </div>
        <div style={{ textAlign: "center", fontWeight: "bolder" }}>
          <div
            style={{ color: "yellow" }}
          >{`${profileData?.name}, ${profileData?.rollNumber}`}</div>
          <div style={{ fontSize: "2rem", color: "#c10002" }}>
            THE NORTHCAP UNIVERSITY
          </div>
          <div>
            Established under Haryana Legislature Act No. 25 of 2009 Approved by
            UGC under Section 2 (f)
          </div>
          <div style={{ fontSize: "2rem" }}>
            PROVISIONAL DETAILED GRADE SHEET
          </div>
          <div>UNDER CREDIT BASED SYSTEM</div>
          <div>FOR</div>
          <div>{`${resultData.degree}`}</div>
          <div style={{ color: "#c10002" }}>{`${resultData.branch}`}</div>
          <div>{`${profileData?.semester}th Semester Examination ${resultData.semesterMonthStart} - ${resultData.semesterMonthEnd} ${resultData.semesterYear}`}</div>
        </div>
        <div>
          <img
            style={{ width: "12rem", marginTop: "9rem" }}
            src="/RandomProfile.jpg"
            alt="logo"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "3rem",
          fontWeight: "bolder",
        }}
      >
        <div>
          <div>{`NAME: ${profileData?.name}`}</div>
          <div>{`FATHER'S NAME: ${resultData.fatherName}`}</div>
        </div>
        <div>
          <div>{`ENROLMENT NO.: ${profileData?.rollNumber}`}</div>
          <div>{`MOTHER'S NAME: : ${resultData.motherName}`}</div>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <table id="result" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "2rem" }}>S.NO</th>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {result.map((result: any, index: number) => (
              <tr key={index + ""}>
                <td>{index + 1}</td>
                <td>{result.course}</td>
                <td>{result.courseGrade}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default StudentResult;
