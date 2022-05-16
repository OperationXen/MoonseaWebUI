import create from "zustand";

const useSnackbar = create((set) => ({
  open: false,
  setOpen: (newVal) => set((state) => ({ open: newVal })),
  message: "",
  setMessage: (newVal) => set((state) => ({ message: newVal })),
  severity: "error",
  setSeverity: (newVal) => set((state) => ({ severity: newVal })),

  displayMessage: (message, severity = "info") => {
    console.log(`Message (${severity}): ${message}`);
    return set((state) => ({
      open: true,
      message: message,
      severity: severity,
    }));
  },
}));

export default useSnackbar;
