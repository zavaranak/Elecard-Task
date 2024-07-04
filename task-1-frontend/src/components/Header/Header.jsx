import { Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box className="header">
      <Toolbar>
        <Typography variant="button">
          <b>Challenge CW 2023 (frontend)</b>
        </Typography>
      </Toolbar>
    </Box>
  );
};

export default Header;
