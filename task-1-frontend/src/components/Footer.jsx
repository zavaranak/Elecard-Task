//component
import { Box,Typography } from "@mui/material";

const Footer = () => {
    return (
      <Box className="app__footer">
        <Box>
          <Typography variant="button" align="center">
            <b>&copy; 2024 Frontend with React by Dang</b>
          </Typography>
        </Box>
      </Box>
    );
  };

export default Footer