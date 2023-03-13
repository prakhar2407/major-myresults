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
import React, { useEffect, useState } from "react";
import SnackBarInterface from "../../interface/SnackBarInterface";
import EmptyList from "../common/EmptyList";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useNavigate } from "react-router-dom";
import FileUploadDialog from "../common/FileUploadDialog";
import { UploadRequests } from "../../utils/UploadRequests";

const ResultList = () => {
  const [result, setResult] = useState<any | null>();
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
      .get("/teacher/getResultOfAllStudentEnrolled", {
        headers: { authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setResult(res.data.data);
      })
      .catch((err) => {
        setSnackBar({
          open: true,
          message: "Error Fetching Result",
          severity: "error",
        });
      });
  }, []);

  return (
    <div style={{ margin: "1rem 0" }}>
      <div style={{ textAlign: "right" }}>
        <Button
          style={{ marginRight: "1rem" }}
          variant="contained"
          size="small"
          startIcon={<FileUploadIcon />}
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Export
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => {
            navigate("/results/create");
          }}
        >
          Create
        </Button>
      </div>
      {result === null ? (
        <EmptyList />
      ) : (
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Roll No
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result ? (
                  Object.values(result).map((value: any, index: number) => {
                    if (!value) {
                      return null;
                    }
                    return (
                      <TableRow key={index + ""}>
                        <TableCell>{value["rollNumber"] || ""}</TableCell>
                        <TableCell>{value["grade"] || ""}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <EmptyList />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <FileUploadDialog
        request={UploadRequests.uploadStudentMarks}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
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

export default ResultList;
