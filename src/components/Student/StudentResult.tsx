import React from "react";
import "../../styles/ResultComponentStyle.css";
import resultData from "../../data/resultData";

const StudentResult = () => {
  return (
    <div style={{ margin: "4rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <img style={{ width: "100px" }} src="/LogoNCU.jpg" alt="logo" />
          </div>
        </div>
        <div style={{ textAlign: "center", fontWeight: "bolder" }}>
          <div
            style={{ color: "yellow" }}
          >{`${resultData.name}, ${resultData.rollNo}`}</div>
          <div style={{ fontSize: "2rem", color: "#c10002" }}>
            THE NORTHCAP UNIVERSITY
          </div>
          <div>
            Established under Haryana Legislature Act No. 25 of 2009 Approved by
            UGC under Section 2 (f)
          </div>
          <div style={{ fontSize: "2rem" }}>
            PROVISIONAL DETAILED GRADE SHEET
          </div>
          <div>UNDER CREDIT BASED SYSTEM</div>
          <div>FOR</div>
          <div>{`${resultData.degree}`}</div>
          <div style={{ color: "#c10002" }}>{`${resultData.branch}`}</div>
          <div>{`${resultData.semester}th Semester Examination ${resultData.semesterMonthStart} - ${resultData.semesterMonthEnd} ${resultData.semesterYear}`}</div>
        </div>
        <div>
          <img
            style={{ width: "12rem", marginTop: "9rem" }}
            src="/RandomProfile.jpg"
            alt="logo"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "3rem",
          fontWeight: "bolder",
        }}
      >
        <div>
          <div>{`NAME: ${resultData.name}`}</div>
          <div>{`FATHER'S NAME: ${resultData.fatherName}`}</div>
        </div>
        <div>
          <div>{`ENROLMENT NO.: ${resultData.rollNo}`}</div>
          <div>{`MOTHER'S NAME: : ${resultData.motherName}`}</div>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <table id="result" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "2rem" }}>S.NO</th>
              <th>Course</th>
              <th>Code</th>
              <th>Credits</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {resultData.result.map((result: any, index: number) => (
              <tr>
                <td>{index + 1}</td>
                <td>{result.course}</td>
                <td>{result.courseCode}</td>
                <td>{result.courseCredits}</td>
                <td>{result.courseGrade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "2rem", fontWeight: "bolder" }}>
        <div>{`SEMESTER - ${resultData.semester}`}</div>
        <div>{`TOTAL CREDITS EARNED UPTO VII SEMESTER : ${resultData.creditsEarned}`}</div>
        <div>{`SEMESTER GRADE POINT AVERAGE(SGPA) : ${resultData.sgpa}`}</div>
        <div>{`CUMULATIVE GRADE POINT AVERAGE (CGPA) : ${resultData.cgpa}`}</div>
      </div>
    </div>
  );
};

export default StudentResult;
