//component
import { Box,Container,Typography } from "@mui/material";

const Footer = () => {
    return (
      <Box className="app__footer">
        <Container>
          <Typography variant="button" align="center">
            <b>&copy; 2024 Frontend with React by Dang</b>
          </Typography>
        </Container>
      </Box>
    );
  };
//export component
export default Footer