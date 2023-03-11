export default interface SnackBarInterface {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}
