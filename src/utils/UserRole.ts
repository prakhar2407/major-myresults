const getUserRole = () => {
  return String(localStorage.getItem("Role"));
};

export default getUserRole;
