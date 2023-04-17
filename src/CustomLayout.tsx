import { memo } from "react";
import {
  AppBar,
  Layout as AdminLayout,
  useTheme,
  UserMenu,
  Toolbar,
} from "react-admin";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import { darkTheme, lightTheme } from "./theme";

const MyUserMenu = () => {
  const [theme, setTheme] = useTheme();

  return (
    <>
      <Tooltip
        title={
          theme?.palette?.mode === "dark"
            ? "Switch to Light Theme"
            : "Switch to Dark Theme"
        }
      >
        <IconButton
          onClick={() =>
            setTheme(theme?.palette?.mode === "dark" ? lightTheme : darkTheme)
          }
        >
          {theme?.palette?.mode === "dark" ? (
            <LightModeIcon />
          ) : (
            <DarkModeOutlinedIcon sx={{ color: "#202021" }} />
          )}
        </IconButton>
      </Tooltip>
      <UserMenu />
    </>
  );
};

const MyAppBar = memo((props) => {
  return (
    <AppBar elevation={1} {...props} userMenu={<MyUserMenu />}>
      <Toolbar style={{ marginRight: "auto" }}>
        <img style={{ width: "5rem" }} src="/MyResultsLogo.png" alt="logo" />
      </Toolbar>
    </AppBar>
  );
});

const CustomLayout = (props: any) => {
  return <AdminLayout {...props} appBar={MyAppBar} />;
};
export default CustomLayout;
