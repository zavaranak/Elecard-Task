import { Box, Toolbar, Typography } from "@mui/material";

//component
const Header = () => {
  return (
    <Box className="app__header">
      <Toolbar>
        <Typography variant="button">
          <b>Challenge CW 2023 (frontend)</b>
        </Typography>
      </Toolbar>
    </Box>
  );
};
//export component
export default Header;
