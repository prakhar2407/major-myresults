import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Student from "../../interface/Student";
import axios from "axios";
import EmptyList from "../common/EmptyList";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileUploadDialog from "../common/FileUploadDialog";
import { UploadRequests } from "../../utils/UploadRequests";
import SnackBarInterface from "../../interface/SnackBarInterface";
import TotalCount from "../common/TotalCount";
import { CChart } from "@coreui/react-chartjs";

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
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
      .get("/admin/getStudents", {
        headers: { authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setStudents(res.data.data);
      })
      .catch((err) => {
        setSnackBar({
          open: true,
          message: "Error Fetching Students",
          severity: "error",
        });
      });
  }, [dialogOpen]);

  return (
    <div style={{ margin: "1rem 0", padding: "2rem" }}>
      <div style={{ textAlign: "right" }}>
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
          Import
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => {
            navigate("/students/create");
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
      <div
        style={{
          display: "flex",
          margin: "2rem 0",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <div>
          <TotalCount count={students.length} />
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
            type="bar"
            width={800}
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
      {students.length < 0 ? (
        <EmptyList />
      ) : (
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
                  <TableCell style={{ fontWeight: "bolder" }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Roll No
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>Year</TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Semester
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Phone Number
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
                {students.map((student: Student) => {
                  return (
                    <TableRow key={student._id}>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.semester}</TableCell>
                      <TableCell>{student.phoneNumber}</TableCell>
                      <TableCell>
                        {moment(student.createdAt).format("LLL")}
                      </TableCell>
                      <TableCell>
                        {moment(student.updatedAt).format("LLL")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
        request={UploadRequests.uploadStudent}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </div>
  );
};

export default StudentList;
