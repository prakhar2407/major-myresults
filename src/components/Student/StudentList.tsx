import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
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

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/admin/getStudents", {
        headers: { authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setStudents(res.data.data);
      })
      .catch((err) => {
        alert("Error Fetching Students");
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
            navigate("/students/create");
          }}
        >
          Create
        </Button>
      </div>
      {students.length < 0 ? (
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
      <FileUploadDialog
        request={UploadRequests.uploadStudent}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </div>
  );
};

export default StudentList;
