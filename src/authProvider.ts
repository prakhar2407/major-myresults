import axios from "axios";

interface AuthDetails {
  username: string;
  password: string;
}

const authProvider = {
  login: async ({ username, password }: AuthDetails) => {
    return axios
      .post(
        "user/login",
        { email: username, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("username", username);
        if (Number(res.data.data.role) === 0) {
          localStorage.setItem("Role", "Admin");
        }
        if (Number(res.data.data.role) === 1) {
          localStorage.setItem("Role", "Student");
        }
        if (Number(res.data.data.role) === 2) {
          localStorage.setItem("Role", "Teacher");
        }
        localStorage.setItem("token", res.data.data.accessToken);
      })
      .catch((err) => {
        alert("Authentication failed");
      });
  },
  logout: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("Role");
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
  checkError: (error: any) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      localStorage.removeItem("Role");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: () =>
    Promise.resolve({
      id: String(localStorage.getItem("Role")),
      fullName: String(localStorage.getItem("username")),
    }),
  getPermissions: () => {
    const role = localStorage.getItem("Role");
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
