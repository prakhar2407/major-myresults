import { defaultTheme } from "react-admin";

export const darkTheme = {
  ...defaultTheme,
  palette: {
    type: "dark",
    mode: "dark",
    primary: {
      main: "#dcdcdc",
    },
    background: {
      default: "#222428",
      paper: "#222428",
    },
  },
  components: {
    ...defaultTheme.components,
    RaDatagrid: {
      styleOverrides: {
        root: {
          "& .RaDatagrid-headerCell": {
            backgroundColor: "#222428",
            color: "#b6b6b6",
          },
          "& .RaDatagrid-rowCell": {
            borderBottom: "0.5px solid #121212",
            "& .RaDatagrid-headerCell": {
              zIndex: "0",
            },
          },
          "& .RaDatagrid-headerCell:first-of-type": {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
          },
          "& .RaDatagrid-headerCell:last-child": {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
          },
        },
      },
    },
    RaSidebar: {
      styleOverrides: {
        root: {
          backgroundColor: "#222428",
          "& .RaMenuItemLink-active": {
            background: "#00000029",
          },
        },
      },
    },
    RaList: {
      styleOverrides: {
        root: {
          "& .RaList-content": {
            margin: "1px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#222428",
          "& .MuiPaper-root": {
            background: "#222428",
          },
        },
      },
    },
    RaShow: {
      styleOverrides: {
        root: {
          "& .RaShow-card": {
            background: "#222428",
          },
        },
      },
    },
    RaAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#222428",
          color: "#e9e9e9",
          "& .RaAppBar-toolbar": {
            backgroundColor: "#222428",
            color: "#e9e9e9",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#ddd",
          "& .MuiListItemIcon-root": {
            color: "#ddd",
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            background: "#222428",
          },
          "& .MuiTableCell-body": {
            background: "#292929",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "0.5px solid #263238",
          backgroundColor: "#292929",
          color: "#b6b6b6",
          "& .MuiTableCell-head": {
            color: "#b6b6b6",
          },
          "& .MuiTableCell-body": {
            backgroundColor: "#121212",
            color: "#b6b6b6",
          },
          "& .MuiTableCell-root": {
            borderBottom: "0.5px solid #263238",
          },
        },
      },
    },
  },
} as any;

export const lightTheme = {
  ...defaultTheme,
  palette: {
    type: "light",
    mode: "light",
    secondary: {
      main: "#1976d2",
    },
    background: {
      default: "#fff",
      paper: "#fdfdfd",
    },
    text: {
      primary: "#000",
      secondary: "#525252",
    },
  },
  components: {
    ...defaultTheme.components,
    RaDatagrid: {
      styleOverrides: {
        root: {
          background: "#eeeeee",
          "& .RaDatagrid-headerCell": {
            backgroundColor: "#eeeeee",
          },
          "& .RaDatagrid-rowCell": {
            "& .RaDatagrid-headerCell": {
              zIndex: "0",
            },
          },
        },
      },
    },
    RaAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "#202021",
          "& .RaAppBar-toolbar": {
            backgroundColor: "#fff",
            color: "#202021",
          },
        },
      },
    },
    RaSidebar: {
      styleOverrides: {
        root: {
          "& .RaMenuItemLink-active": {
            background: "#e1e1e1",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            background: "#eeeeee",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#737373",
          "& .MuiListItemIcon-root": {
            color: "#737373",
          },
        },
      },
    },
  },
} as any;
