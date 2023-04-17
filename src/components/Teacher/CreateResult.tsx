import {
  Alert,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SnackBarInterface from "../../interface/SnackBarInterface";

interface Subject {
  subjectName: string;
  marks: number;
}

interface UserDetails {
  name: string;
  author: string;
  rollNo: string;
}

const CreateResult = () => {
  const [subject, setSubject] = useState<Subject>({
    subjectName: "",
    marks: 0,
  });
  const [subjectList, setSubjectList] = useState<Subject[]>([]);

  const [details, setDetails] = useState<UserDetails>({
    name: "",
    author: "",
    rollNo: "",
  });
  const navigate = useNavigate();

  const handleDelete = (subjectName: string) => {
    setSubjectList((current) =>
      current.filter((value) => value.subjectName !== subjectName)
    );
  };

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

  return (
    <div
      style={{
        display: "flex",
        marginTop: "2rem",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2rem",
          marginBottom: "2rem",
        }}
      >
        Create Result
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "1rem" }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e: any) => {
              setDetails({ ...details, name: e.target.value });
            }}
          />
        </div>
        <div style={{ marginRight: "1rem" }}>
          <TextField
            id="outlined-basic"
            label="Author"
            variant="outlined"
            onChange={(e: any) => {
              setDetails({ ...details, author: e.target.value });
            }}
          />
        </div>
        <div style={{ marginRight: "1rem" }}>
          <TextField
            id="outlined-basic"
            label="Roll No"
            variant="outlined"
            onChange={(e: any) => {
              setDetails({ ...details, rollNo: e.target.value });
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "1rem" }}>
          <TextField
            id="outlined-basic"
            label="Subject"
            variant="outlined"
            onChange={(e: any) => {
              setSubject({ ...subject, subjectName: e.target.value });
            }}
          />
        </div>
        <div style={{ marginRight: "1rem" }}>
          <TextField
            id="outlined-basic"
            label="Marks"
            variant="outlined"
            onChange={(e: any) => {
              setSubject({ ...subject, marks: e.target.value });
            }}
          />
        </div>
        <div style={{ marginRight: "1rem" }}>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              let list: Subject[] = subjectList.concat(subject);
              setSubjectList(list);
            }}
            sx={{
              backgroundColor: "#58287F",
              "&:hover": {
                backgroundColor: "#58287F",
              },
            }}
          >
            +
          </Button>
        </div>
      </div>
      <div>
        {subjectList.length !== 0 && (
          <Table sx={{ width: "20rem" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bolder" }}>Subject</TableCell>
                <TableCell style={{ fontWeight: "bolder" }}>Marks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectList.map((subject, index) => {
                return (
                  <TableRow key={index + ""}>
                    <TableCell>{subject.subjectName || ""}</TableCell>
                    <TableCell>{subject.marks || ""}</TableCell>
                    <TableCell>
                      <Button
                        disabled={subjectList.length === 1}
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          handleDelete(subject.subjectName);
                        }}
                        sx={{
                          backgroundColor: "#58287F",
                          "&:hover": {
                            backgroundColor: "#58287F",
                          },
                        }}
                      >
                        -
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Button
          disabled={subjectList.length === 0}
          variant="contained"
          color="success"
          onClick={() => {
            let subjects: { [key: string]: number } = {};
            subjectList.forEach((subject) => {
              subjects[String(subject.subjectName)] = subject.marks;
            });
            const payload = {
              name: details.name,
              author: details.author,
              rollNo: details.rollNo,
              subject: subjects,
            };
            const result = [payload];
            const result2 = { result };
            axios
              .post("/teacher/createResult", result2, {
                headers: { authorization: `${localStorage.getItem("token")}` },
              })
              .then((res) => {
                setSnackBar({
                  open: true,
                  message: "Result Uploaded Successfully",
                  severity: "success",
                });
                setDetails({
                  name: "",
                  author: "",
                  rollNo: "",
                });
                setSubjectList([]);
                setSubject({
                  subjectName: "",
                  marks: 0,
                });
                navigate("/results");
              })
              .catch((err) => {
                setSnackBar({
                  open: true,
                  message: err.response.data.error,
                  severity: "error",
                });
              });
          }}
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

export default CreateResult;
