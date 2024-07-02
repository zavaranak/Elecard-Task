import { Box } from "@mui/material";
import { Check } from "@mui/icons-material";

const Alert = () => {
  return (
    <Box className="alert">
      <Check /> <p className="alert__message">Successfully get images</p>
    </Box>
  );
};
export default Alert;
