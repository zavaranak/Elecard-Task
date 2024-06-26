import { useState } from "react";
import CardView from "./CardViewComponent/CardView";
import TreeView from "./TreeViewComponent/TreeView";
import { Container} from "@mui/material";

//component
const Content = () => {
  //state and action logic
  const [view, setView] = useState("cards");
  //return jsx
  return (
    <Container className="app__content" maxWidth='xl'>
      {view === "cards" && <CardView setView={setView}/>}
      {view === "tree" && <TreeView setView={setView}/>}
    </Container>
  );
};
//export component
export default Content;
