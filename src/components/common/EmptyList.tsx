import React from "react";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

const EmptyList = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        marginTop: "4rem",
        boxShadow: "10px 10px",
        padding: "7rem",
        backgroundColor: "#F8F4EA",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <PlaylistRemoveIcon sx={{ fontSize: "10rem" }} />
      </div>
      <div style={{ fontSize: "2rem" }}>No Data Available</div>
    </div>
  );
};

export default EmptyList;
