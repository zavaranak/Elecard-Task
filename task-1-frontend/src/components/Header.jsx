import { Box,Toolbar, Typography } from "@mui/material"

//component
const Header = () => {
    return (
      <Box className="app__header">
        <Toolbar>
          <Typography variant="h4">
            Challenge CW 2023 (frontend)
          </Typography>
        </Toolbar>
      </Box>
    );
  };
//export component
export default Header