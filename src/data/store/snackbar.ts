import { create } from "zustand";

type Severity = "error" | "info" | "success" | "warning";

type SnackBarStore = {
  open: boolean;
  setOpen: (x: boolean) => void;
  message: string;
  setMessage: (x: string) => void;
  severity: Severity;
  setSeverity: (x: Severity) => void;
  displayMessage: (x: string, y?: Severity) => void;
};

const useSnackbar = create<SnackBarStore>((set) => ({
  open: false,
  setOpen: (newVal) => set((_state) => ({ open: newVal })),
  message: "",
  setMessage: (newVal) => set((_state) => ({ message: newVal })),
  severity: "error",
  setSeverity: (newVal) => set((_state) => ({ severity: newVal })),

  displayMessage: (message, severity = "info") => {
    console.log(`Message (${severity}): ${message}`);
    return set((_state) => ({
      open: true,
      message: message,
      severity: severity,
    }));
  },
}));

export default useSnackbar;
