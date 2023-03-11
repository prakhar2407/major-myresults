import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

interface Subject {
  subjectName: string;
  marks: number;
}

const AdminResultCreate = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { subjectName: "", marks: 0 },
  ]);

  const handlePlusClick = () => {
    setSubjects([...subjects, { subjectName: "", marks: 0 }]);
  };

  const handleMinusClick = () => {
    if (subjects.length > 1) {
      setSubjects(subjects.slice(0, subjects.length - 1));
    }
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
          <TextField id="outlined-basic" label="Name" variant="outlined" />
        </div>
        <div style={{ marginRight: "1rem" }}>
          <TextField id="outlined-basic" label="Author" variant="outlined" />
        </div>
        <div style={{ marginRight: "1rem" }}>
          <TextField id="outlined-basic" label="Roll No" variant="outlined" />
        </div>
      </div>
      <div>
        {subjects.map((subject, index) => {
          return (
            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{ marginRight: "1rem" }}>
                <TextField
                  id="outlined-basic"
                  label="Subject"
                  variant="outlined"
                />
              </div>
              <div style={{ marginRight: "1rem" }}>
                <TextField
                  id="outlined-basic"
                  label="Marks"
                  variant="outlined"
                />
              </div>
              <div style={{ display: "flex", marginTop: "0.6rem" }}>
                <div style={{ marginRight: "1rem" }}>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={handlePlusClick}
                  >
                    +
                  </Button>
                </div>
                <div>
                  <Button
                    disabled={subjects.length === 1}
                    variant="outlined"
                    color="error"
                    onClick={handleMinusClick}
                  >
                    -
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminResultCreate;
