//component
import { Box,Container,Typography } from "@mui/material";

const Footer = () => {
    return (
      <Box className="app__footer">
        <Container>
          <Typography variant="body2" align="center">
            &copy; 2024 Frontend with React by Dang
          </Typography>
        </Container>
      </Box>
    );
  };
//export component
export default Footer