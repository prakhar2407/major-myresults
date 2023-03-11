import {
  Button,
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

const SubjectList = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/admin/getSubjects", {
        headers: { authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setSubjects(res.data.data);
      })
      .catch((err) => {
        alert("Error Fetching Subjects");
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
            navigate("/subjects/create");
          }}
        >
          Create
        </Button>
      </div>
      {subjects.length < 0 ? (
        <EmptyList />
      ) : (
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bolder" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>Active</TableCell>
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
      )}
      <FileUploadDialog
        request={UploadRequests.uploadSubject}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </div>
  );
};

export default SubjectList;
