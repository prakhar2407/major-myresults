import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Snackbar,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import React, { useState } from "react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SnackBarInterface from "../../interface/SnackBarInterface";

interface InputProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  request: string;
}

const FileUploadDialog = (props: InputProps) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      axios
        .post(props.request, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setSnackBar({
            open: true,
            message: "File uploaded successfully",
            severity: "success",
          });
          props.setOpen(false);
          setSelectedFile(null);
        })
        .catch((err) => {
          setSnackBar({
            open: true,
            message: err.response.data.error,
            severity: "error",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog fullWidth open={props.open}>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div
              style={{
                margin: "1rem",
                width: "100%",
                height: "15rem",
                border: "1px dotted #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                {selectedFile ? (
                  <CheckCircleIcon
                    style={{ fontSize: "5rem", color: "green" }}
                  />
                ) : (
                  <IconButton
                    disableFocusRipple
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{ color: "#58287F" }}
                  >
                    <input
                      hidden
                      type="file"
                      onChange={(event) => {
                        if (event.target.files) {
                          setSelectedFile(event.target.files[0]);
                        }
                      }}
                    />
                    <FileUploadIcon style={{ fontSize: "5rem" }} />
                  </IconButton>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpen(false);
              setSelectedFile(null);
            }}
            sx={{
              color: "white",
              backgroundColor: "#58287F",
              "&:hover": {
                backgroundColor: "#58287F",
              },
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#58287F",
              color: "white",
              "&:hover": {
                backgroundColor: "#58287F",
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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

export default FileUploadDialog;
