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
import { useEffect, useState } from "react";
import Teacher from "../../interface/Teacher";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import EmptyList from "../common/EmptyList";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileUploadDialog from "../common/FileUploadDialog";
import { UploadRequests } from "../../utils/UploadRequests";
import SnackBarInterface from "../../interface/SnackBarInterface";

const TeacherList = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
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
      .get("/admin/getTeachers", {
        headers: { authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTeachers(res.data.data);
      })
      .catch((err) => {
        setSnackBar({
          open: true,
          message: "Error Fetching Teachers",
          severity: "error",
        });
      });
  }, [dialogOpen]);

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
            navigate("/teachers/create");
          }}
        >
          Create
        </Button>
      </div>
      {teachers.length < 0 ? (
        <EmptyList />
      ) : (
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bolder" }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Employement Id
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Subject
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
                {teachers.map((teacher: Teacher) => {
                  return (
                    <TableRow key={teacher._id}>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.employeementId}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>{teacher.phoneNumber}</TableCell>
                      <TableCell>
                        {moment(teacher.createdAt).format("LLL")}
                      </TableCell>
                      <TableCell>
                        {moment(teacher.updatedAt).format("LLL")}
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
        request={UploadRequests.uploadTeacher}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </div>
  );
};

export default TeacherList;
