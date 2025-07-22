import React,{createContext,useState,useContext} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from "@mui/material/Alert";
const SnackbarContext = createContext();
export const useSnackbar = ()=> useContext(SnackbarContext);

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const showSnackbar = (message, severity = "info") => {
    setSnack({ open: true, message, severity });
  };
   const handleClose = () => {
    setSnack({ ...snack, open: false });
  };
   return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}