import { Box } from "@mui/material";
import { Check } from "@mui/icons-material";

const Alert = ({ status }) => {
  const message =
    status === "good"
      ? "Images loading successful"
      : status === "bad"
      ? "Images loading failed"
      : "";
  return (
    <Box className="alert">
      <p
        className={`alert__message ${
          status === "good" ? "alert__message_good" : "alert__message_bad"
        }`}
      >
        <Check /> {message}
      </p>
    </Box>
  );
};
export default Alert;
