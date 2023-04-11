import axios from "axios";

export default function getSubjectName(subjectId: string): string {
  let subjectName = "";
  axios
    .get(`user/getSubjectById?subjectId=${subjectId}`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => {
      subjectName = res.data.data.name;
    })
    .catch((err) => {
      console.log(err);
    });
  return subjectName;
}
