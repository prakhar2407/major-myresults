import { Admin, Resource, ListGuesser } from "react-admin";
import authProvider from "./authProvider";
import { Roles } from "./enums/RolesEnum";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import StudentResult from "./components/Student/StudentResult";
import AdminResultCreate from "./components/Admin/AdminResultCreate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TeacherList from "./components/Teacher/TeacherList";
import AddTeacher from "./components/Teacher/AddTeacher";
import StudentList from "./components/Student/StudentList";
import AddStudent from "./components/Student/AddStudent";
import SchoolIcon from "@mui/icons-material/School";
import SubjectList from "./components/Subject/SubjectList";
import AddSubject from "./components/Subject/AddSubject";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") === null) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Admin authProvider={authProvider}>
      {(permissions) => (
        <>
          {permissions === Roles.Student ? (
            <Resource
              options={{ label: "Result" }}
              name="results"
              list={<StudentResult />}
              icon={AssignmentIcon}
            />
          ) : null}
          {permissions === Roles.Teacher ? (
            <>
              <Resource
                options={{ label: "Students" }}
                name="posts"
                list={ListGuesser}
                icon={PeopleIcon}
              />
              <Resource
                options={{ label: "Results" }}
                name="comments"
                list={ListGuesser}
                icon={AssignmentIcon}
                create={AdminResultCreate}
              />
            </>
          ) : null}
          {permissions === Roles.Admin ? (
            <>
              <Resource
                options={{ label: "Students" }}
                name="students"
                list={StudentList}
                icon={PeopleIcon}
                create={AddStudent}
              />
              <Resource
                options={{ label: "Teachers" }}
                name="teachers"
                list={TeacherList}
                icon={SchoolIcon}
                create={AddTeacher}
              />
              <Resource
                options={{ label: "Subjects" }}
                name="subjects"
                list={SubjectList}
                icon={AssignmentIcon}
                create={AddSubject}
              />
            </>
          ) : null}
        </>
      )}
    </Admin>
  );
};

export default App;
