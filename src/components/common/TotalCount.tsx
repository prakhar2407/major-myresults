import React from "react";

function TotalCount(props: any) {
  const { count } = props;
  return (
    <div
      style={{
        display: "flex",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        padding: "3rem",
        borderRadius: "5%",
        backgroundColor: "#F5EDCE",
      }}
    >
      <div style={{ fontWeight: "bold", marginRight: "0.5rem" }}>
        Total Count:{" "}
      </div>
      <div>{`${count}`}</div>
    </div>
  );
}

export default TotalCount;
