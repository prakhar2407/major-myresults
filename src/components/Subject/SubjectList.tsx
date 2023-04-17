import {
  Alert,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Subject from "../../interface/Subject";
import EmptyList from "../common/EmptyList";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileUploadDialog from "../common/FileUploadDialog";
import { UploadRequests } from "../../utils/UploadRequests";
import SnackBarInterface from "../../interface/SnackBarInterface";
import TotalCount from "../common/TotalCount";
import { CChart } from "@coreui/react-chartjs";

const SubjectList = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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
      .get("/admin/getSubjects", {
        headers: { authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setSubjects(res.data.data);
      })
      .catch((err) => {
        setSnackBar({
          open: true,
          message: "Error Fetching Subjects",
          severity: "error",
        });
      });
  }, [dialogOpen]);

  return (
    <div style={{ margin: "2rem 0", padding: "2rem" }}>
      <div style={{ textAlign: "right", marginBottom: "2rem" }}>
        <Button
          style={{ marginRight: "1rem" }}
          variant="contained"
          size="small"
          startIcon={<FileUploadIcon />}
          onClick={() => {
            setDialogOpen(true);
          }}
          sx={{
            backgroundColor: "#58287F",
            "&:hover": {
              backgroundColor: "#58287F",
            },
          }}
        >
          Upload Student Subject
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => {
            navigate("/subjects/create");
          }}
          sx={{
            backgroundColor: "#58287F",
            "&:hover": {
              backgroundColor: "#58287F",
            },
          }}
        >
          Create
        </Button>
      </div>

      {subjects.length < 0 ? (
        <EmptyList />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <div style={{ marginRight: "2rem" }}>
              <TotalCount count={subjects.length} />
            </div>
            <div
              style={{
                display: "flex",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                padding: "3rem",
                borderRadius: "1%",
              }}
            >
              <CChart
                width={800}
                type="bar"
                data={{
                  labels: [
                    "FOCP",
                    "DSA",
                    "CN",
                    "DMBS",
                    "OS",
                    "AI & ML",
                    "Big Data",
                  ],
                  datasets: [
                    {
                      label: "Students",
                      backgroundColor: "#89C4E1",
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              padding: "3rem",
              borderRadius: "1%",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bolder" }}>Name</TableCell>
                    <TableCell style={{ fontWeight: "bolder" }}>
                      Active
                    </TableCell>
                    <TableCell style={{ fontWeight: "bolder" }}>
                      Created At
                    </TableCell>
                    <TableCell style={{ fontWeight: "bolder" }}>
                      Updated At
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((subject: Subject) => {
                    return (
                      <TableRow key={subject._id}>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>
                          {subject.active === 1 ? "Yes" : "No"}
                        </TableCell>
                        <TableCell>
                          {moment(subject.createdAt).format("LLL")}
                        </TableCell>
                        <TableCell>
                          {moment(subject.updatedAt).format("LLL")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
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
      <FileUploadDialog
        request={UploadRequests.uploadSubject}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </div>
  );
};

export default SubjectList;
