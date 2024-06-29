import { useState } from "react";
import CardView from "./CardView/CardView";
import TreeView from "./TreeView/TreeView";
import { Box} from "@mui/material";

//component
const Content = () => {
  //state and action logic
  const [view, setView] = useState("cards");
  //return jsx
  return (
    <Box className={`app__content`} maxWidth='xl'>
      {view === "cards" && <CardView setView={setView}/>}
      {view === "tree" && <TreeView setView={setView}/>}
    </Box>
  );
};
//export component
export default Content;
